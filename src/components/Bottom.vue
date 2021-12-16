<template>
  <div id="bottom" style="display:flex;align-items:center;background:black;font-size:1rem">
    <img style="padding:10px" src="@/assets/imgs/footer_logo.svg" width="30" />
    <div style="flex:1;color:white;text-align:center">
      <span style="font-weight:bold;color:#ff8737">Balance</span>
      &nbsp;
      <span>{{balance}} VSYS</span>&nbsp;
      <div
        style="display:inline-block;border-radius: 5px;background: #ff8737;padding: 5px 10px;"
      >DONTATE</div>
    </div>
    <div class="placeholderDiv"></div>
  </div>
</template>

<script>
import { reqGetAddress, reqGetBalance } from "@/api/index";

export default {
  async created() {
    var address = await reqGetAddress();
    const balanceData = await reqGetBalance(address[0]);
    this.balance = balanceData.balance;
  },
  data() {
    return {
      balance: 0
    };
  },
  methods: {},
  components: {}
};
</script>

<style scoped>
@media screen and (min-width: 960px) {
  .placeholderDiv {
    width: 50px;
  }
}
</style>
