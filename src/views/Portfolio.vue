<template>
  <div>
    <el-row :gutter="20">
      <StockForSelling
        v-for="stock in stocks"
        :key="stock.id"
        :stock="stock"
      />
    </el-row>
  </div>
</template>

<script>
import StockForSelling from '@/components/StockForSelling'
import { mapGetters } from 'vuex'

export default {
  components: {
    StockForSelling
  },

  computed: {
    ...mapGetters({
      stocks: 'portfolioStocks'
    })
  }
}
</script>
