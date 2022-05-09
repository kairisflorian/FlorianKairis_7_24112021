<template>
    <div class="newPost">
        <form>
            <input type="text" placeholder="Titre" class="form-control titreForm">
            <div class="gif">
                <i class="fas fa-upload"></i>
                <p>Sélectionnez un fichier GIF à uploader</p>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile">
                    <label for="customFile" class="custom-file-label">Choisir un fichier</label>
                </div>
            </div>
            <button>Soumettre le post</button>
            <button>Retour à l'accueil</button>
        </form>
    </div>
</template>

<script>
export default{
    name: "newPost"
}
</script>

<style lang="scss" scoped>

.newPost{
    width: 80%;
    max-width: 1000px;
    height: 700px;
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
            height: 300px;
            border: 1px solid #fd2d01;
            border-radius: 26px 26px 26px 26px / 23px 23px 23px 23px;
            margin-top: 50px;
            margin-bottom: 50px;
            padding-bottom: 60px;
            background-image: url("../assets/coolbackground.png");
            i{
                font-size: 3rem;
                color: #fd2d01;
            }
            .custom-file{
                width: 80%;
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

</style>
