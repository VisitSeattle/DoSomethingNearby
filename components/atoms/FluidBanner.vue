<template>
  <b-row
    class="fluid-banner"
    :class="colorClass"
  >
    <b-col class="px-0">
      <b-container>
        <b-row
          align-h="between"
          align-v="center"
          class="fluid-banner__container"
        >
          <b-col cols="6">
            <h2 class="fluid-banner__label mb-0">
              {{ label }}
            </h2>
          </b-col>
          <b-col
            cols="6"
            class="d-flex justify-content-end align-items-center"
          >
            <h6 class="mb-0">
              <nuxt-link
                role="button"
                to="/favorites"
                class="fluid-banner__cta"
              >
                View my favorites <b-icon-heart-fill class="fluid-banner__icon" />
              </nuxt-link>
            </h6>
          </b-col>
        </b-row>
      </b-container>
    </b-col>
  </b-row>
</template>

<script>
import { BIconHeartFill } from 'bootstrap-vue'
export default {
  components: {
    BIconHeartFill
  },
  props: {
    colorClass: {
      type: String,
      default: 'seafom-blue'
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="sass" scoped>
.fluid-banner
  &.seafom-blue
    background-color: $seafoam-blue
  &__container
    height: $fixed-header-height
  &__label
    color: $brown
    font-family: $font-family-akzidenz-grotesk-bq-bd
    font-weight: 500
  &__cta
    display: block
    color: $camo-green
    font-family: $font-family-akzidenz-grotesk-ce-black
    text-decoration: unset
  &__icon
    color: $red

  +media-breakpoint-down(xs)
    &__label
      font-size: 1.5rem

@media only screen and (max-width: 382px)
  .fluid-banner
    &__cta
      max-width: 100px
</style>
