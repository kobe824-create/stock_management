<!-- filepath: c:\Users\Lee\Desktop\stock_management\stock_management\frontend\src\components\SidebarMenu.vue -->
<template>
  <div class="sidebar">
    <div class="logo-container">
      <img src="@/assets/logo.jpeg" alt="School Stock" class="logo" />
      <h2 class="logo-text">School Stock</h2>
    </div>
    
    <div class="divider"></div>
    
    <nav class="nav-menu">
      <ul>
        <li v-for="(item, index) in menuItems" :key="index">
          <RouterLink 
            :to="item.path" 
            class="nav-link" 
            :class="{ active: currentRoute === item.path }"
            v-tooltip="item.label"
          >
            <div class="icon-container">
              <font-awesome-icon :icon="item.icon" />
            </div>
            <span class="link-text">{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    
    <div class="sidebar-footer">
      <RouterLink to="/profile" class="profile-link" v-tooltip="'Profile'">
        <div class="avatar">
          <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <div class="user-info">
          <span class="username">Admin User</span>
          <span class="role">Administrator</span>
        </div>
      </RouterLink>
      
      <button class="logout-button" v-tooltip="'Logout'">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

export default {
  name: "SidebarMenu",
  components: {
    RouterLink
  },
  directives: {
    tooltip: {
      mounted(el, binding) {
        el.setAttribute('data-tooltip', binding.value);
      },
      updated(el, binding) {
        el.setAttribute('data-tooltip', binding.value);
      }
    }
  },
  setup() {
    const route = useRoute();
    const currentRoute = computed(() => route.path);
    
    const menuItems = ref([
      { 
        path: '/dashboard', 
        icon: ['fas', 'tachometer-alt'], 
        label: 'Dashboard' 
      },
      { 
        path: '/requests', 
        icon: ['fas', 'clipboard-list'], 
        label: 'Requests' 
      },
      { 
        path: '/reports', 
        icon: ['fas', 'chart-bar'], 
        label: 'Reports' 
      },
      { 
        path: '/usermanagement', 
        icon: ['fas', 'users'], 
        label: 'Users' 
      },
      { 
        path: '/stockmanagement', 
        icon: ['fas', 'inventory'], 
        label: 'Inventory' 
      }
    ]);

    return { 
      currentRoute, 
      menuItems,
      showSidebar: computed(() => route && route.path !== '/')
    };
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background-color: #1e1e2d;
  color: #a2a3b7;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.logo-container {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.logo {
  width: 36px;
  height: 36px;
  margin-right: 0.75rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 1.5rem 1rem 1.5rem;
}

.nav-menu {
  flex: 1;
  overflow-y: auto;
  padding: 0 0.75rem;
}

.nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  color: #a2a3b7;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.nav-link.active {
  background-color: #3699ff;
  color: #ffffff;
}

.icon-container {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.125rem;
}

.link-text {
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 1;
  transition: opacity 0.2s ease;
}

/* Tooltip styling */
.nav-link[data-tooltip] {
  position: relative;
}

.nav-link[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 10;
  margin-left: 10px;
}

.nav-link[data-tooltip]::before {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-right-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  margin-left: 0px;
}

.nav-link:hover[data-tooltip]::after,
.nav-link:hover[data-tooltip]::before {
  opacity: 1;
}

.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #a2a3b7;
}

.avatar {
  width: 36px;
  height: 36px;
  background-color: #3699ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 0.75rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
}

.role {
  font-size: 0.75rem;
  color: #a2a3b7;
}

.logout-button {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  color: #a2a3b7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background-color: #f64e60;
  color: #ffffff;
}

/* Tooltip for logout button */
.logout-button[data-tooltip] {
  position: relative;
}

.logout-button[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
}

.logout-button[data-tooltip]::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
}

.logout-button:hover[data-tooltip]::after,
.logout-button:hover[data-tooltip]::before {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }
  
  .logo-text,
  .link-text,
  .user-info {
    display: none;
  }
  
  .logo-container {
    justify-content: center;
  }
  
  .logo {
    margin-right: 0;
  }
  
  .nav-link {
    justify-content: center;
  }
  
  .icon-container {
    margin-right: 0;
  }
  
  .sidebar-footer {
    justify-content: center;
  }
  
  .avatar {
    margin-right: 0;
  }
  
  .logout-button {
    display: none;
  }
}
</style>