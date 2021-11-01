<template>
  <b-toast
    class="toast"
    id="cookiesToast"
    solid
    no-close-button
    no-auto-hide
    toaster="b-toaster-bottom-full"
  >
    <template>
      <b-row no-gutters>
        <b-col class="d-flex justify-content-end">
          <a
            class="toast__close"
            @click="() => onConsentClick(false)"
          >
            <b-icon-x font-scale="2" />
          </a>
        </b-col>
      </b-row>
      <div class="px-4 pt-2 pb-4">
        <b-row
          no-gutters
          class="mb-1"
        >
          <b-col>
            <span class="toast__title">Cookies Notice</span>
          </b-col>
        </b-row>
        <b-row
          no-gutters
          class="mb-1"
        >
          <b-col>
            <p class="toast__message">
              This site uses cookies to store information on your computer. Some are essential to make our site work; others help us improve the user experience. By using the site, you consent to the placement of these cookies. Read
              <a
                target="_blank"
                :href="privacyPolicyURL"
                class="toast__link"
              >
                our Privacy Policy
              </a> or
              <a
                target="_blank"
                :href="cookiePolicyURL"
                class="toast__link"
              >
                our Cookie Policy
              </a>
              to learn more.
            </p>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <b-button
              class="mt-2"
              variant="primary"
              @click="() => onConsentClick(true)"
            >
              Got it
            </b-button>
          </b-col>
        </b-row>
      </div>
    </template>
  </b-toast>
</template>

<script>
import { BIconX } from 'bootstrap-vue'
export default {
  components: {
    BIconX
  },
  data () {
    return {
      cookieKey: 'cookies-consent',
      cookieValue: 'true',
      cookiePolicyURL: 'https://www.visitseattle.org/privacy-policy/#cookies',
      privacyPolicyURL: 'https://www.visitseattle.org/privacy-policy/'
    }
  },
  mounted () {
    if (!this.cookieExists()) {
      this.$bvToast.show('cookiesToast')
    }
  },
  methods: {
    cookieExists () {
      return this.$cookies.isKey(this.cookieKey)
    },
    onConsentClick (saveCookie) {
      this.$bvToast.hide('cookiesToast')
      if (saveCookie) {
        this.$cookies.set(this.cookieKey, this.cookieValue, '1y', '/')
      }
    }
  }
}
</script>
<style lang="sass" scoped>
 .toast
  &__title
    font-size: 1.12rem
    color: $camo-green
    font-family: $font-family-akzidenz-grotesk-ce-black
  &__message
    color: $camo-green
    font-size: 1.12rem
  &__close
    color: $black
    &:hover
      cursor: pointer
      color: $black
  &__link
    color: $black
</style>
