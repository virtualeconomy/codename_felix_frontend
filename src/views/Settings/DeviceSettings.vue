<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#ff8737;font-size:20px;font-weight:600"
    >back to settings</i>
    <h3>Device Settings</h3>
    <div style="font-weight:bold;margin-bottom:19px">
      Wallet:
      <span style="color:#ff8737;">{{$store.state.wallet.address.slice(0,5)+'...'+$store.state.wallet.address.slice(-3)}}</span>
    </div>
    <div style="margin-bottom:19px;color:#ff8737;font-weight:bold">Auto-lock</div>
    <div style="display:flex;color:#ff8737">
      <div class="lock-button">5 min</div>
      <div class="lock-button">15 min</div>
      <div class="lock-button">never</div>
    </div>
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
.lock-button {
  margin-right: 15px;
  padding: 2px 8px;
  border: 1px solid #ff8737;
  border-radius: 20px;
}
.lock-button:hover {
  background: #ff8737;
  color: white;
}
</style>