<template>
  <div id="home">
      <Header />
      <h1 v-if="checkToken()">{{ pseudo }} est bien connecté.</h1>
      <h1 v-else>Merci de vous connecter pour accéder au contenu.</h1>
  </div>
</template>

<script>
  import Header from "@/components/Header.vue";
  import axios from 'axios';
  axios.defaults.withCredentials = true;

  export default {
  name: "Home",
  components: {
    Header
  },
  data() {
    return {
      pseudo: localStorage.getItem('pseudo')
    }
  },
  methods: {
    checkToken() {
      return localStorage.getItem('token')
    }
  }
  
};
</script>

<style lang="scss" scoped>

h1{
  margin-top: 200px;
}

</style>
