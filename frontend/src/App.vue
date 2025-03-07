<template>
  <div id="app">
  <SidebarMenu />
  <RouterView />
  </div>
</template>

<script>
import SidebarMenu from "./components/SidebarMenu.vue";

export default {
  name: "App",
  components: {
    SidebarMenu
  }
};
</script>
<style>
#app{
  font-family: 'Poppins' , sans-serif;
 
}
</style>
