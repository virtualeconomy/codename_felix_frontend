<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#ff8737;font-size:20px;font-weight:600"
    >back to home</i>
    <h3>Settings</h3>
    <div style="font-weight:bold;margin-bottom:19px">
      Wallet:
      <span
        style="color:#ff8737;"
      >{{$store.state.wallet.address.slice(0,5)+'...'+$store.state.wallet.address.slice(-3)}}</span>
    </div>

    <div @click="$router.push('/settings/device_settings')" class="base-item">
      <img width="20" src="@/assets/imgs/settings_devicesettings.svg" alt />
      <div style="margin-left:12px;flex:1">Device settings</div>
      <i class="el-icon-arrow-right" style="color:#ff8737;font-size:20px;font-weight:600"></i>
    </div>

    <div @click="$router.push('/settings/saved_words')" class="base-item">
      <img width="20" src="@/assets/imgs/settings_savedwords.svg" alt />
      <div style="margin-left:12px;flex:1">Saved words</div>
      <i class="el-icon-arrow-right" style="color:#ff8737;font-size:20px;font-weight:600"></i>
    </div>

    <div @click="$router.push('/settings/about')" class="base-item">
      <img width="20" src="@/assets/imgs/settings_aboutus.svg" alt />
      <div style="margin-left:12px;flex:1">About us</div>
      <i class="el-icon-arrow-right" style="color:#ff8737;font-size:20px;font-weight:600"></i>
    </div>

    <div @click="$router.push('/settings/sign_out')" class="base-item">
      <img width="18" src="@/assets/imgs/settings_signout.svg" alt />
      <div style="margin-left:12px;color:#ff8737">SING OUT</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SavedWords",
  data() {
    return {};
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