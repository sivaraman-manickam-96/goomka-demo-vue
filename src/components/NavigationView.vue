<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Demo</a>
    <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" to="/login"
          >Login</router-link
          >
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" to="/register"
          >Signup</router-link
          >
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" to="/dashboard"
          >Dashboard</router-link
          >
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <a
              href="#"
              class="nav-link"
              @click.prevent="onLogout()"
          >Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

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
      console.log(userData,22222);
      if (userData) {
        console.log(userData);
        this.user = JSON.parse(userData);
      }
    },
    async onLogout() {
      const url = process.env.VUE_APP_URL;
      const token = 'Bearer '+localStorage.getItem('token');
      axios.post(url+'api/logout',{},{
        headers:{
          Accept:"application/json",
          Authorization:token
        }
      })
          .then(response => {
            console.log(response);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.$router.push('/login');
          })
          .catch(error => {
            console.log(error);
          });

    }
  }
};
</script>