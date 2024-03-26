<template>
  <div v-if="isAuthenticated">
    <h1>Welcome {{ user.name }}</h1>
    <p>Email: {{ user.email }}</p>
  </div>
  <div v-else>
    <p>Please login to view this page.</p>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    };
  },
  computed: {
    isAuthenticated() {
      return this.user !== null;
    }
  },
  created() {
    // Check authentication status when the component is created
    this.checkAuthentication();
  },
  methods: {
    async checkAuthentication() {
      // Retrieve user information from Vuex store or localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    },
    async logout() {
      // Clear user information from Vuex store or localStorage
      localStorage.removeItem('user');
      // Redirect to the login page
      this.$router.push('/login');
    }
  }
};
</script>
