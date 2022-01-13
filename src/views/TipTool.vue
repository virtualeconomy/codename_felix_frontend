<template>
  <div class="tip-tool">
    <img
      style="width: 25px;position: absolute;color: white;top: 80px;left: 50%;transform: translateX(240px);"
      @click="isShow=true"
      src="@/assets/imgs/tips.png"
    />
    <div
      v-show="isShow"
      style="background:#171616;border-radius:5px;padding:8px 16px;position:absolute;top:120px;left:50%;transform:translateX(240px);width:120px;text-align:center;color:white;font-family:'coves-light'"
    >
      <div style="text-align:right">
        <img @click="isShow=false" width="16px" src="@/assets/imgs/remove_white.svg" />
      </div>
      <div v-html="tipTextList[currentPage]"></div>
      <div style="display:flex;justify-content:space-around;margin-top:8px">
        <i class="el-icon-arrow-left" @click="lastPage"></i>&nbsp;&nbsp;
        <i class="el-icon-arrow-right" @click="nextPage"></i>
      </div>
    </div>
  </div>
</template>
      

<script>
export default {
  data() {
    return {
      isShow: true,
      currentPage: 0,
      tipTextList: [
        `<span style="color:#ff8737">save a word</span> is a community funded and community operated project, everyone is able to save their favorite words onto the V Systems blockchain.`,
        `Turn tips <span style="color:#ff8737">off/on</span> simply by clicking INFO icon. For fist time users we suggest that you leave tips ON.`,
        `In order to ensure everyone is able to participate you can always help this project by clicking <span style="color:#ff8737">DONTE</span> button in the footer.`,
        `<span style="color:#ff8737">BALANCE</span><br />of the project is always shown in the footer of the webapp.`,
        `For best experience we suggest using the <span style="color:#ff8737">FELIX</span> in the desktop mode`,
        `You can save up to 3 words / minute`,
        `You can save up to 10 words at once in a session`,
        `To ensure best usage of <span style="color:#ff8737">FELIX</span> we recommend connecting both, Metamask and V Wallet`
      ]
    };
  },
  methods: {
    nextPage() {
      this.currentPage < this.tipTextList.length - 1 && ++this.currentPage;
    },
    lastPage() {
      this.currentPage > 0 && --this.currentPage;
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 500px) {
  .tip-tool {
    display: none;
  }
}
</style>