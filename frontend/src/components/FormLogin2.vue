<template>
  <div id="FormLogin2" class="my-5">
    <section class="Form my-4 mx-5">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-lg-5">
            <img
              src="../assets/test.jpg"
              class="img-fluid"
              alt="femme consultant ses réseaux sociaux sur téléphone"
            />
          </div>
          <div class="col-lg-7 px-5">
            <img src="../assets/iconb.png" class="img-fluid" alt="" />
            <h4 class="mb-3">{{ title }}</h4>
            <form @submit.prevent = "handleSubmit">
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    type="text"
                    placeholder="Pseudo"
                    v-model="pseudo"
                    class="form-control my-3 p-4"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    v-model="password"
                    class="form-control my-3 p-4"
                  />
                </div>
              </div>
              <div
                class="form-row"
                v-if="this.$router.history.current.path === '/SignUp'"
              >
                <div class="col-lg-7">
                  <input
                    type="email"
                    placeholder="Adresse email"
                    v-model="email"
                    class="form-control my-3 p-4"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-7">
                  <button type="submit" class="btn1 mt-3 mb-5">
                    {{ button }}
                  </button>
                  <p>{{ message }}</p>
                </div>
              </div>
              <p
                class="mb-5"
                v-if="this.$router.history.current.path != '/SignUp'"
              >
                Vous n'avez pas encore de compte ?
                <router-link to="/SignUp">Créez votre compte</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "FormLogin2",
  props: {
    title: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: "",
      pseudo: "",
      password: "",
      email: "",
    };
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

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#FormLogin2 {
  background: rgb(219, 226, 226);
}
.row {
  background: white;
  border-radius: 30px;
  box-shadow: 12px 12px 22px grey;
}
img {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.btn1 {
  border: none;
  outline: none;
  height: 50px;
  width: 100%;
  background-color: #fd2d01;
  color: white;
  border-radius: 4px;
  font-weight: bold;
}
.btn1:hover {
  background: white;
  border: 1px solid;
  color: black;
}


.col-lg-7 img{
  max-width: 250px;
  max-height: 150px;
}

.col-lg-5 img{
  height: 100%;
  width: 100%;
}

</style>
