<template>
  <div id="profile">
    <Header />
    <button @click="showInfos()">Récupérer les infos</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: "Profile",
  components: {
    Header
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    showInfos() {
      axios.get('')
    }
  }
};
</script>

<style lang="scss" scoped>
  button{
    margin-top: 100px;
  }
</style>
