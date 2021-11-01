<template>
  <div>
    <b-form-group>
      <b-form-tags
        v-model="internalCheckFilters"
        no-outer-focus
        class="no-border"
        input-class="input-class"
      >
        <template v-slot="{ tags, removeTag }">
          <ul
            v-if="tags.length > 0"
            class="list-inline d-inline-block mb-1"
          >
            <li
              v-for="tag in tags"
              :key="tag"
              class="list-inline-item"
            >
              <div class="tag d-flex align-items-center mb-1">
                <a
                  style="font-size: 18px;"
                  @click="() => {
                    removeTag(tag)
                    onTagRemoved(tag)
                  }"
                  class="tag__close"
                >
                  <b-icon-x />
                </a>
                <span class="tag__label pl-1">{{ tag }}</span>
              </div>
            </li>
          </ul>
        </template>
      </b-form-tags>
      <a
        class="ml-3 tag__clear"
        v-if="internalCheckFilters.length"
        @click="removeFilters"
      >
        Clear all
      </a>
    </b-form-group>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { BIconX } from 'bootstrap-vue'
export default {
  components: {
    BIconX
  },
  data () {
    return {
      internalCheckFilters: []
    }
  },
  mounted () {
    this.internalCheckFilters = this.getTagArray(this.checkedFilters)
  },
  methods: {
    ...mapActions({
      setRemovedFilter: 'filters/setRemovedFilter',
      removeFilters: 'filters/removeFilters'
    }),
    onTagRemoved (tag) {
      this.setRemovedFilter(tag)
    },
    getTagArray (checkedFilters) {
      const tagArray = []
      for (const filterKey in checkedFilters) {
        const filterArray = checkedFilters[filterKey]
        tagArray.push(...filterArray)
      }
      return tagArray
    }
  },
  computed: {
    ...mapGetters({
      checkedFilters: 'filters/checkedFilters',
      removedFilter: 'filters/removedFilter'
    })
  },
  watch: {
    checkedFilters (checkedFilters) {
      this.internalCheckFilters = this.getTagArray(checkedFilters)
    }
  }
}
</script>
<style lang="sass" scoped>
/deep/ .input-class
  display: none
.no-border
  border: none
.tag
  height: 31px
  padding: 4px
  padding-left: 2px
  border: solid 2px $deep-teal
  border-radius: 2px
  &__close
    cursor: pointer
    color: $camo-green
  &__label
    font-size: 1rem
    color: $camo-green
    line-height: 49px
  &__clear
    color: $camo-green
    border-bottom: solid 1px $deep-teal
    cursor: pointer
    font-size: 1rem
    &:hover
      text-decoration: unset
</style>
