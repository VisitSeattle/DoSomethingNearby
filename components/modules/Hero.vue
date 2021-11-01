<template>
  <b-row class="hero">
    <div class="hero__inside">
      <video
        autoplay
        class="hero__background"
        loop
        muted
        playsinline
        ref="video"
      >
        <source
          type="video/mp4"
          ref="videoSource"
        >
      </video>
      <video-modal
        ref="ytVideoModal"
        hide-header="true"
        size="lg"
        video-src="//www.youtube.com/embed/G4TiChhhA0s?enablejsapi=1"
      />
      <b-row class="hero__center-stack py-4">
        <b-img
          class="hero__image image-center px-3"
          :src="logoImageSrc"
          fluid-grow
          alt="Do Something Nearby"
        />
        <b-button
          ref="toggleModalButton"
          class="hero__button mt-4"
          variant="info"
          text-variant="secondary"
          squared
          @click="toggleModal"
        >
          <b-icon-play />
          Watch Something
        </b-button>
      </b-row>
    </div>
  </b-row>
</template>

<script>
import { BIconPlay } from 'bootstrap-vue'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  components: {
    BIconPlay
  },
  data () {
    return {
      videoVersion: '',
      screenSize: 0,
      showVideo: true // Disables or enable videos from playing
    }
  },
  props: {
    backgroundVideoSrc: {
      type: String,
      required: true
    },
    backgroundVideoSmSrc: {
      type: String,
      required: true
    },
    backgroundVideoXsSrc: {
      type: String,
      required: true
    },
    logoImageSrc: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      sizes: 'grid-breakpoints/sizes'
    })
  },
  methods: {
    toggleModal () {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs.ytVideoModal.$children[0].toggle(this.$refs.toggleModalButton)
    },
    getScreenSize () {
      if (window.innerWidth > this.sizes.lg) {
        return this.sizes.lg
      } else if (window.innerWidth > this.sizes.sm) {
        return this.sizes.sm
      }
      return this.sizes.xs
    },
    getBackgroundVideo (screenSize) {
      const videosHash = {
        [this.sizes.xs]: this.backgroundVideoXsSrc,
        [this.sizes.sm]: this.backgroundVideoSmSrc,
        [this.sizes.lg]: this.backgroundVideoSrc
      }
      return videosHash[screenSize]
    },
    setVideoSource (screenSize) {
      const videoSourceEl = this.$refs.videoSource
      const videoEl = this.$refs.video
      if (videoSourceEl && videoEl) {
        videoSourceEl.setAttribute('src', this.getBackgroundVideo(screenSize))
        videoEl.load()
      }
    }
  },
  beforeMount () {
    const screenSize = this.getScreenSize()
    this.screenSize = screenSize
  },
  mounted () {
    if (this.showVideo) {
      const screenSize = this.getScreenSize()
      this.setVideoSource(screenSize)
    }
    window.addEventListener('resize', _.debounce(() => {
      const screenSize = this.getScreenSize()
      if (this.screenSize !== screenSize) {
        if (this.showVideo) {
          this.setVideoSource(screenSize)
        }
        this.screenSize = screenSize
      }
    }, 100))
  }
}
</script>

<style lang="sass" scoped>
.hero
  background-color: $light-navy-blue
  height: 0
  margin: 0
  overflow: hidden
  padding-top: 648px / 974px * 100%
  position: relative
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top left;
  position: relative;
  background-attachment: fixed
  background-image: url('/assets/hero_sm.jpg')

  +media-breakpoint-up(lg)
    padding-top: 766px / 1920px * 100%
    background-image: url('/assets/hero.jpg')

  &__inside
    height: 100%
    left: 0
    position: absolute
    top: 0
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  &__background
    height: 100%
    left: 0
    position: absolute
    top: 0
    z-index: 0

  &__image
    min-height: 1px

  &__center-stack
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    z-index: 1
    width: 70vw

    +media-breakpoint-up(lg)
      width: 35vw

  &__button
    font-family: $font-family-akzidenz-grotesk-ce-black
    border: none
    font-size: 0.9rem
    font-weight: 900
    font-stretch: normal
    font-style: normal
    line-height: 0.9
    color: $brown

</style>
