<template>
  <div style="display:flex;flex-direction:column;text-align:center;align-items:center">
    <img style="margin-top:30%" src="@/assets/imgs/settings_aboutus.svg" width="40" alt />
    <h2>{{showWalletStatus()}}</h2>
    <div
      style="padding:0 40px"
    >{{showMessage()}}</div>
    <div
      style="display: flex;width: 100%;padding: 40px;justify-content: space-around;box-sizing: border-box;"
    >
      <div class="base-button-ui" @click="$router.push('/')">Cancel</div>
      <div class="base-button-ui" style="background:#FB8809;color:#fff;border:1px solid #FB8809" @click="this.jump">{{this.showButtonMessage()}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { selectedWallet: "",isInstall: false, walletStatus: "toConnect" };
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
        this.walletStatus = "toConnect"
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
    showWalletStatus() {
      switch (this.walletStatus) {
        case "toConnect":
          return "CONNECT YOUR WALLET"
        case "toLogin":
          return "LOG IN"
        case "toInstall":
          return "INSTALL EXTENSION"
        default:
          return "CONNECT YOUR WALLET"
      }
    },
    showMessage() {
      switch (this.walletStatus) {
        case "toConnect":
          return 'To continue minting you must connect your ' + (this.selectedWallet === 'vsys' ? 'V' : 'Metamask') + (this.selectedWallet === 'vsys' ? ' wallet.' : ' wallet and have a minimum of 5000 DARA tokens available.')
        case "toLogin":
          return "It seems that you have the extension installed, but you didn’t log in to your V Wallet.To continue, please go to your V Wallet extension and log in. "
        case "toInstall":
          return "Sorry,but it seems to that you don't have " + (this.selectedWallet === 'vsys' ? 'V' : 'Metamask') + " extension. To continue, please use the link to install."
        default:
          return 'To continue minting you must connect your ' + (this.selectedWallet === 'vsys' ? 'V' : 'Metamask') + (this.selectedWallet === 'vsys' ? ' wallet.' : ' wallet and have a minimum of 5,000 DARA tokens available.')
      }
    },
    showButtonMessage() {
      switch (this.walletStatus) {
        case "toConnect":
          return "CONNECT"
        case "toLogin":
          return "CONTINUE"
        case "toInstall":
          return "INSTALL"
        default:
          return "CONNECT"
      }
    },
    async getAccount() {
      const res = await this.$store.dispatch(`${this.selectedWallet}/getAccount`);
      if(res.result){
        if (this.selectedWallet === 'eth') {
          await this.$store.dispatch(`${this.selectedWallet}/getBalance`, "0x0255af6c9f86F6B0543357baCefA262A2664f80F")
        }
        localStorage['appWallet'] = localStorage[`${this.selectedWallet}Wallet`] = JSON.stringify(this.$store.state[`${this.selectedWallet}`].wallet)
          this.$router.replace("/");
      }else{
        if (res.code === 1) {
          this.walletStatus = "toInstall"
        } else if (res.code === 2) {
          this.walletStatus = "toLogin"
        }
      }
      // this.$confirm("Are you sure to sign out?", "", {
      //   confirmButtonText: "Yes",
      //   cancelButtonText: "No",
      //   type: "warning"
      // }).then(() => location.reload());
    },
    jump(){
      if (this.walletStatus === "toConnect" || this.walletStatus === "toLogin") {
        this.getAccount()
      } else if (this.walletStatus === "toInstall") {
        window.open(this.selectedWallet === 'eth' ? 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' : 'https://chrome.google.com/webstore/detail/v-wallet-extension/afccgfbnbpgfdokbllhiccepgggofoco')
      }
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
