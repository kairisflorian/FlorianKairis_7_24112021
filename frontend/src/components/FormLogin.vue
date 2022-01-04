<template>
  <div class="FormBloc">
    <h1>{{ title }}</h1>
    <form @submit.prevent = "handleSubmit" class="FormEntry">
      <div class="FormText">
        <label for="pseudo">Pseudo:</label>
        <input type="text" name="pseudo" placeholder="Pseudo" v-model="pseudo" required />
      </div>
      <div class="FormText">
        <label for="password">Mot de passe:</label>
        <input type="password" name="password" placeholder="Mot de passe" v-model="password" required />
      </div>
      <div class="FormText" v-if="title != `Connexion`">
        <label for="email">Adresse email:</label>
        <input type="email" name="email" placeholder="Email" v-model="email" required />
      </div>
      <div>
        <button type="submit">{{ button }}</button>
        <p>{{ message }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    }
  },
  data() {
    return {
      pseudo: '',
      password: '',
      email: ''
    }
  },
  methods: {
    handleSubmit() {
      const data = {
        pseudo: this.pseudo,
        password: this.password,
        email: this.email
      }
      if (this.$router.history.current.path === "/SignIn") {
        axios.post('http://localhost:8080/api/users/login', data)
        .then ( (reponse) => {
          if (reponse.data.id) {
            localStorage.setItem('id', reponse.data.id)
            localStorage.setItem('token', reponse.data.token)
            localStorage.setItem('pseudo', reponse.data.pseudo)
            this.$router.push( {name: 'Home'} )
          } else if (reponse.data.err) {
            this.message = "Connexion impossible. Verifiez votre pseudo/mot de passe et réessayez."
          }
        })
        .catch(erreur => console.log(erreur))
      } else if (this.$router.history.current.path === "/SignUp") {
        axios.post('http://localhost:8080/api/users/register', data)
        .then( (reponse) => {
          if (reponse.data.userId) {
            this.$router.push( {name: 'SignIn'} )
          } else if (reponse.data.err) {
            this.message = "Problème lors de la création de compte. Veuillez réessayer."
          }
        }) 
        .catch(erreur => console.log(erreur))
      }
    }
    
  }
};
</script>

<style lang="scss">
.FormBloc {
  height: 400px;
  margin-top: 100px;
  width: 90%;
  max-width: 800px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: rosybrown;
  .FormEntry {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 60%;
    .FormText {
      display: flex;
      width: 70%;
      max-width: 400px;
      justify-content: space-between;
      margin-left: 15%;
    }
  }
}
</style>
