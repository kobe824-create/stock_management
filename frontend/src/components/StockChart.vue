<!-- filepath: c:\Users\Lee\Desktop\stock_management\stock_management\frontend\src\components\StockChart.vue -->
<template>
  <div class="chart-container">
    <div class="chart">
      <LineChart :chart-data="lineChartData" :chart-options="chartOptions" />
    </div>
    <div class="chart">
      <PieChart :chart-data="comparisonChartData" :chart-options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { LineChart, PieChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

// Register all necessary Chart.js components
Chart.register(...registerables);

export default defineComponent({
  name: 'StockChart',
  components: {
    LineChart,
    PieChart
  },
  data() {
    return {
      lineChartData: {
        labels: [],
        datasets: [
          {
            label: 'Stock Levels',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            data: [],
            fill: true
          }
        ]
      },
      comparisonChartData: {
        labels: ['SOD', 'BDC', 'CSA', 'PBW'],
        datasets: [
          {
            label: 'Stock Comparison',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            data: []
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
  },
  mounted() {
    this.fetchChartData();
    this.fetchComparisonChartData();
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get('http://localhost:3000/api/stock-data');
        const data = response.data;

        this.lineChartData.labels = data.labels;
        this.lineChartData.datasets[0].data = data.data;
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    },
    async fetchComparisonChartData() {
      try {
        const response = await axios.get('http://localhost:3000/api/stock-comparison');
        const data = response.data.data;

        this.comparisonChartData.labels = data.labels;
        this.comparisonChartData.datasets[0].data = data.datasets[0].data;
      } catch (error) {
        console.error('Error fetching comparison chart data:', error);
      }
    }
  }
});
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chart {
  flex: 1 1 45%;
  min-width: 300px;
  height: 400px;
}

.chart canvas {
  font-size: 1rem; /* Medium font size */
}
</style>