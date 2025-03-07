<template>
    <div class="container">
      <div class="addform" @click="toggleUserForm">
        <h3>Add new user <font-awesome-icon :icon="['fas', 'plus']" /></h3>
      </div>
      <div class="newuserform" v-if="showUserForm">
        <div class="input">
          <input type="text" placeholder="Teacher's names" v-model="teachernames">
        </div>
        <div class="input">
          <input type="text" v-model="teachertrade" placeholder="Teacher's trade">
        </div>
        <div class="input">
          <input type="email" v-model="teacheremail" placeholder="Teacher's email">
        </div>
        <div class="input">
          <input type="password" v-model="teacherpassword" placeholder="Teacher's password">
        </div>
        <div class="button">
          <button type="submit" @click="insertNewUser">Add User</button>
        </div>
      </div>
  
      <div class="allusers">
        <table>
          <thead>
            <tr>
              <th>Teacher's name</th>
              <th>Teacher's trade</th>
              <th>Teacher's email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.teacher_names }}</td>
              <td>{{ user.teacher_trade }}</td>
              <td>{{ user.teacher_email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: "UserManagement",
    setup() {
      const teachernames = ref('');
      const teachertrade = ref('');
      const teacheremail = ref('');
      const teacherpassword = ref('');
      const router = useRouter();
      const showUserForm = ref(false);
      const users = ref([]);
  
      const toggleUserForm = () => {
        showUserForm.value = !showUserForm.value;
      };
  
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/select-all-users');
          if (response.status === 200) {
            users.value = response.data.result;
            console.log("All users fetched successfully");
          }
        } catch (err) {
          console.log('Failed to fetch users', err);
        }
      };
  
      const insertNewUser = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/insert-new-user', {
            teachernames: teachernames.value,
            teachertrade: teachertrade.value,
            teacheremail: teacheremail.value,
            teacherpassword: teacherpassword.value,
          });
          if (response.status === 200) {
            alert("User inserted successfully");
            fetchUsers(); // Refresh the user list after inserting a new user
            showUserForm.value = false; // Hide the form after successful insertion
          } else if (response.status === 400) {
            alert("All fields must be filled");
          } else {
            alert("Something went wrong");
          }
        } catch (err) {
          console.log("Error occurred", err);
        }
      };
  
      onMounted(() => {
        fetchUsers();
      });
  
      return {
        teachernames,
        teachertrade,
        teacheremail,
        teacherpassword,
        insertNewUser,
        showUserForm,
        toggleUserForm,
        users,
        router,
      };
    },
  };
  </script>
  
  <style>
  .container {
    text-align: center;
  } 
  .newuserform {
    width: 500px;
    margin-left: 550px;
  }
 
  .addform {
    position: relative;
    width: 200px;
    margin-left: 350px;
    cursor: pointer;
  }
  
  .addform h3 {
    background: rgb(172, 172, 172);
    padding: 20px;
    color: rgb(94, 22, 22);
  }
  
  .button {
    margin-left: 40px;
  }
  
  .button button { 
    background: transparent;
    border: none;
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
  }
  
  .allusers table {
    list-style-type: none;
    padding: 0;
    margin-top: 200px;
    margin-left: 290px;
    font-family : 'Poppins' , sans-serif;

  }
  
  .allusers th, .allusers td {
    padding: 20px;
    text-align: left;
    width: 300px;
    font-family: 'Poppins' ,sans-serif;
  }
  .allusers th{
    background: rgb(145, 142, 142);
  }
  .allusers td{
    background : rgb(223, 213, 213);
  }
  .allusers tr {
    background: #f9f9f9;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>