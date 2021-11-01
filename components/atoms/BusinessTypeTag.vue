<template>
  <div
    class="business-type-tag"
  >
    <span class="business-type-tag__label">
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="sass" scoped>
.business-type-tag
  background-color: $light-navy-blue
  display: inline-block
  padding: 1px 3px
  border-radius: 2px
  &__label
    display: block
    font-size: 0.75rem
    color: $white
    font-family: $font-family-akzidenz-grotesk-ce-black
</style>
