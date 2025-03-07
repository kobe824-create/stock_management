<!-- filepath: /c:/Users/Lee/Desktop/stock_management/frontend/src/components/Profile.vue -->
<template>
    <div class="profile-page">
      <div class="profile-header">
        <img src="path/to/profile-picture.jpg" alt="Profile Picture" class="profile-picture" />
        <h1 class="profile-name">John Doe</h1>
      </div>
      <div class="profile-details">
        <h2>Profile Information</h2>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Role:</strong> Administrator</p>
        <p><strong>Joined:</strong> January 1, 2020</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfilePage',
  };
  </script>
  
  <style scoped>
  .profile-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .profile-name {
    font-size: 2rem;
    color: #333;
  }
  
  .profile-details {
    width: 100%;
    max-width: 600px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .profile-details h2 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .profile-details p {
    margin-bottom: 10px;
    font-size: 1rem;
    color: #555;
  }
  </style>