<template>
  <b-col class="bussiness-filters">
    <b-row>
      <b-col>
        <h4
          class="bussiness-filters__header"
        >
          Filter Results
        </h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-1">
        <checkbox-filter
          :options="neighborhoodFilterOptions"
          :parents-collapsible="true"
          filter-key="neighborhoods"
          title="City | Neighborhood"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col class="my-1">
        <checkbox-filter
          :options="categoryFilterOptions"
          filter-key="categories"
          title="Category"
        />
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import CheckboxFilter from '@/components/atoms/CheckboxFilter'
import CategoryFilterOptions from '~/models/filter/CategoryFilterOptions'
import NeighborhoodFilterOptions from '~/models/filter/NeighborhoodFilterOptions'

export default {
  components: {
    CheckboxFilter
  },
  data () {
    return {
      categoryFilterOptions: CategoryFilterOptions,
      neighborhoodFilterOptions: NeighborhoodFilterOptions
    }
  }
}
</script>

<style lang="sass" scoped>
.bussiness-filters
  &__header
    font-family: $font-family-akzidenz-grotesk-ce-black
    font-size: 1.4rem
    font-weight: 900
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: left
    margin: 0
    padding: 0

</style>
