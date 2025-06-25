<template>
  <div>
    <!-- Header Banner -->
    <div class="gradient-bg text-white py-5">
      <div class="container">
        <h1 class="display-5 fw-bold mb-3">Nos cours de danse</h1>
        <p class="lead">Découvrez notre sélection de cours pour tous les niveaux et tous les styles.</p>
      </div>
    </div>
    
    <!-- Courses Section -->
    <section class="py-5">
      <div class="container">
        <!-- Filters -->
        <div class="row mb-5">
          <div class="col-md-8">
            <div class="d-flex flex-wrap gap-2">
              <div class="input-group mb-3 mb-md-0" style="max-width: 300px;">
                <input type="text" class="form-control" placeholder="Rechercher un cours" v-model="searchQuery">
                <button class="btn btn-outline-primary" type="button">
                  <i class="fa fa-search"></i>
                </button>
              </div>
              
              <select class="form-select mb-3 mb-md-0" v-model="selectedStyle" style="max-width: 200px;">
                <option value="">Tous les styles</option>
                <option v-for="style in styles" :key="style.id" :value="style.id">{{ style.name }}</option>
              </select>
              
              <select class="form-select mb-3 mb-md-0" v-model="selectedLevel" style="max-width: 200px;">
                <option value="">Tous les niveaux</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </div>
          </div>
          <div class="col-md-4 text-md-end">
            <select class="form-select mb-3 mb-md-0" v-model="sortBy" style="max-width: 200px; margin-left: auto;">
              <option value="newest">Plus récents</option>
              <option value="popular">Plus populaires</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>
        
        <!-- Course List -->
        <div class="row g-4">
          <div v-if="filteredCourses.length === 0" class="col-12 text-center py-5">
            <p class="text-muted">Aucun cours ne correspond à votre recherche.</p>
          </div>
          
          <div v-for="(course, index) in filteredCourses" :key="index" class="col-md-6 col-lg-4">
            <div class="card h-100 hover-scale">
              <div class="position-relative">
                <img :src="course.image" :alt="course.title" class="card-img-top" style="height: 200px; object-fit: cover;">
                <span class="position-absolute top-0 end-0 bg-primary text-white m-2 px-2 py-1 rounded-pill small">
                  {{ course.type }}
                </span>
              </div>
              <div class="card-body">
                <h5 class="card-title fw-bold">{{ course.title }}</h5>
                <p class="card-text text-muted mb-3">{{ course.description }}</p>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <img :src="course.teacher.avatar" :alt="course.teacher.name" class="rounded-circle me-2" width="32" height="32">
                    <span class="small">{{ course.teacher.name }}</span>
                  </div>
                  <span class="badge bg-light text-primary">{{ course.level }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-semibold">{{ course.price }}</span>
                  <router-link :to="`/cours/${course.id}`" class="btn btn-sm btn-outline-primary rounded-pill">
                    Voir les détails
                  </router-link>
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
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'CoursView',
  data() {
    return {
      courses: [],
      styles: [],
      searchQuery: '',
      selectedStyle: '',
      selectedLevel: '',
      sortBy: 'newest',
      currentPage: 1,
      itemsPerPage: 9,
      isLoading: false
    };
  },
  computed: {
    filteredCourses() {
      let result = [...this.courses];
      
      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(course => 
          course.title.toLowerCase().includes(query) || 
          course.description.toLowerCase().includes(query)
        );
      }
      
      // Apply style filter
      if (this.selectedStyle) {
        result = result.filter(course => course.styleId === this.selectedStyle);
      }
      
      // Apply level filter
      if (this.selectedLevel) {
        result = result.filter(course => course.level === this.selectedLevel);
      }
      
      // Apply sorting
      switch (this.sortBy) {
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'popular':
          result.sort((a, b) => b.enrollments - a.enrollments);
          break;
        case 'price-asc':
          result.sort((a, b) => a.priceValue - b.priceValue);
          break;
        case 'price-desc':
          result.sort((a, b) => b.priceValue - a.priceValue);
          break;
      }
      
      // Apply pagination
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return result.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
    }
  },
  mounted() {
    this.fetchCourses();
    this.fetchStyles();
  },
  methods: {
    async fetchCourses() {
      this.isLoading = true;
      try {
        const response = await api.courses.getAll();
        if (response.data) {
          this.courses = response.data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des cours:', error);
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
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo(0, 0);
      }
    },
    loadSampleData() {
      // Sample data for demonstration
      this.courses = [
        {
          id: 1,
          title: 'Bases de danse contemporaine',
          description: 'Apprenez les fondamentaux de la danse contemporaine avec ce cours adapté aux débutants.',
          image: 'https://images.unsplash.com/photo-1508700929621-771618f0a6ac',
          type: 'En ligne',
          level: 'beginner',
          styleId: 2,
          teacher: {
            name: 'Marie L.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          price: 'Gratuit',
          priceValue: 0,
          enrollments: 120,
          createdAt: '2023-05-15'
        },
        {
          id: 2,
          title: 'Hip Hop Grooves',
          description: 'Maîtrisez les mouvements et grooves fondamentaux de la danse hip hop.',
          image: 'https://images.unsplash.com/photo-1514525257171-8dc03a83e2b0',
          type: 'En personne',
          level: 'intermediate',
          styleId: 1,
          teacher: {
            name: 'Jamal K.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          price: '29,99 €',
          priceValue: 29.99,
          enrollments: 85,
          createdAt: '2023-06-01'
        },
        {
          id: 3,
          title: 'Salsa pour débutants',
          description: 'Apprenez les pas de base et les tours de salsa dans ce cours d\'introduction amusant.',
          image: 'https://images.unsplash.com/photo-1531545513506-455e3f1af7e9',
          type: 'En ligne',
          level: 'beginner',
          styleId: 3,
          teacher: {
            name: 'Isabella R.',
            avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
          },
          price: 'Gratuit',
          priceValue: 0,
          enrollments: 210,
          createdAt: '2023-05-20'
        }
      ];
      
      this.styles = [
        { id: 1, name: 'Hip Hop' },
        { id: 2, name: 'Contemporain' },
        { id: 3, name: 'Salsa' },
        { id: 4, name: 'Ballet' },
        { id: 5, name: 'Jazz' }
      ];
    }
  }
}
</script>

<style scoped>
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
</style>