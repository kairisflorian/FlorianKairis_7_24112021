<template>
  <div id="SignIn">
    <Header />
    <FormLogin 
        title="Connexion"
        button="Se connecter"
    />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import FormLogin from "../components/FormLogin.vue";

export default {
  name: "SignIn",
  components: {
    Header,
    FormLogin
  },
};
</script>

<style lang="scss" scoped>
    #SignIn{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
