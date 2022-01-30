<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#FB8809;font-size:20px;font-weight:600"
    >back to settings</i>
    <h3>About us</h3>
    <div style="font-size:1.17em;font-weight:bold">Official website</div>
    <span style="color:#FB8809">saveaword.com</span>
    <div style="font-size:1.17em;font-weight:bold;margin-top:19px">Version</div>
    <span style="color:#FB8809">0.1</span>
  </div>
</template>

<script>
export default {
  name: "SavedWords",
  data() {
    return {
      saveWord: [
        {
          blockchainhash: null,
          definition: "uptight",
          definition_no: 0,
          etymology_no: 0,
          id: 751314,
          lexical_category: "Adjective",
          nfthash: null,
          word: "up-tight"
        },
        {
          blockchainhash: null,
          definition: "uptight",
          definition_no: 0,
          etymology_no: 0,
          id: 751315,
          lexical_category: "Adjective",
          nfthash: null,
          word: "up-down"
        }
      ]
    };
  },
  methods: {},
  mounted() {
    // this.saveWord = this.$store.state.words;
    // need to backend api
  }
};
</script>

<style scoped>
</style>