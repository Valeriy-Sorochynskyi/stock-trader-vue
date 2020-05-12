<template>
  <div>
    <el-row :gutter="20">
      <el-col
        v-for="stock in stocks"
        :key="stock.id"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <StockForSelling :stock="stock" />
      </el-col>
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
