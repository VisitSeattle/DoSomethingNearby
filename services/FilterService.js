import CategoryFilterOptions from '~/models/filter/CategoryFilterOptions'
import NeighborhoodFilterOptions from '~/models/filter/NeighborhoodFilterOptions'
const FilterService = {
  hasFilter (filter, filterOptions) {
    for (const optionsKey in filterOptions) {
      const option = filterOptions[optionsKey]
      if (option.value === filter) {
        return true
      } else if (option.children) {
        if (option.children.indexOf(filter) >= 0) {
          return true
        }
      }
    }
    return false
  },
  getFilterObjectByTag (removedTag) {
    const tagObject = {
      value: removedTag
    }
    if (this.hasFilter(removedTag, CategoryFilterOptions)) {
      tagObject.key = 'categories'
    } else if (this.hasFilter(removedTag, NeighborhoodFilterOptions)) {
      tagObject.key = 'neighborhoods'
    } else {
      tagObject.key = 'regions'
    }
    return tagObject
  },
  getAllFilterRemoveObject () {
    return { key: 'all' }
  }
}

export default FilterService
