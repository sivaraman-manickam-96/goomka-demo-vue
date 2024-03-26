// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
//import Landing from '../components/LandingPage.vue';
import Dashboard from '../components/HelloWorld.vue';
import LoginView from '../components/LoginView.vue';
import Signup from '../components/SignUpView.vue';
import axios from 'axios';


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'signup',
        component: Signup
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    // Check if the route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            var token = localStorage.getItem('token');
            // Send a request to check if the user is authenticated
            await axios.get(process.env.VUE_APP_URL+'api/user-details',{
                headers: {
                    'Accept' :' application/json',
                    'Authorization':'Bearer '+token
                }
            }).then(response => {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            });
            next();
        } catch (error) {
            console.log(1313213)
            next('/');
        }
    } else {
        console.log(131111111111111111113213);
        next();
    }
});

export default router;
