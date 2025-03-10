<template>
  <div class="user-management-container">
    <div class="page-header">
      <h1>User Management</h1>
      <button class="add-user-btn" @click="toggleUserForm">
        <font-awesome-icon :icon="['fas', 'user-plus']" />
        Add New User
      </button>
    </div>

    <!-- User Stats Cards -->
    <div class="user-stats">
      <div class="stat-card">
        <div class="stat-icon">
          <font-awesome-icon :icon="['fas', 'users']" />
        </div>
        <div class="stat-content">
          <h3>Total Users</h3>
          <div class="stat-value">{{ users.length }}</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon admin">
          <font-awesome-icon :icon="['fas', 'user-shield']" />
        </div>
        <div class="stat-content">
          <h3>Administrators</h3>
          <div class="stat-value">{{ adminCount }}</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon teacher">
          <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" />
        </div>
        <div class="stat-content">
          <h3>Teachers</h3>
          <div class="stat-value">{{ teacherCount }}</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon active">
          <font-awesome-icon :icon="['fas', 'user-check']" />
        </div>
        <div class="stat-content">
          <h3>Active Users</h3>
          <div class="stat-value">{{ activeCount }}</div>
        </div>
      </div>
    </div>

    <!-- User Management Tools -->
    <div class="user-tools">
      <div class="search-box">
        <font-awesome-icon :icon="['fas', 'search']" />
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by name, email, or trade..." 
          @input="filterUsers"
        />
      </div>
      
      <div class="filter-dropdown">
        <select v-model="filterRole" @change="filterUsers">
          <option value="all">All Roles</option>
          <option value="admin">Administrators</option>
          <option value="teacher">Teachers</option>
          <option value="bdc">BDC</option>
          <option value="pbw">PBW</option>
          <option value="sod">SOD</option>
          <option value="csa">CSA</option>
        </select>
      </div>
      
      <div class="sort-dropdown">
        <select v-model="sortOption" @change="sortUsers">
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="email-asc">Email (A-Z)</option>
          <option value="email-desc">Email (Z-A)</option>
          <option value="date-asc">Date Added (Oldest)</option>
          <option value="date-desc">Date Added (Newest)</option>
        </select>
      </div>
      
      <button class="export-btn" @click="exportUserData">
        <font-awesome-icon :icon="['fas', 'file-export']" />
        Export
      </button>
    </div>

    <!-- New User Form Modal -->
    <div class="modal-overlay" v-if="showUserForm" @click.self="toggleUserForm">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add New User</h2>
          <button class="close-btn" @click="toggleUserForm">
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label for="teachernames">Full Name</label>
            <input 
              type="text" 
              id="teachernames" 
              v-model="teachernames" 
              placeholder="Enter full name"
            />
          </div>
          
          <div class="form-group">
            <label for="teacheremail">Email Address</label>
            <input 
              type="email" 
              id="teacheremail" 
              v-model="teacheremail" 
              placeholder="Enter email address"
            />
          </div>
          
          <div class="form-row">
            <div class="form-group half">
              <label for="teachertrade">Department/Trade</label>
              <select id="teachertrade" v-model="teachertrade">
                <option value="" disabled selected>Select department</option>
                <option value="admin">Administrator</option>
                <option value="bdc">BDC</option>
                <option value="pbw">PBW</option>
                <option value="sod">SOD</option>
                <option value="csa">CSA</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group half">
              <label for="userrole">User Role</label>
              <select id="userrole" v-model="userRole">
                <option value="" disabled selected>Select role</option>
                <option value="admin">Administrator</option>
                <option value="manager">Manager</option>
                <option value="teacher">Teacher</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="teacherpassword">Password</label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="teacherpassword" 
                v-model="teacherpassword" 
                placeholder="Enter password"
              />
              <button class="toggle-password" @click="togglePasswordVisibility">
                <font-awesome-icon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" />
              </button>
            </div>
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="confirmPassword" 
                placeholder="Confirm password"
              />
            </div>
          </div>
          
          <div class="form-options">
            <div class="checkbox-group">
              <input type="checkbox" id="sendEmail" v-model="sendWelcomeEmail" />
              <label for="sendEmail">Send welcome email</label>
            </div>
            <div class="checkbox-group">
              <input type="checkbox" id="requireReset" v-model="requirePasswordReset" />
              <label for="requireReset">Require password reset on first login</label>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="cancel-btn" @click="toggleUserForm">Cancel</button>
          <button class="save-btn" @click="insertNewUser" >
            <font-awesome-icon :icon="['fas', 'user-plus']" />
            Add User
          </button>
        </div>
      </div>
    </div>

    <!-- User Table -->
    <div class="user-table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="selectAll" v-model="selectAll" @change="toggleSelectAll" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" :class="{ 'selected-row': selectedUsers.includes(user.id) }">
            <td>
              <input 
                type="checkbox" 
                :id="`user-${user.id}`" 
                :value="user.id" 
                v-model="selectedUsers"
              />
            </td>
            <td class="user-name-cell">
              <div class="user-avatar">{{ getUserInitials(user.teacher_names) }}</div>
              <span>{{ user.teacher_names }}</span>
            </td>
            <td>{{ user.teacher_email }}</td>
            <td>
              <span class="badge" :class="getDepartmentClass(user.teacher_trade)">
                {{ user.teacher_trade }}
              </span>
            </td>
            <td>{{ getUserRole(user) }}</td>
            <td>
              <span class="status-indicator" :class="user.active ? 'active' : 'inactive'"></span>
              {{ user.active ? 'Active' : 'Inactive' }}
            </td>
            <td>{{ formatDate(user.last_login) || 'Never' }}</td>
            <td class="actions-cell">
              <button class="action-btn edit" @click="editUser(user)">
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button>
              <button class="action-btn delete" @click="confirmDeleteUser(user)">
                <font-awesome-icon :icon="['fas', 'trash-alt']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Empty State -->
      <div class="empty-state" v-if="filteredUsers.length === 0">
        <font-awesome-icon :icon="['fas', 'users-slash']" class="empty-icon" />
        <h3>No users found</h3>
        <p>Try adjusting your search or filters, or add a new user.</p>
      </div>
    </div>
    
    <!-- Bulk Actions -->
    <div class="bulk-actions" v-if="selectedUsers.length > 0">
      <span class="selected-count">{{ selectedUsers.length }} users selected</span>
      <div class="action-buttons">
        <button class="bulk-btn" @click="bulkActivate">
          <font-awesome-icon :icon="['fas', 'user-check']" />
          Activate
        </button>
        <button class="bulk-btn" @click="bulkDeactivate">
          <font-awesome-icon :icon="['fas', 'user-slash']" />
          Deactivate
        </button>
        <button class="bulk-btn delete" @click="confirmBulkDelete">
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
          Delete
        </button>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="pagination">
      <button 
        class="page-btn" 
        @click="prevPage" 
        :disabled="currentPage === 1"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      
      <div class="page-numbers">
        <button 
          v-for="page in displayedPages" 
          :key="page" 
          class="page-number" 
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        class="page-btn" 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div class="modal-overlay" v-if="showDeleteModal" @click.self="cancelDelete">
      <div class="modal-content delete-modal">
        <div class="modal-header">
          <h2>Confirm Deletion</h2>
          <button class="close-btn" @click="cancelDelete">
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="warning-icon">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
          </div>
          <p v-if="selectedUsers.length <= 1">
            Are you sure you want to delete this user? This action cannot be undone.
          </p>
          <p v-else>
            Are you sure you want to delete {{ selectedUsers.length }} users? This action cannot be undone.
          </p>
        </div>
        
        <div class="modal-footer">
          <button class="cancel-btn" @click="cancelDelete">Cancel</button>
          <button class="delete-btn" @click="confirmDelete">
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, computed, onMounted, watch } from 'vue';

export default {
  name: "UserManagement",
  setup() {
    // API Base URL
    const API_URL = 'http://localhost:3000/api';
    
    // Form data
    const teachernames = ref('');
    const teachertrade = ref('');
    const teacheremail = ref('');
    const teacherpassword = ref('');
    const confirmPassword = ref('');
    const userRole = ref('');
    const sendWelcomeEmail = ref(true);
    const requirePasswordReset = ref(false);
    const showPassword = ref(false);
    
    // UI state
    const showUserForm = ref(false);
    const showDeleteModal = ref(false);
    const users = ref([]);  
    const loading = ref(true);
    const selectedUsers = ref([]);
    const selectAll = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const searchQuery = ref('');
    const filterRole = ref('all');
    const sortOption = ref('name-asc');
    const userToEdit = ref(null);
    const toast = ref({
      show: false,
      message: '',
      type: 'success',
      timeout: null
    });

    // Computed properties
    const adminCount = computed(() => {
      return users.value.filter(user => user.teacher_trade === 'admin').length;
    });
    
    const teacherCount = computed(() => {
      return users.value.filter(user => user.teacher_trade !== 'admin').length;
    });
    
    const activeCount = computed(() => {
      return users.value.filter(user => user.active).length;
    });
    
    const formValid = computed(() => {
      if (userToEdit.value) {
        return (
          teachernames.value.trim() !== '' && 
          teacheremail.value.trim() !== '' && 
          teachertrade.value !== ''
        );
      }
      return (
        teachernames.value.trim() !== '' && 
        teacheremail.value.trim() !== '' && 
        teachertrade.value !== '' && 
        teacherpassword.value.trim() !== '' && 
        teacherpassword.value === confirmPassword.value
      );
    });
    
    const filteredUsers = computed(() => {
      let result = [...users.value];
      
      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(user => 
          user.teacher_names.toLowerCase().includes(query) || 
          user.teacher_email.toLowerCase().includes(query) || 
          user.teacher_trade.toLowerCase().includes(query)
        );
      }
      
      // Apply role filter
      if (filterRole.value !== 'all') {
        result = result.filter(user => user.teacher_trade === filterRole.value);
      }
      
      // Apply sorting
      result.sort((a, b) => {
        let modifier = 1;
        if (sortOption.value.endsWith('-desc')) {
          modifier = -1;
        }
        
        const key = sortOption.value.split('-')[0];
        
        if (key === 'name') {
          return a.teacher_names.localeCompare(b.teacher_names) * modifier;
        } else if (key === 'email') {
          return a.teacher_email.localeCompare(b.teacher_email) * modifier;
        } else if (key === 'date') {
          return (new Date(a.date_added) - new Date(b.date_added)) * modifier;
        }
        return 0;
      });
      
      return result;
    });
    
    const totalPages = computed(() => {
      return Math.ceil(filteredUsers.value.length / itemsPerPage.value);
    });
    
    const displayedPages = computed(() => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages.value <= maxVisiblePages) {
        for (let i = 1; i <= totalPages.value; i++) {
          pages.push(i);
        }
      } else {
        // Show first page, last page, current page, and pages around current
        let startPage = Math.max(1, currentPage.value - 1);
        let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    });
    
    const paginatedUsers = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredUsers.value.slice(start, end);
    });
    
    // API Methods
    const fetchUsers = async () => {
      loading.value = true;
      try {
        const response = await axios.get(`${API_URL}/select-all-users`);
        users.value = response.data;
        showToast('Users loaded successfully', 'success');
      } catch (error) {
        console.error('Error fetching users:', error);
        showToast('Failed to load users', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    const insertNewUser = async () => {
      try {
        const userData = {
          teacher_names: teachernames.value,
          teacher_email: teacheremail.value,
          teacher_trade: teachertrade.value,
          teacher_password: teacherpassword.value,
          userRole: userRole.value,
          active: true,
          sendWelcomeEmail: sendWelcomeEmail.value,
          
        };
        
        const response = await axios.post(`${API_URL}/insert-new-user`, userData);
        users.value.push(response.data);
        resetForm();
        toggleUserForm();
        showToast('User added successfully', 'success');
      } catch (error) {
        console.error('Error adding user:', error);
        showToast('Failed to add user', 'error');
      }
    };
    
    const updateUser = async () => {
      try {
        const userData = {
          id: userToEdit.value.id,
          teacher_names: teachernames.value,
          teacher_email: teacheremail.value,
          teacher_trade: teachertrade.value,
          userRole: userRole.value,
          active: userToEdit.value.active
        };
        
        const response = await axios.put(`${API_URL}/users/${userToEdit.value.id}`, userData);
        
        // Update user in the local array
        const index = users.value.findIndex(u => u.id === userToEdit.value.id);
        if (index !== -1) {
          users.value[index] = response.data;
        }
        
        resetForm();
        toggleUserForm();
        showToast('User updated successfully', 'success');
      } catch (error) {
        console.error('Error updating user:', error);
        showToast('Failed to update user', 'error');
      }
    };
    
    const deleteUsers = async (userIds) => {
      try {
        await axios.delete(`${API_URL}/users`, { data: { ids: userIds } });
        
        // Remove deleted users from the local array
        users.value = users.value.filter(user => !userIds.includes(user.id));
        selectedUsers.value = selectedUsers.value.filter(id => !userIds.includes(id));
        
        showToast(
          userIds.length > 1 
            ? `${userIds.length} users deleted successfully` 
            : 'User deleted successfully', 
          'success'
        );
      } catch (error) {
        console.error('Error deleting users:', error);
        showToast('Failed to delete users', 'error');
      } finally {
        showDeleteModal.value = false;
      }
    };
    
    const bulkActivate = async () => {
      try {
        await axios.patch(`${API_URL}/users/activate`, { ids: selectedUsers.value });
        
        // Update users in the local array
        users.value = users.value.map(user => {
          if (selectedUsers.value.includes(user.id)) {
            return { ...user, active: true };
          }
          return user;
        });
        
        showToast('Users activated successfully', 'success');
      } catch (error) {
        console.error('Error activating users:', error);
        showToast('Failed to activate users', 'error');
      }
    };
    
    const bulkDeactivate = async () => {
      try {
        await axios.patch(`${API_URL}/users/deactivate`, { ids: selectedUsers.value });
        
        // Update users in the local array
        users.value = users.value.map(user => {
          if (selectedUsers.value.includes(user.id)) {
            return { ...user, active: false };
          }
          return user;
        });
        
        showToast('Users deactivated successfully', 'success');
      } catch (error) {
        console.error('Error deactivating users:', error);
        showToast('Failed to deactivate users', 'error');
      }
    };
    
    // UI Methods
    const toggleUserForm = () => {
      if (showUserForm.value) {
        resetForm();
      }
      showUserForm.value = !showUserForm.value;
    };
    
    const resetForm = () => {
      teachernames.value = '';
      teacheremail.value = '';
      teachertrade.value = '';
      teacherpassword.value = '';
      confirmPassword.value = '';
      userRole.value = '';
      sendWelcomeEmail.value = true;
      requirePasswordReset.value = false;
      userToEdit.value = null;
    };
    
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    
    const filterUsers = () => {
      currentPage.value = 1;
    };
    
    const sortUsers = () => {
      currentPage.value = 1;
    };
    
    const exportUserData = () => {
      // Create CSV content
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Name,Email,Department,Role,Status,Last Login\n";
      
      filteredUsers.value.forEach(user => {
        const row = [
          user.teacher_names,
          user.teacher_email,
          user.teacher_trade,
          getUserRole(user),
          user.active ? 'Active' : 'Inactive',
          formatDate(user.last_login) || 'Never'
        ].join(',');
        
        csvContent += row + "\n";
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "user_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast('User data exported successfully', 'success');
    };
    
    const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedUsers.value = filteredUsers.value.map(user => user.id);
      } else {
        selectedUsers.value = [];
      }
    };
    
    const editUser = (user) => {
      userToEdit.value = user;
      teachernames.value = user.teacher_names;
      teacheremail.value = user.teacher_email;
      teachertrade.value = user.teacher_trade;
      userRole.value = user.userRole;
      showUserForm.value = true;
    };
    
    const confirmDeleteUser = (user) => {
      selectedUsers.value = [user.id];
      showDeleteModal.value = true;
    };
    
    const confirmBulkDelete = () => {
      showDeleteModal.value = true;
    };
    
    const cancelDelete = () => {
      showDeleteModal.value = false;
    };
    
    const confirmDelete = () => {
      deleteUsers(selectedUsers.value);
    };
    
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    
    const goToPage = (page) => {
      currentPage.value = page;
    };
    
    const getUserInitials = (name) => {
      if (!name) return '';
      return name.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };
    
    const getDepartmentClass = (department) => {
      return department ? department.toLowerCase() : '';
    };
    
    const getUserRole = (user) => {
      return user.userRole || 'User';
    };
    
    const formatDate = (date) => {
      if (!date) return null;
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };
    
    const showToast = (message, type = 'success') => {
      // Clear any existing timeout
      if (toast.value.timeout) {
        clearTimeout(toast.value.timeout);
      }
      
      // Set toast properties
      toast.value.show = true;
      toast.value.message = message;
      toast.value.type = type;
      
      // Auto-hide after 3 seconds
      toast.value.timeout = setTimeout(() => {
        closeToast();
      }, 3000);
    };
    
    const closeToast = () => {
      toast.value.show = false;
      if (toast.value.timeout) {
        clearTimeout(toast.value.timeout);
      }
    };
    
    const getToastIcon = () => {
      switch (toast.value.type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        case 'info': return 'info-circle';
        default: return 'info-circle';
      }
    };
    
    // Lifecycle hooks
    onMounted(() => {
      fetchUsers();
    });
    
    // Watchers
    watch(selectAll, (newVal) => {
      if (!newVal) {
        selectedUsers.value = [];
      }
    });
    
    watch(selectedUsers, (newVal) => {
      if (newVal.length === 0) {
        selectAll.value = false;
      } else if (newVal.length === filteredUsers.value.length) {
        selectAll.value = true;
      }
    });

    return {
      // Form data
      teachernames,
      teachertrade,
      teacheremail,
      teacherpassword,
      confirmPassword,
      userRole,
      sendWelcomeEmail,
      requirePasswordReset,
      showPassword,
      
      // UI state
      showUserForm,
      showDeleteModal,
      users,
      loading,
      selectedUsers,
      selectAll,
      currentPage,
      itemsPerPage,
      searchQuery,
      filterRole,
      sortOption,
      userToEdit,
      toast,
      // Computed properties
      adminCount,
      teacherCount,
      activeCount,
      formValid,
      filteredUsers,
      totalPages,
      displayedPages,
      paginatedUsers,

      // API Methods
      fetchUsers,
      insertNewUser,
      updateUser,
      deleteUsers,
      bulkActivate,
      bulkDeactivate,

      // UI Methods
      toggleUserForm,
      resetForm,
      togglePasswordVisibility,
      filterUsers,
      sortUsers,
      exportUserData,
      toggleSelectAll,
      editUser,
      confirmDeleteUser,
      confirmBulkDelete,
      cancelDelete,
      confirmDelete,
      prevPage,
      nextPage,
      goToPage,
      getUserInitials,
      getDepartmentClass,
      getUserRole,
      formatDate,
      showToast,
      closeToast,
      getToastIcon
        };
      }
    };
    </script>


      <style scoped>
    
/* Global Variables */
:root {
  --primary-color: #4361ee;
  --primary-light: #4895ef;
  --primary-dark: #3f37c9;
  --secondary-color: #f72585;
  --success-color: #4caf50;
  --warning-color: #ff9800;
  --danger-color: #f44336;
  --info-color: #2196f3;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  --gray-100: #f8f9fa;
  --gray-200: #e9ecef;
  --gray-300: #dee2e6;
  --gray-400: #ced4da;
  --gray-500: #adb5bd;
  --gray-600: #6c757d;
  --gray-700: #495057;
  --gray-800: #343a40;
  --gray-900: #212529;
  --border-radius: 8px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Base Styles */
.user-management-container {
  font-family: 'Inter', 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--gray-800);
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f7fa;
  min-height: calc(100vh - 4rem);
  position: relative;
  margin-left: 250px;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  font-weight: 600;
  line-height: 1.2;
}

h1 {
  font-size: 1.75rem;
  color: var(--gray-900);
}

h2 {
  font-size: 1.5rem;
  color: var(--gray-800);
}

h3 {
  font-size: 1.25rem;
  color: var(--gray-700);
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
  line-height: 1.5;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-300);
}

/* Buttons */
button {
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  border: none;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.add-user-btn {
  background-color: var(--dark-color);
  color: white;
  padding: 0.625rem 1.25rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(67, 97, 238, 0.3);
}

.add-user-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(67, 97, 238, 0.4);
}

.action-btn {
  padding: 0.375rem;
  border-radius: 4px;
  background-color: transparent;
  color: var(--gray-600);
}

.action-btn:hover {
  background-color: var(--gray-200);
  color: var(--gray-800);
}

.action-btn.edit {
  color: var(--info-color);
}

.action-btn.edit:hover {
  background-color: rgba(33, 150, 243, 0.1);
}

.action-btn.delete {
  color: var(--danger-color);
}

.action-btn.delete:hover {
  background-color: rgba(244, 67, 54, 0.1);
}

.save-btn {
  background-color: var(--primary-color);
  color: rgb(11, 15, 235);
  padding: 0.625rem 1.25rem;
  font-weight: 500;
}

.save-btn:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

.cancel-btn {
  background-color: var(--gray-300);
  color: var(--gray-800);
}

.cancel-btn:hover {
  background-color: var(--gray-400);
}

.delete-btn {
  background-color: var(--danger-color);
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.export-btn {
  background-color: var(--gray-700);
  color: white;
}

.export-btn:hover {
  background-color: var(--gray-800);
}

.bulk-btn {
  background-color: var(--gray-200);
  color: var(--gray-700);
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
}

.bulk-btn:hover {
  background-color: var(--gray-300);
  color: var(--gray-800);
}

.bulk-btn.delete {
  background-color: rgba(244, 67, 54, 0.1);
  color: var(--danger-color);
}

.bulk-btn.delete:hover {
  background-color: rgba(244, 67, 54, 0.2);
}

.page-btn {
  background-color: var(--gray-200);
  color: var(--gray-700);
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.page-btn:hover:not(:disabled) {
  background-color: var(--gray-300);
  color: var(--gray-800);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-number {
  background-color: var(--gray-200);
  color: var(--gray-700);
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 0 0.25rem;
}

.page-number:hover {
  background-color: var(--gray-300);
}

.page-number.active {
  background-color: var(--primary-color);
  color: white;
}

.close-btn {
  background-color: transparent;
  color: var(--gray-600);
  padding: 0.25rem;
  border-radius: 4px;
}

.close-btn:hover {
  background-color: var(--gray-200);
  color: var(--gray-800);
}

.toggle-password {
  background-color: transparent;
  color: var(--gray-600);
  padding: 0.375rem;
  border-radius: 4px;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
}

.toggle-password:hover {
  background-color: var(--gray-200);
  color: var(--gray-800);
}

/* User Stats */
.user-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(67, 97, 238, 0.1);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 1rem;
}

.stat-icon.admin {
  background-color: rgba(247, 37, 133, 0.1);
  color: var(--secondary-color);
}

.stat-icon.teacher {
  background-color: rgba(76, 175, 80, 0.1);
  color: var(--success-color);
}

.stat-icon.active {
  background-color: rgba(33, 150, 243, 0.1);
  color: var(--info-color);
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  margin: 0;
  font-size: 0.875rem;
  color: var(--gray-600);
  font-weight: 500;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-top: 0.25rem;
}

/* User Tools */
.user-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.search-box {
  flex: 1;
  min-width: 250px;
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-300);
  background-color: white;
  font-size: 0.875rem;
  transition: var(--transition);
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.search-box svg {
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-500);
}

.filter-dropdown, .sort-dropdown {
  min-width: 180px;
}

.filter-dropdown select, .sort-dropdown select {
  width: 100%;
  padding: 0.625rem 1rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-300);
  background-color: white;
  font-size: 0.875rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 0.75rem) center;
  transition: var(--transition);
}

.filter-dropdown select:focus, .sort-dropdown select:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

/* User Table */
.user-table-container {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  margin-bottom: 1.5rem;
  position: relative;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.user-table th, .user-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--gray-200);
}

.user-table th {
  background-color: var(--gray-100);
  font-weight: 600;
  color: var(--gray-700);
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 1;
}

.user-table tbody tr {
  transition: var(--transition);
}

.user-table tbody tr:hover {
  background-color: var(--gray-100);
}

.user-table tbody tr.selected-row {
  background-color: rgba(67, 97, 238, 0.05);
}

.user-name-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.status-indicator.active {
  background-color: var(--success-color);
}

.status-indicator.inactive {
  background-color: var(--gray-500);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  background-color: var(--gray-200);
  color: var(--gray-700);
}

.badge.admin {
  background-color: rgba(247, 37, 133, 0.1);
  color: var(--secondary-color);
}

.badge.teacher {
  background-color: rgba(76, 175, 80, 0.1);
  color: var(--success-color);
}

.badge.bdc, .badge.pbw, .badge.sod, .badge.csa {
  background-color: rgba(33, 150, 243, 0.1);
  color: var(--info-color);
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-body {
  margin-bottom: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--gray-700);
}

.form-group input, .form-group select {
  width: 100%;
  padding: 0.625rem 1rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-300);
  background-color: white;
  font-size: 0.875rem;
  transition: var(--transition);
}

.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: var(--primary-light);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group.half {
  flex: 1;
}

.password-input {
  position: relative;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-group input {
  width: auto;
}

.form-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
}

.empty-state .empty-icon {
  font-size: 3rem;
  color: var(--gray-300);
  margin-bottom: 1rem;
}

.bulk-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--gray-100);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-bottom: 1.5rem;
}

.selected-count {
  font-weight: 500;
  color: var(--gray-700);
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.toast {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 1000;
  transition: var(--transition);
}

.toast.success {
  border-left: 4px solid var(--success-color);
}

.toast.error {
  border-left: 4px solid var(--danger-color);
}

.toast.warning {
  border-left: 4px solid var(--warning-color);
}

.toast.info {
  border-left: 4px solid var(--info-color);
}

.toast-icon {
  font-size: 1.5rem;
}

.toast-message {
  flex: 1;
  font-size: 0.875rem;
  color: var(--gray-800);
}

.toast-close {
  background-color: transparent;
  color: var(--gray-600);
  padding: 0.25rem;
  border-radius: 4px;
}

.toast-close:hover {
  background-color: var(--gray-200);
  color: var(--gray-800);
}
</style>