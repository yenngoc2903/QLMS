// Trong file store/index.js
import { createStore } from 'vuex';
import axios from 'axios';
export default createStore({
     state: {
          loggedInUserId: '', // ID của người dùng đang đăng nhập
          isLoggedIn: false,
          user: null
        },
        mutations: {
          login(state, user) {
            state.isLoggedIn = true;
            state.user = user;
            state.loggedInUserId = user ? user._id : ''; // Set ID của người dùng đăng nhập
          },
          logout(state) {
               state.isLoggedIn = false;
               state.user = null;
               state.loggedInUserId = ''; // Reset ID của người dùng đăng nhập khi đăng xuất
             }
        },
  actions: {
     // Trong action loginUser
async loginUser({ commit }, formData) {
     try {
       const response = await axios.post('http://localhost:3500/api/user-login', formData);
       const { errCode, user } = response.data;
       
       if (errCode === 0 && user ) {
         // Lưu trạng thái đăng nhập vào localStorage
         localStorage.setItem('isLoggedIn', true);
         localStorage.setItem('user', JSON.stringify(user));
         
         // Cập nhật Vuex
         commit('login', user);
         return { success: true, message: 'Đăng nhập thành công!' };
       } else {
         return { success: false, message: 'Invalid login or incorrect role' };
       }
     } catch (error) {
       console.error('Login failed:', error);
       return { success: false, message: 'Login failed' };
       
     }
   },
   logoutUser({ commit }) {
     // Xóa localStorage khi người dùng đăng xuất
     localStorage.removeItem('isLoggedIn');
     localStorage.removeItem('user');
     localStorage.removeItem('token');
 
     // Cập nhật Vuex
     commit('logout');
   }
}, 
   
getters: {
     isLoggedIn: state => state.isLoggedIn,
     user: state => state.user,
     loggedInUserId: state => state.loggedInUserId // Định nghĩa getter để trả về ID của người dùng đang đăng nhập
   }
});
