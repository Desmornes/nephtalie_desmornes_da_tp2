<template>
  <section class="gradient-bg text-white py-5 py-md-6">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 mb-5 mb-md-0">
          <h1 class="display-4 fw-bold mb-4">
            Move. Share. <span class="logo-k">K</span>onnect.
          </h1>
          <p class="lead mb-4">
            Rejoignez la communauté mondiale de danse. Apprenez des meilleurs, partagez votre passion et connectez-vous avec des danseurs du monde entier.
          </p>
          <div class="d-flex flex-column flex-sm-row gap-3">
            <router-link 
              to="/cours" 
              class="btn btn-light text-primary rounded-pill px-4 py-2 fw-semibold"
            >
              Voir les cours
            </router-link>
            <button 
              @click="openSignupModal" 
              class="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold"
            >
              Devenir professeur
            </button>
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center">
          <div class="position-relative">
            <!-- Decorative circles -->
            <div class="position-absolute top-0 start-0 translate-middle bg-purple-300 rounded-circle opacity-25" style="width: 8rem; height: 8rem;"></div>
            <div class="position-absolute bottom-0 end-0 translate-middle bg-purple-300 rounded-circle opacity-25" style="width: 8rem; height: 8rem;"></div>

            <!-- Hero image -->
            <img 
              src="https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
              alt="Danseurs" 
              class="img-fluid rounded-3 shadow-lg position-relative hover-scale"
              style="z-index: 1;"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroAccueil',
  methods: {
    openSignupModal() {
      this.$eventBus.emit('open-signup-modal');
    }
  }
}
</script>

<style scoped>
.py-md-6 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.bg-purple-300 {
  background-color: #d8b4fe;
}

@media (max-width: 767.98px) {
  .display-4 {
    font-size: 2.5rem;
  }
}
</style>
