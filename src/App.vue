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
        >
          <el-menu-item index="/">
            <router-link to="/" class="menu__link">
              <i class="el-icon-s-home menu__icon"></i>
            </router-link>
          </el-menu-item>
          <el-menu-item v-if="isAuthenticated" index="/stocks">
            <router-link to="/stocks" class="menu__link">Stocks</router-link>
          </el-menu-item>
          <el-menu-item v-if="isAuthenticated" index="/portfolio">
            <router-link to="/portfolio" class="menu__link">Portfolio</router-link>
          </el-menu-item>
          <el-menu-item
            v-if="isAuthenticated"
            class="float-right">
              Funds: {{ funds | currency }}
            </el-menu-item>
          <el-menu-item
            v-if="isAuthenticated"
            class="float-right"
            @click="onLogout"
          >
            Log Out
          </el-menu-item>
          <el-submenu v-if="isAuthenticated" index="2" class="float-right">
            <template slot="title">Save & Load</template>
            <el-menu-item @click="onSave">Save</el-menu-item>
            <el-menu-item @click="onLoad">Load</el-menu-item>
          </el-submenu>
          <el-menu-item
            v-if="isAuthenticated"
            class="float-right"
            @click="endDay"
          >
            End Day
          </el-menu-item>
          <el-menu-item
            v-if="!isAuthenticated" index="/login" class="float-right">
            <router-link to="/login" class="menu__link">Login</router-link>
          </el-menu-item>
          <el-menu-item
            v-if="!isAuthenticated"
            index="/signup"
            class="float-right">
            <router-link to="/signup" class="menu__link">
              Sign Up
            </router-link>
          </el-menu-item>
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
    ...mapActions(['getStocks', 'randomStocks', 'logout', 'tryAutoLogin']),

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
    },

    onLogout () {
      this.logout()
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated']),
    funds () {
      return this.$store.getters.funds
    }

  },

  created () {
    this.getStocks()
    this.tryAutoLogin()
  }
}
</script>

<style lang="scss">
.menu {
  .el-submenu.float-right,
  .el-menu-item.float-right {
    float: right;
  }

  &__link {
    text-decoration: none;
    display: inline-block;
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
