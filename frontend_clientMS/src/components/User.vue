<template>
     <div class="user">
          <div class="profile">
      <h3>Thông tin cá nhân</h3>
      <p>Họ và tên: {{ userInfo.firstName }} {{ userInfo.lastName }}</p>
      <p>Năm sinh: {{ userInfo.birthday }}</p>
      <p>Địa chỉ: {{ userInfo.address }}</p>
      <p>Số điện thoại: {{ userInfo.phoneNumber }}</p>
      <button style="background-color: green; color: white; border: red; border-radius: 5px;" @click="editUser(user)"> Sửa thông tin </button>
    </div>
       <div class="borrow-book-content">
         <h3>Sách đã mượn</h3>
         <div class="infor-borrow-book" v-for="borrowedBook in borrowedBooks" :key="borrowedBook._id">
           <div><img :src="borrowedBook.book.img" alt="Book Image"></div>
           <div>
               <p>Tên sách: {{ borrowedBook.book.name }}</p>
           <p>Ngày mượn: {{ formatDate(borrowedBook.borrowDate) }}</p>
           <p>Ngày trả: {{ formatDate(borrowedBook.returnDate) }}</p>
           <!-- Sử dụng điều kiện để áp dụng class CSS tùy thuộc vào giá trị của isActive -->
           <p :class="{ 'approved': borrowedBook.isActive, 'pending': !borrowedBook.isActive }">
             Trạng thái: {{ borrowedBook.isActive ? 'Đã được duyệt' : 'Chưa được duyệt' }}
           </p>
           <button style="background-color: red; color: white; border: red; border-radius: 5px;" v-if="!borrowedBook.isActive" @click="cancelBorrow(borrowedBook)">
               Huỷ mượn
               </button>
           </div>
         </div>
       </div>
     <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <span class="close-btn" @click="closeEditModal">&times;</span>
        <h3>Chỉnh sửa thông tin</h3>
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <label for="lastName">Họ:</label>
            <input type="text" class="form-control" id="lastName" v-model="editingUser.lastName">
          </div>

          <div class="form-group">
            <label for="firstName">Tên:</label>
            <input type="text" class="form-control" id="firstName" v-model="editingUser.firstName">
          </div>

          <div class="form-group">
            <label for="birthday">Năm sinh:</label>
            <input type="text" class="form-control" id="birthday" v-model="editingUser.birthday">
          </div>

          <div class="form-group">
            <label for="address">Địa chỉ:</label>
            <input type="text" class="form-control" id="address" v-model="editingUser.address">
          </div>
          <div class="form-group">
               <label for="phoneNumber">SĐT:</label>
               <input type="text" class="form-control" id="phoneNumber" v-model="editingUser.phoneNumber" >
               </div>
          <button type="submit" class="btn btn-primary">Lưu</button>
        </form>
      </div>
    </div>
     </div>
   </template>
   
   <script>
   import { mapGetters } from 'vuex';
   import axios from 'axios';
   
   export default {
     name: 'User',
     data() {
       return {
         borrowedBooks: [], // Danh sách các sách đã mượn
         userInfo: {}, // Thông tin cá nhân của người dùng
         showEditModal: false,
         editingUser: {}
       };
     },
     computed: {
       ...mapGetters(['loggedInUserId'])
     },
     mounted() {

     
       // Lấy ID của người dùng đăng nhập từ Vuex
       const userId = this.loggedInUserId;
   
       // Gọi API để lấy thông tin người dùng
       axios.get(`http://localhost:3500/api/get-detail-user-by-id/${userId}`)
         .then(response => {
           this.userInfo = response.data.data;
           // Lấy thông tin sách đã mượn sau khi lấy thông tin người dùng
           this.borrowedBooks = this.userInfo.borrowBooks;
           this.borrowedBooks.forEach(borrowedBook => {
             axios.get(`http://localhost:3500/api/get-detail-book-by-id/${borrowedBook.book}`)
               .then(bookResponse => {
                 borrowedBook.book = bookResponse.data.data; // Thêm thông tin chi tiết sách vào borrowedBook
               })
               .catch(error => {
                 console.error('Error fetching book details:', error);
               });
           });
         })
         .catch(error => {
           console.error('Error fetching user info:', error);
         });
     },
     methods: {
          cancelBorrow(borrowedBook) {
    if (!borrowedBook.isActive) {
      axios
        .delete(`http://localhost:3500/api/delete-borrow-book/${borrowedBook._id}`)
        .then(response => {
          alert("Huỷ mượn thành công!");
          // Cập nhật lại danh sách sách đã mượn sau khi huỷ mượn
          this.borrowedBooks = this.borrowedBooks.filter(book => book._id !== borrowedBook._id);
        })
        .catch(error => {
          alert("There was an error!", error);
        });
    } else {
      alert("Không thể huỷ mượn khi sách đã được duyệt!");
    }
  },
          editUser() {
          this.editingUser = { ...this.userInfo };
          this.showEditModal = true;
          },


       closeEditModal() {
         this.showEditModal = false;
       },

       // Phương thức để định dạng ngày thành dạng dễ đọc
       formatDate(dateString) {
         const date = new Date(dateString);
         return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
       },
       updateUser() {
         axios
           .put("http://localhost:3500/api/edit-user/", this.editingUser)
           .then(response => {
             alert("Chỉnh sửa thông tin thành công!");
             this.showEditModal = false;
           })
           .catch(error => {
             alert("There was an error!", error);
           });
       },
     }
   }
   </script>
   
   <style scoped>
   .user {
     display: flex;
     justify-content: space-between;
     margin: 5% 10%;
   }

   img {
     width: 20%;
   }
   
   .profile {
     width: 45%; /* Điều chỉnh kích thước cho phần thông tin cá nhân */
     border-right: 1px solid #c8c8c8;
     margin: 2% 2%;
   }
   
   .borrow-book-content {
     width: 60%; /* Điều chỉnh kích thước cho phần sách đã mượn */
   }
   
   .profile h3,
   .borrow-book-content h3 {
     text-align: center; /* Căn giữa tiêu đề */
   }
   
   .infor-borrow-book {
     display: flex;
     margin-bottom: 20px; /* Khoảng cách giữa các mục sách đã mượn */
   }
   
   .infor-borrow-book img {
     width: 100px; /* Điều chỉnh kích thước hình ảnh sách */
     height: auto;
     margin-right: 10px; /* Khoảng cách giữa hình ảnh và thông tin sách */
   }
   
   .infor-borrow-book div:last-child {
     flex-grow: 1; /* Phần thông tin sách chiếm hết phần còn lại */
   }

   .approved {
  color: green; /* Màu xanh lá cho trạng thái đã được duyệt */
}

.pending {
  color: red; /* Màu đỏ cho trạng thái chưa được duyệt */
}

.modal-overlay {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.7);
     display: flex;
     justify-content: center;
     align-items: center;
   }
   
   .modal-content {
     background-color: #fefefe;
     width: 40%;
     height: 95%;
     border-radius: 5px;
     text-align: center
   }
   
   .close-btn {
     position: absolute;
     top: 10px;
     right: 10px;
     cursor: pointer;
   }
   
   .modal-image {
     max-width: 100%;
     max-height: 100%;
     margin: 0 auto;
   }
   
   .modal-close {
     position: absolute;
     top: 10px;
     right: 10px;
     cursor: pointer;
     font-size: 20px; /* Đặt kích thước phông chữ của nút đóng */
   }

   .form-control {
     width: 90%; /* Căn chỉnh input để nó chiếm đủ chiều rộng */
     font-size: 16px; /* Đặt kích thước phông chữ cho input */
     border: 1px solid #ccc; /* Hiển thị đường viền cho input */
     border-radius: 5px; /* Bo góc cho input */
     text-align: center;
   }
   
   .form-group {
     display: flex;
     flex-direction: column;
     align-items: center;
     margin-bottom: 15px; /* Thêm khoảng cách giữa các input */
   }
   
   .form-group label {
     width: 90%;
   }
   
   .form-group input {
     width: 90%; /* Đảm bảo input chiếm toàn bộ chiều rộng của form */
     /* Thêm các thuộc tính khác tùy chỉnh theo nhu cầu của bạn */
   }
   </style>
   
   