<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#ff8737;font-size:20px;font-weight:600"
    >back to settings</i>
    <h3>Device Settings</h3>
    <div style="font-weight:bold;margin-bottom:19px">
      Wallet:
      <span
        style="color:#ff8737;"
      >{{address?address.slice(0,5)+'...'+address.slice(-3):'Not connected'}}</span>
    </div>
    <div style="margin-bottom:19px;color:#ff8737;font-weight:bold">Auto-lock</div>
    <div @click="autoLock($event)" style="display:flex;color:#ff8737">
      <div :class="{'selected-ui':selected==5}" class="lock-button">5 min</div>
      <div :class="{'selected-ui':selected==15}" class="lock-button">15 min</div>
      <div :class="{'selected-ui':!selected}" class="lock-button">never</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SavedWords",
  data() {
    return {
      selected: ""
    };
  },
  computed: {
    address() {
      return this.$store.state.app.curWallet.address;
    }
  },
  created() {
    this.selected = window.localStorage["sessionTimeout"];
  },
  methods: {
    autoLock(e) {
      console.log(e.path[0].childNodes[0].data);
      this.selected = window.localStorage["sessionTimeout"] = {
        "5 min": 5,
        "15 min": 15,
        never: ""
      }[e.path[0].childNodes[0].data || "never"];
    }
  }
};
</script>

<style scoped>
.lock-button {
  margin-right: 15px;
  padding: 2px 8px;
  border: 1px solid #ff8737;
  border-radius: 20px;
}
.lock-button:hover,
.selected-ui {
  background: #ff8737;
  color: white;
}
</style>