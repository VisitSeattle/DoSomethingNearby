<template>
  <b-img
    class="place-item-category-icon"
    ref="image"
    fluid
    :src="businessCategoryDefaultImage"
    alt=""
  />
</template>

<script>
import Pledgee from '~/models/Pledgee'

export default {
  props: {
    businessCategories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isLoaded: false,
      isError: false,
      isPortrait: false
    }
  },
  computed: {
    businessCategory () {
      return this.businessCategories[0]
    },
    businessCategoryDefaultImage () {
      return `/placeholders/category_img-${this.firstCategoryKeyName}.png`
    },
    firstCategoryKeyName () {
      const firstCategory = this.businessCategories[0]

      const categoriesKeys = Object.keys(Pledgee.categories)

      let firstCategoryKeyName
      // pick CategoryKey for placeholder Color
      categoriesKeys.find((categoryKey) => {
        firstCategoryKeyName = Pledgee.categories[categoryKey] === firstCategory ? categoryKey : ''
        return Pledgee.categories[categoryKey] === firstCategory
      })
      return firstCategoryKeyName
    }
  }
}
</script>

<style lang="sass" scoped>
.place-item-category-icon
  width: 100%
  height: auto
  position: relative
  display: block
</style>
