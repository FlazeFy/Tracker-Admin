<template>
    <div class="container p-3">
        <h4 class="text-center">Location Category</h4>
        <div v-if="loading" class="text-center mt-4 pt-4" style="height:220px">
            <h4>Please Wait...</h4>
            <h6>This may take some moment</h6>
        </div>
        <div v-else>
            <apexchart type="pie" :options="chartOptions" :series="series" />
        </div>
    </div>
</template>
<script>
    import VueApexCharts from "vue3-apexcharts"
    import axios from 'axios'
    import { ref, onMounted } from 'vue'

    export default {
        name: "PieChart",
        components: {
            apexchart: VueApexCharts,
        },
        setup() {
            const series = ref([])
            const context = ref([])
            const loading = ref(true)

            onMounted(async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:1323/api/v2/stats/location_category')
                    const formattedData = response.data.data

                    formattedData.forEach(el => {
                        context.value.push(el.Context)
                        series.value.push(el.Total)
                    });
                    loading.value = false
                } catch (err) {
                    console.error('Error fetching data:', err)
                    loading.value = false
                }
            });

            const chartOptions = ref({
                chart: {
                    type: 'pie'
                },
                labels: context.value,
                legend: {
                    position: 'bottom' 
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            });

            return {
                series,
                chartOptions,
                loading
            }
        }
    };
</script>