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