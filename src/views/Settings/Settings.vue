<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.push('/')"
      style="color:#FB8809;font-size:20px;font-weight:600;cursor:pointer"
    >back to home</i>
    <h3>Settings</h3>
    <div style="font-weight:bold;margin-bottom:19px">
      Wallet:
      <span style="color:#FB8809;">{{currentWalletAddress}}</span>
    </div>

    <div @click="$router.push('/settings/device_settings')" class="base-item" style="cursor:pointer">
      <img width="20" src="@/assets/imgs/settings_devicesettings.svg" alt />
      <div style="margin-left:12px;flex:1">Device settings</div>
      <i class="el-icon-arrow-right" style="color:#FB8809;font-size:20px;font-weight:600"></i>
    </div>

    <div @click="$router.push('/settings/about')" class="base-item" style="cursor:pointer">
      <img width="20" src="@/assets/imgs/settings_aboutus.svg" alt />
      <div style="margin-left:12px;flex:1">About us</div>
      <i class="el-icon-arrow-right" style="color:#FB8809;font-size:20px;font-weight:600"></i>
    </div>

    <div @click="$router.push('/settings/trans_id')" class="base-item">
      <img width="20" src="@/assets/imgs/settings_transId.svg" alt />
      <div style="margin-left:12px;flex:1">List of transactions ID</div>
      <i class="el-icon-arrow-right" style="color:#FB8809;font-size:20px;font-weight:600"></i>
    </div>

    <div @click="$router.push('/settings/sign_out')" class="base-item">
      <img width="18" src="@/assets/imgs/settings_signout.svg" alt />
      <div style="margin-left:12px;color:#FB8809">SIGN OUT</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SavedWords",
  data() {
    return {};
  },
  computed: {
    currentWalletAddress() {
      var address = this.$store.state.app.curWallet.address;
      if (address) return address.slice(0, 5) + "..." + address.slice(-3);
      else return "Not connected";
    }
  },
  methods: {},
  mounted() {
    // this.saveWord = this.$store.state.words;
    // need to backend api
  }
};
</script>

<style scoped>
.base-item {
  display: flex;
  font-weight: bold;
  margin-top: 38px;
}
</style>