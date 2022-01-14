<template>
  <div style="display:flex;flex-direction:column;text-align:center;align-items:center">
    <img style="margin-top:30%" src="@/assets/imgs/settings_aboutus.svg" width="40" alt />
    <h2>Connect your wallet</h2>
    <div
      style="padding:0 40px"
    >To continue saving a word you must connect your {{selectedWallet}} wallet.</div>
    <div
      style="display: flex;width: 100%;padding: 40px;justify-content: space-around;box-sizing: border-box;"
    >
      <div class="base-button-ui" @click="$router.go(-1)">Cancel</div>
      <div class="base-button-ui" @click="getAccount">CONNECT</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { selectedWallet: "" };
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
      this.$router.replace("/");
      // this.$confirm("Are you sure to sign out?", "", {
      //   confirmButtonText: "Yes",
      //   cancelButtonText: "No",
      //   type: "warning"
      // }).then(() => location.reload());
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
}
.base-button-ui:hover {
  background: #FB8809;
  color: white;
}
</style>