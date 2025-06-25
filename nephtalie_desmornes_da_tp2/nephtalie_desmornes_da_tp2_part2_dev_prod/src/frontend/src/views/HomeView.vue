<template>
  <div>
    <HeroAccueil />
    <CoursSection />
    <StylesDeDanse />
    <ProfesseursSection />
    <TemoignagesSection />
    <div class="gradient-bg text-white py-5 section-padding">
      <div class="container text-center">
        <h2 class="display-6 fw-bold mb-4">Prêt à commencer votre aventure de danse ?</h2>
        <p class="lead mb-4 mx-auto" style="max-width: 700px;">Rejoignez des milliers de danseurs du monde entier. C'est gratuit de s'inscrire et de commencer à apprendre !</p>
        <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <button @click="openSignupModal" class="btn btn-light text-primary rounded-pill px-4 py-2 fw-semibold">
            S'inscrire comme étudiant
          </button>
          <button @click="openSignupTeacherModal" class="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold">
            Devenir professeur
          </button>
        </div>
      </div>
    </div>
    <FAQ />
  </div>
</template>

<script>
import HeroAccueil from '@/components/HeroAccueil.vue';
import CoursSection from '@/components/CoursSection.vue';
import StylesDeDanse from '@/components/StylesDeDanse.vue';
import ProfesseursSection from '@/components/ProfesseursSection.vue';
import TemoignagesSection from '@/components/TemoignagesSection.vue';
import FAQ from '@/components/FAQ.vue';

export default {
  name: 'HomeView',
  components: {
    HeroAccueil,
    CoursSection,
    StylesDeDanse,
    ProfesseursSection,
    TemoignagesSection,
    FAQ
  },
  methods: {
    openSignupModal() {
      this.$eventBus.emit('open-signup-modal');
    },
    openSignupTeacherModal() {
      // Pre-select teacher role and open signup modal
      this.$eventBus.emit('open-signup-modal');
      // Note: In a real implementation, we would need to add a way to pre-select the teacher role
      // This could be done by extending the event system or using a state management solution like Vuex
    }
  }
}
</script>

<style scoped>
.section-padding {
  padding: 5rem 0;
}
</style>
