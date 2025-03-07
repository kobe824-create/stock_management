<template>
  <div :class="['p-6 text-white rounded-lg shadow-md', color]">
    <h2 class="text-lg font-semibold">{{ title }}</h2>
    <p class="text-3xl font-bold">{{ count }}</p>
    <p class="total">{{ total }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'DashboardCard',
  props: {
    title: String,
    count: Number,
    color: String,
    apiEndpoint: String, // New prop to specify the API endpoint
  },
  setup(props) {
    const total = ref(0);

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${props.apiEndpoint}`);
        if (response.status === 200) {
          if (props.apiEndpoint === 'totalstock') {
            total.value = response.data.total;
          } else if (props.apiEndpoint === 'lowstock') {
            total.value = response.data.lowStockItems.length;
          }
          console.log(`${props.title} data fetched successfully`);
        }
      } catch (err) {
        console.log(`Error occurred while fetching ${props.title} data`, err);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return { total };
  },
};
</script>

<style scoped>
.total {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>