<template>

    <div id="SignIn">
        <Header2 
            activeLink="Connexion"
        />
        <FormLogin 
            message ="Vous n'avez pas encore de compte ?" 
            button ="Se connecter"
            topMessage ="Connectez-vous à votre compte"
        />
        <Footer />
    </div>

</template>


<script>

    import FormLogin from "../components/FormLogin.vue"
    import Header2 from "../components/Header2.vue";
    import Footer from "../components/Footer.vue";


    export default {
        name: "SignIn",
        components: {
            Header2,
            FormLogin,
            Footer
        }
    };

</script>


<style lang="scss" scoped>
    
    #SignIn{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgb(219, 226, 226);
    }

</style>
