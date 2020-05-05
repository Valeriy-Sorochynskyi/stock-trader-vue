<template>
  <div class="home">
    <h1 class="home__heading">Trade or View your Portfolio</h1>
    <h4 v-if="!isAuthenticated" class="home__sub-heading">You should sign up to save or load your Data</h4>
    <h4 v-else class="home__sub-heading">You can save or load your Data</h4>
    <h4 class="home__sub-heading">Click on 'New Day' to begin a New Day</h4>
    <hr>
    <p v-if="isAuthenticated" class="home__info">Your Funds: {{ funds | currency }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['funds', 'isAuthenticated'])
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__heading,
  &__sub-heading {
    text-align: center;
    margin-bottom: 20px;
  }

  &__info {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
