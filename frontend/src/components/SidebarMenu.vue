<!-- filepath: c:\Users\Lee\Desktop\stock_management\stock_management\frontend\src\components\SidebarMenu.vue -->
<template>
  <div class="sidebar">
    <h2 class="head2">School Stock</h2>
    <nav>
      <ul>
        <li class="list">
          <RouterLink to="/dashboard">
            <font-awesome-icon :icon="['fas', 'gauge']" /> Dashboard
          </RouterLink>
          <RouterLink to="/requests">
            <font-awesome-icon :icon="['fas', 'code-pull-request']" /> Requests
          </RouterLink>
          <RouterLink to="/reports">
            <font-awesome-icon :icon="['fas', 'chart-line']" /> Reports
          </RouterLink>
          <RouterLink to="/usermanagement">
            <font-awesome-icon :icon="['fas', 'users-gear']" /> User Management
          </RouterLink>
          <RouterLink to= "/stockmanagement">
            <font-awesome-icon :icon="['fas', 'boxes-packing']" /> Stock Management
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

export default {
  name: "SidebarMenu",
  components: {
    RouterLink
  },
  setup() {
    const route = useRoute();
    const showSidebar = computed(() => route && route.path !== '/');

    return { showSidebar };
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: rgb(8, 10, 22);
  color: #fff;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.head2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  margin-bottom: 10px;
}

nav ul li a {
  display: flex;
  align-items: center;
  padding: 10px;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

nav ul li a:hover {
  background-color: rgb(185, 58, 58);
}

.dark-mode .sidebar {
  background-color: #282828;
}
</style>