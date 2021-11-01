<template>
  <div>
    <div v-b-visible="handleVisibleTop">
      <b-container
        fluid
        class="hero-container"
      >
        <hero
          background-video-src="/assets/VS_Anthem_Hero_1920.mp4"
          background-video-sm-src="/assets/VS_Anthem_Hero_991.mp4"
          background-video-xs-src="/assets/VS_Anthem_Hero_570.mp4"
          logo-image-src="/assets/do_something_super.svg"
        />
      </b-container>
      <b-container
        fluid
      >
        <sub-hero />
      </b-container>
    </div>
    <div
      ref="scrollTop"
      id="business-directory"
    />
    <b-container
      fluid
      :class="{'fixed' : !isTopContainerVisible }"
      id="business-directory"
    >
      <fluid-banner label="Business Directory" />
    </b-container>
    <b-container
      :class="{'fixed-margin-top' : !isTopContainerVisible }"
      class="d-flex flex-column"
    >
      <b-row class="mt-4 mt-sm-6 mb-sm-5 mb-4">
        <introduction-block />
      </b-row>
      <b-row class="mb-4 mb-sm-5">
        <b-col>
          <divider />
        </b-col>
      </b-row>
      <b-row>
        <b-col
          lg="6"
          class="my-1"
        >
          <b-alert
            v-model="showDismissibleAlert"
            variant="danger"
            dismissible
          >
            {{ geolocationError }}
          </b-alert>
        </b-col>
      </b-row>
      <b-row class="h-100">
        <transition
          :name="showFilterTransition"
          @before-enter="() => beforeFiltersEnter()"
          @after-leave="() => afterFiltersLeave()"
        >
          <b-col
            lg="5"
            xl="3"
            class="d-none d-lg-block my-1"
            v-if="showFilters"
          >
            <b-row no-gutters>
              <business-filters />
            </b-row>
          </b-col>
        </transition>
        <b-col
          :lg="tableColumnsLg"
          :xl="tableColumnsXl"
          class="my-1"
        >
          <b-row>
            <b-col
              lg="7"
              xl="9"
              class="d-none d-lg-block my-1"
            >
              <filter-buttons />
            </b-col>
            <b-col
              lg="5"
              xl="3"
              class="my-1 d-flex align-items-center justify-content-between justify-content-lg-end"
            >
              <div class="d-none d-lg-block">
                <filter-toggler @collapseFilter="onCollapseFilter" />
              </div>
              <cta-link
                class="d-block d-lg-none my-1"
                v-b-modal.filter-modal
              >
                Show filters
                <b-icon-filter :flip-v="true" />
              </cta-link>
              <sort-options class="ml-2 m-md-2 ml-md-3" />
              <b-modal
                class="filter-modal"
                id="filter-modal"
                title="Filters"
                button-size="lg"
                hide-header
              >
                <template #default="{close}">
                  <div class="container container-fluid">
                    <b-button
                      class="filter-modal__close"
                      variant="link"
                      @click="close"
                    >
                      <b-icon-x-circle-fill />
                    </b-button>
                    <b-row>
                      <business-filters />
                    </b-row>
                  </div>
                </template>
                <template #modal-footer="{close}">
                  <b-row class="filter-modal__footer-container">
                    <b-col>
                      <b-button
                        @click="removeFilters"
                        variant="outline-primary"
                        size="lg"
                        block
                        squared
                      >
                        Clear
                      </b-button>
                    </b-col>
                    <b-col>
                      <b-button
                        @click="close"
                        variant="primary"
                        size="lg"
                        block
                        squared
                      >
                        Apply
                      </b-button>
                    </b-col>
                  </b-row>
                </template>
              </b-modal>
            </b-col>
          </b-row>
          <b-row class="animation-width">
            <b-col>
              <places-table
                :businesses="businesses"
                :filter="filter"
                @pageChange="onPageChange"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <divider class="mt-2 mt-md-4 mb-4 mb-md-5" />
      <crowdriff-gallery />
    </b-container>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PlacesTable from '@/components/atoms/PlacesTable'
import FilterButtons from '@/components/atoms/FilterButtons'
import SortOptions from '@/components/atoms/SortOptions'
import BusinessFilters from '@/components/modules/BusinessFilters'
import Hero from '@/components/modules/Hero'
import SubHero from '@/components/modules/SubHero'
import FluidBanner from '@/components/atoms/FluidBanner'
import IntroductionBlock from '@/components/atoms/IntroductionBlock'
import Footer from '@/components/atoms/Footer'
import FilterToggler from '@/components/atoms/FilterToggler'
import Divider from '@/components/atoms/Divider'
import CrowdriffGallery from '@/components/modules/CrowdriffGallery'
import {
  BIconFilter,
  BIconXCircleFill
} from 'bootstrap-vue'

export default {
  components: {
    PlacesTable,
    BusinessFilters,
    FilterButtons,
    SortOptions,
    Hero,
    SubHero,
    FluidBanner,
    IntroductionBlock,
    Footer,
    FilterToggler,
    Divider,
    BIconXCircleFill,
    BIconFilter,
    CrowdriffGallery
  },
  data () {
    return {
      showDismissibleAlert: false,
      showFilters: true,
      tableColumnsLg: 7,
      tableColumnsXl: 9,
      showFilterTransition: 'fade',
      isTopContainerVisible: true
    }
  },
  computed: {
    ...mapGetters({
      geolocationError: 'sort/geolocationError',
      businesses: 'places/businesses',
      filter: 'filters/filter'
    })
  },
  methods: {
    ...mapActions({
      setFilter: 'filters/setFilter',
      removeFilters: 'filters/removeFilters'
    }),
    onCollapseFilter () {
      this.showFilters = !this.showFilters
    },
    afterFiltersLeave () {
      this.tableColumnsLg = 12
      this.tableColumnsXl = 12
    },
    beforeFiltersEnter () {
      this.tableColumnsLg = 7
      this.tableColumnsXl = 9
    },
    handleVisibleTop (isVisible) {
      this.isTopContainerVisible = isVisible
    },
    onPageChange () {
      const el = this.$refs.scrollTop
      if (el) {
        el.scrollIntoView(true)
      }
    }
  },
  watch: {
    geolocationError (geolocationError) {
      if (geolocationError) {
        this.showDismissibleAlert = true
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
button
  font-family: revert
.fade-enter-active
  transition: opacity .2s
.fade-leave-active
  transition: opacity .1s
.fade-enter, .fade-leave-to
  opacity: 0
.animation-width
  transition: flex-basis .1s linear
.fixed
  position: fixed
  top: 0
  z-index: 99
.fixed-margin-top
  margin-top: $fixed-header-height

.filter-modal
  &__close
    position: absolute
    font-size: 1.3rem
    top: 0.3rem
    right: 0rem
    z-index: 15
  &__footer-container
    width: 100%

.hero-container
  padding: 0
</style>
