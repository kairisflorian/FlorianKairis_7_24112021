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
            <!-- 
            <template v-slot:content>
                <form>
                    <input type="text" placeholder="Titre" class="form-control titreForm" v-model="title">
                    <div class="gif">
                        <i class="fas fa-upload"></i>
                        <p>Sélectionnez une image à uploader</p>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile" @change="onFileChange">
                            <label for="customFile" class="custom-file-label">Choisir un fichier</label>
                        </div>
                        <div id="preview">
                            <img :src="imgUrl" v-if="imgUrl">
                        </div>
                    </div>
                </form>
            </template>
            -->
            <!-- Boutons de la modale -->
            <template v-slot:buttons>
                <button class="btn btn-outline-success">Modifier le post</button>
                <button class="btn btn-outline-danger" @click="toggleModify">Retourner à l'accueil</button>
            </template>                   
        </modale>
        <!-- Card post -->    
        <div class="post" v-for="(post, idx) in posts" :key="idx">
            <div class="info">
                <i class="fas fa-trash-alt" @click="toggleDelete(); getPostId(post.id)" v-if="post.userId === userId"></i>
                <i class="fas fa-ellipsis-v" @click="toggleModify(); getPostId(post.id)" v-if="post.userId === userId"></i>
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
                postId: null
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
            getPostId(e) {
                this.postId = e;
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
