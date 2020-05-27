<template>
  <ul>
    <li v-for="feature in features" :key="feature" class="mt-4 flex items-start">
      <div class="flex-shrink-0">
        <svg class="h-6 w-6 text-primaryGreen" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <p class="ml-3 text-base leading-6 font-medium text-gray-500">
        {{feature}}
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['features']
}
</script>
