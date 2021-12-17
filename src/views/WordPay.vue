<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#ff8737;font-size:20px;font-weight:600"
    >back</i>
    <div style="margin-top:38px">Save the words</div>
    <div
      style="margin:18px 0;color:#ff8737"
      v-for="(item, index) in $store.state.words"
      :key="index"
    >{{ item.word.toUpperCase() }}</div>
    <div>Price</div>
    <div style="margin-top:19px;font-size:24px;color:#ff8737">{{$store.state.words.length}} VSYS</div>

    <div style="margin-top:38px;padding-right:100px">
      Saving this word means it will be stored on the chain.
      <br />
      <br />After the word is saved you can also mint it as an NFT.
      <br />
      <br />Click PAY to continue
    </div>
    <div style="height:150px"></div>

    <div class="base-button" @click="pay">PAY</div>
  </div>
</template>

<script>
import { reqGetAddress, reqGetBalance, reqSaveWordId } from "@/api/index";
import BigNumber from 'bignumber.js'

export default {
  name: "WordPay",
  methods: {
    async pay() {
      try {
        var address = await reqGetAddress();
        console.log(address);
        var res = await this.$store.commit("sendToken", {
          publicKey: this.$store.state.wallet.publicKey,
          recipient: address[0],
          amount: this.$store.state.words.length
        });
        console.log(res);
        var balanceData = await reqGetBalance(address[0]);
        if (
          BigNumber(balanceData.balance).isGreaterThan(
            BigNumber(this.$store.state.words.length * 1e8)
          )
        ) {
          var respond = await reqSaveWordId(
            this.$store.state.words.map(item => item.id)
          );
          console.log(respond);
          // this.$router.push("/word_finish");
        } else {
          this.$alert("Balance of address in backend is insufficient");
        }
      } catch (error) {
        return this.$alert(error);
      }
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
  border: 1px solid #ff8737;
  border-radius: 5px;
  color: #ff8737;
  margin: 100px 12px 0 12px;
}
.base-button:hover {
  color: white;
  background: #ff8737;
}
</style>