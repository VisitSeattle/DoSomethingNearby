<template>
  <b-col class="d-flex justify-content-center">
    <div class="introduction-block">
      <h1 class="introduction-block__title">
        <slot name="header" />
      </h1>
      <slot name="content" />
    </div>
  </b-col>
</template>
<style lang="sass" scoped>
.introduction-image
  width: 105px
.introduction-block
  max-width: 1160px
  width: calc(100% - 105px)
  &__link
    color: $camo-green
    border-bottom: solid 1px $deep-teal
    cursor: pointer
    &:hover
      text-decoration: none
  &__image
    cursor: pointer

  +media-breakpoint-down(xs)
    &__title
      font-size: 1.5rem
</style>
