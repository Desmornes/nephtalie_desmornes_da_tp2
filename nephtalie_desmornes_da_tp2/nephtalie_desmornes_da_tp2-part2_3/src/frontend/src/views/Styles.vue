<template>
  <div>
    <!-- Header Banner -->
    <div class="gradient-bg text-white py-5">
      <div class="container">
        <h1 class="display-5 fw-bold mb-3">Styles de danse</h1>
        <p class="lead">Explorez les différents styles de danse et trouvez celui qui vous passionne.</p>
      </div>
    </div>
    
    <!-- Styles Section -->
    <section class="py-5">
      <div class="container">
        <!-- Search and Filter -->
        <div class="row mb-5">
          <div class="col-md-6">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Rechercher un style" v-model="searchQuery">
              <button class="btn btn-outline-primary" type="button">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Styles Grid -->
        <div class="row g-4">
          <div v-if="filteredStyles.length === 0" class="col-12 text-center py-5">
            <p class="text-muted">Aucun style ne correspond à votre recherche.</p>
          </div>
          
          <div v-for="(style, index) in filteredStyles" :key="index" class="col-6 col-md-4 col-lg-3">
            <div 
              class="dance-card rounded-3 shadow-sm position-relative cursor-pointer"
              :style="{ backgroundImage: `url(${style.image})` }"
              @click="navigateToStyle(style.id)"
            >
              <div class="position-absolute bottom-0 start-0 end-0 p-3">
                <h3 class="text-white fw-bold mb-0">{{ style.name }}</h3>
                <p class="text-white small mb-0">{{ style.courseCount }} cours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Courses by Style -->
    <section v-if="selectedStyle" class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Cours de {{ selectedStyle.name }}</h2>
        
        <div class="row g-4">
          <div v-for="(course, index) in styleCourses" :key="index" class="col-md-6 col-lg-4">
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
          
          <div class="col-12 text-center mt-4">
            <router-link :to="`/styles/${selectedStyle.id}`" class="btn btn-primary rounded-pill px-4 py-2">
              Voir tous les cours de {{ selectedStyle.name }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'StylesView',
  data() {
    return {
      styles: [],
      searchQuery: '',
      selectedStyle: null,
      styleCourses: [],
      isLoading: false
    };
  },
  computed: {
    filteredStyles() {
      if (!this.searchQuery) {
        return this.styles;
      }
      
      const query = this.searchQuery.toLowerCase();
      return this.styles.filter(style => 
        style.name.toLowerCase().includes(query)
      );
    }
  },
  mounted() {
    this.fetchStyles();
  },
  methods: {
    async fetchStyles() {
      this.isLoading = true;
      try {
        const response = await api.styles.getAll();
        if (response.data) {
          this.styles = response.data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des styles:', error);
        // Use sample data if API fails
        this.loadSampleData();
      } finally {
        this.isLoading = false;
      }
    },
    async navigateToStyle(styleId) {
      this.isLoading = true;
      try {
        // Find the selected style
        this.selectedStyle = this.styles.find(style => style.id === styleId);
        
        if (this.selectedStyle) {
          // Fetch courses for this style
          const response = await api.styles.getCoursesByStyle(styleId);
          if (response.data) {
            this.styleCourses = response.data;
          }
        }
      } catch (error) {
        console.error(`Erreur lors du chargement des cours pour le style ${styleId}:`, error);
        // Use sample data if API fails
        this.loadSampleCourses(styleId);
      } finally {
        this.isLoading = false;
        
        // Scroll to the courses section
        setTimeout(() => {
          const coursesSection = document.querySelector('.bg-light');
          if (coursesSection) {
            coursesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    },
    loadSampleData() {
      this.styles = [
        {
          id: 1,
          name: 'Hip Hop',
          courseCount: 12,
          image: 'https://images.unsplash.com/photo-1514525257171-8dc03a83e2b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
        },
        {
          id: 2,
          name: 'Contemporain',
          courseCount: 8,
          image: 'https://images.unsplash.com/photo-1508700929621-771618f0a6ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
        },
        {
          id: 3,
          name: 'Salsa',
          courseCount: 6,
          image: 'https://images.unsplash.com/photo-1531545513506-455e3f1af7e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
        },
        {
          id: 4,
          name: 'Ballet',
          courseCount: 10,
          image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        {
          id: 5,
          name: 'Jazz',
          courseCount: 7,
          image: 'https://images.unsplash.com/photo-1567942712661-82b9b407abbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
        },
        {
          id: 6,
          name: 'Tap',
          courseCount: 5,
          image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80'
        },
        {
          id: 7,
          name: 'Moderne',
          courseCount: 9,
          image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
        },
        {
          id: 8,
          name: 'Breakdance',
          courseCount: 4,
          image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        }
      ];
    },
    loadSampleCourses(styleId) {
      // Sample courses for the selected style
      const sampleCourses = {
        1: [ // Hip Hop
          {
            id: 101,
            title: 'Hip Hop Grooves',
            description: 'Maîtrisez les mouvements et grooves fondamentaux de la danse hip hop.',
            image: 'https://images.unsplash.com/photo-1514525257171-8dc03a83e2b0',
            type: 'En personne',
            level: 'Intermédiaire',
            teacher: {
              name: 'Jamal K.',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
            },
            price: '29,99 €'
          },
          {
            id: 102,
            title: 'Breakdance pour débutants',
            description: 'Apprenez les bases du breakdance avec des mouvements simples et progressifs.',
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
            type: 'En ligne',
            level: 'Débutant',
            teacher: {
              name: 'Alex M.',
              avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
            },
            price: 'Gratuit'
          }
        ],
        2: [ // Contemporain
          {
            id: 201,
            title: 'Bases de danse contemporaine',
            description: 'Apprenez les fondamentaux de la danse contemporaine avec ce cours adapté aux débutants.',
            image: 'https://images.unsplash.com/photo-1508700929621-771618f0a6ac',
            type: 'En ligne',
            level: 'Débutant',
            teacher: {
              name: 'Marie L.',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            price: 'Gratuit'
          }
        ],
        3: [ // Salsa
          {
            id: 301,
            title: 'Salsa pour débutants',
            description: 'Apprenez les pas de base et les tours de salsa dans ce cours d\'introduction amusant.',
            image: 'https://images.unsplash.com/photo-1531545513506-455e3f1af7e9',
            type: 'En ligne',
            level: 'Débutant',
            teacher: {
              name: 'Isabella R.',
              avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
            },
            price: 'Gratuit'
          }
        ]
      };
      
      this.styleCourses = sampleCourses[styleId] || [];
    }
  }
}
</script>

<style scoped>
.dance-card {
  background-size: cover;
  background-position: center;
  height: 200px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.dance-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease;
}

.dance-card:hover::before {
  background: rgba(0, 0, 0, 0.2);
}

.dance-card:hover {
  transform: scale(1.03);
}

.cursor-pointer {
  cursor: pointer;
}

.hover-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-scale:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
</style>