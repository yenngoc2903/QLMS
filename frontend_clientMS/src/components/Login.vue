<template>
     <div class="form-login-register">
       <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
         <li class="nav-item" role="presentation">
           <router-link to="/login" class="link"><a class="nav-link active" id="tab-login" data-mdb-pill-init role="tab"
             aria-controls="pills-login" aria-selected="true">Login</a></router-link>
         </li>
         <li class="nav-item" role="presentation">
            <router-link to="/register"><a class="nav-link" id="tab-register" data-mdb-pill-init href="#pills-register" role="tab"
                      aria-controls="pills-register" aria-selected="false">Register</a></router-link>
         </li>
       </ul>
       <!-- Pills content -->
       <div class="tab-content">
         <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
           <form @submit.prevent="login">
             <div class="text-center mb-3">
               <!-- Omit social buttons for brevity -->
             </div>
             <p class="text-center">or:</p>
             <!-- Username input -->
             <div class="form-outline mb-4">
               <input type="text" id="username" class="form-control" v-model="formData.username" />
               <label class="form-label" for="username">Username</label>
             </div>
             <!-- Password input -->
             <div class="form-outline mb-4">
               <input type="password" id="password" class="form-control" v-model="formData.password" />
               <label class="form-label" for="password">Password</label>
             </div>
             <!-- Additional form elements -->
             <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
             <!-- Register link -->
             <div class="text-center">
               <p>Not a member? <router-link to="/register">Register</router-link></p>
             </div>
           </form>
         </div>
       </div>
     </div>
     </template>
     
     <script>
    
     
     export default {
       name: 'Login',
       data() {
         return {
          formData: {
           username: '',
           password: ''
         }
         }
       },
       methods: {
          async login() {
      const { success, message } = await this.$store.dispatch('loginUser', this.formData);
      if (success) {
        alert(message);
        
        this.$router.push({ name: 'Book' });
      } else {
        console.log(message);
      }
    }
       }
     }
     </script>
     
     <style scoped>
     .form-login-register {
       padding: 3% 30%;
     }
     
     .link {
       text-decoration: none;
     }
     </style>
     