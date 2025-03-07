<template>
  <div class="sidebar">
    <h2 class="head2">School Stock</h2>
    <nav>
      <ul>
        <li class="list">
          <RouterLink to=   "/dashboard">
            <font-awesome-icon :icon="['fas', 'gauge']" />   Dashboard
          </RouterLink> <br>
          <RouterLink to=  "/requests">
            <font-awesome-icon :icon="['fas', 'code-pull-request']" />  Requests
          </RouterLink><br>
          <RouterLink to= "/reports">
            <font-awesome-icon :icon="['fas', 'chart-line']" /> Reports
          </RouterLink><br>
          <RouterLink to=   "/usermanagement">
            <font-awesome-icon :icon="['fas', 'users-gear']" /> User Management
          </RouterLink><br>
          <RouterLink to=     "/stockmanagement">
            <font-awesome-icon :icon="['fas', 'boxes-packing']" />  Stock Management
          </RouterLink><br>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SidebarMenu",
};
</script>

<style>
.sidebar {
  position: absolute;
  background-color: rgb(8, 10, 22);
  color: #fff;
  width: 250px;
  height: 700px;
  padding: 10px;

}

nav{
  margin-top: 100px;
  font-family: 'Poppins' , sans-serif;
  font-size: large;

}

.head2 {
  position: absolute;
  color: #fff;
  margin-left: 100px;
}

.list {
  list-style: none;
  padding: 20px;
  display: block;
}

.list a {
  display: block;
  padding: 15px;
  color: #fff;
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;
  width: 200px;
  margin-left: -30px;
}

.list a:hover {
  background-color: rgb(185, 58, 58);
  width: 200px;
  border-radius: 5px;
}
</style>
