<template>
  <header class="header">
    <nav class="menu">
      <el-col :span="12" class="menu__list-container">
        <ul class="menu__list menu__list--right">
          <router-link
            exact
            to="/"
            tag="li"
            class="menu__item menu__item--link"
          >
            <i class="el-icon-s-home menu__icon"></i>
          </router-link>
          <router-link
            exact
            to="/stocks"
            tag="li"
            v-if="isAuthenticated"
            class="menu__item menu__item--link"
          >Stocks</router-link>
          <router-link
            exact
            to="/portfolio"
            tag="li"
            v-if="isAuthenticated"
            class="menu__item menu__item--link"
          >Portfolio</router-link>
        </ul>
      </el-col>
      <el-col :span="12" class="menu__list-container">
        <ul class="menu__list menu__list--left">
          <button
            class="menu__button"
            v-if="isAuthenticated"
            @click="endDay"
            >
            End Day
          </button>
          <li class="menu__item">
            <el-dropdown
              v-if="isAuthenticated"
              class="menu__dropdown dropdown"
            >
              <span class="el-dropdown-link dropdown__title">
                Save & List<i class="el-icon-arrow-down el-icon--right dropdown__icon"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  class="dropdown__item"
                  @click.native="onSave"
                >
                  Save
                </el-dropdown-item>
                <el-dropdown-item
                  class="dropdown__item"
                  @click.native="onLoad"
                >
                  Load
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <button
            class="menu__button"
            v-if="isAuthenticated"
            @click="onLogout"
          >
            Logout
          </button>
          <li class="menu__item" v-if="isAuthenticated">
            <span>Funds: {{funds | currency}}</span>
          </li>
          <router-link
            exact
            to="/signup"
            tag="li"
            v-if="!isAuthenticated"
            class="menu__item menu__item--link"
          >SignUp</router-link>
          <router-link
            exact
            to="/login"
            tag="li"
            v-if="!isAuthenticated"
            class="menu__item menu__item--link"
          >Login</router-link>
        </ul>
      </el-col>
    </nav>
  </header>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: rgb(103, 194, 58);
  color: #fff;
}

.menu {
  height: 60px;

  &__icon {
    font-size: 1.2rem;
  }

  &__list {
    display: flex;
    list-style: none;
    &--right {
      justify-content: flex-start;
    }
    &--left {
      justify-content: flex-end;
    }
  }

  &__button {
    font-size: 0.9rem;
    border: none;
    height: 100%;
    color: #fff;
    background-color: rgb(103, 194, 58);
    outline: none;
    line-height: 60px;
    padding: 0 20px;
    transition: background-color 0.5s ease;
    &:hover {
      background-color: rgb(82, 155, 46);
      cursor: pointer;
    }
  }

  &__item {
    padding: 0 20px;
    line-height: 60px;
    &--link {
      position: relative;
      transition: background-color 0.5s ease;
    }
    &--link:hover {
      background-color: rgb(82, 155, 46);
      cursor: pointer;
    }
  }
}

.router-link-active {
  color: #ffd04b;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    left: 0;
    top: calc(100% - 3px);
    position: absolute;
    background-color: #ffd04b;
  }
}

.el-dropdown-menu {
  &__item {
    background-color: #67C23A88 !important;
    color: #fff;
    &:hover {
      background-color: #67C23A !important;
      color: #fff !important;
    }
  }
}
</style>
