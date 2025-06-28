<template>
  <footer class="bg-primary text-white py-10 px-6 mt-10">
    <div class="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
      <!-- Company Info -->
      <div>
        <h4 class="font-bold mb-2">Company</h4>
        <p>
          The Oga Importer<br />
          Lagos, Nigeria<br />
          +234 810 590 8805
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="font-bold mb-2">Quick Links</h4>
        <ul class="space-y-1">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/services">Our Services</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/order">Submit Order</router-link></li>
          <li><router-link to="/contact">Contact Us</router-link></li>
        </ul>
      </div>

      <!-- Tools -->
      <div>
        <h4 class="font-bold mb-2">Tools</h4>
        <ul class="space-y-1">
          <li><router-link to="/tools/cbm-calculator">CBM Calculator</router-link></li>
          <li><router-link to="/tools/landing-cost">Landing Cost Calculator</router-link></li>
          <li><router-link to="/track">Shipment Tracking</router-link></li>
        </ul>
      </div>

      <!-- Resources + Social -->
      <div>
        <h4 class="font-bold mb-2">Resources</h4>
        <ul class="space-y-1 mb-4">
          <li><router-link to="/jobs">Jobs</router-link></li>
          <li><router-link to="/terms">Terms of Service</router-link></li>
          <li><router-link to="/privacy">Privacy Policy</router-link></li>
        </ul>

        <!-- Social Icons -->
        <div class="flex space-x-4 mt-4">
          <a href="https://facebook.com/theogaimporter" target="_blank" rel="noopener">
            <img src="@/assets/branding/icons/facebook.png" alt="Facebook" class="w-6 h-6" />
          </a>
          <a href="https://instagram.com/theogaimporter" target="_blank" rel="noopener">
            <img src="@/assets/branding/icons/instagram.png" alt="Instagram" class="w-6 h-6" />
          </a>
          <a href="https://twitter.com/theogaimporter" target="_blank" rel="noopener">
            <img src="@/assets/branding/icons/twitter.png" alt="Twitter (X)" class="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/company/theogaimporter" target="_blank" rel="noopener">
            <img src="@/assets/branding/icons/linkedin.png" alt="LinkedIn" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>

    <p class="text-center text-xs mt-10">&copy; 2025 The Oga Importer. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
footer a {
  transition: color 0.3s;
}
footer a:hover {
  color: #facc15; /* Accent color on hover */
}
</style>
