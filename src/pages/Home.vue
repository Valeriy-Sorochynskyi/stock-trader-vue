<template>
  <div class="home">
    <h1 class="home__heading text-xl font-bold">Trade or View your Portfolio</h1>
    <h4 v-if="!auth.idToken" class="home__sub-heading">You should sign up to save or load your Data</h4>
    <h4 v-else class="home__sub-heading">You can save or load your Data</h4>
    <h4 class="home__sub-heading">Click on 'New Day' to begin a New Day</h4>
    <hr>
    <p v-if="auth.idToken" class="home__info">Your Funds: {{ portfolio.funds | currency }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['portfolio', 'auth'])
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__heading,
  &__sub-heading {
    @apply text-center;
    @apply my-2;
  }

  &__info {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
