<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#FB8809;font-size:20px;font-weight:600;cursor:pointer"
    >back</i>
    <div style="margin-top:38px">Save the words</div>
    <div
      style="margin:18px 0;color:#FB8809"
      v-for="(item, index) in $store.state.app.words"
      :key="index"
    >{{ item.word.toUpperCase() }}</div>
    <div>Price</div>
    <div style="margin-top:19px;font-size:24px;color:#FB8809">{{$store.state.app.words.length}} VSYS</div>

    <div style="margin-top:38px;padding-right:100px;z-index:10">
      Saving this word means it will be stored on the chain.
      <br />
      <br />After the word is saved you can also mint it as an NFT.
      <br />
      <br />Click SAVE to continue
    </div>
    <div style="min-height:100px;flex:1"></div>

    <div class="base-button" @click="pay">SAVE</div>
  </div>
</template>

<script>
import { reqGetBalance, reqSaveWordId } from "@/api/index";
import BigNumber from "bignumber.js";

export default {
  name: "WordPay",
  data() {
    return {
      clickable: true
    };
  },
  methods: {
    async pay() {
      if (!this.clickable) return;
      this.clickable = false;
      try {
        var balance = 0
        const balanceData = await reqGetBalance();
        if (balanceData) {
          let values = Object.values(balanceData)
          balance = BigNumber(values[0].balance).dividedBy(1e8)
        }
        if (
          BigNumber(balance).isGreaterThan(
            BigNumber(this.$store.state.app.words.length)
          )
        ) {
          var response = await reqSaveWordId(
            this.$store.state.app.words.map(item => item.id)
          );
          var words = this.$store.state.app.words
          var save_words = JSON.parse(localStorage['save_words'])
          for (var eachWord of words){
            save_words.push(eachWord)
          }
          localStorage['save_words'] = (JSON.stringify(save_words)) 
          this.$router.push("/word_finish");
        } else {
          alert("Balance of address in Backend is insufficient");
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          alert(error.response.data);
        } else {
          alert(error);
        }
      }
      this.clickable = true;
    }
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
  margin: 100px 12px 0 12px;
}
.base-button:hover {
  color: white;
  background: #FB8809;
}
</style>
