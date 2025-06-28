<template>
  <div class="service-page py-16 px-6 bg-gray-100 min-h-screen">
    <div class="max-w-5xl mx-auto">
      <!-- Service Intro -->
      <h1 class="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
        {{ serviceTitle }}
      </h1>

      <p class="text-center text-lg mb-10 max-w-3xl mx-auto text-gray-700">
        {{ serviceIntro }}
      </p>

      <!-- How We Do It / Why Choose Us -->
      <section class="bg-white p-8 rounded shadow mb-10">
        <h2 class="text-2xl font-bold text-primary mb-4">How We Do It & Why Choose Us</h2>
        <ul class="list-disc list-inside space-y-3 text-gray-700">
          <li v-for="(point, index) in howWeDoIt" :key="index">
            {{ point }}
          </li>
        </ul>
      </section>

      <!-- Instructions / Process to Follow -->
      <section class="bg-white p-8 rounded shadow mb-10">
        <h2 class="text-2xl font-bold text-primary mb-4">Instructions & Process</h2>
        <ol class="list-decimal list-inside space-y-3 text-gray-700">
          <li v-for="(step, index) in processSteps" :key="index">
            {{ step }}
          </li>
        </ol>
      </section>

      <!-- How We Charge -->
      <section class="bg-white p-8 rounded shadow mb-10">
        <h2 class="text-2xl font-bold text-primary mb-4">How We Charge</h2>
        <p class="text-gray-700">{{ howWeCharge }}</p>
      </section>

      <!-- Call to Action -->
      <section class="bg-white p-8 rounded shadow text-center">
        <h2 class="text-2xl font-bold text-primary mb-4">Ready to Proceed?</h2>
        <p class="text-gray-700 mb-6">
          You can either fill in the request form or talk to one of our agents for personalized support.
        </p>

        <div class="flex flex-col md:flex-row justify-center gap-4">
          <router-link
            :to="formLink"
            class="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-purple-800 transition"
          >
            Fill in the Form
          </router-link>

          <router-link
            to="/contact"
            class="bg-accent text-black px-6 py-3 rounded font-semibold hover:bg-yellow-300 transition"
          >
            Talk to an Agent
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicePage',
  data() {
    return {
      serviceTitle: 'Our Premium Procurement Service',
      serviceIntro:
        'Our Procurement Service helps you source and order high-quality products from verified suppliers in China with full transparency and support.',

      howWeDoIt: [
        'We source only from trusted suppliers verified by our China-based team.',
        'We provide you with transparent quotations and profit analysis.',
        'We handle negotiations, payments, quality control, and shipment tracking.',
        'You get real-time updates and delivery to your chosen location.'
      ],

      processSteps: [
        'Submit your product order list through our online form.',
        'Our team verifies the products and sends you a detailed quotation.',
        'You confirm the order and make payment.',
        'We manage sourcing, quality check, and shipping.',
        'You receive your goods and detailed invoice.'
      ],

      howWeCharge:
        'We charge a flat service fee based on your order value, plus shipping and customs charges (all transparently documented).',

      formLink: '/order' // You can customize this link per service
    };
  }
};
</script>

<style scoped>
.service-page h1,
h2 {
  font-family: 'Inter', sans-serif;
}
</style>
