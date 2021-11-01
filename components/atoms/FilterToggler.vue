<template>
  <div class="d-flex align-items-center">
    <a
      class="link"
      @click.prevent="onCollapseFilter"
    >
      {{ show ? 'Show filters' : 'Hide filters' }}
    </a>
    <b-icon-filter :flip-v="show" />
  </div>
</template>

<script>
import { BIconFilter } from 'bootstrap-vue'
export default {
  components: {
    BIconFilter
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    onCollapseFilter () {
      this.show = !this.show
      this.$emit('collapseFilter', this.show)
    }
  }
}
</script>
<style lang="sass" scoped>
.link
  color: $camo-green
  text-decoration: underline $deep-teal
  cursor: pointer
  white-space: nowrap
  &:hover
    text-decoration: underline $deep-teal
</style>
