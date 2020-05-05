<template>
  <el-card class="card">
    <div slot="header">
      <h3 class="card__header">{{ stock.name }}</h3>
      (<small>Price: {{ stock.price }}</small>)
    </div>
    <div class="card__body">
        <el-input-number
          v-model="input"
          @change="handleChange"
          :min="0"
          :max="funds / stock.price"
        ></el-input-number>
      <el-button
        :disabled="notAnoughFunds || input <= 0 || !Number.isInteger(Number(input))"
        type="success"
        @click="buyOrder"
      >
        {{notAnoughFunds ? 'Not enough funds' : 'Buy'}}
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['stock'],
  data () {
    return {
      input: 0
    }
  },

  methods: {
    ...mapActions(['buyStock']),

    buyOrder () {
      const order = {
        id: this.stock.id,
        price: this.stock.price,
        amount: this.input
      }

      this.buyStock(order)
      this.input = 0
    },

    handleChange (value) {
      this.input = +value
    }
  },

  computed: {
    funds () {
      return this.$store.getters.funds
    },

    notAnoughFunds () {
      return this.input * this.stock.price > this.funds
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 20px;

  &__body {
    display: flex;
    justify-content: space-between;
  }

  &__input {
    margin-right: 20px;
  }

  &__header {
    display: inline-block;
  }
}
</style>
