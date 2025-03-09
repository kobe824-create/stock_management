<!-- filepath: c:\Users\Lee\Desktop\stock_management\stock_management\frontend\src\components\AppLayout.vue -->
<template>
  <div :class="['layout', { 'dark-mode': isDarkMode }]">
    <SidebarMenu />
    <div class="main-content">
      <header>
        <h1>{{ title }}</h1>
        <button @click="toggleDarkMode" class="dark-mode-toggle">
          <font-awesome-icon :icon="['fas', isDarkMode ? 'sun' : 'moon']" />
        </button>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import SidebarMenu from './SidebarMenu.vue';

export default {
  name: 'AppLayout',
  components: {
    SidebarMenu
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isDarkMode = ref(false);

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
    };

    return { isDarkMode, toggleDarkMode };
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
  color: #333;
}

.dark-mode {
  background-color: #181818;
  color: #f0f2f5;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dark-mode header {
  background-color: #282828;
}

.dark-mode-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: inherit;
}

main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>