<template>
  <div class="p-6 bg-white max-w-lg mx-auto rounded shadow">
    <h2 class="text-2xl font-bold mb-4 text-primary">My Profile</h2>
    <form @submit.prevent="updateProfile">
      <input v-model="form.name" placeholder="Full Name" class="input" />
      <input v-model="form.phone" placeholder="Phone Number" class="input" />
      <input v-model="form.businessType" placeholder="Business Type" class="input" />
      <button class="btn">Save Changes</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        businessType: ''
      }
    };
  },
  mounted() {
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        this.form = {
          name: data.name,
          phone: data.phone,
          businessType: data.businessType
        };
      });
  },
  methods: {
    updateProfile() {
      const userId = localStorage.getItem('userId');
      fetch(`http://localhost:5000/api/users/${userId}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })
        .then(() => alert('✅ Profile updated'))
        .catch(() => alert('❌ Update failed'));
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
  border: 1px solid #ccc;
  border-radius: 6px;
}
.btn {
  background-color: #502274;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
