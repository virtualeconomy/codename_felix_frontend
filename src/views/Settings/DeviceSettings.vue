<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#FB8809;font-size:20px;font-weight:600"
    >back to settings</i>
    <h3>Device Settings</h3>
    <div style="font-weight:bold;margin-bottom:19px">
      Wallet:
      <span
        style="color:#FB8809;"
      >{{address?address.slice(0,5)+'...'+address.slice(-3):'Not connected'}}</span>
    </div>
    <div style="margin-bottom:19px;color:#FB8809;font-weight:bold">Auto-lock</div>
    <div @click="autoLock($event)" style="display:flex;color:#FB8809">
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
  border: 1px solid #FB8809;
  border-radius: 20px;
}
.lock-button:hover,
.selected-ui {
  background: #FB8809;
  color: white;
}
</style>