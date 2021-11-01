<template>
  <div
    class="modal-grid-card"
    text-variant="secondary"
    @click="toggleModal"
    :tabindex="0"
  >
    <video-modal
      ref="ytVideoModal"
      :modal-title="businessName"
      :video-src="businessVideo"
    />
    <b-img
      class="modal-grid-card__image"
      :class="{'modal-grid-card__image--is-touch': userTouches}"
      fluid-grow
      :srcset="businessImgSrcSet"
      :src="businessImg"
      :alt="businessNameAlt"
    />
    <div
      class="modal-grid-card__overlay"
      :class="{'modal-grid-card__overlay--is-touch': userTouches}"
    >
      <h3
        class="modal-grid-card__title px-4"
      >
        {{ businessName }}
      </h3>
    </div>
    <b-button
      ref="toggleModalButton"
      class="modal-grid-card__button"
      variant="info"
      text-variant="secondary"
      squared
      @mousedown.capture="toggleModal"
    >
      <b-icon-play />
      Watch Something
    </b-button>
  </div>
</template>

<script>
import { BIconPlay } from 'bootstrap-vue'
import VideoModal from '@/components/modules/VideoModal'
export default {
  components: {
    VideoModal,
    BIconPlay
  },
  props: {
    businessNameAlt: {
      type: String,
      default: 'Business Name Alternate Text'
    },
    businessName: {
      type: String,
      default: 'Business Name'
    },
    businessImg: {
      type: String,
      default: ''
    },
    businessVideo: {
      type: String,
      default: 'Business Name'
    },
    watchText: {
      type: String,
      default: 'Business Name'
    }
  },
  data () {
    return {
      userTouches: false
    }
  },
  computed: {
    businessImgSrcSet () {
      const [path, extension] = this.businessImg.split('.')
      const sourceSet =
      `${path}.${extension} 1x,
        ${path}@2x.${extension} 2x,
        ${path}@3x.${extension} 3x`
      return sourceSet
    }
  },
  mounted () {
    if (process.client) {
      window.addEventListener('touchstart', this.onTouch, false)
      window.addEventListener('mousemove', this.onMouse, false)
    }
  },
  beforeDestroy () {
    this.removeEventListeners()
  },
  methods: {
    onMouse () {
      // we only need to know once that a human touched the screen, so we can stop listening now
      this.userTouches = false
      this.removeEventListeners()
    },
    onTouch () {
      // we only need to know once that a human touched the screen, so we can stop listening now
      this.userTouches = true
      this.removeEventListeners()
    },
    toggleModal () {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs.ytVideoModal.$children[0].toggle(this.$refs.toggleModalButton)
    },
    removeEventListeners () {
      window.removeEventListener('touchstart', this.onTouch, false)
      window.removeEventListener('mousemove', this.onMouse, false)
    }
  }
}
</script>

<style lang="sass" scoped>
.modal-grid-card
  background-color: black
  border-radius: 0
  position: relative
  cursor: pointer
  height: auto
  padding-bottom: 100%

  &:focus,
  &:focus-within,
  &:hover
    .modal-grid-card__overlay
      opacity: 1

    .modal-grid-card__image
      opacity: 0.5

  &--disabled
    cursor: default
    &:focus,
    &:focus-within,
    &:hover
      .modal-grid-card__overlay
        opacity: 0

      .modal-grid-card__image
        opacity: 1

  &__image
    transition: opacity 0.5s ease-in-out
    position: absolute
    top: 0
    bottom: 0
    width: 100%

    &--is-touch
      opacity: 0.5

  &__overlay
    position: absolute
    width: 100%
    height: auto
    bottom: 0
    top: 0
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    transition: opacity 0.5s ease-in-out
    opacity: 0

    &--is-touch
      opacity: 1

  &__title
    font-family: $font-family-akzidenz-grotesk-bq
    font-size: 1.5rem
    font-weight: 500
    font-stretch: normal
    font-style: normal
    line-height: 1
    letter-spacing: normal
    text-align: center
    color: $white
    font-size: 1.2rem
    margin-bottom: 1.2rem
    padding-left: 1.2rem
    padding-right: 1.2rem
    max-width: 100%

    +media-breakpoint-up(sm)
      font-size: 2.2rem
      margin-bottom: 2.2rem
      padding-left: 2.2rem
      padding-right: 2.2rem

    +media-breakpoint-up(lg)
      font-size: 1.75rem
      margin-bottom: 1.75rem
      padding-left: 1.75rem
      padding-right: 1.75rem

    +media-breakpoint-up(xl)
      font-size: 2rem
      margin-bottom: 2rem
      padding-left: 2rem
      padding-right: 2rem

    +media-breakpoint-up(xl)
      font-size: 2.3rem
      margin-bottom: 2.3rem
      padding-left: 2.3rem
      padding-right: 2.3rem

  &__button
    font-family: $font-family-akzidenz-grotesk-ce-black
    color: $brown
    border: none
    bottom: 15%
    left: 50%
    line-height: 0.9
    font-size: 0.7rem
    font-weight: 900
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    position: absolute
    transform: translateX(-50%)

    +media-breakpoint-up(sm)
      font-size: 1.1rem

    +media-breakpoint-up(lg)
      font-size: 0.9rem

</style>
