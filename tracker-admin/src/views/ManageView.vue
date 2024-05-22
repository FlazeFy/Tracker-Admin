<script setup>
  import Navbar from '@/components/bars/Navbar.vue'
  import GetAllLocation from '@/components/usecases/manage/GetAllLocation.vue'
</script>
<template>
  <main class="manage">
    <GetAllLocation></GetAllLocation>
    <Navbar active="manage" subactive="null"/>
  </main>
</template>
