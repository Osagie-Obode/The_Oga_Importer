<template>
  <div class="p-6 bg-white rounded shadow max-w-lg mx-auto my-10">
    <h2 class="text-xl font-bold mb-4 text-primary">Login</h2>
    <form @submit.prevent="loginUser">
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />
      <button class="btn w-full mt-2">Login</button>
    </form>
    <p class="text-sm text-center mt-4">
        No account yet?
        <router-link to="/register" class="text-primary underline">Register</router-link>
    </p>
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
      email: '',
      password: ''
    };
  },
  methods: {
    async loginUser() {
      if (!this.email || !this.password) {
        this.toast.error('❌ Email and password are required');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        const data = await res.json();

        if (res.ok && data.token && data.user) {
          // Save user data and token to localStorage
          localStorage.setItem('authToken', data.token); // <-- change here
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('userRole', data.user.role);

          this.toast.success('✅ Login successful!');

          // Redirect based on role
          if (data.user.role === 'admin') {
            window.location.href = '/admin';
          } else {
            window.location.href = '/';
          }
        } else {
          this.toast.error(data.message || '❌ Login failed');
        }
      } catch (err) {
        console.error(err);
        this.toast.error('❌ Server error. Please try again later.');
      }
    }
  }
};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
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
