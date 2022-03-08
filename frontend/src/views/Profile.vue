<template>
  <div id="profile">
    <Header />
    <div id="bloc-info">
      <h1>{{ title }}</h1>
      <div id="infos">
        <p>
          <span id="bold">Pseudo :</span> 
          <input type="text" v-model="pseudo.title" id="pseudoForm">
        </p>
        <p>
          <span id="bold">Adresse email :</span> 
          <input type="text" v-model="email.title" id="emailForm">
        </p>
      </div>
    </div>
    <div id="buttons">
      <button @click="homePage()">Retour à l'accueil</button>
      <button @click="updateInfos()">Sauvegarder</button>
    </div>
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
      message: '',
      title: 'INFOS',
      pseudo: {'title' : ''},
      email: {'title' : ''},
    }
  },
  methods: {
    getInfos() {
      let token = localStorage.getItem('token');
      let id = localStorage.getItem('id');
      axios.get(`http://localhost:8080/api/users/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
        .then( (response) => {
          console.log(response.data[0].id)
          this.pseudo.title = response.data[0].pseudo
          this.email.title = response.data[0].email
        })
    },
    
    updateInfos() {
      const data = {
        pseudo: this.pseudo.title,
        email: this.email.title
      }
      let token = localStorage.getItem('token');
      let id = localStorage.getItem('id');
      axios.put(`http://localhost:8080/api/users/${id}`, data, { headers: {"Authorization" : `Bearer ${token}`} })
        .then( (reponse) => {
          localStorage.setItem('id', reponse.data.id)
          localStorage.setItem('token', reponse.data.token)
          localStorage.setItem('pseudo', reponse.data.pseudo)
        })
      
    },

    homePage() {
      this.$router.push( {name: 'Home'} )
    }
  },
  
  beforeMount() {
    this.getInfos()
  }
};
</script>

<style lang="scss" scoped>

#bloc-info{
  margin-top: 200px;
  border: 1px solid gray;
  border-top-right-radius: 40px 40px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  min-width: 200px;
  min-height: 300px;
  h1{
    text-align: start;
    padding-left: 5%;
    color: rgb(255, 64, 0);
    border-bottom: 1px dotted gray;
    padding-bottom: 3%;
  }
  #infos{
    text-align: start;
    padding-left: 5%;
    #bold{
      font-weight: bold;
    }
  }
}

#buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 200px;
  max-width: 500px;
  min-width: 200px;
  margin-left: auto;
  margin-right: auto;
}

</style>
