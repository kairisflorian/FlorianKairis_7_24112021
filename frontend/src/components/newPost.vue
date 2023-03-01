<template>

    <div class="newPost">
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
            <button type="submit" @click="createPost">Créer un post</button>
            <button @click="homePage">Retour à l'accueil</button>
        </form>
    </div>

</template>


<script>

    import axios from 'axios';

    export default{
        name: "newPost",
        data() {
            return {
                title: "",
                imgUrl: null
            }
        },
        methods: {
            createPost() {
                const formData = new FormData();
                const imageFile = document.querySelector('#customFile');
                formData.append("image", imageFile.files[0]);
                formData.append("title", this.title);
                const token = localStorage.getItem("token");
                axios
                    .post("http://localhost:8080/api/posts", formData, {
                        'Content-type': 'multipart/form-data',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then((res) => {
                        console.log(res.data);
                        this.$router.push({ name: "Home" });
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            homePage() {
                this.$router.push({ name: "Home" });
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.imgUrl = URL.createObjectURL(file);
            }
        }
    }

</script>


<style lang="scss" scoped>

    .newPost{
        width: 80%;
        max-width: 1000px;
        height: 800px;
        margin: 80px auto 80px auto;
        border: 2px solid #fd2d01;
        border-radius: 26px 26px 26px 26px / 23px 23px 23px 23px;
        background: white;
        box-shadow: 12px 12px 22px grey;
        form{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 50px;
            .titreForm{
                width: 80%;
                background-image: url("../assets/coolbackground.png");
            }
            .form-control:focus {
                border-color: #fd2d01;
                box-shadow: 0 0 0 0.2rem rgba(211, 47, 6, 0.521);
            } 
            .gif{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                width: 80%;
                height: 400px;
                border: 1px solid #fd2d01;
                border-radius: 26px 26px 26px 26px / 23px 23px 23px 23px;
                margin-top: 50px;
                margin-bottom: 50px;
                padding-bottom: 30px;
                background-image: url("../assets/coolbackground.png");
                i{
                    font-size: 3rem;
                    color: #fd2d01;
                }
                .custom-file{
                    width: 80%;
                }
                #preview{
                    max-height: 50%;
                    max-width: 90%;
                    margin-top: 5%;
                    img{
                        max-height: 100%;
                        max-width: 100%;
                    }
                }
            }
            button {
                margin-bottom: 30px;
                margin-top: 20px;
                width: 60%;
                max-width: 400px;
                height: 40px;
                font-weight: bold;
                color: white;
                background-color: #fd2d01;
                border-radius: 4px;
                border: none;
                outline: none;
                &:hover {
                    background: white;
                    border: 1px solid;
                    color: black;
                }
            }
        }
    }

    @media screen and (max-width: 470px) {
        .gif {
            p {
                margin-left: 10px;
                margin-right: 10px;
                text-align: center;
            }
            button {
                height: 10px;
            }
        }
    }

</style>
