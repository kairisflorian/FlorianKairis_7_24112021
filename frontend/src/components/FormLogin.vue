<template>
  <div class="FormBloc">
    <h1>{{ title }}</h1>
    <form action="" class="FormEntry">
      <div class="FormText">
        <label for="pseudo">Pseudo:</label>
        <input type="text" name="pseudo" required />
      </div>
      <div class="FormText">
        <label for="password">Mot de passe:</label>
        <input type="password" name="password" required />
      </div>
      <div class="FormText" v-if="title != `Connexion`">
        <label for="email">Adresse email:</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <button type="submit">{{ button }}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.FormBloc {
  height: 400px;
  margin-top: 100px;
  width: 90%;
  max-width: 800px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: rosybrown;
  .FormEntry {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 60%;
    .FormText {
      display: flex;
      width: 70%;
      max-width: 400px;
      justify-content: space-between;
      margin-left: 15%;
    }
  }
}
</style>
