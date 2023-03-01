<template>
    <section class="formulaire">
        <div class="formLeft"></div>
        <div class="formRight">
            <img src="../assets/icon-min-black.png" alt="Logo groupomania" />
            <h4>{{ topMessage }}</h4>
            <form @submit.prevent = "handleSubmit">
                <input type="text" class="form-control" placeholder="Adresse e-mail" v-model="email"/>
                <input type="password" class="form-control" placeholder="*********" v-model="password" />
                <button type="submit">{{ button }}</button>
                <p>
                    {{ message }}
                    <router-link
                        to="SignIn"
                        style="color: #fd2d01"
                        v-if="this.$router.history.current.path === '/SignUp'"
                    >
                        Connectez-vous
                    </router-link>
                    <router-link
                        to="SignUp"
                        style="color: #fd2d01"
                        v-if="this.$router.history.current.path === '/SignIn'"
                    >
                        Créez votre compte
                    </router-link>
                </p>
            </form>
        </div>
    </section>
</template>


<script>

    import axios from "axios";
    axios.defaults.withCredentials = true;

    export default {
        name: "FormLogin",
        props: {
            message: {
                type: String,
                required: true
            },
            button: {
                type: String,
                required: true
            },
            topMessage: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                password: "",
                email: "",
                erreur: ""
            };
        },
        methods: {
            handleSubmit() {
            const data = {
                email: this.email,
                password: this.password        
            };
            if (this.$router.history.current.path === "/SignIn") {
                axios
                .post("http://localhost:8080/api/auth/signin", data)
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem("token", res.data.accessToken);
                    localStorage.setItem("isAdmin", res.data.isAdmin)
                    this.$router.push({ name: "Home" });
                })
                .catch((err) => {
                    console.log(err);
                });
            } else if (this.$router.history.current.path === "/SignUp") {
                axios
                .post("http://localhost:8080/api/auth/signup", data)
                .then((res) => {
                    console.log(res.data);
                    this.$router.push({ name: "SignIn" });
                })
                .catch((err) => console.log(err));
            }
            },
        }
    };

</script>


<style lang="scss" scoped>

    .formulaire {
        height: 600px;
        display: flex;
        width: 85%;
        max-width: 1300px;
        margin-top: 5%;
        margin-bottom: 5%;
        box-shadow: 12px 12px 22px grey;
        border-radius: 30px;
    }
    .formLeft {
        width: 40%;
        min-width: 435px;
        background-image: url("../assets/test1.jpg");
        background-size: cover;
        background-position-x: 50%;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
    }
    .formRight {
        width: 60%;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-left: 5%;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        img {
            width: 45%;
            height: auto;
        }
        input {
            margin-bottom: 20px;
            height: 50px;
            width: 70%;
            min-width: 150px;
        }
        button {
            margin-bottom: 30px;
            width: 70%;
            height: 50px;
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
    @media screen and (max-width: 1000px) {
        .formulaire {
            display: flex;
            flex-direction: column;
            height: 800px;
            margin-top: 10%;
            margin-bottom: 10%;
        }
        .formLeft {
            width: 100%;
            min-width: 0;
            height: 45%;
            border-bottom-left-radius: 0;
            border-top-right-radius: 30px;
        }
        .formRight {
            width: 100%;
            height: 55%;
            border-top-right-radius: 0;
            border-bottom-left-radius: 30px;
            img {
                text-align: center;
                margin: auto;
            }
            h4 {
                text-align: center;
                width: 90%;
                margin-bottom: 20px;
            }
            input {
                width: 90%;
            }
            button {
                width: 90%;
            }
        }
    }

</style>
