<template>
  <div class="mint_success">
    <img src="@/assets/imgs/mint_success.svg" class="mint_success_img" />
    <div class="title">NFT HAS BEEN MINTED!</div>
    <div class="des">Your NFT has been minted and you can find it in gallery, with other NFTs.</div>
    <div class="content">
        <div class="transaction_detail"
            v-for="(item,index) in newNFTs"
            :key="index">
            <div class="session_word">{{ item.nft_word_name }}</div>
            <div class="session_status">TOKENS ID</div>
            <div class="detail_content" @click="txInfo(item.nft_creation_txid)" style="cursor:pointer"><u>{{item.nft_creation_txid}}</u></div>
            <div class="session_status">STATUS</div>
            <div class="detail_content">{{item.status}}</div>
        </div>
    </div>
    <div class="base-buttons" @click="$router.push('/gallery')" style="margin-top:12px;">GO TO GALLERY</div>
    <div class="base-buttons mint_btn" @click="$router.push('/')" style="margin-top:20px;">GO TO DICTIONARY</div>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      newNFTs: []
    };
  },
  watch: {
    $route: {
      async handler() {
        this.newNFTs = this.$route.query[0];
      },
      immediate: true
    }
  },
  methods: {
    txInfo(txId) {
        let NETWORK_BYTE = 'T'
        let EXPLORER = 'https://explorer.v.systems'
        let TEST_EXPLORER = 'https://testexplorer.v.systems'
        let TX_URL = '/transactions/'
        let url = NETWORK_BYTE === 'T' ? TEST_EXPLORER : EXPLORER
        window.open(url + TX_URL + txId)
    }
  },
  components: {}
};
</script>
<style lang='less' scoped>
.mint_success {
  width: 100%;

  .mint_success_img {
    width: 51px;
    margin: 30px auto;
  }

  .title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }

  .des {
    width: 80%;
    text-align: center;
    font-size: 15px;
    margin-left: 10%;
    margin-top: 19px;
  }

  .base-buttons {
    position: relative;
    z-index: 2;
    padding: 5px;
    text-align: center;
    border: 1px solid #fb8809;
    border-radius: 5px;
    color: #fb8809;
    margin-top: 20px;
    margin-left: 12px;
    margin-right: 12px;
    cursor: pointer;
  }

  .mint_btn {
    background: #fb8809;
    color: white;
    font-weight: bold;
    margin-top: 12px;
  }
  .content{
    overflow: scroll;
    height: 600px;
  }
  .transaction_detail{
      margin-top:14px;
      height:150px;
      border-bottom: solid black 1px;
      position: relative;
      z-index: 2;
  }
  .session_word {
      color: rgb(251, 136, 9);
      font-size:30px;
      font-weight:bold 
  }
  .session_status {
      color:171616;
      font-size:20px;
      font-weight:bold 
  }
  .detail_content {
      color:#FB8809;
      font-size:15px;
      font-weight:bold;
      margin-top: 7px;
      margin-bottom: 7px;
  }
}
</style>