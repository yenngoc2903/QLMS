// Trong file router.js
import { createRouter, createWebHistory } from 'vue-router';
import Navbar from '@/views/Navbar.vue';
import Book from '@/components/Book.vue';
import BorrowBook from '@/components/BorrowBook.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import User from '@/components/User.vue';
import DetailBook from '@/components/DetailBook.vue';

const routes = [
  {
    path: '/navbar',
    name: 'Navbar',
    component: Navbar
  },
  {
    path: '/home',
    name: 'Book',
    component: Book
  },
  {
    path: '/borrowbook',
    name: 'BorrowBook',
    component: BorrowBook
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/detailbook/:bookId',
    name: 'DetailBook',
    component: DetailBook
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
