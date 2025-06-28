<template>
  <div class="py-16 px-6 bg-white text-center">
    <h2 class="text-2xl md:text-3xl font-bold mb-6 text-primary">What Our Clients Say</h2>
    <div class="max-w-2xl mx-auto relative">
      <div class="bg-gray-100 p-6 rounded shadow text-center">
        <p class="italic text-lg mb-4">"{{ currentTestimonial.quote }}"</p>
        <p class="font-bold text-primary">— {{ currentTestimonial.author }}</p>
      </div>

      <!-- Controls -->
      <div class="flex justify-center mt-4 space-x-2">
        <button
          v-for="(testimonial, index) in testimonials"
          :key="index"
          @click="currentIndex = index"
          :class="[
            'w-3 h-3 rounded-full',
            currentIndex === index ? 'bg-primary' : 'bg-gray-300'
          ]"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestimonialSlider',
  data() {
    return {
      currentIndex: 0,
      testimonials: [
        {
          quote:
            'The Oga Importer helped me scale my side hustle into a full-time business. I now import safely every month!',
          author: 'Ada U., Lagos'
        },
        {
          quote:
            'I was so afraid of being scammed, but The Oga Importer made the process transparent and stress-free. Highly recommended.',
          author: 'Chuka E., Enugu'
        },
        {
          quote:
            'As a first-time importer, I appreciated the coaching and constant updates. My goods arrived perfectly!',
          author: 'Fatima B., Abuja'
        }
      ]
    };
  },
  computed: {
    currentTestimonial() {
      return this.testimonials[this.currentIndex];
    }
  }
};
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}
</style>
