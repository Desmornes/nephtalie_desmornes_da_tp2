<template>
  <div id="app">
    <Navbar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <AppFooter />
    <LoginModal />
    <SignupModal />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import LoginModal from '@/components/LoginModal.vue'
import SignupModal from '@/components/SignupModal.vue'

export default {
  name: 'App',
  components: {
    Navbar: AppNavbar,
    AppFooter,
    LoginModal,
    SignupModal
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  background-color: #fafafa;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.gradient-bg {
  background: linear-gradient(135deg, #8a2be2 0%, #4b0082 100%);
}

.logo-k {
  color: #8a2be2;
  font-weight: 700;
  font-style: italic;
}
</style>
