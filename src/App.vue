<template>
  <div id="app">
    <Header />
    <el-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </el-main>
  </div>
</template>

<script>
import Header from '@/components/shared/Header'
import { mapActions } from 'vuex'

export default {
  components: {
    Header
  },
  methods: {
    ...mapActions(['getStocks'])
  },
  created () {
    this.getStocks()
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
