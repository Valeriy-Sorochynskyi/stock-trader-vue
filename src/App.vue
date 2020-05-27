<template>
  <div id="app">
    <Header />
    <el-main v-loading="loading">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </el-main>
  </div>
</template>

<script>
import Header from '@/components/shared/Header'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Header
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.idToken,
      status: state => state.auth.user.status
    })
  },
  methods: {
    ...mapActions(['fetchSession'])
  },
  created () {
    this.loading = true
    this.fetchSession()
      .then(() => {
        if (this.$route.meta.requiresAuth &&
          !this.status && this.$route.path !== '/prices') {
          this.$router.push('/prices')
        }
      })
      .catch(() => {
        this.$router.push('./login')
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
