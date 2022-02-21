<template>
  <div style="display:flex;flex-direction:column;text-align:center;align-items:center">
    <img style="margin-top:30%" src="@/assets/imgs/settings_aboutus.svg" width="40" alt />
    <h2>Sign out of wallet</h2>
    <div style="padding:0 30px 30px 30px;font-family:'coves-light'">
      Before you sign out of your wallet, please make sure that you have need information to sign in again. Without it, you will use access to to your saved words.
      <br />
      <br />Select wallet to sign out. You must select at least one to continue.
    </div>
    <div style="z-index:2;cursor:pointer" :class="{active:selected==='eth'}" @click="selected='eth'">
      <img v-if="selected==='eth'" src="@/assets/imgs/selectedHighlight.svg" width="20" />
      <i v-else width="20"></i>
      <span style="display: inline-block;width: 90px;">Metamask</span>
    </div>
    <div style="height:10px"></div>
    <div style="z-index:2;cursor:pointer" :class="{active:selected==='vsys'}" @click="selected='vsys'">
      <img v-if="selected==='vsys'" src="@/assets/imgs/selectedHighlight.svg" width="20" />
      <i v-else width="20"></i>
      <span style="display: inline-block;width: 90px;">V Wallet</span>
    </div>

    <div
      style="display: flex;width: 100%;padding: 40px;justify-content: space-around;box-sizing: border-box;z-index:2"
    >
      <div class="base-button-ui" style="cursor:pointer" @click="$router.go(-1)">Cancel</div>
      <div class="base-button-ui" style="cursor:pointer" @click="clearStore">Sign Out</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "eth"
    };
  },
  methods: {
    clearStore() {
      this.$store.commit(`${this.selected}/updateWallet`, {
        address: "",
        net: "",
        publicKey: "",
        walletName: ""
      });
      localStorage[`${this.selected}Wallet`] = ''
      if (
        !this.$store.state.eth.wallet.address &&
        !this.$store.state.vsys.wallet.address
      ) {
        this.$store.commit("app/updateWallet", {
          address: "",
          net: "",
          publicKey: "",
          walletName: ""
        });
        localStorage['appWallet'] = ''
      }
      this.$router.replace("/");
      // location.reload();
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
.active {
  color: #FB8809;
  text-align: center;
}
</style>