<template>
  <div class="py-16 px-6 bg-gray-100 min-h-screen">
    <div class="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h1 class="text-3xl font-bold text-primary mb-6">CBM Calculator</h1>
      <form @submit.prevent="calculateCBM" class="space-y-4">
        <input v-model.number="length" type="number" step="any" placeholder="Length (cm)" class="input" required />
        <input v-model.number="width" type="number" step="any" placeholder="Width (cm)" class="input" required />
        <input v-model.number="height" type="number" step="any" placeholder="Height (cm)" class="input" required />
        <input v-model.number="quantity" type="number" step="1" placeholder="Quantity" class="input" required />
        <button type="submit" class="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-purple-800 transition w-full">
          Calculate CBM
        </button>
      </form>

      <div v-if="cbm !== null" class="mt-6 text-center text-lg font-bold text-primary">
        Total CBM: {{ cbm.toFixed(3) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CBMCalculator',
  data() {
    return {
      length: '',
      width: '',
      height: '',
      quantity: '',
      cbm: null
    };
  },
  methods: {
    calculateCBM() {
      const cbmValue = (this.length * this.width * this.height * this.quantity) / 1000000;
      this.cbm = cbmValue;
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
