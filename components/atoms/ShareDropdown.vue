<template>
  <b-dropdown
    id="dropdown-share"
    variant="primary"
    right
    no-caret
    class="share-dropdown"
  >
    <template #button-content>
      Share your list <b-icon-share class="share-dropdown__icon" />
    </template>
    <b-dropdown-item
      :href="`mailto:?subject=${emailSubject}&body=${getEmailShare}`"
    >
      Email
    </b-dropdown-item>
    <b-dropdown-item
      id="facebook"
      @click="() => onDropdownClick('facebook')"
    >
      Facebook
    </b-dropdown-item>
    <b-dropdown-item
      id="twitter"
      @click="() => onDropdownClick('twitter')"
    >
      Twitter
    </b-dropdown-item>
    <client-only>
      <b-dropdown-item
        id="copy-clipboard"
        @click="onCopyToClipboardClick"
        v-if="canCopyToClipboard"
      >
        Copy to clipboard
      </b-dropdown-item>
    </client-only>
  </b-dropdown>
</template>

<script>
import { BIconShare } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BIconShare
  },
  data () {
    return {
      emailSubject: 'Do something fun nearby',
      popup: {
        width: 626,
        height: 436,
        top: 0,
        left: 0,
        window: undefined,
        interval: null
      },
      networks: {
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=@u&title=@t&description=@d',
        twitter: 'https://twitter.com/intent/tweet?text=@d&url=@u&hashtags=@h'
      },
      title: 'Do Something Nearby',
      description: 'I found some fun things to do nearby. Check them out!',
      hashtags: 'DoSomethingNearby'
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters({
      favorites: 'favorites/favorites'
    }),
    getEmailShare () {
      return `${this.description}%0D%0A${encodeURIComponent(this.getShareURL)}`
    },
    getShareURL () {
      const basePath = this.$config.BASE_URL + '/shared'
      const idsString = Object.keys(this.favorites).join('|')
      return `${basePath}?id=${idsString}`
    },
    canCopyToClipboard () {
      if (navigator && navigator.clipboard) {
        return true
      }
      return false
    }
  },
  methods: {
    onDropdownClick (network) {
      this.share(network)
    },
    getShareLink (network) {
      const link = this.networks[network]
      return link
        .replace(/@u/g, encodeURIComponent(this.getShareURL))
        .replace(/@t/g, encodeURIComponent(this.title))
        .replace(/@d/g, encodeURIComponent(this.description))
        .replace(/@h/g, encodeURIComponent(this.hashtags))
    },
    share (network) {
      this.popup.window = window.open(
        this.getShareLink(network),
        'sharer',
        ',height=' + this.popup.height +
        ',width=' + this.popup.width +
        ',left=' + this.popup.left +
        ',top=' + this.popup.top +
        ',screenX=' + this.popup.left +
        ',screenY=' + this.popup.top
      )
      this.popup.window.focus()
    },
    onCopyToClipboardClick () {
      if (navigator && navigator.clipboard) {
        this.showToast()
        navigator.clipboard.writeText(this.getShareURL)
      }
    },
    showToast () {
      this.$bvToast.toast('Link copied to clipboard', {
        toaster: 'b-toaster-bottom-right',
        solid: false,
        appendToast: true,
        autoHideDelay: 3000
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.share-dropdown
  &__icon
    width: 1rem
    height: 1rem
</style>
