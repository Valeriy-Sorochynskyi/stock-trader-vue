<template>
  <el-col :md="12" :lg="8" :xl="6">
    <el-card class="card">
      <div slot="header">
        <h3 class="card__header">{{ stock.name }}</h3>
        (<small>Price: {{ stock.price }} | Amount: {{ stock.amount }}</small>)
      </div>
      <div class="card__body">
        <el-input
          type="number"
          v-model="input"
          class="card__input"
        ></el-input>
        <el-button
          :disabled="notAnoughAmount || input <= 0 || !Number.isInteger(Number(input))"
          type="warning"
          @click="sellOrder"
        >
          {{notAnoughAmount ? 'Not anough amount': 'Sell'}}
        </el-button>
      </div>
    </el-card>
  </el-col>
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
  computed: {
    notAnoughAmount () {
      return this.input > this.stock.amount
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
