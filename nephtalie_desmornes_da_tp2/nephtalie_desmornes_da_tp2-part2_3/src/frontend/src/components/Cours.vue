<template>
  <section class="bg-white py-5 section-padding">
    <div class="container">
      <h2 class="text-center fw-bold mb-5">Cours en vedette</h2>
      
      <div class="row g-4">
        <!-- Course cards will be dynamically generated -->
        <div v-for="(course, index) in courses" :key="index" class="col-md-6 col-lg-4">
          <div class="card h-100 hover-scale">
            <div class="position-relative">
              <img :src="course.image" :alt="course.title" class="card-img-top" style="height: 200px; object-fit: cover;">
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title fw-bold">{{ course.title }}</h5>
                <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-2 py-1">
                  {{ course.type }}
                </span>
              </div>
              <p class="card-text text-muted mb-4">{{ course.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <img :src="course.teacher.avatar" :alt="course.teacher.name" class="rounded-circle me-2" width="32" height="32">
                  <span class="small">{{ course.teacher.name }}</span>
                </div>
                <span class="fw-semibold small">{{ course.price }}</span>
              </div>
              <div class="mt-3 d-flex justify-content-between align-items-center">
                <span class="text-muted small">
                  <i class="fa fa-calendar-o me-1"></i> Début: {{ course.startDate }}
                </span>
                <a href="#" class="text-primary fw-semibold small">
                  Détails <i class="fa fa-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-5">
        <router-link to="/cours" class="btn btn-primary rounded-pill px-4 py-2">
          Voir tous les cours
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'Cours',
  data() {
    return {
      courses: [
        // Default data in case API is not available
        {
          title: 'Bases de danse contemporaine',
          description: 'Apprenez les fondamentaux de la danse contemporaine avec ce cours adapté aux débutants.',
          image: 'https://images.unsplash.com/photo-1508700929621-771618f0a6ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
          type: 'En ligne',
          teacher: {
            name: 'Marie L.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          price: 'Gratuit',
          startDate: '15/06'
        },
        {
          title: 'Hip Hop Grooves',
          description: 'Maîtrisez les mouvements et grooves fondamentaux de la danse hip hop.',
          image: 'https://images.unsplash.com/photo-1514525257171-8dc03a83e2b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
          type: 'En personne',
          teacher: {
            name: 'Jamal K.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          price: 'Gratuit',
          startDate: '20/06'
        },
        {
          title: 'Salsa pour débutants',
          description: 'Apprenez les pas de base et les tours de salsa dans ce cours d\'introduction amusant.',
          image: 'https://images.unsplash.com/photo-1531545513506-455e3f1af7e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
          type: 'En ligne',
          teacher: {
            name: 'Isabella R.',
            avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
          },
          price: 'Gratuit',
          startDate: '18/06'
        }
      ]
    };
  },
  mounted() {
    this.fetchCourses();
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await api.courses.getFeatured();
        if (response.data && response.data.length > 0) {
          this.courses = response.data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des cours:', error);
        // Keep using default data if API fails
      }
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 0.75rem;
  overflow: hidden;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.bg-primary.bg-opacity-10 {
  background-color: rgba(138, 43, 226, 0.1) !important;
}

.text-primary {
  color: #8a2be2 !important;
}
</style>