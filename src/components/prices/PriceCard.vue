<template>
  <div class="flex-1 flex flex-col">
    <div class="bg-white px-6 pt-12 pb-10">
      <div>
        <h2 class="mt-2 text-center text-3xl leading-9 font-semibold font-display text-gray-900">
          {{status}}
        </h2>
        <div class="mt-4 flex items-center justify-center font-display">
          <span class="px-3 flex items-start text-6xl leading-none tracking-tight font-medium text-gray-900">
            <span class="mt-2 mr-2 text-4xl">$</span>
            <span>{{price}}</span>
          </span>
          <span class="text-2xl leading-8 font-semibold text-gray-400 tracking-wide">
            USD
          </span>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
      <FeaturesList :features="features" />
      <div class="mt-8">
        <div class="rounded-lg shadow-md">
          <button
            @click="buySubscription"
            class="block w-full text-center rounded-lg bg-white px-6 py-3 text-base leading-6 font-semibold font-display text-primaryGreen hover:text-secondaryGreen focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
          >
            Buy Early Access
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeaturesList from './FeaturesList'
export default {
  props: ['status', 'price', 'features', 'currentStatus'],
  components: {
    FeaturesList
  },
  methods: {
    buySubscription () {
      if (this.status === 'Free' && this.status === this.currentStatus) {
        this.$notify.info({
          title: 'Info',
          message: `Your current status is ${this.currentStatus}`
        })
        return
      }

      if (this.status === 'Standard' && this.status === this.currentStatus) {
        this.$notify.info({
          title: 'Info',
          message: `Your current status is ${this.currentStatus}`
        })
        return
      }

      this.$emit('enroll', this.status)
    }
  }
}
</script>
