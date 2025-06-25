<template>
  <section id="faq" class="bg-white py-5 section-padding">
    <div class="container">
      <h2 class="text-center fw-bold mb-5">Foire aux questions</h2>
      
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="accordion" id="faqAccordion">
            <div v-for="(item, index) in faqItems" :key="index" class="accordion-item border mb-3 rounded-3 overflow-hidden">
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
          
          <div class="text-center mt-5">
            <p class="mb-3">Vous avez encore des questions ? Nous sommes là pour vous aider !</p>
            <a href="#" class="btn btn-primary rounded-pill px-4 py-2">Contacter le support</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'FAQ',
  data() {
    return {
      faqItems: [
        // Default data in case API is not available
        {
          id: 1,
          question: 'Combien coûte l\'adhésion à DanseKonnect ?',
          answer: 'DanseKonnect est entièrement gratuit pour les étudiants qui souhaitent suivre des cours. Les professeurs peuvent proposer leurs cours gratuitement ou fixer leurs propres tarifs pour du contenu premium. Notre plateforme ne prélève qu\'un petit pourcentage sur les cours payants pour maintenir le service.'
        },
        {
          id: 2,
          question: 'Ai-je besoin d\'expérience en danse pour m\'inscrire ?',
          answer: 'Pas du tout ! Nous proposons des cours pour tous les niveaux, des débutants absolus aux danseurs avancés. Nos professeurs sont compétents pour adapter leur enseignement à différents niveaux de compétence, et vous pouvez toujours trouver des cours marqués comme "adaptés aux débutants" pour commencer.'
        },
        {
          id: 3,
          question: 'De quel équipement ai-je besoin pour les cours en ligne ?',
          answer: 'Pour la plupart des cours, vous avez simplement besoin d\'un appareil avec accès à Internet (ordinateur, tablette ou smartphone) et d\'un espace suffisant pour bouger en toute sécurité. Certains cours peuvent recommander des chaussures ou des vêtements spécifiques, mais cela sera clairement indiqué dans la description du cours.'
        },
        {
          id: 4,
          question: 'Comment devenir professeur sur DanseKonnect ?',
          answer: 'Pour devenir professeur, inscrivez-vous simplement pour un compte professeur et complétez notre processus de vérification. Nous vous demanderons quelques informations sur votre parcours de danse et votre expérience d\'enseignement. Une fois approuvé, vous pourrez commencer à créer et à publier vos cours immédiatement !'
        },
        {
          id: 5,
          question: 'Puis-je assister à des cours en personne via DanseKonnect ?',
          answer: 'Oui ! Bien que nous proposions de nombreux cours en ligne, nous connectons également les étudiants avec des cours en personne lorsqu\'ils sont disponibles. Vous pouvez filtrer les cours par emplacement pour trouver des cours près de chez vous, ou parcourir notre répertoire de studios de danse partenaires de DanseKonnect.'
        }
      ]
    };
  },
  mounted() {
    this.fetchFAQ();
  },
  methods: {
    async fetchFAQ() {
      try {
        const response = await api.faq.getAll();
        if (response.data && response.data.length > 0) {
          this.faqItems = response.data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des FAQ:', error);
        // Keep using default data if API fails
      }
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
</style>