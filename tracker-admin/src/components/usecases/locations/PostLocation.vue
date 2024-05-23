<template>
    <div class="modal fade" id="addLocationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content text-white" style="background: #000; border-radius: var(--roundedXLG);">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close text-white bg-danger m-2 rounded-circle" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="form-post-location">
            <div class="modal-body">
                <label class="fw-bold">Location Name</label>
                <input ref="locationName" class="form-control bg-transparent text-white mt-2 mb-3" type="text" id="location_name" name="location_name" required>
                <label class="fw-bold">Description</label>
                <textarea ref="locationDesc" class="form-control bg-transparent text-white mt-2 mb-3" id="location_desc" name="location_desc"></textarea>
                <label class="fw-bold">Address</label>
                <textarea ref="locationAddress" class="form-control bg-transparent text-white mt-2 mb-3" id="location_address" name="location_address"></textarea>
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <label class="fw-bold">Latitude</label>
                        <input ref="locationLat" class="form-control bg-transparent text-white mt-2 mb-3" type="text" id="location_lat" name="location_lat" required>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <label class="fw-bold">Longitude</label>
                        <input ref="locationLong" class="form-control bg-transparent text-white mt-2 mb-3" type="text" id="location_long" name="location_long" required>
                    </div>
                </div>
                <label class="fw-bold">Category</label>
                <select ref="locationCategory" class="form-select bg-transparent text-white mt-2 mb-3" aria-label="Default select example" required>
                    <option selected>-</option>
                    <option value="Friend">Friend</option>
                    <option value="Personal">Personal</option>
                    <option value="Food & Drink">Food & Drink</option>
                </select>
            </div>
            <div class="modal-footer">
                <a type="button" class="btn btn-success rounded-pill px-3" data-bs-dismiss="modal">Save & Set Direction</a>
                <a type="button" @click="handleSubmit" class="btn btn-success rounded-pill px-3">Save Location</a>
            </div>
            </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios'
    import { ref, onMounted } from 'vue'

    const locationName = ref('')
    const locationDesc = ref('')
    const locationAddress = ref('')
    const locationLat = ref('')
    const locationLong = ref('')
    const locationCategory = ref('')

    const handleSubmit = async () => {
        try {
            const data = new FormData();
            data.append('location_name', locationName.value.value)
            data.append('location_desc', locationDesc.value.value)
            data.append('location_lat', locationLat.value.value)
            data.append('location_long', locationLong.value.value)
            data.append('location_category', locationCategory.value.value)
            data.append('location_apps', null) 
            data.append('location_address', locationAddress.value.value)
    
            const response = await axios.post("http://127.0.0.1:1323/api/v1/location", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
    
            if (response.status !== 200) {
                window.location.reload(false)
                return response.data.message
            } else {
                window.location.reload(false)
            }
        } catch (error) {
            alert(error)
        }
    }
</script>