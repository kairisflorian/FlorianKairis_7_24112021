<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    <!-- <h2 class="text-white text-capitalize font-weight-light p-3">Groupomania</h2> -->
                    <img class="img-fluid my-4" src="../assets/icon-min-black.png" alt="logo groupomania" />
                    <h3 class="text-dark font-weight-light font-italic mb-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h3>
                    <div class="py-2">
                        <a href="#"><i class="fab fa-facebook fa-2x text-primary mx-3"></i></a>
                        <a href="#"><i class="fab fa-google-plus fa-2x text-danger mx-3"></i></a>
                        <a href="#"><i class="fab fa-twitter fa-2x text-info mx-3"></i></a>
                        <a href="#"><i class="fab fa-youtube fa-2x text-danger mx-3"></i></a>
                    </div>
                    <p class="text-dark pt-3 m-0">&copy;Copyright 2022 - by Florian Kairis</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

    export default{
        name: 'Footer'
    }

</script>


<style lang="scss" scoped>
    footer{
        background: #ffd7d7;
        min-height: 230px;
        width: 100%;
        img{
            width: 20%;
        }
    }
</style>

