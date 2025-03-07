<template>
  <div class="chart-container">
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

// Register all necessary Chart.js components
Chart.register(...registerables);

export default defineComponent({
  name: 'StockChart',
  components: {
    LineChart
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Stock Levels',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            data: [10, 20, 15, 25, 30],
            fill: true
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    };
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  height: 400px;
}
</style>
