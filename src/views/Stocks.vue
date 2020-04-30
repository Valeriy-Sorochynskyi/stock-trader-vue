<template>
  <div>
    <el-row :gutter="20">
      <StockForBuying
        v-for="stock in stocks"
        :key="stock.id"
        :stock="stock"
      />
    </el-row>
  </div>
</template>

<script>
import StockForBuying from '@/components/StockForBuying'
import { mapGetters } from 'vuex'

export default {
  components: {
    StockForBuying
  },

  computed: {
    ...mapGetters(['stocks'])
  }
}
</script>
