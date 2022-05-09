<template>
  <div id="SignUp">
    <Header2 
      activeLink="Inscription"
    />
    <FormLogin 
      message = "Vous avez déjà un compte ?"
      button = "S'inscrire"
      topMessage = "Créez votre compte"
    />
    <Footer />
  </div>
</template>

<script>
  
  import Header2 from "@/components/Header2.vue";
  import FormLogin from "../components/FormLogin.vue"
  import Footer from "@/components/Footer.vue"


  export default {
    name: "SignUp",
    components: {
      Header2,
      FormLogin,
      Footer,
    },
  };
  
</script>

<style lang="scss" scoped>

#SignUp{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(219, 226, 226);
}

</style>
