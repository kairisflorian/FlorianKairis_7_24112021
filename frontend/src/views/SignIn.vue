<template>

  <div id="SignIn">
    <Header />
    <FormLogin2 
      title="Connectez-vous à votre compte"
      button="Se connecter"
    />
  </div>

</template>

<script>

  import Header from "../components/Header.vue";
  import FormLogin2 from "../components/FormLogin2.vue";


  export default {
    name: "SignIn",
    components: {
      Header,
      FormLogin2
    },
  };

</script>

<style lang="scss" scoped>
    
  #SignIn{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(219, 226, 226);
    height: 100vh;
  }

</style>
