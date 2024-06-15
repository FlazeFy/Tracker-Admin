<template>
    <div>
        <div v-if="error">
            <p>Oops! Error encountered: {{ error.message }}</p>
        </div>
    
        <div v-else-if="locations.length > 0" class="position-relative">
            <GoogleMap
                api-key="AIzaSyDXu2ivsJ8Hj6Qg1punir1LR2kY9Q_MSq8"
                style="width: 100%; height: 91vh"
                :center="center"
                :zoom="15"
                :mapTypeId="mapType"
                @click="handleMapClick"
            >
            <Marker
                v-for="(location, index) in locations"
                :key="index"
                :options="{ 
                    position: {
                        lat: parseFloat(location.location_lat), 
                        lng: parseFloat(location.location_long)
                    },
                    label: location.location_category != 'track' ? {
                        text: location.location_name,
                        color: '#ffffff', 
                        fontSize: 'var(--textMD)', 
                        fontWeight: 'bold', 
                    } : (index === locations.length - 1 && location.location_category === 'track') ? {
                        text: 'End',
                        color: '#ffffff', 
                        fontSize: 'var(--textMD)', 
                        fontWeight: 'bold', 
                    } : null
                }"
            >
            <InfoWindow style="min-width: 250px; max-width: 400px !important;">
                <div style="background: #000;" class="p-2 text-white">
                    <div class="d-flex justify-content-between">
                        <h5>{{ location.location_category != 'track' ? location.location_name : location.location_lat+','+location.location_long }}</h5>
                        <a class="bg-white text-dark rounded-pill py-1 px-3 mt-1">{{ location.location_category }}</a>
                    </div>
                    <b>Description</b>
                    <p>{{ location.location_desc }}</p>
                    <b>{{ location.location_address ? 'Address':'' }}</b>
                    <p>{{ location.location_address }}</p>
                    <b>Related Apps</b>
                    <p>{{ location.location_category != 'track' ? location.location_apps : location.location_name+' (Tracker)'}}</p>                
                </div>
            </InfoWindow>
            </Marker>
            </GoogleMap>
            <div class="position-absolute pt-2" style="top: var(--spaceMD); left: var(--spaceMD); width: 350px;">
                <span v-if="live != 'not_live'" class="bg-danger rounded-pill fw-bold text-center py-3 mb-5 px-4">Maps Is On Live</span>
                <div class="container p-3" :class="{ 'mt-4': live !== 'not_live' }">
                    <h4 class="text-center">All Location {{ showTraffic }}</h4>
                    <div v-for="(dt, index) in locations" :key="index" class="d-inline">
                        <button v-if="dt.location_category !== 'track'" class="btn btn-primary rounded-pill px-3 py-1 me-1 mb-2" style="font-size: var(--textSM);">{{ dt.location_name }}</button>
                    </div>
                </div>
                <GetTotalLocationByCategory></GetTotalLocationByCategory>
                <GetTotalLocationByApps></GetTotalLocationByApps>
            </div>
            <div class="position-absolute" style="bottom: var(--spaceXXSM); right: calc(var(--spaceXLG)*2.5);">
                <button type="button" class="btn container text-white" data-bs-toggle="modal" data-bs-target="#addLocationModal">Add Location</button>
                <PostLocation></PostLocation>
            </div>
            <div class="position-absolute" style="bottom: var(--spaceXXSM); right: calc(var(--spaceXLG)*8);">
                <select class="form-select container" id="view_type" aria-label="Default select example" @change="mapType = $event.target.value">
                    <option value="satellite">View : Satellite</option>
                    <option value="roadmap">View : Roadmap</option>
                    <option value="hybrid">View : Hybrid</option>
                    <option value="terrain">View : Terrain</option>
                </select>              
            </div>
            <div class="position-absolute" style="bottom: var(--spaceXXSM); right: calc(var(--spaceXLG)*15.5);">
                <select class="form-select container" id="view_type" aria-label="Default select example" @change="live = $event.target.value">
                    <option value="not_live">Not Live</option>
                    <option value="pinmarker">Live : PinMarker</option>
                    <option value="myride">Live : MyRide</option>
                </select>              
            </div>
        </div>
    
        <div v-else class="text-center" style="padding-top: 40vh; height: 100vh;">
            <h1>Please Wait...</h1>
            <h3>This may take some moment</h3>
        </div>
    </div>
</template>
<script setup>
    import GetTotalLocationByCategory from '@/components/usecases/locations/GetTotalLocationByCategory.vue'
    import GetTotalLocationByApps from '@/components/usecases/locations/GetTotalLocationByApps.vue'
    import PostLocation from '@/components/usecases/locations/PostLocation.vue'

    import { GoogleMap, InfoWindow, Marker } from 'vue3-google-map'
    import axios from 'axios'
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    
    const center = { lat: -6.2289462774161715, lng: 106.82658996100545 }
    const locations = ref([])
    const error = ref(null)
    const mapType = ref('satellite')
    const live = ref('not_live')

    const fetchLocation = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:1323/api/v2/location')
            locations.value = response.data.data
        } catch (err) {
            console.error('Error fetching data:', err)
            error.value = err
        }
    }

    const fetchPinMarkerTracker = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:2000/api/v1/track/journey/fcd3f23e-e5aa-11ee-892a-3216422910e9')
            const data = response.data.data
            data.forEach(el => {
                locations.value.push({
                    location_lat: el.track_lat,
                    location_long: el.track_long,
                    location_name: 'pinmarker',
                    location_category: 'track',
                    location_desc: `Battery Indicator : ${el.battery_indicator}%`
                })
            });
        } catch (err) {
            console.error('Error fetching data:', err)
            error.value = err
        }
    }

    onMounted(async () => {
        fetchLocation()
        fetchPinMarkerTracker()
        intervalId = setInterval(fetchPinMarkerTracker, 3000)
    })
    onBeforeUnmount(() => {
        clearInterval(intervalId)
    })

    const handleMapClick = (event) => {
        const latLng = event.latLng
        const lat = latLng.lat()
        const lng = latLng.lng()

        let modal = new bootstrap.Modal(document.getElementById('addLocationModal'), {
            keyboard: false
        });
        document.getElementById('location_lat').value = lat
        document.getElementById('location_long').value = lng

        modal.show()
    };
</script>
  