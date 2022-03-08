<template>
    <div id="FormLogin2" class="my-5">
        <section class="Form my-4 mx-5">
            <div class="container">
                <div class="row no-gutters">
                    <div class="col-lg-5">
                        <img 
                            src="../assets/formImg.jpg" class="img-fluid" 
                            alt="femme consultant ses réseaux sociaux sur téléphone"
                        />
                    </div>
                    <div class="col-lg-7 px-5">
                        <img src="../assets/iconb.png" class="img-fluid" alt="">
                        <h4 class="mb-3">{{ title }}</h4>
                        <form>
                            <div class="form-row">
                                <div class="col-lg-7">
                                    <input type="text" placeholder="Pseudo" class="form-control my-3 p-4">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-7">
                                    <input type="password" placeholder="Mot de passe" class="form-control my-3 p-4">
                                </div>
                            </div>
                            <div class="form-row" v-if="this.$router.history.current.path === '/SignUp'">
                                <div class="col-lg-7">
                                    <input type="email" placeholder="Adresse email" class="form-control my-3 p-4">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-7">
                                    <button type="button" class="btn1 mt-3 mb-5">{{ button }}</button>
                                </div>
                            </div>
                            <p class="mb-5" v-if="this.$router.history.current.path != '/SignUp'">
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

    export default{
        name: 'FormLogin2',
        props: {
            title: {
                type: String,
                required: true
            },
            button: {
                type: String,
                required: true
            },            
        },        
    }

</script>

<style lang="scss" scoped>

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    #FormLogin2{
        background: rgb(219, 226, 226);
    }
    .row{
        background: white;
        border-radius: 30px;
        box-shadow: 12px 12px 22px grey;
    }
    img{
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        height: 100%;
        width: 100%;
    }
    .btn1{
        border: none;
        outline: none;
        height: 50px;
        width: 100%;
        background-color: black;
        color: white;
        border-radius: 4px;
        font-weight: bold;
    }
    .btn1:hover{
        background: white;
        border: 1px solid;
        color: black;
    }
    
    .col-lg-5{
        background: rgb(219, 226, 226);
    }
    .col-lg-7 img{
        max-height: 150px;
        max-width: 150px;
        
    }

</style>