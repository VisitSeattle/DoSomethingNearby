<template>
  <div>
    <img
      class="tracking-pixel"
      src="https://jelly.mdhv.io/v1/star.gif?pid=9V4NDD45M3D0l2miHDGwmTTs5nYX&src=mh&evt=hi"
    >
    <Nuxt keep-alive />
    <!--
    Cookie Consent Toast
    -->
    <client-only>
      <cookie-consent />
    </client-only>
  </div>
</template>
<script>
import CookieConsent from '@/components/atoms/CookieConsent'
export default {
  components: {
    CookieConsent
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.tracking-pixel {
  position: absolute !important;
  clip: rect(1px 1px 1px 1px);
  /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0 !important;
  border: 0 !important;
  height: 1px !important;
  width: 1px !important;
  overflow: hidden;
}
</style>
