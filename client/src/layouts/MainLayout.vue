<template>
  <div class="homepage bg-white text-gray-900">
    <!-- GLOBAL NAVBAR -->
    <nav class="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <div class="text-xl font-bold text-primary">The Oga Importer</div>
      <ul class="flex gap-6 items-center text-sm font-medium">
        <li><router-link to="/" class="hover:text-primary">Home</router-link></li>

        <!-- 🔽 Services Dropdown -->
        <li class="relative group">
          <span class="hover:text-primary cursor-pointer">Services</span>
          <ul class="absolute hidden group-hover:block bg-white border shadow-lg text-sm w-52 mt-2 z-50">
            <li>
              <router-link to="/services/procurement" class="block px-4 py-2 hover:bg-gray-100">Procurement & Sourcing</router-link>
            </li>
            <li>
              <router-link to="/services/manufacturing" class="block px-4 py-2 hover:bg-gray-100">Custom Manufacturing</router-link>
            </li>
            <li>
              <router-link to="/services/secure-payments" class="block px-4 py-2 hover:bg-gray-100">Secure Payments</router-link>
            </li>
            <li>
              <router-link to="/services/shipping" class="block px-4 py-2 hover:bg-gray-100">Shipping</router-link>
            </li>
            <li>
              <router-link to="/services/verification" class="block px-4 py-2 hover:bg-gray-100">Supplier Verification</router-link>
            </li>
            <li>
              <router-link to="/services/academy" class="block px-4 py-2 hover:bg-gray-100">Import Coaching</router-link>
            </li>
          </ul>
        </li>

        <li><router-link to="/about" class="hover:text-primary">About Us</router-link></li>
        <li><a href="#blog" class="hover:text-primary">Blog</a></li>
        <li><router-link to="/contact" class="hover:text-primary">Contact Us</router-link></li>

        <li v-if="!isLoggedIn">
          <router-link to="/login" class="bg-primary text-white px-4 py-2 rounded">Log In</router-link>
        </li>

        <li v-else>
          <router-link to="/dashboard" class="bg-green-600 text-white px-4 py-2 rounded">Dashboard</router-link>
        </li>

        <li v-if="isLoggedIn">
          <button @click="logout" class="text-red-600 font-semibold hover:underline">Logout</button>
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
  components: { Footer },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('userId');
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.group:hover .group-hover\:block {
  display: block;
}
</style>
