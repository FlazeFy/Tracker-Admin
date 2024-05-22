<script setup>
  import Navbar from '@/components/bars/Navbar.vue'
  import GetAllLocationMaps from '@/components/usecases/locations/GetAllLocationMaps.vue'
</script>
<template>
  <main class="map">
    <GetAllLocationMaps></GetAllLocationMaps>
    <Navbar active="map" subactive="null"/>
  </main>
</template>
