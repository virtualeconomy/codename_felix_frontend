<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#FB8809;font-size:20px;font-weight:600"
    >back</i>
    <div style="margin-top:19px">You have selected these words for saving:</div>
    <div v-for="(item, index) in saveWord" :key="index">
      <h3>{{index+1}}.&nbsp;{{ item.word }}</h3>&nbsp;&nbsp;
      <span style="color:#FB8809">{{ item.lexical_category }}&nbsp;</span>
    </div>
    <div style="min-height:100px;flex:1"></div>
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
      if (!this.$store.state.app.curWallet.address) {
        alert("TO CONTINUE, YOU MUST CONNECT YOUR WALLET!");
      } else {
        this.$router.push("/word_pay");
      }
    }
  },
  mounted() {
    this.saveWord = this.$store.state.app.words;
  }
};
</script>

<style scoped>
.base-button {
  position: relative;
  z-index: 2;
  padding: 5px;
  text-align: center;
  border: 1px solid #FB8809;
  border-radius: 5px;
  color: #FB8809;
  margin: 0 12px;
}
.base-button:hover {
  color: white;
  background: #FB8809;
}
</style>
