<template>
  <div
    class="place-item mb-2 p-3"
  >
    <b-row>
      <b-col
        cols="4"
        xs="3"
        lg="2"
      >
        <place-item-category-icon
          :business-categories="business.category"
        />
      </b-col>
      <b-col
        cols="8"
        xs="9"
        lg="10"
      >
        <b-row>
          <b-col
            cols="10"
            xs="11"
          >
            <business-type-tag
              :title="getCategoryLabel"
              class="mb-1"
            />
            <h4 class="place-item__title">
              {{ business.businessName }}
            </h4>
          </b-col>
          <b-col
            cols="2"
            xs="1"
            class="d-flex justify-content-end"
          >
            <a
              class="place-item__icon"
              @click="onFavoritesClick"
            >
              <b-icon-heart-fill
                v-if="isFavorite"
                style="color: red;"
              />
              <b-icon-heart v-else />
            </a>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="7"
            xl="8"
          >
            <h6 v-html="getBusinessAddress" />
            <cta-link
              :href="getPhoneNumber"
              :content="business.phoneNumber"
            />
          </b-col>
          <b-col
            lg="5"
            xl="4"
            class="d-flex flex-column"
          >
            <b-row class="mb-2">
              <b-col class="d-flex flex-lg-column flex-row flex-wrap mt-2 mt-lg-0">
                <div>
                  <b-button
                    :href="business.websiteUrl"
                    target="_blank"
                    variant="primary"
                    size="sm"
                    class="mb-2 mr-2 mr-lg-0 place-item__button"
                    v-if="business.websiteUrl"
                  >
                    <b-icon-window class="mr-1" /> Visit website
                  </b-button>
                </div>
                <div>
                  <b-button
                    :href="getBusinessAddressURL"
                    variant="outline-primary"
                    size="sm"
                    target="_blank"
                    class="place-item__button"
                    v-if="displayBusinessAddress"
                  >
                    <b-icon-map class="mr-1" /> Get directions
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { BIconHeart, BIconHeartFill, BIconMap, BIconWindow } from 'bootstrap-vue'
import CtaLink from '@/components/atoms/CtaLink'
import PlaceItemCategoryIcon from '@/components/atoms/PlaceItemCategoryIcon'
import BusinessTypeTag from '@/components/atoms/BusinessTypeTag'

export default {
  components: {
    BIconHeart,
    BIconHeartFill,
    BIconMap,
    BIconWindow,
    CtaLink,
    PlaceItemCategoryIcon,
    BusinessTypeTag
  },
  data () {
    return {
      dayMap: {
        'Monday:': 'Mon',
        'Tuesday:': 'Tue',
        'Wednesday:': 'Wed',
        'Thursday:': 'Thu',
        'Friday:': 'Fri',
        'Saturday:': 'Sat',
        'Sunday:': 'Sun'
      }
    }
  },
  methods: {
    onFavoritesClick () {
      const newFavorites = { ...this.favorites }
      if (this.favorites[this.business.id]) {
        delete newFavorites[this.business.id]
      } else {
        newFavorites[this.business.id] = 1
      }
      this.setFavorites(newFavorites)
    },
    ...mapActions({
      setFavorites: 'favorites/setFavorites'
    }),
    isNumeric (value) {
      return /^-?\d+$/.test(value)
    }
  },
  computed: {
    ...mapGetters({
      favorites: 'favorites/favorites'
    }),
    isFavorite () {
      if (this.favorites[this.business.id]) {
        return true
      }
      return false
    },
    getBusinessAddress () {
      if (this.business.address) {
        if (this.business.city && this.business.city.length > 1) {
          return 'King County, WA'
        }
        return this.business.address.replace('\n', '<br>')
      }
      return ''
    },
    getBusinessAddressURL () {
      if (this.business.address) {
        const mapsURL = 'https://www.google.com/maps/dir/?api=1&destination='
        return `${mapsURL}${encodeURIComponent(this.business.address)}`
      }
      return ''
    },
    displayBusinessAddress () {
      return this.business.address && this.isNumeric(this.business.address[0])
    },
    getPhoneNumber () {
      if (this.business.phoneNumber) {
        return `tel:+1-${this.business.phoneNumber.replace(/[{()}]/g, '').replace(' ', '-')}`
      }
      return ''
    },
    getCategoryLabel () {
      return this.business.category ? this.business.category[0] : ''
    }
  },
  props: {
    business: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="sass" scoped>
.place-item
  margin-left: -.75rem // table td padding override look for $table-cell-padding in bootstrap _variables
  margin-right: -.75rem // table td padding override look for $table-cell-padding in bootstrap _variables
  border: solid 1px $gray
  box-sizing: border-box
  color: $camo-green
  &__title
    font-size: 1.125rem
    font-family: $font-family-akzidenz-grotesk-ce-black
    +media-breakpoint-up(sm)
      font-size: 1.5rem
  &__icon
    cursor: pointer
    color: unset
  &__button
    white-space: nowrap
</style>
