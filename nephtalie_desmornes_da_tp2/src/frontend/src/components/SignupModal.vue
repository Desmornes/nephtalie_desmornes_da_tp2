<template>
  <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header border-bottom-0 pb-0">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body px-4 pb-4 pt-0">
          <h2 class="text-center fw-bold mb-4" id="signupModalLabel">Rejoindre DanseKonnect</h2>

          <form @submit.prevent="register">
            <div class="mb-3">
              <label class="form-label text-muted">Je souhaite m'inscrire en tant que :</label>
              <div class="d-flex gap-3">
                <div class="form-check custom-radio flex-grow-1">
                  <input 
                    type="radio" 
                    id="student-role" 
                    name="role" 
                    value="student" 
                    v-model="userData.role"
                    class="form-check-input visually-hidden" 
                    checked
                  >
                  <label 
                    for="student-role" 
                    class="form-check-label d-block text-center py-2 border rounded-3 cursor-pointer"
                    :class="{ 'bg-primary text-white': userData.role === 'student' }"
                  >
                    Étudiant
                  </label>
                </div>
                <div class="form-check custom-radio flex-grow-1">
                  <input 
                    type="radio" 
                    id="teacher-role" 
                    name="role" 
                    value="teacher" 
                    v-model="userData.role"
                    class="form-check-input visually-hidden"
                  >
                  <label 
                    for="teacher-role" 
                    class="form-check-label d-block text-center py-2 border rounded-3 cursor-pointer"
                    :class="{ 'bg-primary text-white': userData.role === 'teacher' }"
                  >
                    Professeur
                  </label>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="signup-name" class="form-label text-muted">Nom complet</label>
              <input 
                type="text" 
                id="signup-name" 
                v-model="userData.name"
                class="form-control form-control-lg" 
                required
              >
            </div>

            <div class="mb-3">
              <label for="signup-email" class="form-label text-muted">Email</label>
              <input 
                type="email" 
                id="signup-email" 
                v-model="userData.email"
                class="form-control form-control-lg" 
                required
              >
            </div>

            <div class="mb-4">
              <label for="signup-password" class="form-label text-muted">Mot de passe</label>
              <input 
                type="password" 
                id="signup-password" 
                v-model="userData.password"
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
              Créer un compte
            </button>

            <div class="text-center text-muted small">
              <p>En vous inscrivant, vous acceptez nos <a href="#" class="text-primary">Conditions d'utilisation</a> et notre <a href="#" class="text-primary">Politique de confidentialité</a>.</p>
            </div>
          </form>

          <div class="mt-4 pt-4 border-top text-center">
            <p class="text-muted">
              Vous avez déjà un compte ? 
              <a href="#" class="text-primary fw-semibold" @click.prevent="openLoginModal">Connexion</a>
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
  name: 'SignupModal',
  data() {
    return {
      userData: {
        name: '',
        email: '',
        password: '',
        role: 'student'
      },
      isLoading: false,
      error: null,
      modal: null
    };
  },
  mounted() {
    // Initialize the modal
    this.modal = new bootstrap.Modal(document.getElementById('signupModal'));

    // Listen for open-signup-modal event
    this.$eventBus.on('open-signup-modal', this.openModal);
  },
  beforeUnmount() {
    // Clean up event listener
    this.$eventBus.off('open-signup-modal', this.openModal);
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    async register() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.auth.register(this.userData);

        // Store the token in localStorage if returned
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        // Close the modal
        this.closeModal();

        // Reset form
        this.userData = { name: '', email: '', password: '', role: 'student' };

        // Notify the user
        alert('Inscription réussie !');

        // Redirect or update UI as needed
        // this.$router.push('/dashboard');
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription';
        alert(this.error);
      } finally {
        this.isLoading = false;
      }
    },
    openLoginModal() {
      this.closeModal();
      this.$eventBus.emit('open-login-modal');
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

.cursor-pointer {
  cursor: pointer;
}

.form-check-label {
  transition: all 0.3s ease;
}

.form-check-label:hover {
  border-color: #8a2be2;
}
</style>
