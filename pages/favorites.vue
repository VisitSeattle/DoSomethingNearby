<template>
  <div class="favorites">
    <client-only>
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
          v-if="hasFavorites"
        >
          <b-col class="d-flex justify-content-center justify-content-sm-start align-items-center mb-2 mb-sm-0">
            <cta-link
              internal
              :to="{ path: '/',hash:'#business-directory'}"
            >
              <b-icon-chevron-left />Back to business listing
            </cta-link>
          </b-col>
          <b-col class="d-flex justify-content-center justify-content-sm-end align-items-center">
            <share-dropdown />
          </b-col>
        </b-row>
        <b-row align-h="end">
          <b-col
            lg="12"
            class="my-1"
          >
            <places-table
              :businesses="favoritesBusiness"
              v-if="hasFavorites"
            />
            <div
              v-else
              class="d-flex justify-content-center"
            >
              <b-button
                :to="{ path: '/',hash:'#business-directory'}"
                variant="primary"
                size="lg"
                class="mb-2 mr-2 mr-lg-0 favorites__return-btn"
              >
                Find businesses and add them to your list of favorites <b-icon-bookmark-plus class="mr-1" />
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <Footer />
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PlacesTable from '@/components/atoms/PlacesTable'
import FluidBanner from '@/components/atoms/FluidBanner'
import IntroductionBlockFavorites from '@/components/atoms/IntroductionBlockFavorites'
import Footer from '@/components/atoms/Footer'
import CtaLink from '@/components/atoms/CtaLink'
import Divider from '@/components/atoms/Divider'
import ShareDropdown from '@/components/atoms/ShareDropdown'
import { BIconChevronLeft, BIconBookmarkPlus } from 'bootstrap-vue'
const baseUrl = process.env.BASE_URL

export default {
  components: {
    PlacesTable,
    FluidBanner,
    IntroductionBlockFavorites,
    Footer,
    BIconChevronLeft,
    BIconBookmarkPlus,
    CtaLink,
    Divider,
    ShareDropdown
  },
  head () {
    return {
      meta: [
        {
          property: 'og:url',
          content: baseUrl + '/favorites',
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
    favoritesBusiness () {
      const businesses = this.businesses.filter(business => {
        if (this.favorites[business.id]) {
          return true
        } else {
          return false
        }
      })
      return businesses
    },
    hasFavorites () {
      return this.favoritesBusiness.length
    }
  },
  async fetch ({ store, $config }) {
    if (process.server) {
      await store.dispatch('places/getBusinesses', $config)
    }
  },
  created () {
    if (process.client) {
      this.loadFavoritesCookies()
    }
  },
  methods: {
    ...mapActions({
      loadFavoritesCookies: 'favorites/loadFavoritesCookies'
    })
  }
}
</script>
<style lang="sass" scoped>
.favorites
  &__return-btn
    display: block
    margin: 0 0 2em !important
.fixed
  position: fixed
  top: 0
  z-index: 3
.bottom-header
  margin-top: $fixed-header-height
</style>
