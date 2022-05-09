<template>
    <div id="new">
        <Header2 />
        <newPost />
        <Footer />
    </div>
</template>

<script>
import Header2 from "@/components/Header2.vue";
import newPost from "@/components/newPost.vue";
import Footer from "@/components/Footer.vue";

export default{
    name: "New",
    components: {
        Header2,
        newPost,
        Footer
    }
}
</script>

<style lang="scss" scoped>

#new{
    background-image: url('../assets/coolbackground.png');
}


</style>