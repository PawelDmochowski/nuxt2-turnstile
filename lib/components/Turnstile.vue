<template>
  <component :is="element" ref="el" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    element: {
      type: String,
      default: 'div',
    },
    siteKey: {
      type: String,
      default: undefined,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  fetch() {
    if (process.server) {
      this.$turnstile.loadTurnstile()
    }
  },
  mounted() {
    this.interval = setInterval(this.reset, 1000 * 250)
    this.$nextTick(() => {
      this.$turnstile.render(this.$refs.el, {
        sitekey: this.siteKey || this.$config.turnstile.siteKey,
        ...this.options,
        callback: (token) => this.$emit('input', token),
      })
      this.interval = setInterval(this.reset, 1000 * 250)
    })
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  methods: {
    reset() {
      return this.$turnstile.reset(this.$refs.el)
    },
  },
}
</script>
