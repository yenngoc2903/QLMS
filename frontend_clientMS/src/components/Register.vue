<template>
     <div class="form-login-register">
       <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
         <li class="nav-item" role="presentation">
           <router-link to="/login" class="link">
             <a class="nav-link" id="tab-login" data-mdb-pill-init role="tab" aria-controls="pills-login" aria-selected="false">Login</a>
           </router-link>
         </li>
         <li class="nav-item" role="presentation">
           <router-link to="/register" class="link">
             <a class="nav-link active" id="tab-register" data-mdb-pill-init role="tab" aria-controls="pills-register" aria-selected="true">Register</a>
           </router-link>
         </li>
       </ul>
   
       <div class="tab-content">
         <div class="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
           <form @submit.prevent="register">
             <!-- First Name -->
             <div class="form-outline mb-4">
               <input type="text" id="firstName" class="form-control" v-model="formData.firstName" />
               <label class="form-label" for="firstName">First Name</label>
             </div>
   
             <!-- Last Name -->
             <div class="form-outline mb-4">
               <input type="text" id="lastName" class="form-control" v-model="formData.lastName" />
               <label class="form-label" for="lastName">Last Name</label>
             </div>
   
             <!-- Birthday -->
             <div class="form-outline mb-4">
               <select id="birthday" class="form-control" v-model="formData.birthday">
                 <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
               </select>
               <label class="form-label" for="birthday">Birthday</label>
             </div>
   
             <!-- Gender -->
             <div class="form-outline mb-4">
               <select id="gender" class="form-control" v-model="formData.gender">
                 <option value="">Select Gender</option>
                 <option value="male">Male</option>
                 <option value="female">Female</option>
                 <option value="other">Other</option>
               </select>
               <label class="form-label" for="gender">Gender</label>
             </div>
   
             <!-- Address -->
             <div class="form-outline mb-4">
               <input type="text" id="address" class="form-control" v-model="formData.address" />
               <label class="form-label" for="address">Address</label>
             </div>
   
             <!-- Phone Number -->
             <div class="form-outline mb-4">
               <input type="text" id="phoneNumber" class="form-control" v-model="formData.phoneNumber" />
               <label class="form-label" for="phoneNumber">Phone Number</label>
             </div>
   
             <!-- Username -->
             <div class="form-outline mb-4">
               <input type="text" id="username" class="form-control" v-model="formData.username" />
               <label class="form-label" for="username">Username</label>
             </div>
   
             <!-- Password -->
             <div class="form-outline mb-4">
               <input type="password" id="password" class="form-control" v-model="formData.password" />
               <label class="form-label" for="password">Password</label>
             </div>
   
             <!-- Repeat Password -->
             <div class="form-outline mb-4">
               <input type="password" id="repeatPassword" class="form-control" v-model="formData.repeatPassword" />
               <label class="form-label" for="repeatPassword">Repeat Password</label>
             </div>
   
             <!-- Submit Button -->
             <button type="submit" class="btn btn-primary btn-block mb-4">Sign Up</button>
   
             <div class="text-center">
               <p>Already have an account? <router-link to="/login">Login</router-link></p>
             </div>
           </form>
         </div>
       </div>
     </div>
   </template>
   
   <script>
   import axios from 'axios';
   
   export default {
     name: 'Register',
     data() {
       const currentYear = new Date().getFullYear();
       return {
         years: Array.from({length: currentYear - 1899}, (v, k) => currentYear - k),
         formData: {
           username: '',
           password: '',
           repeatPassword: '',
           firstName: '',
           lastName: '',
           birthday: '',
           gender: '',
           address: '',
           phoneNumber: '',
           role: 'reader'  // Assuming 'user' is a default role
         }
       };
     },
     methods: {
       async register() {
         if (this.formData.password !== this.formData.repeatPassword) {
           alert("Passwords do not match.");
           return;
         }
         try {
           const response = await axios.post('http://localhost:3500/api/user-register', this.formData);
           console.log('Registration successful', response.data);
           this.$router.push('/login');
         } catch (error) {
           console.error('There was an error during the registration process:', error);
           alert("Registration failed!");
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
   
   .form-outline {
        padding-bottom: 0px;
   }
   </style>
   