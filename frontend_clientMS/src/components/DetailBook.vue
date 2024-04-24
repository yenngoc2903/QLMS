<template>
     <div class="details">
       <div v-if="book" class="detail-content">
         <div><img :src="book.img" alt="Book Cover"></div>
         <div class="detail-container">
           <h1>{{ book.name }}</h1>
           <p>Giá: {{ book.price }} VNĐ</p>
           <p>Số Lượng: {{ book.quantity }}</p>
           <p>Năm Xuất Bản: {{ book.publishYear }}</p>
           <p>Nhà Xuất Bản: {{ book.publisher.name }}</p>
           <p>Tác giả: {{ book.author }}</p>
           <div>
             <label for="borrowDate">Chọn ngày mượn sách:</label>
             <input type="date" id="borrowDate" v-model="borrowDate">
           </div>
           <div>
             <label for="returnDate">Chọn ngày trả sách:</label>
             <input type="date" id="returnDate" v-model="returnDate">
           </div>
           
           <button @click="registerBorrow" :disabled="!isValidBorrow">Đăng ký mượn sách</button>
         </div>
       </div>
       <div v-else>
         <p>Loading...</p>
       </div>
     </div>
   </template>
   
   <script>
   import axios from 'axios';
   import { mapGetters } from 'vuex';
   
   export default {
     name: 'DetailBook',
     data() {
       return {
         borrowDate: null,
         returnDate: null,
         book: null
       };
     },
     computed: {
       ...mapGetters(['user']), // Sử dụng mapGetters để truy cập getter user từ Vuex Store
       isValidBorrow() {
         return this.returnDate && this.borrowDate && this.book.quantity >= 1;
       }
     },
     created() {
       this.getDetailBook();
     },
     methods: {
          registerBorrow() {
  if (this.isValidBorrow) {
    if (this.user && this.user._id) {
      const borrowData = {
        book: this.book._id, 
        user: this.user._id,
        borrowDate: this.borrowDate,
        returnDate: this.returnDate
      };
      
      axios.post('http://localhost:3500/api/borrow-book', borrowData)
        .then(response => {
          alert("Đã đăng ký mượn sách thành công");
          
          // Sửa thông tin sách sau khi đăng ký mượn thành công
          const editBookData = {
            _id: this.book._id,
            quantity: -1 // Giảm số lượng sách đi 1
          };

          axios.post('http://localhost:3500/api/edit-book', editBookData)
            .then(response => {
              console.log("Đã cập nhật thông tin sách thành công");
            })
            .catch(error => {
              console.error('Lỗi khi cập nhật thông tin sách:', error);
            });
        })
        .catch(error => {
          alert('Lỗi đăng ký mượn sách:', error);
        });
    } else {
      alert("Đăng nhập để mượn sách");
    }
  } else {
    console.log("Vui lòng điền đầy đủ thông tin và số lượng sách mượn phải ít nhất là 1");
  }
},

   
       getDetailBook() {
         const bookId = this.$route.params.bookId;
         axios.get(`http://localhost:3500/api/get-detail-book-by-id/${bookId}`)
           .then(response => {
             this.book = response.data.data;
           })
           .catch(error => {
             console.error('Error fetching book details:', error);
           });
       },
     }
   }
   </script>
   
   <style scoped>
   .details {
     margin: 0 5%;
   }
   
   .detail-content {
     display: flex;
     margin-top: 5%;
   }
   
   img {
     width: 50%;
     margin-left: 30%;
   }

.detail-container button {
     margin-top: 20px;
}
   </style>
   