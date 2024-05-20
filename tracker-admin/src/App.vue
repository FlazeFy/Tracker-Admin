<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="content-grid">
    <div style="min-height: 100vh;">
      <RouterView />
    </div>
  </div>
</template>

<style>
  .content-grid {
    width: 100vw;
    background: var(--whiteColor) !important;
  }
</style>