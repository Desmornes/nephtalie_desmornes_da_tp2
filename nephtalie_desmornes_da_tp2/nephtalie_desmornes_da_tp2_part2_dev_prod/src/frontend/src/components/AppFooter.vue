<template>
  <footer class="bg-dark text-white pt-5 pb-3">
    <div class="container">
      <div class="row gy-4">
        <!-- Column 1: Logo and description -->
        <div class="col-md-6 col-lg-3">
          <div class="d-flex align-items-center mb-3">
            <i class="fa fa-heart me-2"></i>
            <span class="fs-4 fw-bold">Danse<span class="logo-k">K</span>onnect</span>
          </div>
          <p class="text-light mb-4">Connecter les danseurs du monde entier par la joie du mouvement et la passion partagée.</p>
          <div class="d-flex gap-3">
            <a href="#" class="text-light hover-text-white">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="#" class="text-light hover-text-white">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="#" class="text-light hover-text-white">
              <i class="fa fa-instagram"></i>
            </a>
            <a href="#" class="text-light hover-text-white">
              <i class="fa fa-youtube"></i>
            </a>
          </div>
        </div>

        <!-- Column 2: Quick Links -->
        <div class="col-md-6 col-lg-3">
          <h3 class="fs-5 fw-semibold mb-3">Liens rapides</h3>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/" class="text-white-50 hover-text-white text-decoration-none fw-normal">Accueil</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/cours" class="text-white-50 hover-text-white text-decoration-none fw-normal">Cours</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/styles" class="text-white-50 hover-text-white text-decoration-none fw-normal">Styles de danse</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/professeurs" class="text-white-50 hover-text-white text-decoration-none fw-normal">Professeurs</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/faq" class="text-white-50 hover-text-white text-decoration-none fw-normal">FAQ</router-link>
            </li>
          </ul>
        </div>

        <!-- Column 3: Legal -->
        <div class="col-md-6 col-lg-3">
          <h3 class="fs-5 fw-semibold mb-3">Légal</h3>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="#" class="text-white-50 hover-text-white text-decoration-none fw-normal">Conditions d'utilisation</a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-white-50 hover-text-white text-decoration-none fw-normal">Politique de confidentialité</a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-white-50 hover-text-white text-decoration-none fw-normal">Politique de cookies</a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-white-50 hover-text-white text-decoration-none fw-normal">Règles de la communauté</a>
            </li>
          </ul>
        </div>

        <!-- Column 4: Newsletter -->
        <div class="col-md-6 col-lg-3">
          <h3 class="fs-5 fw-semibold mb-3">Newsletter</h3>
          <p class="text-white-50 mb-3">Abonnez-vous pour recevoir des mises à jour sur les nouveaux cours, événements et conseils de danse !</p>
          <form class="d-flex">
            <input type="email" placeholder="Votre email" class="form-control rounded-start rounded-0" aria-label="Email pour newsletter">
            <button type="submit" class="btn btn-primary rounded-end rounded-0">
              <i class="fa fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-top border-secondary mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p class="text-white-50 mb-3 mb-md-0">© 2025 DanseKonnect. Tous droits réservés.</p>
        <div class="d-flex gap-4">
          <a href="#" class="text-white-50 hover-text-white text-decoration-none fw-normal">Contact</a>
          <a href="#" class="text-white-50 hover-text-white text-decoration-none fw-normal">Carrières</a>
          <a href="#" class="text-white-50 hover-text-white text-decoration-none fw-normal">Presse</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.hover-text-white {
  transition: color 0.3s ease;
}

.hover-text-white:hover {
  color: white !important;
}

.logo-k {
  color: #8a2be2;
  font-weight: 700;
  font-style: italic;
}

.btn-primary {
  background-color: #8a2be2;
  border-color: #8a2be2;
}

.btn-primary:hover {
  background-color: #7525c1;
  border-color: #7525c1;
}
</style>
