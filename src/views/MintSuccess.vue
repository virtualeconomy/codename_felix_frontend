<template>
  <div class="mint_success">
    <img src="@/assets/imgs/mint_success.svg" class="mint_success_img" />
    <div class="title">NFT HAS BEEN MINTED!</div>
    <div class="des">Your NFT has been minted and you can find it in gallery, with other NFTs.</div>
    <div class="base-buttons" @click="$router.push('/gallery')">GO TO GALLERY</div>
    <div class="base-buttons mint_btn" @click="$router.push('/')" style="margin-top:20px;">GO TO DICTIONARY</div>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>
<style lang='less' scoped>
.mint_success {
  width: 100%;

  .mint_success_img {
    width: 51px;
    margin: 70px auto;
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
    top: 380px;
    z-index: 2;
    padding: 5px;
    text-align: center;
    border: 1px solid #fb8809;
    border-radius: 5px;
    color: #fb8809;
    margin: 0 12px;
    cursor: pointer;
  }

  .mint_btn {
    background: #fb8809;
    color: white;
    font-weight: bold;
  }
}
</style>