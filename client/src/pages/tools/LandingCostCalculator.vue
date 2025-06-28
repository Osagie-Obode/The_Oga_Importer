<template>
  <div class="py-16 px-6 bg-gray-100 min-h-screen">
    <div class="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h1 class="text-3xl font-bold text-primary mb-6">Landing Cost Calculator</h1>
      <form @submit.prevent="calculateLandingCost" class="space-y-4">
        <input v-model.number="productCost" type="number" step="any" placeholder="Product Cost (₦)" class="input" required />
        <input v-model.number="shippingCost" type="number" step="any" placeholder="Shipping Cost (₦)" class="input" required />
        <input v-model.number="duty" type="number" step="any" placeholder="Duty (%)" class="input" required />
        <input v-model.number="otherFees" type="number" step="any" placeholder="Other Fees (₦)" class="input" required />
        <button type="submit" class="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-purple-800 transition w-full">
          Calculate Landing Cost
        </button>
      </form>

      <div v-if="landingCost !== null" class="mt-6 text-center text-lg font-bold text-primary">
        Estimated Landing Cost: ₦{{ landingCost.toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingCostCalculator',
  data() {
    return {
      productCost: '',
      shippingCost: '',
      duty: '',
      otherFees: '',
      landingCost: null
    };
  },
  methods: {
    calculateLandingCost() {
      const dutyAmount = (this.productCost * this.duty) / 100;
      this.landingCost = this.productCost + this.shippingCost + dutyAmount + this.otherFees;
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
