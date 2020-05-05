<template>
  <el-card class="card">
    <div slot="header">
      <h3 class="card__header">{{ stock.name }}</h3>
      (<small>Price: {{ stock.price }} | Amount: {{ stock.amount }}</small>)
    </div>
    <div class="card__body">
      <el-input-number
        class="card__input"
        v-model="input"
        @change="handleChange"
        :min="0"
        :max="stock.amount"
      ></el-input-number>
      <el-button
        :disabled="input <= 0"
        type="warning"
        @click="sellOrder"
      >
        Sell
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
    ...mapActions(['sellStock']),
    sellOrder () {
      const order = {
        id: this.stock.id,
        price: this.stock.price,
        amount: this.input
      }
      this.sellStock(order)
      this.input = 0
    },
    handleChange (value) {
      this.input = +value
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
