<template>
  <div class="relative z-10 rounded-lg shadow-xl">
    <div>
      <div class="pointer-events-none absolute inset-0 rounded-lg border-2 border-primaryGreen"></div>
      <div class="absolute inset-x-0 top-0 transform translate-y-px">
        <div class="flex justify-center transform -translate-y-1/2">
          <span class="inline-flex rounded-full bg-primaryGreen px-4 py-1 text-sm leading-5 font-semibold tracking-wider uppercase text-white">
            Get premium package
          </span>
        </div>
      </div>
      <div class="bg-white rounded-t-lg px-6 pt-12 pb-10">
        <div>
          <h2 class="mt-2 text-center text-3xl leading-9 font-semibold font-display text-gray-900 sm:-mx-6">
            {{status}}
          </h2>
          <div class="mt-4 flex items-center justify-center font-display">
            <span class="-ml-8 text-right text-2xl leading-8 font-semibold text-gray-400 tracking-wide line-through sm:text-3xl sm:leading-9">
              $298
            </span>
            <span class="px-3 flex items-start text-6xl leading-none tracking-tight font-medium text-gray-900 sm:text-7xl">
              <span class="mt-2 mr-1 text-4xl leading-none sm:text-5xl">$</span>
              <span class="">{{price}}</span>
            </span>
            <span class="text-2xl leading-8 font-semibold text-gray-400 tracking-wide sm:text-3xl sm:leading-9">
              USD
            </span>
          </div>
        </div>
      </div>
      <div class="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10">
        <FeatureList :features="features" />
        <div class="mt-10">
          <button
          @click="buySubscription"
          class="block w-full text-center rounded-lg bg-primaryGreen px-6 py-4 text-xl leading-6 font-semibold font-display text-white hover:bg-secondaryGreen focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
            Buy Early Access
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureList from './FeaturesList'
export default {
  props: ['status', 'price', 'features', 'currentStatus'],
  components: {
    FeatureList
  },
  methods: {
    buySubscription () {
      console.log(this.currentStatus)
      if (this.status === 'Premium' && this.status === this.currentStatus) {
        // alert(`Your current status is ${this.currentStatus}`)
        this.$notify.info({
          title: 'Info',
          message: `Your current status is ${this.currentStatus}`
        })
        return
      }

      this.$emit('enroll', this.status)
    }
  },
  computed: {}
}
</script>
