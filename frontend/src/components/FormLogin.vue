<template>
  <section class="formulaire">
    <div class="formLeft"></div>
    <div class="formRight">
      <img src="../assets/icon-min-black.png" alt="Logo groupomania" />
      <h4>{{ topMessage }}</h4>
      <form @submit.prevent = "handleSubmit">
        <input type="text" class="form-control" placeholder="Pseudo" v-model="pseudo"/>
        <input type="password" class="form-control" placeholder="*********" v-model="password" />
        <input
          type="email"
          class="form-control"
          placeholder="Adresse email"
          v-model="email"
          v-if="this.$router.history.current.path === '/SignUp'"
        />
        <button type="submit">{{ button }}</button>
        <p>
          {{ message }}
          <router-link
            to="SignIn"
            style="color: #fd2d01"
            v-if="this.$router.history.current.path === '/SignUp'"
          >
            Connectez-vous
          </router-link>
          <router-link
            to="SignUp"
            style="color: #fd2d01"
            v-if="this.$router.history.current.path === '/SignIn'"
          >
            Créez votre compte
          </router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "FormLogin",
  props: {
    message: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
    topMessage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pseudo: "",
      password: "",
      email: "",
      erreur: ""
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        pseudo: this.pseudo,
        password: this.password,
        email: this.email,
      };
      if (this.$router.history.current.path === "/SignIn") {
        axios
          .post("http://localhost:8080/api/users/login", data)
          .then((reponse) => {
            if (reponse.data.id) {
              localStorage.setItem("id", reponse.data.id);
              localStorage.setItem("token", reponse.data.token);
              localStorage.setItem("pseudo", reponse.data.pseudo);
              this.$router.push({ name: "Home" });
            } else if (reponse.data.err) {
              this.erreur =
                "Connexion impossible. Verifiez votre pseudo/mot de passe et réessayez.";
            }
          })
          .catch(function(error) {
            if(error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
            else if(error.request) {
              console.log(error.request);
            }
            else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
      } else if (this.$router.history.current.path === "/SignUp") {
        axios
          .post("http://localhost:8080/api/users/register", data)
          .then((reponse) => {
            if (reponse.data.userId) {
              this.$router.push({ name: "SignIn" });
            } else if (reponse.data.err) {
              this.errorMessage =
                "Problème lors de la création de compte. Veuillez réessayer.";
            }
          })
          .catch((erreur) => console.log(erreur));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.formulaire {
  height: 600px;
  display: flex;
  width: 85%;
  max-width: 1300px;
  margin-top: 5%;
  margin-bottom: 5%;
  box-shadow: 12px 12px 22px grey;
  border-radius: 30px;
}
.formLeft {
  width: 40%;
  min-width: 435px;
  background-image: url("../assets/test1.jpg");
  background-size: cover;
  background-position-x: 50%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.formRight {
  width: 60%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 5%;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  img {
    width: 45%;
    height: auto;
  }
  input {
    margin-bottom: 20px;
    height: 50px;
    width: 70%;
    min-width: 150px;
  }
  button {
    margin-bottom: 30px;
    width: 70%;
    height: 50px;
    font-weight: bold;
    color: white;
    background-color: #fd2d01;
    border-radius: 4px;
    border: none;
    outline: none;
    &:hover {
      background: white;
      border: 1px solid;
      color: black;
    }
  }
}
@media screen and (max-width: 1000px) {
  .formulaire {
    display: flex;
    flex-direction: column;
    height: 1000px;
    margin-top: 10%;
    margin-bottom: 10%;
  }
  .formLeft {
    width: 100%;
    min-width: 0;
    height: 45%;
    border-bottom-left-radius: 0;
    border-top-right-radius: 30px;
  }
  .formRight {
    width: 100%;
    height: 55%;
    border-top-right-radius: 0;
    border-bottom-left-radius: 30px;
    input {
      width: 90%;
    }
    button {
      width: 90%;
    }
  }
}
</style>
