<template>
  <div id="SignUp">
    <Header />
    <FormLogin 
      title="Inscription"
      button="S'inscrire"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import FormLogin from "@/components/FormLogin.vue";

export default {
  name: "SignUp",
  components: {
    Header,
    FormLogin,
  },
};
</script>

<style lang="scss" scoped>
    #SignUp{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
