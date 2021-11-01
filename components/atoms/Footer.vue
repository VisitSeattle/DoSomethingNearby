<template>
  <b-container
    fluid
    class="footer py-6"
  >
    <b-container>
      <b-row>
        <b-col
          cols="12"
          sm="9"
        >
          <p>
            If you’re a business in the region looking to get involved, view the
            <cta-link
              href="https://www.dropbox.com/sh/7ybq6cimexc9k0b/AACLR8j_Egx3RL7GkwCNUAIGa?dl=0"
              content="Do Something Business Toolkit"
              target="_blank"
            />
            It’s filled with graphics, logos, and verbiage
            so that you can join this effort and ask people to get out there and do
            something.
          </p>
          <p>
            Please check with the businesses directly if you have specific questions
            or concerns about their protocols or their adherence to the pledge. Visit
            Seattle and Seattle Southside RTA are separate entities from their
            partners and are not responsible for their actions or omissions. Please
            note that Visit Seattle and Seattle Southside RTA will not be liable should
            you contract an illness while visiting any of these locations.
          </p>
          <p class="footer__thanks">
            A special thank you to King County Council for their support and encouragement.
          </p>
        </b-col>
        <b-col
          cols="12"
          sm="3"
          class="footer__sponsors"
        >
          <p class="footer__sponsored-label d-inline-block mr-3">
            Created by:
          </p>
          <b-img
            src="/assets/seattle-southside-logo.png"
            alt="Seattle Southside RTA"
          />
          <b-img
            src="/assets/visit-seattle-logo.png"
            alt="Visit Seattle"
          />
        </b-col>
      </b-row>
    </b-container>
  </b-container>
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
.footer
  background-color: $light-navy-blue
  color: $white
  &__sponsored-label
    font-size: 0.75rem
    font-family: $font-family-akzidenz-grotesk-ce-black
  &__thanks
    font-family: $font-family-akzidenz-grotesk-bq
    line-height: 18px
    font-size: 1.5rem
  &__sponsors
    text-align: right
    p
      text-align: right
  & a
    color: $white
    text-decoration: underline $white
  img
    display: block
    margin: 0 0 20px auto
</style>
