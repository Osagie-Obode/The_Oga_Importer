<template>
  <div class="p-6 bg-white rounded shadow max-w-lg mx-auto my-10">
    <h2 class="text-xl font-bold mb-4">Register User</h2>
    <form @submit.prevent="registerUser">
      <input v-model="form.name" placeholder="Full Name" class="input" />
      <input v-model="form.email" placeholder="Email" class="input" />
      <input v-model="form.phone" placeholder="Phone / WhatsApp" class="input" />
      <select v-model="form.businessType" class="input">
        <option value="">Select Business Type</option>
        <option>Retail Importer</option>
        <option>Side Hustler</option>
        <option>Corporate Buyer</option>
        <option>Student</option>
        <option>Stay-at-home Parent</option>
      </select>
      <button class="btn">Submit</button>
    </form>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        businessType: ''
      }
    };
  },
  methods: {
    async registerUser() {
      if (!this.form.name || !this.form.email || !this.form.phone || !this.form.businessType) {
        this.toast.error("❌ Please fill all required fields.");
        return;
      }

      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      });

      const data = await res.json();
      localStorage.setItem("userId", data.user.id);
      this.toast.success("✅ User Registered Successfully!");
    }
  }
};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.btn {
  background: #502274;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
