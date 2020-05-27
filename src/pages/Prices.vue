<template>
  <section class="relative lg:grid lg:grid-cols-10">
      <div class="max-w-lg mx-auto lg:max-w-none lg:mx-0 lg:col-start-4 lg:col-end-8 lg:row-start-1 lg:row-end-4">
        <PremiumPriceCard
          @enroll="enroll($event)"
          status="Premium"
          :currentStatus="currentStatus"
          :price="249"
          :features="premiumStatusFeatures"
        />
      </div>
      <div class="mt-6 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-1 lg:col-end-4 lg:row-start-2 lg:row-end-3">
        <div class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg">
          <PriceCard
            @enroll="enroll($event)"
            status="Free"
            :currentStatus="currentStatus"
            :price="0"
            :features="freeStatusFeatures"
          />
        </div>
      </div>
      <div class="mt-6 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-8 lg:col-end-11 lg:row-start-2 lg:row-end-3">
        <div class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg">
          <PriceCard
            @enroll="enroll($event)"
            status="Standard"
            :currentStatus="currentStatus"
            :price="149"
            :features="standardStatusFeatures"
          />
        </div>
      </div>
  </section>
</template>

<script>
import PriceCard from '@/components/prices/PriceCard'
import PremiumPriceCard from '@/components/prices/PremiumPriceCard'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      freeStatusFeatures: [
        'Lifetime access',
        'Use on unlimited projects',
        'Free updates',
        'Community access'
      ],
      standardStatusFeatures: [
        'All application UI components',
        'Lifetime access',
        'Use on unlimited projects',
        'Free updates',
        'Community access'
      ],
      premiumStatusFeatures: [
        'All application UI components',
        'All marketing components',
        'Lifetime access',
        'Use on unlimited projects',
        'Free updates',
        'Community access'
      ]
    }
  },
  components: {
    PriceCard,
    PremiumPriceCard
  },

  computed: {
    ...mapState({
      userId: state => state.auth.userId,
      currentStatus: state => state.auth.user.status
    })
  },

  methods: {
    ...mapActions(['subscribe', 'getStocks']),
    enroll (status) {
      this.subscribe(status)
        .then(() => {
          this.$notify.success({
            title: 'Success',
            message: 'Subscribed'
          })
          this.$router.push('/stocks')
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>
