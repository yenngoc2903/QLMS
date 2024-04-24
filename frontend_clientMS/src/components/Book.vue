<template>
     <div class="book-list">
          <form class="form-inline my-2 my-lg-0" >
          <input class="form-control mr-sm-2" type="text" v-model="searchKeyword" placeholder="Search" aria-label="Search">
          <button  @click="searchBooks" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
       <div v-for="(chunk, index) in chunkedBooks" :key="index" class="row">
         <div v-for="book in chunk" :key="book._id" class="col-md-3">
           <router-link 
             :to="{ name: 'DetailBook', params: { bookId: book._id } }" 
             style="text-decoration: none; color: black;">
             <div class="card">
               <img :src="book.img" class="card-img-top" alt="Book Cover">
               <div class="card-body">
                 <h5 class="card-title">{{ book.name }}</h5>
               </div>
             </div>
           </router-link>
         </div>
       </div>
     </div>
   </template>
   
   <script>
import axios from 'axios';
import _ from 'lodash';
export default {
  name: 'Book',
  data() {
    return {
      books: [],
      chunkedBooks: [],
      searchKeyword: '',
    };
  },
  created() {
    this.getAllBooks();
  },
  mounted() {
    this.$watch('searchKeyword', this.debounceSearch);
  },
  watch: {
    // Thêm watcher cho searchKeyword
    searchKeyword: function(newKeyword, oldKeyword) {
      // Kiểm tra xem từ khóa mới có thay đổi so với từ khóa cũ không
      if (newKeyword !== oldKeyword) {
        // Nếu có thay đổi, gọi hàm debounceSearch
        this.debounceSearch();
      }
    }
  },
  methods: {
    searchBooks() {
      const keyword = this.searchKeyword.trim();
      if (keyword === '') {
        // Nếu không nhập từ khóa, hiển thị lại tất cả sách
        this.getAllBooks();
        return;
      }
      const filteredBooks = this.books.filter(book => {
        // Chuyển đổi chuỗi về chữ thường và so sánh
        const name = book.name.toLowerCase();
        return name.includes(keyword.toLowerCase());
      });
      // Gán lại chunkedBooks sau khi lọc sách
      this.chunkedBooks = this.chunkArray(filteredBooks, 4);
    },

    debounceSearch: _.debounce(function() {
      this.searchBooks();
    }, 500),

    getAllBooks() {
      axios.get('http://localhost:3500/api/get-all-book')
        .then(response => {
          this.books = response.data.data;
          this.chunkedBooks = this.chunkArray(this.books, 4);
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    },
    chunkArray(array, size) {
      return array.reduce((acc, _, index) => index % size === 0 ? [...acc, array.slice(index, index + size)] : acc, []);
    }
  }
}
</script>

   
   <style scoped>
   .book-list {
     text-decoration: none;
       margin: 60px 100px;
   }
   
   .card {
     text-decoration: none;
       height: 100%;
       transition: transform 0.3s, box-shadow 0.3s; /* Thêm transition cho hiệu ứng phóng to và đổ bóng */
   }
   
   .card:hover {
       transform: scale(1.01); /* Phóng to lên 1.1 khi hover */
       box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Đổ bóng khi hover */
   }
   
   .card-img-top {
       height: 400px;
   }
   
   .row {
       padding: 20px 0;
   }
   </style>
   
   