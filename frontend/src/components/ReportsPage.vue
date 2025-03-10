<!-- filepath: c:\Users\Lee\Desktop\stock_management\stock_management\frontend\src\components\ReportsPage.vue -->
<template>
    <div class="reports-page">
      <div class="report-header">
        <h1>Reports</h1>
        <div class="report-type-selector">
          <button 
            v-for="type in reportTypes" 
            :key="type" 
            :class="['report-type-btn', { active: selectedReportType === type }]"
            @click="selectReportType(type)"
          >
            {{ type }}
          </button>
        </div>
      </div>
  
      <div v-if="selectedReportType === 'inventory'" class="report-section">
        <div class="report-summary">
          <div class="summary-card">
            <div class="summary-icon">
              <font-awesome-icon :icon="['fas', 'boxes-stacked']" />
            </div>
            <div class="summary-content">
              <h3>Total Items</h3>
              <div class="summary-value">{{ summaryData.totalItems }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon info">
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
            </div>
            <div class="summary-content">
              <h3>Total Usage</h3>
              <div class="summary-value">{{ summaryData.totalUsage }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon warning">
              <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
            </div>
            <div class="summary-content">
              <h3>Low Stock Items</h3>
              <div class="summary-value">{{ summaryData.lowStockItems }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon danger">
              <font-awesome-icon :icon="['fas', 'times-circle']" />
            </div>
            <div class="summary-content">
              <h3>Out of Stock</h3>
              <div class="summary-value">{{ summaryData.outOfStockItems }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon success">
              <font-awesome-icon :icon="['fas', 'chart-line']" />
            </div>
            <div class="summary-content">
              <h3>Stock Value</h3>
              <div class="summary-value">${{ summaryData.stockValue ? summaryData.stockValue.toLocaleString() : '0' }}</div>
            </div>
          </div>
        </div>
  
        <div class="report-charts">
          <div class="chart-container">
            <h3>Stock Distribution by Department</h3>
            <div class="pie-chart">
              <canvas ref="departmentDistChart"></canvas>
            </div>
          </div>
  
          <div class="chart-container">
            <h3>Stock Levels</h3>
            <div class="bar-chart">
              <canvas ref="stockLevelsChart"></canvas>
            </div>
          </div>
        </div>
  
        <div class="report-table">
          <h3>Inventory Details</h3>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Department</th>
                <th>Available Stock</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in inventoryData" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.department }}</td>
                <td>{{ item.stock }}</td>
                <td>
                  <span :class="getStatusClass(item.status)">{{ item.status }}</span>
                </td>
                <td>{{ formatDate(item.lastUpdated) }}</td>
              </tr>
            </tbody>
          </table>
  
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
          </div>
        </div>
      </div>
  
      <!-- Usage Report -->
      <div v-else-if="selectedReportType === 'usage'" class="report-section">
        <div class="report-summary">
          <div class="summary-card">
            <div class="summary-icon">
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
            </div>
            <div class="summary-content">
              <h3>Total Usage</h3>
              <div class="summary-value">{{ summaryData.totalUsage }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon info">
              <font-awesome-icon :icon="['fas', 'clock']" />
            </div>
            <div class="summary-content">
              <h3>Avg. Daily Usage</h3>
              <div class="summary-value">{{ summaryData.avgDailyUsage }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon success">
              <font-awesome-icon :icon="['fas', 'chart-pie']" />
            </div>
            <div class="summary-content">
              <h3>Most Used Dept</h3>
              <div class="summary-value">{{ summaryData.mostUsedDept }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon warning">
              <font-awesome-icon :icon="['fas', 'bolt']" />
            </div>
            <div class="summary-content">
              <h3>Fastest Moving</h3>
              <div class="summary-value">{{ summaryData.fastestMoving }}</div>
            </div>
          </div>
        </div>
  
        <div class="report-charts">
          <div class="chart-container">
            <h3>Usage Trends</h3>
            <div class="line-chart">
              <canvas ref="usageTrendsChart"></canvas>
            </div>
          </div>
  
          <div class="chart-container">
            <h3>Department Usage Comparison</h3>
            <div class="bar-chart">
              <canvas ref="deptUsageChart"></canvas>
            </div>
          </div>
        </div>
  
        <div class="report-table">
          <h3>Top Used Items</h3>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Department</th>
                <th>Usage Count</th>
                <th>Usage Rate</th>
                <th>Restock Frequency</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in usageData" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.department }}</td>
                <td>{{ item.usageCount }}</td>
                <td>{{ item.usageRate }} / day</td>
                <td>{{ item.restockFrequency }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Requests Report -->
      <div v-else-if="selectedReportType === 'requests'" class="report-section">
        <div class="report-summary">
          <div class="summary-card">
            <div class="summary-icon">
              <font-awesome-icon :icon="['fas', 'clipboard-list']" />
            </div>
            <div class="summary-content">
              <h3>Total Requests</h3>
              <div class="summary-value">{{ summaryData.totalRequests }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon success">
              <font-awesome-icon :icon="['fas', 'check-circle']" />
            </div>
            <div class="summary-content">
              <h3>Approved</h3>
              <div class="summary-value">{{ summaryData.approvedRequests }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon warning">
              <font-awesome-icon :icon="['fas', 'clock']" />
            </div>
            <div class="summary-content">
              <h3>Pending</h3>
              <div class="summary-value">{{ summaryData.pendingRequests }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon danger">
              <font-awesome-icon :icon="['fas', 'times-circle']" />
            </div>
            <div class="summary-content">
              <h3>Rejected</h3>
              <div class="summary-value">{{ summaryData.rejectedRequests }}</div>
            </div>
          </div>
        </div>
  
        <div class="report-charts">
          <div class="chart-container">
            <h3>Request Status Distribution</h3>
            <div class="pie-chart">
              <canvas ref="requestStatusChart"></canvas>
            </div>
          </div>
  
          <div class="chart-container">
            <h3>Requests by Department</h3>
            <div class="bar-chart">
              <canvas ref="requestsByDeptChart"></canvas>
            </div>
          </div>
        </div>
  
        <div class="report-table">
          <h3>Recent Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Requested By</th>
                <th>Department</th>
                <th>Items</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(request, index) in requestsData" :key="index">
                <td>#{{ request.id }}</td>
                <td>{{ request.requestedBy }}</td>
                <td>{{ request.department }}</td>
                <td>{{ request.items }}</td>
                <td>{{ formatDate(request.date) }}</td>
                <td>
                  <span :class="getStatusClass(request.status)">{{ request.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Department Report -->
      <div v-else-if="selectedReportType === 'department'" class="report-section">
        <div class="department-selector">
          <button 
            v-for="dept in departments" 
            :key="dept.id" 
            :class="['dept-btn', { active: selectedDept === dept.id }]"
            @click="selectDepartment(dept.id)"
          >
            {{ dept.name }}
          </button>
        </div>
  
        <div class="report-summary">
          <div class="summary-card">
            <div class="summary-icon">
              <font-awesome-icon :icon="['fas', 'boxes-stacked']" />
            </div>
            <div class="summary-content">
              <h3>Total Items</h3>
              <div class="summary-value">{{ deptData.totalItems }}</div>
            </div>
          </div>
  
          <div class="summary-card">
            <div class="summary-icon info">
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
            </div>
            <div class="summary-content">
              <h3>Total Usage</h3>
              <div class="summary-value">{{ deptData.totalUsage }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'ReportsPage',
    setup() {
      const selectedReportType = ref('inventory');
      const summaryData = ref({
        totalItems: 0,
        totalUsage: 0,
        lowStockItems: 0,
        outOfStockItems: 0,
        stockValue: 0,
        avgDailyUsage: 0,
        mostUsedDept: '',
        fastestMoving: '',
        totalRequests: 0,
        approvedRequests: 0,
        pendingRequests: 0,
        rejectedRequests: 0
      });
      const inventoryData = ref([]);
      const usageData = ref([]);
      const requestsData = ref([]);
      const departments = ref([]);
      const selectedDept = ref(null);
      const currentPage = ref(1);
      const totalPages = ref(1);
  
      const reportTypes = ['inventory', 'usage', 'requests', 'department'];
  
      const fetchSummaryData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/summary');
          summaryData.value = response.data;
        } catch (error) {
          console.error('Error fetching summary data:', error);
        }
      };
  
      const fetchInventoryData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/inventory');
          inventoryData.value = response.data.items;
          totalPages.value = response.data.totalPages;
        } catch (error) {
          console.error('Error fetching inventory data:', error);
        }
      };
  
      const fetchUsageData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/usage');
          usageData.value = response.data.items;
        } catch (error) {
          console.error('Error fetching usage data:', error);
        }
      };
  
      const fetchRequestsData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/requests');
          requestsData.value = response.data.items;
        } catch (error) {
          console.error('Error fetching requests data:', error);
        }
      };
  
      const fetchDepartments = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/departments');
          departments.value = response.data;
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
      };
  
      const selectReportType = (type) => {
        selectedReportType.value = type;
        if (type === 'inventory') {
          fetchInventoryData();
        } else if (type === 'usage') {
          fetchUsageData();
        } else if (type === 'requests') {
          fetchRequestsData();
        } else if (type === 'department') {
          fetchDepartments();
        }
      };
  
      const selectDepartment = (deptId) => {
        selectedDept.value = deptId;
        // Fetch department-specific data here
      };
  
      const prevPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
          fetchInventoryData();
        }
      };
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
          fetchInventoryData();
        }
      };
  
      const getStatusClass = (status) => {
        if (status === 'Low Stock') return 'status-low';
        if (status === 'Out of Stock') return 'status-out';
        return 'status-normal';
      };
  
      const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      };
  
      onMounted(() => {
        fetchSummaryData();
        fetchInventoryData();
      });
  
      return {
        selectedReportType,
        summaryData,
        inventoryData,
        usageData,
        requestsData,
        departments,
        selectedDept,
        currentPage,
        totalPages,
        reportTypes,
        selectReportType,
        selectDepartment,
        prevPage,
        nextPage,
        getStatusClass,
        formatDate
      };
    }
  };
  </script>
  
  <style scoped>
  .reports-page {
    padding: 2rem;
    background-color: #f8fafc;
    min-height: 100vh;
    margin-left: 260px;
  }
  
  .report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .report-header h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
  
  .report-type-selector {
    display: flex;
    gap: 1rem;
  }
  
  .report-type-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    background-color: #e2e8f0;
    color: #1e293b;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .report-type-btn.active {
    background-color: #3b82f6;
    color: white;
  }
  
  .report-type-btn:hover {
    background-color: #cbd5e1;
  }
  
  .report-section {
    margin-bottom: 2rem;
  }
  
  .report-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .summary-card {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .summary-icon {
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
  
  .summary-icon.info {
    background-color: #0ea5e9;
  }
  
  .summary-icon.warning {
    background-color: #f59e0b;
  }
  
  .summary-icon.danger {
    background-color: #ef4444;
  }
  
  .summary-icon.success {
    background-color: #10b981;
  }
  
  .summary-content {
    flex: 1;
  }
  
  .summary-content h3 {
    font-size: 0.875rem;
    font-weight: 500;
    color: #64748b;
    margin: 0 0 0.5rem 0;
  }
  
  .summary-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
  }
  
  .report-charts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
.chart-container {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>