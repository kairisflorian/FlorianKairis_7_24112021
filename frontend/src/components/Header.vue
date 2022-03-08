<template>
  <header class="header">
    <img src="../assets/icon.png" alt="logo groupomania" />
    <router-link to="/Profile" v-if="homePage()">Profil</router-link>
    <router-link to="/" v-if="profilePage()">Accueil</router-link>
    <router-link to="/SignUp" v-if="loginPage()">Inscription</router-link> 
    <router-link to="/SignIn" v-if="loginPage()">Connexion</router-link>
    <button @click="logout()" v-if="checkToken()">Se déconnecter</button>
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
    },
    loginPage() {
      return this.$route.name === 'SignIn' || this.$route.name === 'SignUp'
    },
    checkToken() {
      return localStorage.getItem('token');
    },
    logout() {
      localStorage.clear();
      this.$router.push( {name: 'SignIn'} )
    }
  }
}

</script>

<style lang="scss">
.header {
  background-color: rgb(90, 100, 100);
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
