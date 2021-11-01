<template>
  <b-row>
    <b-col>
      <b-row class="mb-2">
        <b-col>
          <img src="assets/logo-instagram.png">
          <span class="crowdriff-gallery__label">Instagram</span>
        </b-col>
        <b-col class="d-flex justify-content-end align-items-center">
          <span class="crowdriff-gallery__label">#DoSomethingNearby</span>
        </b-col>
      </b-row>
      <b-row class="mb-5">
        <b-col
          cols="12"
          ref="scriptContainer"
        ></b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  mounted () {
    if (process.client) {
      const cr = document.createElement('script')
      cr.setAttribute('src', '//starling.crowdriff.com/js/crowdriff.js')
      cr.setAttribute('id', 'cr-init__3886e091fe38e887')
      cr.setAttribute('async', true)
      this.$refs.scriptContainer.appendChild(cr)
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep .cr__gallery .loadMore
  background-color: $deep-teal !important
  max-width: 139px
  display: block
  margin: 0 auto
  margin-top: 20px !important
  border-radius: 2px
::v-deep .loadMore__text
  font-family: $font-family-akzidenz-grotesk-ce-roman
  font-size: 16px
.crowdriff-gallery
  &__label
    font-family: $font-family-akzidenz-grotesk-ce-black
    color: $camo-green
    vertical-align: middle
</style>
