<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          class="menu"
          mode="horizontal"
          background-color="#67C23A"
          text-color="#fff"
          :default-active="this.$route.path"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home menu__icon"></i>
          </el-menu-item>
          <el-menu-item v-if="isAuthenticated" index="/stocks">Stocks</el-menu-item>
          <el-menu-item v-if="isAuthenticated" index="/portfolio">Portfolio</el-menu-item>
          <el-menu-item v-if="isAuthenticated" class="float-right">Funds: {{ funds | currency }}</el-menu-item>
          <el-submenu v-if="isAuthenticated" index="2" class="float-right">
            <template slot="title">Save & Load</template>
            <el-menu-item @click="onSave">Save</el-menu-item>
            <el-menu-item @click="onLoad">Load</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="isAuthenticated" class="float-right" @click="endDay">End Day</el-menu-item>
          <el-menu-item v-if="!isAuthenticated" index="/login" class="float-right">Login</el-menu-item>
          <el-menu-item v-if="!isAuthenticated" index="/signup" class="float-right">Sign Up</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  methods: {
    ...mapActions(['getStocks', 'randomStocks', 'loadData']),

    onSave () {
      if (!this.$store.state.auth.idToken) {
        return
      }

      const data = {
        funds: this.$store.getters.funds,
        portfolioStocks: this.$store.getters.portfolioStocks,
        stocks: this.$store.getters.stocks
      }

      axios.put('/data.json' + '?auth=' + this.$store.state.auth.idToken, data)
    },

    onLoad () {
      this.$store.dispatch('loadData')
    },

    endDay () {
      this.randomStocks()
    }
  },

  computed: {
    funds () {
      return this.$store.getters.funds
    },

    ...mapGetters(['isAuthenticated'])
  },

  created () {
    this.getStocks()
  }
}
</script>

<style lang="scss">
.menu {
  .el-submenu.float-right,
  .el-menu-item.float-right {
    float: right;
  }
}

.el-card {
  .el-card__header {
    background-color: #67C23A88;
  }
}

.el-menu-item {
  .menu__icon {
    color: #fff;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
