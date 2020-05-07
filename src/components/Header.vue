<template>
  <header class="header">
    <el-menu
      class="menu"
      mode="horizontal"
      background-color="#67C23A"
      text-color="#fff"
      :default-active="path"
      active-text-color="#ffd04b"
      :router="true"
    >
      <el-menu-item index="/" :route="router" class="menu__item">
        <router-link to="/" class="menu__link " exact>
          <i class="el-icon-s-home menu__icon"></i>
        </router-link>
      </el-menu-item>
      <el-menu-item
        v-if="isAuthenticated"
        index="/stocks"
        class="menu__item"
      >
        <router-link to="/stocks" class="menu__link" exact>
          Stocks
        </router-link>
      </el-menu-item>
      <el-menu-item
        v-if="isAuthenticated"
        index="/portfolio"
        class="menu__item"
      >
        <router-link to="/portfolio" class="menu__link" exact>
          Portfolio
        </router-link>
      </el-menu-item>
      <el-menu-item v-if="isAuthenticated" class="menu__item menu__item--right">
        Funds: {{ funds | currency }}
      </el-menu-item>
      <el-menu-item
        v-if="isAuthenticated"
        class="menu__item menu__item--right"
        @click="onLogout"
      >
        Log Out
      </el-menu-item>
      <el-submenu
        v-if="isAuthenticated"
        index="2"
        class="menu__submenu menu__submenu--right"
      >
        <template slot="title">Save & Load</template>
        <el-menu-item @click="onSave">Save</el-menu-item>
        <el-menu-item @click="onLoad">Load</el-menu-item>
      </el-submenu>
      <el-menu-item
        v-if="isAuthenticated"
        class="menu__item menu__item--right"
        @click="endDay"
      >
        End Day
      </el-menu-item>
      <el-menu-item
        v-if="!isAuthenticated"
        index="/login"
        class="menu__item menu__item--right"
      >
        <router-link to="/login" class="menu__link" exact>
          Login
        </router-link>
      </el-menu-item>
      <el-menu-item
        v-if="!isAuthenticated"
        index="/signup"
        class="menu__item menu__item--right">
          <router-link to="/signup" class="menu__link" exact>
            Sign Up
          </router-link>
      </el-menu-item>
    </el-menu>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      activeLink: null
    }
  },

  methods: {
    ...mapActions([
      'randomStocks',
      'logout',
      'loadData',
      'saveData'
    ]),

    onSave () {
      this.saveData()
        .catch(error => {
          if (error.response.status === 401) {
            this.$notify.error({
              title: `Error ${error.response.statusText}`,
              message: error.response.data.error,
              duration: 4000
            })
            this.logout()
          }
        })
    },

    onLoad () {
      this.loadData()
        .catch(error => {
          if (error.response.status === 401) {
            this.$notify.error({
              title: `Error ${error.response.statusText}`,
              message: error.response.data.error,
              duration: 4000
            })
            this.logout()
          }
        })
    },

    endDay () {
      this.randomStocks()
    },

    onLogout () {
      this.logout()
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'funds']),
    router () {
      return this.$router.history.current.path
    },

    path () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal {
  .menu {
    &__item--right,
    &__submenu--right {
      float: right;
    }

    &__link {
      text-decoration: none;
      display: block;
    }

    &__icon {
      color: #fff;
    }
  }
}
</style>
