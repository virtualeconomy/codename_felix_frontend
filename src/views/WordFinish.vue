<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#FB8809;font-size:20px;font-weight:600"
    >back to home screen</i>
    <div style="margin-top:39px">You have successfully saved the words</div>
    <div v-for="(item, index) in $store.state.app.words" :key="index">
        <h3 style="color:#FB8809">{{ item.word.toUpperCase() }}</h3>
    </div>
    <div style="min-height:100px;flex:1"></div>
    <div class="base-button" @click="mintNFT">MINT NFTs</div>
    <div class="base-button" @click="$router.push('/settings/saved_words')" style="margin-top:20px">VIEW YOUR SAVED WORDS</div>
  </div>
</template>

<script>
import { reqMakeNft } from "@/api/index";

export default {
  name: 'WordFinish',
  data() {
    return {}
  },
  methods: {
    async mintNFT() {
      try {
        if (!this.$store.state.vsys.wallet.address) {
          alert("TO MINT, YOU MUST CONNECT YOUR V WALLET");
        } else {
          const promises = this.$store.state.app.words.map(async word => {
            let reqArg = { [this.$store.state.vsys.wallet.address] : [word.id]}
            let result = await reqMakeNft(reqArg)
            return result;
          });
          const nfts = await Promise.all(promises);
          let nftRecords = JSON.parse(window.localStorage.getItem('nfts'))
          nftRecords = nftRecords ? nftRecords : []
          for (let i = 0; i < nfts.length; i ++) {
            let nft = {
              "nftId": nfts[i]["nfts"][0][1],
              "nftTransId": nfts[i]["nfts"][0][0],
              "reciever": nfts[i]["reciever"],
            }
            nftRecords.push(nft)
          }
          nftRecords = JSON.stringify(nftRecords)
          window.localStorage.setItem('nfts', nftRecords)
          alert('NFT has been generated')
        }
      } catch (error) {
        // Need to check that the word has been saved
        alert(error)
      }
    }
  }
}
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