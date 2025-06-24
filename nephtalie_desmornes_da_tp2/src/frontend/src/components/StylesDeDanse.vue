<template>
  <section class="bg-light py-5 section-padding">
    <div class="container">
      <h2 class="text-center fw-bold mb-5">Explorez les styles de danse</h2>
      
      <div class="row g-4">
        <div v-for="(style, index) in styles" :key="index" class="col-6 col-md-4 col-lg-3">
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
</template>

<script>
import api from '@/services/api';

export default {
  name: 'StylesDeDanse',
  data() {
    return {
      styles: [
        // Default data in case API is not available
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
      ]
    };
  },
  mounted() {
    this.fetchStyles();
  },
  methods: {
    async fetchStyles() {
      try {
        const response = await api.styles.getAll();
        if (response.data && response.data.length > 0) {
          this.styles = response.data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des styles de danse:', error);
        // Keep using default data if API fails
      }
    },
    navigateToStyle(styleId) {
      this.$router.push({ path: `/styles/${styleId}` });
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
</style>