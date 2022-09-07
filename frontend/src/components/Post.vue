<template>

    <div>
        <!-- Modale suppression post -->
        <modale v-if="reveleDelete" v-bind:reveleDelete="reveleDelete" v-bind:toggleDelete="toggleDelete">
            <!-- Contenu de la modale -->
            <template v-slot:content>
                <p>Êtes-vous sûr de vouloir supprimer ce post ?</p>
            </template>
            <!-- Boutons de la modale -->
            <template v-slot:buttons>
                <button class="btn btn-outline-success" @click="deletePost">Oui</button>
                <button class="btn btn-outline-danger" @click="toggleDelete">Non</button>
            </template>        
        </modale>
        <!-- Modale modification post -->
        <modale v-if="reveleModify" v-bind:reveleModify="reveleModify" v-bind:toggleModify="toggleModify">
            <!-- Contenu de la modale -->
            <template v-slot:content>
                <form>
                    <input type="text" placeholder="Titre" class="form-control titreForm" v-model="postTitle">
                    <div class="gif">
                        <i class="fas fa-upload"></i>
                        <p>Sélectionnez une image à uploader</p>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="imgFile" @change="onFileChange">
                            <label for="customFile" class="custom-file-label">Choisir un fichier</label>
                        </div>
                        <div id="preview">
                            <img :src="postImg" v-if="postImg">
                        </div>
                    </div>
                </form>
            </template>
            <!-- Boutons de la modale -->
            <template v-slot:buttons>
                <button class="btn btn-outline-success" type="submit" @click="updatePost">Modifier le post</button>
                <button class="btn btn-outline-danger" @click="toggleModify">Retourner à l'accueil</button>
            </template>                   
        </modale>
        <!-- Card post -->    
        <div class="post" v-for="(post, idx) in posts" :key="idx">
            <div class="info">
                <i class="fas fa-trash-alt" @click="toggleDelete(); getPostData(post.id)" v-if="post.userId === userId"></i>
                <i class="fas fa-ellipsis-v" @click="toggleModify(); getPostData(post.id, post.title, post.image)" v-if="post.userId === userId"></i>
            </div>
            <div class="title">
                <p>{{ post.title }}</p>
            </div>
            <div class="image">
                <img :src="post.image" alt="Image du post">
            </div>
            <div class="icons">
                <div class="likes">
                    <i class="far fa-heart"></i>
                    <p>{{ likes }}</p>
                </div>
                <div><i class="fas fa-share-alt"></i></div>
            </div>
        </div>
    </div>

</template>


<script>

    import modale from "./Modal.vue";
    import axios from 'axios';
    axios.defaults.withCredentials = true;

    export default{
        name: "Post",
        data(){
            return {
                likes: 0,
                reveleModify: false,
                reveleDelete: false,
                postId: null,
                postTitle: "",
                postImg: ""
            }
        },
        components: {
            "modale": modale
        },
        props: {
            posts: Array,
            userId: Number,
            getPosts: Function
        },
        methods: {
            toggleModify() {
                this.reveleModify = !this.reveleModify;
            },
            toggleDelete() {
                this.reveleDelete = !this.reveleDelete;
            },
            getPostData(e, f, g) {
                this.postId = e;
                this.postTitle = f;
                this.postImg = g;
            },
            deletePost() {
                let token = localStorage.getItem('token');
                let id = this.postId;
                axios
                    .delete(`http://localhost:8080/api/posts/${id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then((res) => {
                        console.log(res.data);
                        this.toggleDelete();
                        this.getPosts();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.postImg = URL.createObjectURL(file);
            },
            updatePost() {
                const formData = new FormData();
                const imageFile = document.querySelector('#imgFile');
                const id = this.postId;
                if(imageFile.files[0]) {
                    formData.append("image", imageFile.files[0]);
                } else {
                    formData.append("image", this.postImg);
                }
                formData.append("title", this.postTitle);
                const token = localStorage.getItem("token");
                axios
                    .put(`http://localhost:8080/api/posts/${id}`, formData, {
                        headers: {
                            "Content-type": 'multipart/form-data',
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then((res) => {
                        console.log(res);
                        this.toggleModify();
                        this.getPosts();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }

</script>


<style lang="scss" scoped>

    .post{
        display: flex;
        flex-direction: column;
        margin: auto;
        margin-bottom: 60px;
        height: 600px;
        width: 80%;
        min-width: 450px;
        max-width: 850px;
        border: 1px solid black;
        background-color: white;
        box-shadow: 12px 12px 22px grey;
        .info{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 10%;
            width: 100%;
            padding-left: 20px;
            i{
                padding-right: 20px;
                font-size: 1.3rem;
                color: #fd2d01;
                cursor: pointer;
            }
        }
        .title{
            display: flex;
            align-items: center;
            justify-content: center;
            p{
                font-weight: bold;
            }
        }
        .image{
            height: 80%;
            width: 90%;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .icons{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 10%;
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
            .likes{
                p{
                    margin: 0
                }
                display: flex;
                width: 10%;
                justify-content: space-around;
                align-items: center;
            }
            i{
                font-size: 1.3rem;
                color: #fd2d01;
                cursor: pointer;
            }
        }
    }

</style>
