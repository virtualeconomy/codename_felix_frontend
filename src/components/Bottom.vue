<template>
  <div id="bottom">
    <img style="padding:10px" src="@/assets/imgs/footer_logo.svg" width="30" />
    <div style="flex:1;color:white;text-align:center">
      <span style="font-weight:bold;color:#FB8809">Balance</span>
      &nbsp;
      <span>{{ balance }} VSYS</span>&nbsp;
      <div @click="dialogFormVisible=true" class="dontate-btn">DONATE</div>
    </div>
    <div class="placeholderDiv">
      <div style="position: absolute;transform: translate(-180px,-8px);width: 180px;">
        <span @click="openUrl('https://dara.global/')" style="color:#FB8809;cursor:pointer">DARA</span>&nbsp;&nbsp;
        <span
          @click="openUrl('https://theimmutable.net/')"
          style="color:white;cursor:pointer"
        >Immutable DAO</span>
      </div>
    </div>
    <el-dialog
      title="Thank you for your donation!"
      :visible.sync="dialogFormVisible"
      append-to-body
    >
      <el-form>
        <div
          style="font-size:20px;margin-bottom:10px"
        >The money you donate will go into this account:</div>
        <div style="color:#FB8809">{{ address }}</div>
        <div style="font-size:20px;margin-top:10px">Amount:</div>
        <el-input type="number" v-model="amount" auto-complete="off"></el-input>
      </el-form>
      <div slot="footer" style="display:flex;justify-content:space-between">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="donate">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import { reqGetBalance } from "@/api/index";

export default {
  async created() {
    const balanceData = await reqGetBalance();
    if (balanceData) {
      let values = Object.values(balanceData)
      this.address = values[0].address
      this.balance = BigNumber(values[0].balance).dividedBy(1e8)
    }
  },
  data() {
    return {
      address: "",
      balance: 0,
      amount: "",
      dialogFormVisible: false
    };
  },
  methods: {
    openUrl(url) {
      window.open(url, "_blank");
    },
    async donate() {
      if (!this.amount) return;
      if (JSON.stringify(this.$store.state.vsys.wallet) === "{}")
        return alert("TO CONTINUE, YOU MUST CONNECT YOUR WALLET!");
      if (!this.address) return alert("Invalid address");
      var res = await this.$store.commit("sendToken", {
        publicKey: this.$store.state.vsys.wallet.publicKey,
        recipient: this.address[0],
        amount: this.amount
      });
      this.dialogFormVisible = false;
      alert("Payment submitted successfully, please refresh page later");
    }
  },
  components: {}
};
</script>

<style scoped>
@media screen and (min-width: 500px) {
  .placeholderDiv {
    position: relative;
    width: 50px;
  }
}
@media screen and (max-width: 500px) {
  .placeholderDiv {
    display: none;
  }
}
#bottom {
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  background: black;
  font-size: 1rem;
  z-index: 99;
}
.el-dialog__wrapper >>> .el-dialog {
  min-width: 300px;
}
.dontate-btn {
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #fb8809;
  padding: 5px 10px;
  cursor: pointer;
  background: #fb8809;
}
</style>
