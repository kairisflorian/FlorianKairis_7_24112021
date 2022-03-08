<template>
  <div id="SignUp">
    <Header />
    <FormLogin2 
      title="Inscrivez-vous"
      button="S'inscrire"
    />
  </div>
</template>

<script>
  
  import Header from "@/components/Header.vue";
  import FormLogin2 from "@/components/FormLogin2.vue";

  export default {
    name: "SignUp",
    components: {
      Header,
      FormLogin2
    },
  };
  
</script>

<style lang="scss" scoped>

#SignUp{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(219, 226, 226);
    height: 100vh;
  }

</style>
