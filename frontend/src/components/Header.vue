<template>
  <header class="header">
    <img src="../assets/icon.png" alt="logo groupomania" />
    <router-link to="/Profile" v-if="homePage()">Profil</router-link>
    <router-link to="/" v-if="profilePage()">Accueil</router-link>
    <router-link to="/SignUp">Inscription</router-link> 
    <router-link to="/SignIn">Connexion</router-link>
  </header>
</template>

<script>

export default {
  methods: {
    homePage() {
      return this.$route.name === 'Home';
    },
    profilePage() {
      return this.$route.name === 'Profile';
    }
  }
}

</script>

<style lang="scss">
.header {
  background-color: rosybrown;
  height: 150px;
  width: 100%;
  border: 0.5px solid black;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  img {
    height: 100%;
  }
  nav {
    display: flex;
    justify-content: space-evenly;
    width: 33%;
  }
}
</style>
