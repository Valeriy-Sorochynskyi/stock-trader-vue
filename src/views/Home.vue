<template>
  <div class="home">
    <h1>Trade or View your Portfolio</h1>
    <h4>You may save or load your Data</h4>
    <h4>Click on 'New Day' to begin a New Day</h4>
    <hr>
    <p>Your Funds: {{ funds | currency }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['funds'])
  }
}
</script>
