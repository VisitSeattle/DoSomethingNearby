<template>
  <b-row class="sub-hero">
    <b-col>
      <b-container class="my-6 px-0">
        <b-row align-h="center">
          <b-col
            lg="10"
          >
            <p class="sub-hero__copy text-center">
              Your King County favorites are calling on you to <em>Do Something</em>. Whether they’re
              bakeries in Renton, restaurants in Woodinville, retailers in Bellevue, or hotels
              in Seattle, your neighborhood spots need your support. So, when you’re grabbing a
              meal to go, enjoying a socially distanced glass of wine, shopping online, or
              buying gift cards for your loved ones, make sure you do it locally, and you do it
              safely. Get out, mask up, and <em>Do Something</em>.
            </p>
          </b-col>
        </b-row>
        <b-row class="mt-6 mb-5">
          <b-col lg="12">
            <video-grid />
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col
            lg="2"
            class="d-flex justify-content-center"
          >
            <h4 class="sub-hero__copy text-center text-secondary">
              #DoSomethingNearby
            </h4>
          </b-col>
        </b-row>
      </b-container>
    </b-col>
  </b-row>
</template>

<script>
import VideoGrid from '@/components/modules/VideoGrid'
export default {
  components: {
    VideoGrid
  }
}
</script>
<style lang="sass" scoped>
.sub-hero
  background-color: $pale
  position: relative

  &__copy
    color: $brown
    font-size: 1.5rem
    line-height: 2rem
    font-family: $font-family-akzidenz-grotesk-bq
    +media-breakpoint-up(lg)
      font-size: 2.25rem
      line-height: 3rem
</style>
