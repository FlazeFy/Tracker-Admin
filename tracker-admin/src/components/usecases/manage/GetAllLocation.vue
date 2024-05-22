<template>
    <div class="p-3">
        <table class="table table-bordered text-center text-white">
        <thead>
            <tr>
                <th scope="col">Location Name</th>
                <th scope="col">Description</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
                <th scope="col">Category</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="error">
                <td rowspan="7">
                    <p>Oops! Error encountered: {{ error.message }}</p>
                </td>
            </tr>
            <tr v-else-if="locations.length > 0" v-for="(dt, index) in locations" :key="index" class="position-relative">
                <th scope="row" class="text-start">{{ dt.location_name }}</th>
                <td class="text-start">{{ dt.location_desc }}</td>
                <td>{{ dt.location_lat }}</td>
                <td>{{ dt.location_long }}</td>
                <td>{{ dt.location_category }}</td>
                <td class="text-start">{{ dt.location_address }}</td>
                <td><button class="btn btn-warning rounded-pill py-1 px-2">Manage</button></td>
            </tr>
        
            <tr v-else class="text-center">
                <td colspan="7" class="py-4">
                    <h1>Please Wait...</h1>
                    <h3>This may take some moment</h3>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<script setup>
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