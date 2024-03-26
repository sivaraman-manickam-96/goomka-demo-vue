<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Signup</h3>
          <hr />
        </div>
        <div class="alert alert-danger" v-if="error">
          {{ error }}
        </div>
        <Form @submit="register" :validation-schema="schema" >
          <div class="form-group">
            <label>Email</label>
            <Field
                name="email"
                type="text"
                class="form-control"
                v-model.trim="formData.email"
            />
            <ErrorMessage class="form-required danger" name="email" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <Field
                name="password"
                type="password"
                class="form-control"
                v-model.trim="formData.password"
            />
            <ErrorMessage class="form-required" name="password" />
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <Field
                name="confirm_password"
                type="password"
                class="form-control"
                v-model.trim="formData.confirm_password"
            />
            <ErrorMessage class="form-required" name="confirm_password" />
          </div>

          <div class="my-3">
            <button type="submit" class="btn btn-primary">
              Signup
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import router from '../router/index.js'
import { Field, Form, ErrorMessage } from 'vee-validate';
export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      formData:{
        email: '',
        password: '',
        confirm_password: ''
      },
      schema :{
        email: 'required|email',
        password: 'required',
        confirm_password: 'required|confirmed:password',
      },
      errors: [],
      error: '',
    };
  },
  methods: {
    async register() {
      try {
        const url = process.env.VUE_APP_URL;
        const response = await axios.post(url+'api/register', this.formData);
        router.push('/login');
        console.log('Registered successfully:', response.data);
        // Optionally, you can redirect the user after successful registration
      } catch (error) {
        console.error('Registration failed:', error.response.data);
        // Handle registration error
      }
    }
  }
};
</script>