<template>

    <router-link to="New" class="newPost">
        <i class="fas fa-plus-circle"></i>
    </router-link>

</template>


<script>

    export default{
        name: "newPostButton"

    }

</script>


<style lang="scss" scoped>

    .newPost{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        text-decoration: none;
        i{
            font-size: 2rem;
            color: #fd2d01;
        }
    }

</style>
