<template>

    <div id="home">
        <Header2 activeLink="Accueil" />
        <newPostButton />
        <Post :posts="posts" :userId="userId" :getPosts="getPosts"/>
        <Footer />
    </div>

</template>


<script>

    import Header2 from "@/components/Header2.vue";
    import newPostButton from "@/components/newPostButton.vue";
    import Post from "@/components/Post.vue";
    import Footer from "@/components/Footer.vue";
    import axios from 'axios';
    axios.defaults.withCredentials = true;

    export default {
        name: "Home",
        components: {
            Header2,
            Footer,
            newPostButton,
            Post
        },
        data() {
            return {
                posts: [],
                verified: false,
                userId: null
            }
        },
        methods: {
            checkToken() {
            if (!localStorage.getItem('token')) {
                this.$router.push({ name: 'SignIn' });
            }
            },
            getPosts() {
                let token = localStorage.getItem("token");
                axios
                    .get("http://localhost:8080/api/posts", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then((res) => {
                        console.log(res.data);
                        this.posts = res.data;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            checkId() {
                let token = localStorage.getItem("token");
                axios
                    .get("http://localhost:8080/api/user", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then((res) => {
                        let id = res.data.id;
                        this.userId = id;
                        return id;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        mounted() {
            this.checkToken();
            this.getPosts();
            this.checkId();
        }
    };

</script>


<style lang="scss" scoped>

    #home{
    background-image: url('../assets/coolbackground.png');
    }

</style>
