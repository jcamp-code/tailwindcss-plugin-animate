<script setup lang="ts">
import DarkToggle from './components/DarkToggle.vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <DarkToggle></DarkToggle>
  <h1 class="font-bold text-blue-900 underline dark:text-blue-100">
    Hello world!
  </h1>
  <div
    class="i-[twemoji-waving-hand] animate-shake-x animate-heart-beat animate-infinite inline-block text-4xl"
  />
  <div class="flex flex-row">
    <div class="basis-1/3">
      <div class="i-[carbon-add] text-blue-900 dark:text-blue-100"></div>
    </div>
    <div class="basis-1/3">
      <div class="i-[carbon-checkmark] text-blue-900 dark:text-blue-100"></div>
    </div>
    <div class="basis-1/3">
      <div class="i-[carbon-error] text-blue-900 dark:text-blue-100"></div>
    </div>
  </div>
</template>
