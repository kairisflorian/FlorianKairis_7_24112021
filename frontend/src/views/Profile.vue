<template>
  <div id="profile">
    <Header2 />
    <div>
      <div id="bloc-info">
        <h1>{{ title }}</h1>
        <div id="infos">
          <p>
            <span id="bold">Pseudo :</span> 
            <input type="text" v-model="pseudo.title" id="pseudoForm" class="form-control">
          </p>
          <p>
            <span id="bold">Adresse email :</span> 
            <input type="email" v-model="email.title" id="emailForm" class="form-control">
          </p>
        </div>
      </div>
      <div id="buttons">
        <button @click="homePage()">Retour à l'accueil</button>
        <button @click="updateInfos()">Sauvegarder</button>
      </div>
    </div>  
    <Footer />
  </div>
</template>

<script>
import Header2 from "../components/Header2.vue";
import Footer from "../components/Footer.vue";
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: "Profile",
  components: {
    Header2,
    Footer
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
          localStorage.setItem('pseudo', reponse.data.pseudo)
        })
      this.$router.push({ name: 'Home' });  
    },

    homePage() {
      this.$router.push( {name: 'Home'} )
    }
  },
  
  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'SignIn' });
    }
  }
};
</script>

<style lang="scss" scoped>
#profile{
  background-image: url('../assets/coolbackground.png');
}
#bloc-info{
  margin-top: 150px;
  border: 1px solid gray;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  min-width: 200px;
  min-height: 300px;
  box-shadow: 12px 12px 22px grey;
  border-radius: 30px;
  background: #ffd7d7;
  h1{
    text-align: start;
    padding-top: 3%;
    padding-left: 5%;
    color: rgb(255, 64, 0);
    border-bottom: 1px dotted gray;
    padding-bottom: 3%;
  }
  #infos{
    text-align: start;
    padding-left: 5%;
    padding-right: 5%;
    input{
      margin-top: 10px;
    }
    #bold{
      font-weight: bold;
    }
  }
}

#buttons{
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  min-width: 200px;
  button{
    height: 40px;
    font-weight: bold;
    color: white;
    background-color: #fd2d01;
    border-radius: 4px;
    border: none;
    outline: none;
    box-shadow: 12px 12px 22px grey;
    &:hover {
      background: white;
      border: 1px solid;
      color: black;
    }
  }
}

</style>
