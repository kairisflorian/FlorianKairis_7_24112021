<template>

    <div>
        <div class="post" v-for="post in posts" :key="post">
            <modale 
                :revele="revele" 
                :toggleModale="toggleModale"
                deleteMessage= "Etes-vous sûr de vouloir supprimer ce post ?">
            </modale>
            <div class="info">
                <i class="fas fa-trash-alt" @click="toggleModale" ></i>
                <i class="fas fa-ellipsis-v"></i>
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

import Modale from './Modale.vue'

export default{
    name: "Post",
    components: {
        'modale': Modale
    },
    data(){
        return {
            likes: 0,
            revele: false
        }
    },
    methods: {
        toggleModale() {
            this.revele = !this.revele;
        }
    },
    props: {
        posts: Array
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
