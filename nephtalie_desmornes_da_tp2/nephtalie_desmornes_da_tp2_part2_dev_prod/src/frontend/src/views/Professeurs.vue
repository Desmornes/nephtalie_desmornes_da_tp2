<template>
  <div>
    <!-- Header Banner -->
    <div class="gradient-bg text-white py-5">
      <div class="container">
        <h1 class="display-5 fw-bold mb-3">Nos professeurs</h1>
        <p class="lead">Découvrez notre équipe de professeurs passionnés et expérimentés.</p>
      </div>
    </div>
    
    <!-- Teachers Section -->
    <section class="py-5">
      <div class="container">
        <!-- Filters -->
        <div class="row mb-5">
          <div class="col-md-8">
            <div class="d-flex flex-wrap gap-2">
              <div class="input-group mb-3 mb-md-0" style="max-width: 300px;">
                <input type="text" class="form-control" placeholder="Rechercher un professeur" v-model="searchQuery">
                <button class="btn btn-outline-primary" type="button">
                  <i class="fa fa-search"></i>
                </button>
              </div>
              
              <select class="form-select mb-3 mb-md-0" v-model="selectedStyle" style="max-width: 200px;">
                <option value="">Tous les styles</option>
                <option v-for="style in styles" :key="style.id" :value="style.id">{{ style.name }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-4 text-md-end">
            <select class="form-select mb-3 mb-md-0" v-model="sortBy" style="max-width: 200px; margin-left: auto;">
              <option value="rating">Mieux notés</option>
              <option value="courses">Plus de cours</option>
              <option value="experience">Plus d'expérience</option>
            </select>
          </div>
        </div>
        
        <!-- Teachers List -->
        <div class="row g-4">
          <div v-if="filteredTeachers.length === 0" class="col-12 text-center py-5">
            <p class="text-muted">Aucun professeur ne correspond à votre recherche.</p>
          </div>
          
          <div v-for="(teacher, index) in filteredTeachers" :key="index" class="col-md-6 col-lg-4">
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
                  <div class="d-flex align-items-center">
                    <div class="text-warning me-1">
                      <i v-for="star in 5" :key="star" class="fa fa-star" :class="{ 'text-muted': star > Math.round(teacher.rating) }"></i>
                    </div>
                    <span class="text-muted small ms-1">
                      {{ teacher.rating }} ({{ teacher.reviewCount }} avis)
                    </span>
                  </div>
                  <router-link :to="`/professeurs/${teacher.id}`" class="btn btn-sm btn-outline-primary rounded-pill">
                    Voir le profil
                  </router-link>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0 pt-0">
                <div class="d-flex flex-wrap gap-1">
                  <span v-for="(style, i) in teacher.styles" :key="i" class="badge bg-light text-primary me-1 mb-1">
                    {{ style }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <nav class="mt-5">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Précédent</a>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Suivant</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    
    <!-- Become a Teacher CTA -->
    <section class="gradient-bg text-white py-5">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">Vous êtes un professeur de danse ?</h2>
        <p class="lead mb-4 mx-auto" style="max-width: 700px;">Rejoignez notre plateforme et partagez votre passion avec des élèves du monde entier.</p>
        <button @click="openSignupTeacherModal" class="btn btn-light text-primary rounded-pill px-4 py-2 fw-semibold">
          Devenir professeur
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'ProfesseursView',
  data() {
    return {
      teachers: [],
      styles: [],
      searchQuery: '',
      selectedStyle: '',
      sortBy: 'rating',
      currentPage: 1,
      itemsPerPage: 9,
      isLoading: false
    };
  },
  computed: {
    filteredTeachers() {
      let result = [...this.teachers];
      
      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(teacher => 
          teacher.name.toLowerCase().includes(query) || 
          teacher.bio.toLowerCase().includes(query) ||
          teacher.specialties.toLowerCase().includes(query)
        );
      }
      
      // Apply style filter
      if (this.selectedStyle) {
        const styleId = parseInt(this.selectedStyle);
        result = result.filter(teacher => 
          teacher.styleIds.includes(styleId)
        );
      }
      
      // Apply sorting
      switch (this.sortBy) {
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'courses':
          result.sort((a, b) => b.courseCount - a.courseCount);
          break;
        case 'experience':
          result.sort((a, b) => b.yearsExperience - a.yearsExperience);
          break;
      }
      
      // Apply pagination
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return result.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.teachers.length / this.itemsPerPage);
    }
  },
  mounted() {
    this.fetchTeachers();
    this.fetchStyles();
  },
  methods: {
    async fetchTeachers() {
      this.isLoading = true;
      try {
        const response = await api.teachers.getAll();
        if (response.data) {
          this.teachers = response.data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des professeurs:', error);
        // Use sample data if API fails
        this.loadSampleData();
      } finally {
        this.isLoading = false;
      }
    },
    async fetchStyles() {
      try {
        const response = await api.styles.getAll();
        if (response.data) {
          this.styles = response.data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des styles:', error);
        // Use sample styles if API fails
        this.styles = [
          { id: 1, name: 'Hip Hop' },
          { id: 2, name: 'Contemporain' },
          { id: 3, name: 'Salsa' },
          { id: 4, name: 'Ballet' },
          { id: 5, name: 'Jazz' }
        ];
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo(0, 0);
      }
    },
    openSignupTeacherModal() {
      this.$root.$emit('open-signup-modal');
      // Note: In a real implementation, we would need to add a way to pre-select the teacher role
    },
    loadSampleData() {
      this.teachers = [
        {
          id: 1,
          name: 'Marie Laurent',
          specialties: 'Contemporain, Moderne',
          bio: 'Danseuse contemporaine professionnelle avec plus de 10 ans d\'expérience en enseignement.',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          rating: 4.9,
          reviewCount: 128,
          courseCount: 5,
          yearsExperience: 10,
          styleIds: [2, 7],
          styles: ['Contemporain', 'Moderne']
        },
        {
          id: 2,
          name: 'Jamal Kone',
          specialties: 'Hip Hop, Breakdance',
          bio: 'Ancien danseur de rue devenu instructeur professionnel avec une passion pour l\'enseignement.',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: 4.8,
          reviewCount: 95,
          courseCount: 3,
          yearsExperience: 8,
          styleIds: [1, 8],
          styles: ['Hip Hop', 'Breakdance']
        },
        {
          id: 3,
          name: 'Isabella Rodriguez',
          specialties: 'Salsa, Bachata',
          bio: 'Championne de danse latine spécialisée dans l\'enseignement de mouvements complexes accessibles à tous.',
          avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
          rating: 5.0,
          reviewCount: 142,
          courseCount: 4,
          yearsExperience: 12,
          styleIds: [3],
          styles: ['Salsa', 'Bachata']
        },
        {
          id: 4,
          name: 'Sophie Dubois',
          specialties: 'Ballet, Jazz',
          bio: 'Ancienne danseuse de l\'Opéra de Paris, je partage ma passion pour le ballet classique et le jazz.',
          avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
          rating: 4.7,
          reviewCount: 87,
          courseCount: 6,
          yearsExperience: 15,
          styleIds: [4, 5],
          styles: ['Ballet', 'Jazz']
        },
        {
          id: 5,
          name: 'Alexandre Martin',
          specialties: 'Tap, Jazz',
          bio: 'Spécialiste des claquettes avec une approche moderne et dynamique de l\'enseignement.',
          avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          rating: 4.6,
          reviewCount: 64,
          courseCount: 2,
          yearsExperience: 7,
          styleIds: [5, 6],
          styles: ['Tap', 'Jazz']
        }
      ];
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

.hover-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-scale:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.page-link {
  color: #8a2be2;
}

.page-item.active .page-link {
  background-color: #8a2be2;
  border-color: #8a2be2;
}

.text-primary {
  color: #8a2be2 !important;
}

.bg-light {
  background-color: #f8f9fa !important;
}
</style>