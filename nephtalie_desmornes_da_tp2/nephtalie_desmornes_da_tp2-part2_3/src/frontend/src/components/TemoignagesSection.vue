<template>
  <section class="bg-light py-5 section-padding">
    <div class="container">
      <h2 class="text-center fw-bold mb-5">Ce que disent nos danseurs</h2>
      
      <div class="row g-4">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="col-md-6 col-lg-4">
          <div class="card h-100 p-4 hover-scale">
            <div class="d-flex align-items-center mb-4">
              <div class="me-3">
                <img 
                  :src="testimonial.avatar" 
                  :alt="testimonial.name" 
                  class="rounded-circle border border-2 border-white" 
                  width="40" 
                  height="40"
                >
              </div>
              <div>
                <h5 class="mb-0 fw-semibold">{{ testimonial.name }}</h5>
                <p class="text-muted small mb-0">{{ testimonial.role }}</p>
              </div>
            </div>
            <p class="text-muted mb-4">{{ testimonial.content }}</p>
            <div class="mt-auto">
              <div class="d-flex text-warning">
                <i v-for="star in 5" :key="star" class="fa fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'TemoignagesSection',
  data() {
    return {
      testimonials: [
        // Default data in case API is not available
        {
          id: 1,
          name: 'Sophie Martin',
          role: 'Danseuse débutante',
          content: 'J\'étais nerveuse de commencer à danser, mais les professeurs ici m\'ont fait sentir tellement bienvenue. Les cours en ligne sont faciles à suivre et j\'ai tellement progressé !',
          avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
        },
        {
          id: 2,
          name: 'Thomas Dubois',
          role: 'Danseur intermédiaire',
          content: 'La variété des styles disponibles est incroyable. J\'ai pu explorer différentes formes de danse que je n\'aurais jamais essayées autrement. La communauté est formidable !',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
        },
        {
          id: 3,
          name: 'Amina Diallo',
          role: 'Professeure',
          content: 'En tant que professeure, j\'adore comment DanseKonnect me connecte avec des élèves passionnés du monde entier. La plateforme rend le partage de mes connaissances si facile.',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
        }
      ]
    };
  },
  mounted() {
    this.fetchTestimonials();
  },
  methods: {
    async fetchTestimonials() {
      try {
        const response = await api.testimonials.getAll();
        if (response.data && response.data.length > 0) {
          this.testimonials = response.data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des témoignages:', error);
        // Keep using default data if API fails
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 1rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hover-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-scale:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
</style>