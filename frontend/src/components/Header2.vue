<template>

    <nav class="navbar navbar-expand-lg navbar-light">
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="#"><img src="../assets/icon-min-black.png" alt=""></a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
                <a href="#" class="nav-link">Accueil</a>
            </li>
            <li class="nav-item">
                <a href="#/Profile" class="nav-link">Profil</a>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <button class="btn btn-outline-danger my-2 my-sm-0" type="button" @click.prevent="logout()" v-if="checkToken()">
                Deconnexion
            </button>
        </form>
        </div>
    </nav>

</template>


<script>

    export default {
        name: "Header2",
        props: {
            activeLink: {
                type: String,
            }
        },
        methods: {
            checkToken() {
                return localStorage.getItem('token');
            },
            logout() {
                localStorage.clear();
                this.$router.push( {name: 'SignIn'} )
            }
        }
    };

</script>


<style lang="scss" scoped>
    
    nav {
        width: 100%;
        background: #ffd7d7;
    }

    img{
        width: 20%;
    }

</style>
