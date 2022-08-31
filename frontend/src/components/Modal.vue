<template>

    <div class="bloc-modale">
        <div class="overlay" @click="toggleModals"></div>
        <div class="modale card">
            <div class="header">
                <div class="btn-modale btn btn-danger" @click="toggleModals">X</div>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
            <div class="buttons">
                <slot name="buttons"></slot>
            </div>
        </div>
    </div>

</template>


<script>

    export default {
        name: "Modal",
        methods: {
            toggleModals() {
                if (this.reveleModify) {
                    this.toggleModify();
                }
                else if (this.reveleDelete) {
                    this.toggleDelete();
                }
            }
        },
        props: [
            'reveleModify',
            'reveleDelete',
            'toggleModify',
            'toggleDelete'
        ]
    }

</script>


<style lang="scss" scoped>

    .bloc-modale {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .overlay {
        background: rgba(0,0,0,0.6);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .modale {
        background: #f1f1f1;
        color: #333;
        padding: 40px;
        position: fixed;
        top: 20%;
        max-width: 900px;
        .content {
            margin-top: 20px;
            .titreForm{
                width: 100%;
                background-image: url("../assets/coolbackground.png");
            }
            .gif{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                width: 100%;
                height: 300px;
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
                    max-width: 100%;
                    margin-top: 5%;
                    img{
                        max-height: 100%;
                        max-width: 100%;
                    }
                }
            }
        }
        .buttons {
            margin-top: 15px;
            display: flex;
            button {
                width: 40%;
            }
        }
    }

    .btn-modale {
        position: absolute;
        top: 5px;
        right: 5px;
    }

</style>