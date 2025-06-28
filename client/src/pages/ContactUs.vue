<template>
  <div class="contact-page py-16 px-6 bg-gray-100 min-h-screen">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <h1 class="text-3xl md:text-4xl font-bold text-center text-primary mb-10">
        Need more information? Do you have any feedback for us?<br />We would be happy to hear from you!
      </h1>

      <!-- Content -->
      <div class="grid md:grid-cols-2 gap-10 bg-white p-8 rounded shadow">
        <!-- Left: Contact Info -->
        <div class="space-y-6 flex flex-col justify-center items-center md:items-start">
          <img src="@/assets/branding/logo-temp.png" alt="The Oga Importer" class="w-32 h-32 object-contain mb-4" />
          <h2 class="text-xl font-bold text-primary">The Oga Importer</h2>
          <p class="text-sm text-gray-700">
            Email: <a href="mailto:info@theogaimporter.com" class="text-primary underline">info@theogaimporter.com</a>
          </p>
          <p class="text-sm text-gray-700">Address: 123 Ikoyi Road, Lagos, Nigeria</p>
        </div>

        <!-- Right: Contact Form -->
        <form @submit.prevent="submitContactForm" class="space-y-4">
          <input v-model="form.name" type="text" placeholder="Full Name" class="input" required />
          <input v-model="form.phone" type="text" placeholder="Phone Number" class="input" required />
          <input v-model="form.email" type="email" placeholder="Email" class="input" required />
          <input v-model="form.company" type="text" placeholder="Company" class="input" />
          <input v-model="form.website" type="url" placeholder="Website" class="input" />
          <select v-model="form.interestedIn" class="input" required>
            <option disabled value="">Interested In...</option>
            <option value="Market Analysis">Market Analysis</option>
            <option value="Service Query">Service Query</option>
            <option value="Custom Request">Custom Request</option>
            <option value="Feedback">Feedback</option>
          </select>
          <textarea v-model="form.message" placeholder="Your Message" rows="5" class="input" required></textarea>
          <button type="submit" class="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-purple-800 transition w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        company: '',
        website: '',
        interestedIn: '',
        message: ''
      }
    };
  },
  methods: {
    async submitContactForm() {
      console.log('Form submitted:', this.form);
      alert('✅ Thank you! Your message has been sent.');
      // You can later connect this to your backend API
      this.form = {
        name: '',
        phone: '',
        email: '',
        company: '',
        website: '',
        interestedIn: '',
        message: ''
      };
    }
  }
};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
