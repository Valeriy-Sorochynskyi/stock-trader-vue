<template>
  <el-header class="header">
    <el-menu
      class="menu"
      mode="horizontal"
      background-color="#67C23A"
      text-color="#fff"
      :default-active="this.$route.path"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/" class="menu__item">
        <router-link to="/" class="menu__link">
          <i class="el-icon-s-home menu__icon"></i>
        </router-link>
      </el-menu-item>
      <el-menu-item
        v-if="isAuthenticated"
        index="/stocks"
        class="menu__item"
      >
        <router-link to="/stocks" class="menu__link">
          Stocks
        </router-link>
      </el-menu-item>
      <el-menu-item
        v-if="isAuthenticated"
        index="/portfolio"
        class="menu__item"
      >
        <router-link to="/portfolio" class="menu__link">
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
        <router-link to="/login" class="menu__link">
          Login
        </router-link>
      </el-menu-item>
      <el-menu-item
        v-if="!isAuthenticated"
        index="/signup"
        class="menu__item menu__item--right">
          <router-link to="/signup" class="menu__link">
            Sign Up
          </router-link>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'randomStocks',
      'logout',
      'loadData',
      'saveData'
    ]),

    onSave () {
      this.saveData()
    },

    onLoad () {
      this.loadData()
    },

    endDay () {
      this.randomStocks()
    },

    onLogout () {
      this.logout()
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'funds'])
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
