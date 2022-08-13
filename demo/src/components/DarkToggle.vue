<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const color = useColorMode()

function toggleDark() {
  color.value = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class="i-[carbon-sun] dark:i-[carbon-moon] text-2xl text-blue-900 dark:text-blue-100" />
  </button>
</template>
