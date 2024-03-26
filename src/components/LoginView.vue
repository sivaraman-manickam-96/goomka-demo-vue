<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Login</h3>
          <hr />
        </div>
        <div class="alert alert-danger" v-if="error">
          {{ error }}
        </div>
        <Form @submit="login" :validation-schema="schema" >
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
          <div class="my-3">
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
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
        email:'',
        password:''
      },
      errors: [],
      error: '',
      schema :{
        email: 'required|email',
        password: 'required',
      },
    };
  },
  methods: {
    login() {
      const url = process.env.VUE_APP_URL;
      axios.post(url+'api/login', this.formData)
          .then(response => {
            console.log(response.data.user)
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            this.$router.push('/dashboard');
          })
          .catch(error => {
           console.log(error);
          });
    }
  }
};
</script>