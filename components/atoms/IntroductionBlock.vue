<template>
  <b-col class="d-flex justify-content-center">
    <div class="introduction-block">
      <!-- <h1 class="introduction-block__title">
        Lorem ipsum dolor sit amet
      </h1> -->
      <p>
        Each of these businesses have taken the All Clear King County Safety Pledge
        backed by public healthcare protocols to help them open responsibly and keep
        you doing. Sort by city, neighborhood or type of business to discover – or
        rediscover – what makes King County so special.
      </p>
      <p>
        Have questions? See this
        <cta-link
          href="https://visitseattle.org/travel-advisory/"
          content="Travel Advisory"
          target="_blank"
        />
        for details on the latest restrictions.
      </p>
      <p>
        Pro tip: Use the heart button to favorite businesses to build an itinerary.
        You can view your favorites and share the list with your family or friends.
        Don’t forget to tag #DoSomethingNearby.
      </p>
      <div class="introduction-block__pledge-container d-flex align-items-top">
        <a
          href="https://visitseattle.org/about-us/all-clear-king-county/"
          class="introduction-block__image"
          target="_blank"
        >
          <img
            src="/assets/pledge-hand.png"
            alt="Take the pledge"
          >
        </a>
        <div class="d-flex flex-column justify-content-around ml-2">
          <p>
            If you’re a business in King County that would like to be included below,
            <cta-link
              href="https://visitseattle.org/about-us/all-clear-king-county/"
              content="take the All Clear King County Pledge"
              target="_blank"
            />.
          </p>
          <p>
            You can also
            <cta-link
              href="https://visitseattle.org/about-us/all-clear-king-county/pledges/"
              content="learn more about the protocols businesses are taking"
              target="_blank"
            />
            to keep you safe.
          </p>
        </div>
      </div>
      <p>
        Reopening plans and restrictions are constantly evolving, and every business
        is different. Visit individual websites to stay informed about each business’
        policies and hours.
      </p>
    </div>
  </b-col>
</template>
<script>
import CtaLink from '@/components/atoms/CtaLink'
export default {
  components: {
    CtaLink
  }
}
</script>
<style lang="sass" scoped>
.introduction-block
  max-width: 1100px
  width: 100%
  &__link
    color: $camo-green
    border-bottom: solid 1px $deep-teal
    cursor: pointer
    &:hover
      text-decoration: none
  &__pledge-container
    border: solid 1px $gray
    padding: 1.25rem
    margin-bottom: 1rem
  & img
    margin-right: 20px
    +media-breakpoint-up(md)
      margin-right: 40px
  +media-breakpoint-down(xs)
    &__title
      font-size: 1.5rem
</style>
