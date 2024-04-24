<script>
import Navbar from './views/Navbar.vue'

export default {
     name: 'App',
     components: {Navbar}
}
</script>

<template>
  <header>
    <div >
     <Navbar />
     <router-view></router-view>
    </div>
  </header>

  <main>
  </main>
</template>

<style scoped>

</style>
