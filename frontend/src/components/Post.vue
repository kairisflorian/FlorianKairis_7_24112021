<template>
    <div class="post">
        <div class="info">
            <p>{{ pseudo }}</p>
            <i class="fas fa-circle"></i>
            <p>{{ date }}</p>
            <i class="fas fa-ellipsis-v"></i>
        </div>
        <div class="gif">
            <iframe :src="gif" width="100%" height="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </div>
        <div class="icons">
            <div><i class="fas fa-comment-alt"></i></div>
            <div><i class="fas fa-share-alt"></i></div>
        </div>
    </div>
</template>

<script>

export default{
    name: "Post",
    data(){
        return {
            pseudo: "Pseudo",
            date: "2h",
            gif: "https://giphy.com/embed/PLJ8Y8Nbdu2s4JsCHh"
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
        justify-content: flex-start;
        align-items: center;
        height: 10%;
        width: 100%;
        padding-left: 20px;
        p{
            margin-bottom: 0;
        }
        .fa-circle{
            font-size: 0.5rem;
            margin-left: 10px;
            margin-right: 10px;
            color: #fd2d01
        }
        .fa-ellipsis-v{
            margin-left: auto;
            padding-right: 20px;
            font-size: 1.5rem;
            color: #fd2d01;
            cursor: pointer;
        }
    }
    .gif{
        height: 80%;
        width: 90%;
        margin: auto;
    }
    .icons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 10%;
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
        i{
            font-size: 1.3rem;
            color: #fd2d01;
            cursor: pointer;
        }
    }
}
</style>
