<template>
  <nuxt-link
    class="link"
    role="button"
    :to="to || href"
    v-if="internal"
  >
    <slot />
  </nuxt-link>
  <a
    v-else-if="content"
    class="link"
    :href="href"
    v-html="content"
  />
  <a
    v-else
    class="link"
    :href="href"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: '#'
    },
    to: {
      type: Object,
      default: () => {}
    },
    internal: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="sass" scoped>
.link
  color: $camo-green
  text-decoration: underline $deep-teal
  cursor: pointer
  &:hover
    text-decoration: underline $deep-teal
</style>
