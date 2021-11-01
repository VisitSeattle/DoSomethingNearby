<template>
  <div class="shared">
    <b-container
      fluid
      class="fixed"
      id="business-directory"
    >
      <fluid-banner label="Business Directory" />
    </b-container>
    <b-container class="d-flex flex-column bottom-header">
      <b-row class="mt-4 mt-sm-6 mb-sm-5 mb-4">
        <b-col class="d-flex justify-content-center">
          <introduction-block-favorites>
            <template #header>
              Share your favorites, or something new
            </template>
            <template #content>
              <p>
                Support King County businesses and Do Something for yourself and your community.
              </p>
            </template>
          </introduction-block-favorites>
        </b-col>
      </b-row>
      <b-row class="mb-4 mb-sm-5">
        <b-col>
          <divider />
        </b-col>
      </b-row>
      <b-row
        cols="1"
        cols-sm="2"
      >
        <b-col class="d-flex justify-content-center justify-content-sm-start align-items-center mb-2 mb-sm-0">
          <cta-link
            internal
            :to="{ path: '/', hash:'#business-directory'}"
          >
            <b-icon-chevron-left />Back to business listing
          </cta-link>
        </b-col>
        <b-col class="d-flex justify-content-center justify-content-sm-end align-items-center" />
      </b-row>
      <b-row
        align-h="end"
        class="h-100"
      >
        <b-col
          lg="12"
          class="my-1"
        >
          <places-table
            :businesses="sharedBusinesses"
          />
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlacesTable from '@/components/atoms/PlacesTable'
import FluidBanner from '@/components/atoms/FluidBanner'
import IntroductionBlockFavorites from '@/components/atoms/IntroductionBlockFavorites'
import Footer from '@/components/atoms/Footer'
import CtaLink from '@/components/atoms/CtaLink'
import Divider from '@/components/atoms/Divider'
import { BIconChevronLeft } from 'bootstrap-vue'
const baseUrl = process.env.BASE_URL

export default {
  components: {
    PlacesTable,
    FluidBanner,
    IntroductionBlockFavorites,
    Footer,
    BIconChevronLeft,
    CtaLink,
    Divider
  },
  data () {
    return {
      placeIds: {}
    }
  },
  head () {
    return {
      meta: [
        {
          property: 'og:url',
          content: baseUrl + '/shared',
          hid: 'og:url'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      businesses: 'places/businesses',
      favorites: 'favorites/favorites'
    }),
    sharedBusinesses () {
      const businesses = this.businesses.filter(business => {
        if (this.placeIds[business.id]) {
          return true
        } else {
          return false
        }
      })
      return businesses
    }
  },
  methods: {
    getShareEmail () {
      const basePath = this.$config.BASE_URL + '/shared'
      const idsString = Object.keys(this.favorites).join('|')
      return encodeURIComponent(`${basePath}?id=${idsString}`)
    }
  },
  asyncData ({ route }) {
    const idsString = route.query.id
    if (idsString) {
      const idsList = idsString.split('|')
      const placeIds = {}
      if (idsList.length) {
        idsList.forEach(element => {
          placeIds[element] = true
        })
        return { placeIds }
      }
    }
  },
  async fetch ({ store, $config }) {
    if (process.server) {
      await store.dispatch('places/getBusinesses', $config)
    }
  }
}
</script>
<style lang="sass" scoped>
.shared
  &__share
    width: 1rem
    height: 1rem
.fixed
  position: fixed
  top: 0
  z-index: 3
.bottom-header
  margin-top: $fixed-header-height
</style>
