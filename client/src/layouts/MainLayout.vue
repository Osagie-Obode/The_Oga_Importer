<template>
  <div class="homepage bg-white text-gray-900">
    <!-- GLOBAL NAVBAR -->
    <nav class="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <div class="text-xl font-bold text-primary">The Oga Importer</div>
      <ul class="flex gap-6 items-center text-sm font-medium">
        <li><router-link to="/" class="hover:text-primary">Home</router-link></li>
        <li><a href="#services" class="hover:text-primary">Services</a></li>
        <li><router-link to="/about" class="hover:text-primary">About Us</router-link></li>
        <li><a href="#blog" class="hover:text-primary">Blog</a></li>
        <li><router-link to="/contact" class="hover:text-primary">Contact Us</router-link></li>
        <li>
          <router-link to="/register" class="bg-primary text-white px-4 py-2 rounded">Register</router-link>
        </li>
      </ul>
    </nav>

    <!-- MAIN PAGE CONTENT -->
    <main class="min-h-screen">
      <router-view />
    </main>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';

export default {
  name: 'MainLayout',
  components: {
    Footer
  }
};
</script>

<style scoped>
</style>
