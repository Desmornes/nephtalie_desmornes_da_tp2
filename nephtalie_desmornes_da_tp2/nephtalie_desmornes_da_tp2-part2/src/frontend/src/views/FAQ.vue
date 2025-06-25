<template>
  <div>
    <!-- Header Banner -->
    <div class="gradient-bg text-white py-5">
      <div class="container">
        <h1 class="display-5 fw-bold mb-3">Foire aux questions</h1>
        <p class="lead">Trouvez des réponses à vos questions les plus fréquentes.</p>
      </div>
    </div>
    
    <!-- FAQ Section -->
    <section class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <!-- FAQ Categories -->
            <div class="mb-5">
              <ul class="nav nav-pills justify-content-center">
                <li class="nav-item mx-1 mb-2">
                  <button 
                    class="nav-link px-4 rounded-pill" 
                    :class="{ active: selectedCategory === 'all' }"
                    @click="selectedCategory = 'all'"
                  >
                    Toutes
                  </button>
                </li>
                <li v-for="(category, index) in categories" :key="index" class="nav-item mx-1 mb-2">
                  <button 
                    class="nav-link px-4 rounded-pill" 
                    :class="{ active: selectedCategory === category.id }"
                    @click="selectedCategory = category.id"
                  >
                    {{ category.name }}
                  </button>
                </li>
              </ul>
            </div>
            
            <!-- Search -->
            <div class="mb-5">
              <div class="input-group">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Rechercher une question" 
                  v-model="searchQuery"
                >
                <button class="btn btn-outline-primary" type="button">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
            
            <!-- FAQ Accordion -->
            <div class="accordion" id="faqAccordion">
              <div v-if="filteredFAQs.length === 0" class="text-center py-5">
                <p class="text-muted">Aucune question ne correspond à votre recherche.</p>
              </div>
              
              <div 
                v-for="(item, index) in filteredFAQs" 
                :key="index" 
                class="accordion-item border mb-3 rounded-3 overflow-hidden"
              >
                <h3 class="accordion-header">
                  <button 
                    class="accordion-button fw-semibold collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    :data-bs-target="'#faqCollapse' + index"
                    :aria-expanded="index === 0 ? 'true' : 'false'"
                    :aria-controls="'faqCollapse' + index"
                  >
                    {{ item.question }}
                  </button>
                </h3>
                <div 
                  :id="'faqCollapse' + index" 
                  class="accordion-collapse collapse" 
                  :class="{ 'show': index === 0 }"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body text-muted">
                    {{ item.answer }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Still Have Questions -->
            <div class="text-center mt-5 p-5 bg-light rounded-3">
              <h3 class="fw-bold mb-3">Vous avez encore des questions ?</h3>
              <p class="mb-4">Notre équipe de support est là pour vous aider avec toutes vos questions.</p>
              <a href="#" class="btn btn-primary rounded-pill px-4 py-2">Contacter le support</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'FAQView',
  data() {
    return {
      faqItems: [],
      categories: [],
      selectedCategory: 'all',
      searchQuery: '',
      isLoading: false
    };
  },
  computed: {
    filteredFAQs() {
      let result = [...this.faqItems];
      
      // Apply category filter
      if (this.selectedCategory !== 'all') {
        result = result.filter(item => item.categoryId === this.selectedCategory);
      }
      
      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(item => 
          item.question.toLowerCase().includes(query) || 
          item.answer.toLowerCase().includes(query)
        );
      }
      
      return result;
    }
  },
  mounted() {
    this.fetchFAQs();
    this.fetchCategories();
  },
  methods: {
    async fetchFAQs() {
      this.isLoading = true;
      try {
        const response = await api.faq.getAll();
        if (response.data) {
          this.faqItems = response.data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des FAQs:', error);
        // Use sample data if API fails
        this.loadSampleData();
      } finally {
        this.isLoading = false;
      }
    },
    async fetchCategories() {
      try {
        // In a real app, you would fetch categories from the API
        this.categories = [
          { id: 'general', name: 'Général' },
          { id: 'courses', name: 'Cours' },
          { id: 'teachers', name: 'Professeurs' },
          { id: 'payment', name: 'Paiement' },
          { id: 'technical', name: 'Technique' }
        ];
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    },
    loadSampleData() {
      this.faqItems = [
        {
          id: 1,
          question: 'Combien coûte l\'adhésion à DanseKonnect ?',
          answer: 'DanseKonnect est entièrement gratuit pour les étudiants qui souhaitent suivre des cours. Les professeurs peuvent proposer leurs cours gratuitement ou fixer leurs propres tarifs pour du contenu premium. Notre plateforme ne prélève qu\'un petit pourcentage sur les cours payants pour maintenir le service.',
          categoryId: 'general'
        },
        {
          id: 2,
          question: 'Ai-je besoin d\'expérience en danse pour m\'inscrire ?',
          answer: 'Pas du tout ! Nous proposons des cours pour tous les niveaux, des débutants absolus aux danseurs avancés. Nos professeurs sont compétents pour adapter leur enseignement à différents niveaux de compétence, et vous pouvez toujours trouver des cours marqués comme "adaptés aux débutants" pour commencer.',
          categoryId: 'courses'
        },
        {
          id: 3,
          question: 'De quel équipement ai-je besoin pour les cours en ligne ?',
          answer: 'Pour la plupart des cours, vous avez simplement besoin d\'un appareil avec accès à Internet (ordinateur, tablette ou smartphone) et d\'un espace suffisant pour bouger en toute sécurité. Certains cours peuvent recommander des chaussures ou des vêtements spécifiques, mais cela sera clairement indiqué dans la description du cours.',
          categoryId: 'technical'
        },
        {
          id: 4,
          question: 'Comment devenir professeur sur DanseKonnect ?',
          answer: 'Pour devenir professeur, inscrivez-vous simplement pour un compte professeur et complétez notre processus de vérification. Nous vous demanderons quelques informations sur votre parcours de danse et votre expérience d\'enseignement. Une fois approuvé, vous pourrez commencer à créer et à publier vos cours immédiatement !',
          categoryId: 'teachers'
        },
        {
          id: 5,
          question: 'Puis-je assister à des cours en personne via DanseKonnect ?',
          answer: 'Oui ! Bien que nous proposions de nombreux cours en ligne, nous connectons également les étudiants avec des cours en personne lorsqu\'ils sont disponibles. Vous pouvez filtrer les cours par emplacement pour trouver des cours près de chez vous, ou parcourir notre répertoire de studios de danse partenaires de DanseKonnect.',
          categoryId: 'courses'
        },
        {
          id: 6,
          question: 'Comment puis-je payer pour les cours premium ?',
          answer: 'Nous acceptons plusieurs méthodes de paiement, notamment les cartes de crédit/débit, PayPal et les virements bancaires dans certains pays. Toutes les transactions sont sécurisées et vous recevrez une confirmation par e-mail après chaque achat.',
          categoryId: 'payment'
        },
        {
          id: 7,
          question: 'Puis-je obtenir un remboursement si je n\'aime pas un cours ?',
          answer: 'Oui, nous offrons une garantie de satisfaction de 14 jours pour tous les cours premium. Si vous n\'êtes pas satisfait d\'un cours pour quelque raison que ce soit, vous pouvez demander un remboursement complet dans les 14 jours suivant l\'achat, à condition de ne pas avoir terminé plus de 30% du contenu du cours.',
          categoryId: 'payment'
        },
        {
          id: 8,
          question: 'Comment puis-je résoudre des problèmes techniques pendant un cours en ligne ?',
          answer: 'Si vous rencontrez des problèmes techniques pendant un cours en ligne, essayez d\'abord de rafraîchir votre navigateur ou de redémarrer l\'application. Assurez-vous que votre connexion Internet est stable. Nous proposons également une assistance technique en direct pendant les heures de bureau, accessible via le bouton "Support" dans le coin inférieur droit de chaque page de cours.',
          categoryId: 'technical'
        }
      ];
    }
  }
}
</script>

<style scoped>
.accordion-item {
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.accordion-button:not(.collapsed) {
  background-color: #8a2be2;
  color: white;
  box-shadow: none;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(138, 43, 226, 0.25);
}

.accordion-button::after {
  transition: transform 0.3s ease;
}

.nav-pills .nav-link {
  color: #8a2be2;
}

.nav-pills .nav-link.active {
  background-color: #8a2be2;
  color: white;
}

.btn-primary {
  background-color: #8a2be2;
  border-color: #8a2be2;
}

.btn-primary:hover, .btn-primary:focus {
  background-color: #7525c1;
  border-color: #7525c1;
}

.btn-outline-primary {
  color: #8a2be2;
  border-color: #8a2be2;
}

.btn-outline-primary:hover, .btn-outline-primary:focus {
  background-color: #8a2be2;
  color: white;
}
</style>