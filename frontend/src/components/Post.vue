<template>
    <div>
        <div class="post" v-for="post in posts" :key="post">
            <div class="info">
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

export default{
    name: "Post",
    data(){
        return {
            likes: 0
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
        justify-content: flex-start;
        align-items: center;
        height: 10%;
        width: 100%;
        padding-left: 20px;
        .fa-ellipsis-v{
            margin-left: auto;
            padding-right: 20px;
            font-size: 1.5rem;
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
