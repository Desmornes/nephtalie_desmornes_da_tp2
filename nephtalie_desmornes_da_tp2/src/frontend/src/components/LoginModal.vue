<template>
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header border-bottom-0 pb-0">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body px-4 pb-4 pt-0">
          <h2 class="text-center fw-bold mb-4" id="loginModalLabel">Connexion à DanseKonnect</h2>

          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="login-email" class="form-label text-muted">Email</label>
              <input 
                type="email" 
                id="login-email" 
                v-model="credentials.email"
                class="form-control form-control-lg" 
                required
              >
            </div>

            <div class="mb-4">
              <label for="login-password" class="form-label text-muted">Mot de passe</label>
              <input 
                type="password" 
                id="login-password" 
                v-model="credentials.password"
                class="form-control form-control-lg" 
                required
              >
            </div>

            <button 
              type="submit" 
              class="btn btn-primary w-100 py-3 rounded-pill fw-semibold mb-3"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Connexion
            </button>

            <div class="text-center">
              <a href="#" class="text-primary" @click.prevent="forgotPassword">Mot de passe oublié ?</a>
            </div>
          </form>

          <div class="mt-4 pt-4 border-top text-center">
            <p class="text-muted">
              Vous n'avez pas de compte ? 
              <a href="#" class="text-primary fw-semibold" @click.prevent="openSignupModal">Inscription</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import * as bootstrap from 'bootstrap';

export default {
  name: 'LoginModal',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      isLoading: false,
      error: null,
      modal: null
    };
  },
  mounted() {
    // Initialize the modal
    this.modal = new bootstrap.Modal(document.getElementById('loginModal'));

    // Listen for open-login-modal event
    this.$eventBus.on('open-login-modal', this.openModal);
  },
  beforeUnmount() {
    // Clean up event listener
    this.$eventBus.off('open-login-modal', this.openModal);
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    async login() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.auth.login(this.credentials);

        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);

        // Close the modal
        this.closeModal();

        // Reset form
        this.credentials = { email: '', password: '' };

        // Notify the user
        alert('Connexion réussie !');

        // Redirect or update UI as needed
        // this.$router.push('/dashboard');
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue lors de la connexion';
        alert(this.error);
      } finally {
        this.isLoading = false;
      }
    },
    forgotPassword() {
      // Implement forgot password functionality
      alert('Fonctionnalité de récupération de mot de passe à implémenter');
    },
    openSignupModal() {
      this.closeModal();
      this.$eventBus.emit('open-signup-modal');
    }
  }
}
</script>

<style scoped>
.modal-content {
  border: none;
}

.btn-primary {
  background-color: #8a2be2;
  border-color: #8a2be2;
}

.btn-primary:hover, .btn-primary:focus {
  background-color: #7525c1;
  border-color: #7525c1;
}

.text-primary {
  color: #8a2be2 !important;
}

.form-control:focus {
  border-color: rgba(138, 43, 226, 0.25);
  box-shadow: 0 0 0 0.25rem rgba(138, 43, 226, 0.25);
}
</style>
