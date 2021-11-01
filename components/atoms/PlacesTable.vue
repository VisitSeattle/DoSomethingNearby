<template>
  <div class="places-table">
    <b-row no-gutters>
      <b-col>
        <b-table
          id="businessTable"
          :fields="tableFields"
          :items="businesses"
          borderless
          fixed
          show-empty
          :filter="filter"
          :filter-function="filterFunction"
          :sort-by.sync="sortBy"
          :sort-compare="sortCompare"
          :per-page="perPage"
          :current-page="currentPage"
          :tbody-transition-props="transProps"
          primary-key="id"
          @filtered="onFiltered"
        >
          <!-- A custom formatted header cell -->
          <template v-slot:head(business)>
            <div />
          </template>
          <!-- A custom formatted column -->
          <template
            v-slot:cell(business)="business"
          >
            <PlaceItem :business="business.item" />
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="d-flex justify-content-between align-items-center">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          aria-controls="businessTable"
          @input="onPaginationChange"
          v-if="hasPages"
        />
        <p
          class="places-table__counter"
          v-if="hasPages"
        >
          {{ currentPage }} of {{ totalPages }}
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PlaceItem from '@/components/atoms/PlaceItem'
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    PlaceItem
  },
  props: {
    businesses: {
      type: Array,
      required: true
    },
    filter: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      tableFields: [
        { key: 'business', label: '' }
      ],
      sortBy: 'business',
      currentPage: 1,
      perPage: 20,
      transProps: {
        // Transition name
        name: 'transition-list'
      },
      totalRows: 1
    }
  },
  created () {
    if (process.client) {
      this.loadFavoritesCookies()
    }
  },
  mounted () {
    this.totalRows = this.businesses.length
  },
  methods: {
    filterFunction (record, filter) {
      const { categories, regions, neighborhoods } = filter
      let hasCategoriesMatch = true
      let hasPlaceMatch = true
      const placeFilter = [...regions, ...neighborhoods]
      if (categories && categories.length && record.category) {
        hasCategoriesMatch = _.intersection(categories, record.category).length > 0
      }
      if (placeFilter && placeFilter.length) {
        const businessPlaces = []
        if (record.city) {
          businessPlaces.push(...record.city)
        }
        if (record.neighborhood) {
          businessPlaces.push(...record.neighborhood)
        }
        hasPlaceMatch = _.intersection(placeFilter, businessPlaces).length > 0
      }
      return hasCategoriesMatch && hasPlaceMatch
    },
    getDistance (businessCoord, userCoord) {
      if (businessCoord && businessCoord.lat && businessCoord.lon) {
        return Math.sqrt(((businessCoord.lat - userCoord.latitude) ** 2) + ((businessCoord.lon - userCoord.longitude) ** 2))
      } else {
        // business does not have lat/long; push to end of list
        return Number.MAX_VALUE
      }
    },
    sortCompare (aRow, bRow, key, sortDesc, formatter, compareOptions, compareLocale) {
      const businessName1 = aRow.businessName
      const businessName2 = bRow.businessName
      if (this.selectedSort === 'dateAdded') {
        return false
      } else if (this.selectedSort === 'nearMe') {
        const coordinates1 = aRow.coordinates
        const coordinates2 = bRow.coordinates
        const business1Distance = this.getDistance(coordinates1, this.userPosition)
        const business2Distance = this.getDistance(coordinates2, this.userPosition)
        return business1Distance < business2Distance ? -1 : business1Distance > business2Distance ? 1 : 0
      } else {
        return businessName1.localeCompare(businessName2, compareLocale, compareOptions)
      }
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    ...mapActions({
      loadFavoritesCookies: 'favorites/loadFavoritesCookies'
    }),
    onPaginationChange () {
      this.scrollUp()
    },
    scrollUp () {
      setTimeout(() => this.$emit('pageChange', true), 10)
    }
  },
  watch: {
    businesses (businesses) {
      // Trigger pagination to update the number of buttons/pages due to removing items
      this.totalRows = businesses.length
    },
    selectedSort (selectedSort) {
      this.currentPage = 1
    }
  },
  computed: {
    ...mapGetters({
      selectedSort: 'sort/selectedSort',
      userPosition: 'sort/userPosition'
    }),
    totalPages () {
      return Math.ceil(this.totalRows / this.perPage)
    },
    hasPages () {
      return Math.ceil(this.totalRows / this.perPage) > 1
    }
  }
}
</script>
<style lang="sass" scoped>
.places-table
  &__counter
    color: $camo-green

::v-deep table tbody td
  padding-top: 6px
  padding-bottom: 6px
::v-deep table .transition-list-move
  transition: transform 0.5s
::v-deep table .transition-list-item
  transition: all 1s
  display: inline-block
  margin-right: 10px
::v-deep table .transition-list-enter
  opacity: 0
  transform: translateY(30px)
::v-deep table .transition-list-leave-to
  opacity: 0
  transform: translateY(30px)
::v-deep table .transition-list-leave-active
  position: absolute
</style>
