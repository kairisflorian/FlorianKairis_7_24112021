<template>
    <div class="newPost">
        <router-link to="New">
            <i class="fas fa-plus-circle"></i>
        </router-link>
    </div>
</template>

<script>

export default{
    name: "newPostButton"

}

</script>

<style lang="scss" scoped>
.newPost{
    margin-top: 30px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    i{
        font-size: 2rem;
        color: #fd2d01;
        cursor: pointer;
    }
}
</style>
