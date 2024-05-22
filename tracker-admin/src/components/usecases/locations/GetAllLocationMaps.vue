<template>
    <div>
        <div v-if="error">
            <p>Oops! Error encountered: {{ error.message }}</p>
        </div>
    
        <div v-else-if="locations.length > 0">
            <GoogleMap
                api-key="AIzaSyDXu2ivsJ8Hj6Qg1punir1LR2kY9Q_MSq8"
                style="width: 100%; height: 91vh"
                :center="center"
                :zoom="15"
            >
            <Marker
                v-for="(location, index) in locations"
                :key="index"
                :options="{ position: {lat: parseFloat(location.location_lat), lng: parseFloat(location.location_long)} }"
            >
            <InfoWindow style="min-width: 250px; max-width: 400px !important;">
                <div style="background: #000;" class="p-2 text-white">
                    <div class="d-flex justify-content-between">
                        <h5>{{ location.location_name }}</h5>
                        <a class="bg-white text-dark rounded-pill py-1 px-3 mt-1">{{ location.location_category }}</a>
                    </div>
                    <b>Description</b>
                    <p>{{ location.location_desc }}</p>
                    <b>Address</b>
                    <p>{{ location.location_address }}</p>
                    <b>Related Apps</b>
                    <p>{{ location.location_apps }}</p>                
                </div>
            </InfoWindow>
            </Marker>
            </GoogleMap>
        </div>
    
        <div v-else class="text-center" style="padding-top: 40vh; height: 100vh;">
            <h1>Please Wait...</h1>
            <h3>This may take some moment</h3>
        </div>
    </div>
</template>
  
<script setup>
    import { GoogleMap, InfoWindow, Marker } from 'vue3-google-map'
    import axios from 'axios'
    import { ref, onMounted } from 'vue'
    
    const center = { lat: -6.2289462774161715, lng: 106.82658996100545 }
    const locations = ref([])
    const error = ref(null)
    
    onMounted(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:1323/api/v2/location')
            locations.value = response.data.data
        } catch (err) {
            console.error('Error fetching data:', err)
            error.value = err
        }
    })
</script>
  