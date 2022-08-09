<template>
  <div id="home">
      <Header2 
        activeLink="Accueil"
      />
      <newPostButton />
      <Post :posts="posts"/>
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
        posts: []
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
    }
  },
  mounted() {
    this.checkToken();
    this.getPosts();
  }
  
};
</script>

<style lang="scss" scoped>

#home{
  background-image: url('../assets/coolbackground.png');
}

</style>
