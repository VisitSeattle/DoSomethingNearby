<template>
  <b-container
    class="checkbox-filter"
  >
    <b-row
      v-if="hasDivider"
    >
      <b-col class="mt-2 mb-3">
        <divider />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group>
          <template
            v-if="title"
            v-slot:label
          >
            <b-container
              class="checkbox-filter__header-container px-0"
            >
              <b>{{ title }}</b>
              <b-button
                v-b-toggle.filterCollapse
                size="sm"
                class="checkbox-filter__collapse-button"
                variant="outline-black"
                v-if="isCollapsible"
                @click="isExpanded = !isExpanded"
              >
                <b-icon-arrows-expand
                  v-if="!isExpanded"
                />
                <b-icon-arrows-collapse
                  v-if="isExpanded"
                />
              </b-button>
            </b-container>
          </template>
          <b-collapse
            v-model="isExpanded"
            visible
          >
            <b-form-checkbox-group
              v-model="optionsChecked"
              name="options-select"
              stacked
            >
              <template v-for="option in options">
                <template
                  v-if="option.children"
                >
                  <b-form-checkbox
                    :key="option.value"
                    :value="option.value"
                    @change="(checked) => toggleParent(checked, option.value, option.children)"
                  >
                    {{ option.value }}
                    <b-button
                      class="checkbox-filter__collapse-children-button"
                      variant="outline-black"
                      size="sm"
                      v-if="parentsCollapsible"
                      @click.prevent
                      v-b-toggle="option.value.replace(/ /g,'')"
                      :key="`${option.value}-parent-check`"
                    >
                      <b-icon-chevron-up v-if="visibleParents[option.value] == true" />
                      <b-icon-chevron-down v-else />
                    </b-button>
                  </b-form-checkbox>
                  <b-collapse
                    v-if="parentsCollapsible"
                    :id="option.value.replace(/ /g,'')"
                    :key="`${option.value}-collapse`"
                    @show="() => onShow(option.value)"
                    @hide="() => onHide(option.value)"
                  >
                    <div class="d-flex flex-wrap flex-column max-height">
                      <b-form-checkbox
                        v-for="childOption in option.children"
                        :key="childOption"
                        class="ml-3"
                        :value="childOption"
                        @change="(checked) => toggleChildren(checked, option.value, option.children)"
                      >
                        {{ childOption }}
                      </b-form-checkbox>
                    </div>
                  </b-collapse>
                  <b-form-checkbox
                    v-else
                    v-for="childOption in option.children"
                    :key="childOption"
                    class="ml-4"
                    :value="childOption"
                    @change="(checked) => toggleChildren(checked, option.value, option.children)"
                  >
                    {{ childOption }}
                  </b-form-checkbox>
                </template>
                <b-form-checkbox
                  v-else
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.value }}
                </b-form-checkbox>
              </template>
            </b-form-checkbox-group>
            <slot name="footer" />
          </b-collapse>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import {
  BIconArrowsExpand,
  BIconArrowsCollapse,
  BIconChevronDown,
  BIconChevronUp
} from 'bootstrap-vue'
import Divider from '@/components/atoms/Divider'

export default {
  components: {
    Divider,
    BIconArrowsExpand,
    BIconArrowsCollapse,
    BIconChevronDown,
    BIconChevronUp
  },
  props: {
    hasDivider: {
      type: Boolean,
      default: true
    },
    isCollapsible: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    filterKey: {
      type: String,
      required: true
    },
    parentsCollapsible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isExpanded: true,
      optionsChecked: [],
      childrenChecked: {},
      visibleParents: {}
    }
  },
  computed: {
    ...mapGetters({
      checkedFilters: 'filters/checkedFilters',
      removedFilter: 'filters/removedFilter',
      filter: 'filters/filter'
    })
  },
  mounted () {
    const mountedVisibleParents = {}
    for (const optionsKey in this.options) {
      const option = this.options[optionsKey]
      if (option.children) {
        mountedVisibleParents[option.value] = false
      }
    }
    this.visibleParents = mountedVisibleParents
    this.optionsChecked = this.checkedFilters[this.filterKey]
  },
  methods: {
    ...mapActions({
      setCheckedFilters: 'filters/setCheckedFilters',
      setFilter: 'filters/setFilter'
    }),
    toggleParent (checked, parentValue, childrenOptions) {
      const childrenCheckedDifference = _.difference(checked, childrenOptions)
      if (_.indexOf(checked, parentValue) >= 0) {
        this.childrenChecked[parentValue] = childrenOptions
        this.optionsChecked = checked
      } else {
        this.childrenChecked[parentValue] = []
        this.optionsChecked = childrenCheckedDifference
      }
    },
    toggleChildren (checked, parentValue, childrenOptions) {
      const childrenChecked = _.intersection(checked, childrenOptions)
      const childrenCheckedDifference = _.difference(checked, childrenOptions)
      if (childrenChecked.length) {
        this.childrenChecked[parentValue] = []
        if (_.indexOf(checked, parentValue) >= 0) {
          this.optionsChecked = [...childrenCheckedDifference, ...childrenChecked]
        } else {
          this.optionsChecked = [...childrenCheckedDifference, parentValue, ...childrenChecked]
        }
      } else {
        if (this.childrenChecked[parentValue] && this.childrenChecked[parentValue].length === 0) {
          this.childrenChecked[parentValue] = childrenOptions
        }
        this.optionsChecked = checked
      }
    },
    onShow (parentKey) {
      this.visibleParents = { ...this.visibleParents, [parentKey]: true }
    },
    onHide (parentKey) {
      this.visibleParents = { ...this.visibleParents, [parentKey]: false }
    },
    getFilterValues (optionsChecked) {
      let filterValues = [...optionsChecked]
      this.options.forEach(option => {
        if (option.children) {
          if (filterValues.indexOf(option.value) >= 0) {
            if (_.intersection(filterValues, option.children).length) {
              filterValues = filterValues.filter(value => value !== option.value)
            } else {
              filterValues.push(...option.children)
            }
          }
        }
      })
      return filterValues
    }
  },
  watch: {
    checkedFilters (checkedFilters) {
      if (this.optionsChecked !== this.checkedFilters[this.filterKey]) {
        this.optionsChecked = this.checkedFilters[this.filterKey]
      }
    },
    optionsChecked (optionsChecked) {
      if (this.optionsChecked !== this.checkedFilters[this.filterKey]) {
        const newCheckedFilters = { ...this.checkedFilters }
        newCheckedFilters[this.filterKey] = optionsChecked
        this.setCheckedFilters(newCheckedFilters)
        const updatedFilterValues = this.getFilterValues(optionsChecked)
        this.setFilter({ ...this.filter, [this.filterKey]: updatedFilterValues })
      }
    },
    removedFilter (removedFilter) {
      if (removedFilter.key === this.filterKey) {
        const newOptionsChecked = this.optionsChecked.filter(value => value !== removedFilter.value)
        for (const optionsKey in this.options) {
          const option = this.options[optionsKey]
          if (option.children) {
            if (option.value === removedFilter.value) {
              this.toggleParent(newOptionsChecked, removedFilter.value, option.children)
            } else if (option.children.indexOf(removedFilter.value) >= 0) {
              this.toggleChildren(newOptionsChecked, option.value, option.children)
            }
          } else {
            if (option.value === removedFilter.value) {
              this.optionsChecked = newOptionsChecked
            }
          }
        }
      } else if (removedFilter.key === 'all') {
        this.optionsChecked = []
        this.childrenChecked = {}
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .checkbox-filter
    padding: 0
    margin: 0
    width: 100%

    &__collapse-button
      border: none
      &:hover
        background-color: transparent
      &:focus
        background-color: transparent
        border: none
        box-shadow: 0

    &__collapse-children-button
      border: none
      padding: 0 0.5rem
      &:hover
        background-color: transparent
      &:focus
        background-color: transparent
        border: none
        box-shadow: 0

    &__header-container
      display: flex
      justify-content: space-between
      padding: 0

  .max-height
    max-height: auto

    +media-breakpoint-up(md)
      max-height: 300px

</style>
