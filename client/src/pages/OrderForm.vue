<!-- src/pages/OrderForm.vue -->
<template>
  <div class="p-6 bg-white rounded shadow max-w-2xl mx-auto my-10">
    <h2 class="text-xl font-bold mb-4 text-primary">
      Submit Your Procurement / Sourcing Order
    </h2>

    <form @submit.prevent="submitOrder">
      <!-- BASIC INFO -->
      <input v-model="form.name"  class="input" type="text"  placeholder="Full Name"  required />
      <input v-model="form.phone" class="input" type="text"  placeholder="Phone Number" required />
      <input v-model="form.email" class="input" type="email" placeholder="Email" required />

      <!-- STATE / COUNTRY -->
      <select v-model="form.state" class="input" required>
        <option disabled value="">Select State…</option>
        <option>Lagos</option><option>Abuja</option><option>Rivers</option><option>Kano</option><option>Other</option>
      </select>

      <select v-model="form.country" class="input" required>
        <option disabled value="">Select Country…</option>
        <option>Nigeria</option><option>Ghana</option><option>Kenya</option><option>South Africa</option>
        <option>Other</option>
      </select>

      <!-- SERVICE TYPE -->
      <select v-model="form.serviceType" class="input" required>
        <option disabled value="">Select Service…</option>
        <option value="procurement">Procurement</option>
        <option value="sourcing">Sourcing</option>
      </select>

      <!-- ORDER LIST  -->
      <textarea
        v-model="form.orderList"
        class="input"
        rows="8"
        :placeholder="orderListPlaceholder"
        required
      ></textarea>

      <!-- DELIVERY METHOD  -->
      <label class="block font-semibold mt-4 mb-2">Choose Delivery Method</label>
      <div class="flex gap-4">
        <button
          type="button"
          @click="form.deliveryMethod = 'pickup'; form.deliveryAddress = defaultPickupAddress"
          :class="btnClass('pickup')"
        >Pick‑Up</button>

        <button
          type="button"
          @click="form.deliveryMethod = 'delivery'"
          :class="btnClass('delivery')"
        >Home Delivery</button>
      </div>

      <!-- DELIVERY ADDRESS (only when Home Delivery) -->
      <input
        v-if="form.deliveryMethod === 'delivery'"
        v-model="form.deliveryAddress"
        class="input mt-2"
        type="text"
        placeholder="Enter delivery address"
        required
      />

      <!-- ACTIONS -->
      <div class="flex flex-col md:flex-row gap-4 mt-6">
        <button class="btn-primary w-full md:w-auto" type="submit">Submit Order</button>
        <router-link to="/contact" class="btn-accent text-center w-full md:w-auto">Talk to an Agent</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'OrderForm',
  data() {
    return {
      defaultPickupAddress: 'The Oga Importer Pickup Center, 12 Allen Avenue, Ikeja, Lagos.',
      form: {
        name: '', phone: '', email: '',
        state: '', country: '',
        serviceType: '',
        orderList: '',
        deliveryMethod: '',        // 'pickup' | 'delivery'
        deliveryAddress: ''        // pre‑filled if pickup
      }
    };
  },
  computed: {
    orderListPlaceholder() {
      return this.form.serviceType === 'sourcing'
        ? `Order List – format:\nProduct Name\nSpecification (Type/Colour/Size)\nQuantity`
        : `Order List – format:\nProduct Name\nProduct Link\nSpecification (Type/Colour/Size)\nQuantity`;
    }
  },
  methods: {
    btnClass(type) {
      return [
        'px-4 py-2 rounded font-semibold border',
        this.form.deliveryMethod === type
          ? 'bg-primary text-white'
          : 'bg-white text-primary border-primary'
      ];
    },
    async submitOrder() {
      try {
        const res = await fetch('http://localhost:5000/api/orders/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body : JSON.stringify(this.form)
        });
        const data = await res.json();
        alert(`✅ Success! Your tracking no. is ${data.trackingNo}`);
        // reset
        this.form = {
          name:'',phone:'',email:'',state:'',country:'',
          serviceType:'',orderList:'',
          deliveryMethod:'',deliveryAddress:''
        };
      } catch (e) {
        console.error(e);
        alert('❌ Could not submit order');
      }
    }
  }
};
</script>

<style scoped>
.input{display:block;width:100%;padding:10px;margin-bottom:10px;border:1px solid #ccc;border-radius:6px}
.btn-primary{background:#502274;color:#fff;padding:10px 16px;border-radius:6px}
.btn-accent {background:#facc15;color:#000;padding:10px 16px;border-radius:6px}
</style>
