<template>
  <b-modal
    class="video-modal"
    :title="modalTitle"
    size="lg"
    hide-footer
    centered
    header-bg-variant="light"
    body-bg-variant="light"
  >
    <template #modal-title>
      <h5
        class="video-modal__title"
      >
        {{ modalTitle }}
      </h5>
    </template>
    <template>
      <iframe
        id="player"
        ref="modalInstance"
        class="video-modal__iframe"
        type="text/html"
        width="640"
        :hide-header="!modalTitle"
        height="390"
        :src="videoSrc"
        frameborder="0"
      />
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String,
      default: null
    },
    videoSrc: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.video-modal
  &__title
    color: $camo-green
    font-size: 2.25rem
    line-height: 49px
    font-family: $font-family-akzidenz-grotesk-bq
    line-height: 0.5
    padding-top: 0.4rem

  &__iframe
    width: 100%
</style>
