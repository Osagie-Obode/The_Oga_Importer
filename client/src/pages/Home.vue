<template>
  <div class="homepage bg-white text-gray-900">
    <!-- HERO SECTION -->
    <section
      id="hero"
      class="relative text-white h-[80vh] flex items-center justify-center bg-cover bg-center"
      :style="{
        backgroundImage: `linear-gradient(to left, rgba(80,34,116,0.85), rgba(80,34,116,0.2)), url(${heroImage})`
      }"
    >
      <div class="text-center px-6">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Logistics, Simplified</h1>
        <p class="text-lg mb-6 max-w-xl mx-auto">
          Your trusted partner for reliable procurement, shipping, and importation from China to Nigeria.
        </p>
        <div class="flex flex-col md:flex-row justify-center gap-4">
          <router-link
            to="/order"
            class="bg-accent text-black px-6 py-3 font-semibold rounded hover:bg-yellow-300 transition"
          >
            Start Importing
          </router-link>
          <router-link
            to="/contact"
            class="bg-primary text-white px-6 py-3 font-semibold rounded hover:bg-purple-800 transition"
          >
            Talk to an Agent
          </router-link>
        </div>
      </div>

      <!-- Track Shipment Widget -->
      <div class="absolute bottom-4 right-4">
        <router-link
          to="/track"
          class="bg-white text-primary font-semibold px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          🚚 Track Your Shipment
        </router-link>
      </div>
    </section>

    <!-- INTERACTIVE SERVICE SELECTOR -->
    <section id="services" class="py-20 px-6 bg-white text-center">
      <ServiceSelector @selected="handleServiceSelect" />
    </section>

    <!-- WHY YOU CAN TRUST US -->
    <section id="trust" class="py-20 px-6 bg-gray-100 flex flex-col md:flex-row items-center gap-10">
      <div class="md:w-1/2">
        <img src="@/assets/branding/trust.jpg" alt="Trust Image" class="rounded shadow w-full" />
      </div>
      <div class="md:w-1/2 space-y-6">
        <h2 class="text-3xl font-bold text-primary mb-4">Why You Can Trust Us</h2>
        <div class="grid grid-cols-1 gap-6">
          <div class="bg-white rounded shadow p-4 flex items-start gap-4">
            <img src="@/assets/branding/icons/verified.png" alt="Verified" class="w-10 h-10" />
            <div>
              <h3 class="font-bold text-lg mb-1">Verified Supplier Network</h3>
              <p class="text-gray-700 text-sm">
                We only work with trusted suppliers, verified by our team in China.
              </p>
            </div>
          </div>

          <div class="bg-white rounded shadow p-4 flex items-start gap-4">
            <img src="@/assets/branding/icons/guarantee.png" alt="Guarantee" class="w-10 h-10" />
            <div>
              <h3 class="font-bold text-lg mb-1">Your Goods or Your Refund Guarantee</h3>
              <p class="text-gray-700 text-sm">
                We offer a clear refund policy — your funds are protected through our process.
              </p>
            </div>
          </div>

          <div class="bg-white rounded shadow p-4 flex items-start gap-4">
            <img src="@/assets/branding/icons/updates.png" alt="Updates" class="w-10 h-10" />
            <div>
              <h3 class="font-bold text-lg mb-1">Transparent Weekly Updates</h3>
              <p class="text-gray-700 text-sm">
                You receive timely, transparent progress updates on all stages of your order.
              </p>
            </div>
          </div>

          <div class="bg-white rounded shadow p-4 flex items-start gap-4">
            <img src="@/assets/branding/icons/community.png" alt="Community" class="w-10 h-10" />
            <div>
              <h3 class="font-bold text-lg mb-1">Community & Mentorship</h3>
              <p class="text-gray-700 text-sm">
                We are more than a logistics partner — we mentor and support your business growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INDUSTRY USE CASES -->
    <section id="usecases" class="py-20 px-6 text-white">
      <div class="bg-primary rounded-xl p-10">
        <h2 class="text-3xl font-bold mb-10 text-center">Industries We Serve</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white text-black p-4 rounded shadow flex flex-col items-center">
            <img src="@/assets/branding/icons/retail.png" class="w-12 h-12 mb-2" alt="Retail Icon" />
            <h3 class="font-bold text-lg mb-1">Retail</h3>
            <p class="text-sm text-center">For shop owners and resellers needing fast, affordable stock.</p>
            <button class="mt-2 text-sm text-primary font-semibold hover:underline">Learn more</button>
          </div>
          <div class="bg-white text-black p-4 rounded shadow flex flex-col items-center">
            <img src="@/assets/branding/icons/corporate.png" class="w-12 h-12 mb-2" alt="Corporate Icon" />
            <h3 class="font-bold text-lg mb-1">Corporate Supply</h3>
            <p class="text-sm text-center">Bulk sourcing for offices, churches, schools, and hotels.</p>
            <button class="mt-2 text-sm text-primary font-semibold hover:underline">Learn more</button>
          </div>
          <div class="bg-white text-black p-4 rounded shadow flex flex-col items-center">
            <img src="@/assets/branding/icons/hustlers.png" class="w-12 h-12 mb-2" alt="Hustlers Icon" />
            <h3 class="font-bold text-lg mb-1">Students & Side Hustlers</h3>
            <p class="text-sm text-center">Small-scale importers growing sustainable income.</p>
            <button class="mt-2 text-sm text-primary font-semibold hover:underline">Learn more</button>
          </div>
          <div class="bg-white text-black p-4 rounded shadow flex flex-col items-center">
            <img src="@/assets/branding/icons/oem.png" class="w-12 h-12 mb-2" alt="OEM Icon" />
            <h3 class="font-bold text-lg mb-1">OEM / Private Label</h3>
            <p class="text-sm text-center">Custom manufacturing, packaging, branding options.</p>
            <button class="mt-2 text-sm text-primary font-semibold hover:underline">Learn more</button>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIAL SLIDER -->
    <TestimonialSlider />

    <!-- BLOG PREVIEW -->
    <section id="blog" class="py-16 px-6 text-center">
      <h2 class="text-3xl font-bold mb-8 text-primary">From Our Blog</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded shadow p-4 border">
          <h3 class="font-bold mb-2">5 Profitable Items You Can Start Importing Today</h3>
          <p class="text-sm">Learn what to import with less than ₦50,000...</p>
          <button class="mt-2 text-sm text-primary font-semibold hover:underline">Read More</button>
        </div>
        <div class="bg-white rounded shadow p-4 border">
          <h3 class="font-bold mb-2">Understanding Customs Clearance</h3>
          <p class="text-sm">How to avoid delays and unexpected charges...</p>
          <button class="mt-2 text-sm text-primary font-semibold hover:underline">Read More</button>
        </div>
        <div class="bg-white rounded shadow p-4 border">
          <h3 class="font-bold mb-2">Meet Debbie — Our Founder</h3>
          <p class="text-sm">Discover the story behind the movement...</p>
          <button class="mt-2 text-sm text-primary font-semibold hover:underline">Read More</button>
        </div>
      </div>

      <!-- Read All Posts button -->
      <div class="mt-8">
        <router-link
          to="/blog"
          class="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-purple-800 transition"
        >
          Read All Our Posts
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import ServiceSelector from '@/components/ServiceSelector.vue';
import TestimonialSlider from '@/components/TestimonialSlider.vue';

export default {
  name: 'HomePage',
  components: {
    ServiceSelector,
    TestimonialSlider
  },
  data() {
    return {
      heroImage: new URL('@/assets/branding/hero-bg.jpg', import.meta.url).href
    };
  },
  methods: {
    handleServiceSelect(service) {
      console.log('User selected:', service.name);
    }
  }
};
</script>

<style scoped>
.homepage h1,
h2,
h3 {
  font-family: 'Inter', sans-serif;
}
</style>
