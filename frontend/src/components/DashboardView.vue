<!-- filepath: c:\Users\Lee\Desktop\stock_management\stock_management\frontend\src\components\DashboardView.vue -->
<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <div class="dashboard-header">
        <h1>Dashboard Overview</h1>
        <div class="date-picker">
          <span><font-awesome-icon :icon="['far', 'calendar-alt']" /> Last 30 days</span>
        </div>
      </div>

      <div class="stats-cards-container">
        <div class="stats-card total-stock">
          <div class="card-icon">
            <font-awesome-icon :icon="['fas', 'boxes-stacked']" />
          </div>
          <div class="card-content">
            <h3>Total Stock</h3>
            <div class="stat-value">{{ totalStock }}</div>
            <div class="stat-change positive">
              <font-awesome-icon :icon="['fas', 'arrow-up']" /> 12% from last month
            </div>
          </div>
        </div>

        <div class="stats-card low-stock">
          <div class="card-icon warning">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
          </div>
          <div class="card-content">
            <h3>Low Stock Items</h3>
            <div class="stat-value">{{ lowStockCount }}</div>
            <div class="stat-change negative">
              <font-awesome-icon :icon="['fas', 'arrow-up']" /> 5% from last month
            </div>
          </div>
        </div>

        <div class="stats-card pending-requests">
          <div class="card-icon info">
            <font-awesome-icon :icon="['fas', 'clock']" />
          </div>
          <div class="card-content">
            <h3>Pending Requests</h3>
            <div class="stat-value">{{ pendingRequests }}</div>
            <div class="stat-change neutral">
              <font-awesome-icon :icon="['fas', 'minus']" /> No change
            </div>
          </div>
        </div>

        <div class="stats-card approved-requests">
          <div class="card-icon success">
            <font-awesome-icon :icon="['fas', 'check-circle']" />
          </div>
          <div class="card-content">
            <h3>Approved Requests</h3>
            <div class="stat-value">{{ approvedRequests }}</div>
            <div class="stat-change positive">
              <font-awesome-icon :icon="['fas', 'arrow-up']" /> 8% from last month
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-widgets">
        <div class="widget stock-chart">
          <div class="widget-header">
            <h2>Stock Trends</h2>
            <div class="widget-actions">
              <button class="btn-icon">
                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
              </button>
            </div>
          </div>
          <div v-if="chartLoading" class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <StockChart v-else />
        </div>

        <div class="widget top-items">
          <div class="widget-header">
            <h2>Top Requested Items</h2>
            <div class="widget-actions">
              <button class="btn-icon">
                <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
              </button>
            </div>
          </div>
          <div v-if="topRequestsLoading" class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <div v-else-if="topRequestItems.length > 0" class="top-items-list">
            <div v-for="(item, index) in topRequestItems" :key="index" class="top-item">
              <div class="item-rank">{{ index + 1 }}</div>
              <div class="item-details">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-progress">
                  <div class="progress-bar" :style="{ width: `${(item.requestCount / maxRequestCount) * 100}%` }"></div>
                </div>
              </div>
              <div class="item-count">{{ item.requestCount }}</div>
            </div>
          </div>
          <div v-else class="no-data">
            <font-awesome-icon :icon="['far', 'clipboard']" />
            <p>No request data available</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StockChart from "../components/StockChart.vue";
import axios from 'axios';

export default {
  name: "DashboardView",
  components: {
    StockChart,
  },
  data() {
    return {
      totalStock: 0,
      lowStockCount: 0,
      pendingRequests: 0,
      approvedRequests: 0,
      topRequestItems: [],
      loading: true,
      chartLoading: true,
      topRequestsLoading: true,
      error: null
    };
  },
  computed: {
    maxRequestCount() {
      if (this.topRequestItems.length === 0) return 0;
      return Math.max(...this.topRequestItems.map(item => item.requestCount));
    }
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      this.loading = true;
      await Promise.all([
        this.fetchTotalStock(),
        this.fetchLowStockCount(),
        this.fetchPendingRequests(),
        this.fetchApprovedRequests()
      ]);
      this.loading = false;
      
      // Load secondary data
      this.fetchTopRequestItems();
    },
    
    async fetchTotalStock() {
      try {
        const response = await axios.get('http://localhost:3000/api/totalstock');
        if (response.status === 200) {
          this.totalStock = response.data.total;
          console.log("All tools in stock counted successfully");
        }
      } catch (err) {
        console.log("Error occurred while totaling the stock", err);
        this.error = "Failed to load total stock data";
      }
    },
    
    async fetchLowStockCount() {
      try {
        const response = await axios.get('http://localhost:3000/api/lowstock');
        if (response.status === 200) {
          this.lowStockCount = response.data.lowStockItems.length;
          console.log("Low stock items counted successfully");
        }
      } catch (err) {
        console.log("Error occurred while fetching low stock items", err);
        this.error = "Failed to load low stock data";
      }
    },
    
    async fetchPendingRequests() {
      try {
        const response = await axios.get('http://localhost:3000/api/pendingrequests');
        if (response.status === 200) {
          this.pendingRequests = response.data.count;
          console.log("Pending requests counted successfully");
        }
      } catch (err) {
        console.log("Error occurred while fetching pending requests", err);
        this.error = "Failed to load pending requests data";
        this.pendingRequests = 0; // Fallback value
      }
    },
    
    async fetchApprovedRequests() {
      try {
        const response = await axios.get('http://localhost:3000/api/approvedrequests');
        if (response.status === 200) {
          this.approvedRequests = response.data.count;
          console.log("Approved requests counted successfully");
        }
      } catch (err) {
        console.log("Error occurred while fetching approved requests", err);
        this.error = "Failed to load approved requests data";
        this.approvedRequests = 0; // Fallback value
      }
    },
    
    async fetchTopRequestItems() {
      this.topRequestsLoading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/toprequests');
        if (response.status === 200) {
          this.topRequestItems = response.data.items;
          console.log("Top request items fetched successfully");
        }
      } catch (err) {
        console.log("Error occurred while fetching top request items", err);
        this.error = "Failed to load top requests data";
      } finally {
        this.topRequestsLoading = false;
      }
      
      // Simulate chart loading completion
      setTimeout(() => {
        this.chartLoading = false;
      }, 1000);
    }
  },
};
</script>

<style scoped>
.dashboard-container {
  padding: 0;
  background-color: #f8fafc;
  min-height: 100vh;
  margin-left: 250px;
}

.dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.date-picker {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.date-picker:hover {
  border-color: #cbd5e1;
}

.stats-cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stats-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 1rem;
}

.card-icon.warning {
  background-color: #f59e0b;
}

.card-icon.info {
  background-color: #0ea5e9;
}

.card-icon.success {
  background-color: #10b981;
}

.card-content {
  flex: 1;
}

.card-content h3 {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  margin: 0 0 0.5rem 0;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.stat-change {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.stat-change.neutral {
  color: #94a3b8;
}

.dashboard-widgets {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.widget {
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.widget-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-icon:hover {
  background-color: #f1f5f9;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.top-items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.top-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
}

.item-rank {
  width: 24px;
  height: 24px;
  background-color: #f1f5f9;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  margin-right: 0.75rem;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
  margin-bottom: 0.5rem;
}

.item-progress {
  height: 4px;
  background-color: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #3b82f6;
}

.item-count {
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #94a3b8;
  font-size: 0.075rem;
  margin-left: -50px;
}
</style>