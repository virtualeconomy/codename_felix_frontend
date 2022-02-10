<template>
  <div style="display:flex;flex-direction:column;text-align:center;align-items:center">
    <img style="margin-top:30%" src="@/assets/imgs/settings_aboutus.svg" width="40" alt />
    <h2>{{isInstall ? 'INSTALL EXTENSION' : 'Connect your wallet'}}</h2>
    <div
      style="padding:0 40px"
    >{{isInstall ? "Sorry,but it seems to that you don't have " + (selectedWallet == 'vsys' ? selectedWallet : 'DARA (metamask)') + ' extension. To continue, please use the link to install.' : 'To continue saving a word you must connect your ' + (selectedWallet == 'vsys' ? selectedWallet : 'DARA (metamask)') + ' wallet.'}}</div>
    <div
      style="display: flex;width: 100%;padding: 40px;justify-content: space-around;box-sizing: border-box;"
    >
      <div class="base-button-ui" @click="$router.push('/')">Cancel</div>
      <div class="base-button-ui" style="background:#FB8809;color:#fff;border:1px solid #FB8809" @click="isInstall ? jumpToInstall() : getAccount()">{{isInstall ? 'INSTALL' : 'CONNECT'}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { selectedWallet: "",isInstall: false };
  },
  // computed: {
  //   selectedWallet() {
  //     return { eth: "Metamask", vsys: "V" }[window.walletName];
  //   }
  // },
  watch: {
    $route: {
      handler() {
        this.selectedWallet = this.$route.query[0];
        this.isInstall = false
      },
      immediate: true
    }
  },
  created() {
    if (this.$store.state.eth.wallet.address && !this.$store.state.vsys.wallet.address) this.selectedWallet = 'vsys'
    // window.eventBus.$on("eventBusName", function(val) {
    //   this.selectedWallet = val;
    //   console.log(val);
    // });
  },
  methods: {
    async getAccount() {
      const res = await this.$store.dispatch(`${this.selectedWallet}/getAccount`);
      if(res.result){
        if (this.selectedWallet === 'eth') {
          await this.$store.dispatch(`${this.selectedWallet}/getBalance`, "0x0255af6c9f86F6B0543357baCefA262A2664f80F")
        }
        localStorage['appWallet'] = localStorage[`${this.selectedWallet}Wallet`] = JSON.stringify(this.$store.state[`${this.selectedWallet}`].wallet)
          this.$router.replace("/");
      }else{
        this.isInstall = true
      }
      // this.$confirm("Are you sure to sign out?", "", {
      //   confirmButtonText: "Yes",
      //   cancelButtonText: "No",
      //   type: "warning"
      // }).then(() => location.reload());
    },
    jumpToInstall(){
      window.open(this.selectedWallet === 'eth' ? 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' : 'https://chrome.google.com/webstore/detail/v-wallet-extension/afccgfbnbpgfdokbllhiccepgggofoco')
    }
  }
};
</script>

<style scoped>
.base-button-ui {
  border: 1px solid black;
  border-radius: 50px;
  padding: 5px;
  width: 100px;
  cursor: pointer;
}
.base-button-ui:hover {
  background: #FB8809;
  color: white;
}
</style>
