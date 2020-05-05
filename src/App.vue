<template>
  <div id="app">
    <el-container direction="vertical">
      <Header />
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header'
import { mapActions } from 'vuex'

export default {
  components: {
    Header
  },

  methods: {
    ...mapActions([
      'getStocks'
    ])
  },

  created () {
    this.getStocks()
  }
}
</script>

<style lang="scss">
.card {
  .el-card__header {
    background-color: #67C23A88;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.menu__submenu {
  .el-submenu__title {
    i {
      color: #fff;
    }
  }
}
</style>
