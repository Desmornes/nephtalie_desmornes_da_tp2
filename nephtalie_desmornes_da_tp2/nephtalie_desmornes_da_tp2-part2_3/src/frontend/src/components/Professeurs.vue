<template>
  <section class="bg-white py-5 section-padding">
    <div class="container">
      <h2 class="text-center fw-bold mb-5">Rencontrez nos professeurs</h2>
      
      <div class="row g-4">
        <div v-for="(teacher, index) in teachers" :key="index" class="col-md-6 col-lg-4">
          <div class="teacher-card card h-100 hover-scale">
            <div class="position-relative overflow-hidden" style="height: 250px;">
              <img 
                :src="teacher.avatar" 
                :alt="teacher.name" 
                class="teacher-img w-100 h-100 object-fit-cover"
              >
              <div class="position-absolute top-0 bottom-0 start-0 end-0 bg-gradient-dark"></div>
              <div class="position-absolute bottom-0 start-0 end-0 p-3">
                <h3 class="text-white fw-bold mb-1">{{ teacher.name }}</h3>
                <p class="text-white small">{{ teacher.specialties }}</p>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text text-muted mb-4">{{ teacher.bio }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted small">
                  <i class="fa fa-star text-warning"></i> {{ teacher.rating }} ({{ teacher.reviewCount }} avis)
                </span>
                <a href="#" class="text-primary fw-semibold small" @click.prevent="viewTeacherProfile(teacher.id)">
                  Voir le profil <i class="fa fa-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-5">
        <router-link to="/professeurs" class="btn btn-primary rounded-pill px-4 py-2">
          Parcourir tous les professeurs
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'Professeurs',
  data() {
    return {
      teachers: [
        // Default data in case API is not available
        {
          id: 1,
          name: 'Marie Laurent',
          specialties: 'Contemporain, Moderne',
          bio: 'Danseuse contemporaine professionnelle avec plus de 10 ans d\'expérience en enseignement.',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          rating: 4.9,
          reviewCount: 128
        },
        {
          id: 2,
          name: 'Jamal Kone',
          specialties: 'Hip Hop, Breakdance',
          bio: 'Ancien danseur de rue devenu instructeur professionnel avec une passion pour l\'enseignement.',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: 4.8,
          reviewCount: 95
        },
        {
          id: 3,
          name: 'Isabella Rodriguez',
          specialties: 'Salsa, Bachata',
          bio: 'Championne de danse latine spécialisée dans l\'enseignement de mouvements complexes accessibles à tous.',
          avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
          rating: 5.0,
          reviewCount: 142
        }
      ]
    };
  },
  mounted() {
    this.fetchTeachers();
  },
  methods: {
    async fetchTeachers() {
      try {
        const response = await api.teachers.getFeatured();
        if (response.data && response.data.length > 0) {
          this.teachers = response.data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des professeurs:', error);
        // Keep using default data if API fails
      }
    },
    viewTeacherProfile(teacherId) {
      this.$router.push({ path: `/professeurs/${teacherId}` });
    }
  }
}
</script>

<style scoped>
.teacher-card {
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.teacher-img {
  transition: transform 0.3s ease;
}

.teacher-card:hover .teacher-img {
  transform: scale(1.1);
}

.bg-gradient-dark {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%);
}

.object-fit-cover {
  object-fit: cover;
}
</style>