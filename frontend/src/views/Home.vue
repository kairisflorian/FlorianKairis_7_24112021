<template>
  <div id="home">
      <Header2 
        activeLink="Accueil"
      />
      <newPostButton />
      <Post />
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
      pseudo: localStorage.getItem('pseudo')
    }
  },
  methods: {
    checkToken() {
      return localStorage.getItem('token')
    }
  }
  
};
</script>

<style lang="scss" scoped>

#home{
  background-image: url('../assets/coolbackground.png');
}

</style>
