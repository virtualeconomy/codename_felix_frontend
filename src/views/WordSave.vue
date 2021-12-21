<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#ff8737;font-size:20px;font-weight:600"
    >save</i>
    <div style="margin-top:19px">You have selected these words for saving:</div>
    <div v-for="(item, index) in saveWord" :key="index">
      <h3>{{index+1}}.&nbsp;{{ item.word }}</h3>&nbsp;&nbsp;
      <span style="color:#ff8737">{{ item.lexical_category }}&nbsp;</span>
    </div>
    <div style="height:450px"></div>
    <div class="base-button" @click="savePay">SAVE THESE WORDS</div>
  </div>
</template>

<script>
export default {
  name: "WordSave",
  data() {
    return {
      saveWord: []
    };
  },
  methods: {
    async savePay() {
      if (JSON.stringify(this.$store.state.wallet) === "{}") {
        alert("TO CONTINUE, YOU MUST CONECT YOUR WALLET!");
      } else {
        this.$router.push("/word_pay");
      }
    }
  },
  mounted() {
    this.saveWord = this.$store.state.words;
  }
};
</script>

<style scoped>
.base-button {
  position: relative;
  z-index: 2;
  padding: 5px;
  text-align: center;
  border: 1px solid #ff8737;
  border-radius: 5px;
  color: #ff8737;
  margin: 0 12px;
}
.base-button:hover {
  color: white;
  background: #ff8737;
}
</style>