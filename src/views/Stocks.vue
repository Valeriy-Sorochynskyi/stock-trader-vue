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
          <StockForBuying :stock="stock" />
        </el-col>
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
