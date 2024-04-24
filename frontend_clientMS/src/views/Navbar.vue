<template>
     <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
       <router-link to="/home" class="navbar-brand">Mượn sách</router-link>
       <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
       </button>
   
       <div class="collapse navbar-collapse" id="navbarSupportedContent">
         <ul class="navbar-nav mr-auto">
           <li class="nav-item">
             <router-link to="/home" class="nav-link">Sách</router-link>
           </li>
           <li class="nav-item dropdown">
             <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               {{ isLoggedIn ? user.firstName : 'Tài khoản' }}
             </a>
             <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <router-link v-if="isLoggedIn" to="/user" class="dropdown-item">Thông tin</router-link>
                    <div class="dropdown-divider"></div>
                    <router-link v-if="isLoggedIn" :to="'/login'" @click="logout" class="dropdown-item">Đăng xuất</router-link>
                    <router-link v-else :to="'/login'" class="dropdown-item">Đăng nhập</router-link>
               </div>
           </li>
         </ul>
         

       </div>
     </nav>
   </template>
   
   <script>
   export default {
     name: 'Navbar',
     computed: {
       isLoggedIn() {
         return this.$store.getters.isLoggedIn;
       },
       user() {
         return this.$store.getters.user;
       },
       data() {
          return {
          searchQuery: '' // Khởi tạo searchQuery là một chuỗi rỗng
          };
}
     },
     methods: {
    logout() {
      // Gọi action logoutUser trong Vuex
      this.$store.dispatch('logoutUser');
    },
    searchBooks() {
    const searchQuery = this.searchQuery.trim(); // Lấy chuỗi tìm kiếm và loại bỏ khoảng trắng dư thừa
    if (searchQuery) {
      // Chuyển hướng đến trang tìm kiếm với query string chứa tên sách
      this.$router.push({ path: '/search', query: { q: searchQuery } });
    }
  }
  }

   };
   </script>
   
   <style>
   /* Các style tùy chỉnh của bạn có thể được thêm vào đây */
   </style>
   