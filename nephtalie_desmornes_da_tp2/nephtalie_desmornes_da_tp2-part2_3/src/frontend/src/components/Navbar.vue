<template>
  <nav class="navbar navbar-expand-md navbar-dark gradient-bg">
    <div class="container">
      <!-- Logo -->
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <i class="fa fa-heart me-2"></i>
        <span class="fw-bold">Danse<span class="logo-k">K</span>onnect</span>
      </router-link>

      <!-- Mobile toggle button -->
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarContent"
        aria-controls="navbarContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <i class="fa fa-bars"></i>
      </button>

      <!-- Navigation links -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto mb-2 mb-md-0 me-md-4">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cours">Cours</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/styles">Styles</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/professeurs">Professeurs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/faq">
              <i class="fa fa-question-circle"></i>
            </router-link>
          </li>
        </ul>

        <!-- Auth buttons -->
        <div class="d-flex flex-column flex-md-row gap-2">
          <button 
            @click="openLoginModal" 
            class="btn btn-outline-light rounded-pill"
          >
            Connexion
          </button>
          <button 
            @click="openSignupModal" 
            class="btn btn-light text-primary rounded-pill"
          >
            Inscription
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    openLoginModal() {
      this.$eventBus.emit('open-login-modal');
    },
    openSignupModal() {
      this.$eventBus.emit('open-signup-modal');
    }
  }
}
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  font-weight: 500;
}

/* Custom underline animation for nav links */
.nav-link::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.3s;
  position: absolute;
  bottom: 0;
  left: 0;
}

.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
}

@media (max-width: 767.98px) {
  .nav-link::after {
    display: none;
  }

  .nav-link:hover,
  .router-link-active {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.25rem;
  }
}
</style>
