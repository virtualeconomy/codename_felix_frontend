<template>
  <div id="bottom" style="display:flex;align-items:center;background:black;font-size:1rem">
    <img style="padding:10px" src="@/assets/imgs/footer_logo.svg" width="30" />
    <div style="flex:1;color:white;text-align:center">
      <span style="font-weight:bold;color:#ff8737">Balance</span>
      &nbsp;
      <span>{{balance}} VSYS</span>&nbsp;
      <div @click="dialogFormVisible=true" class="dontate-btn">DONATE</div>
    </div>
    <div class="placeholderDiv"></div>

    <el-dialog title="Thank you for your donate!" :visible.sync="dialogFormVisible">
      <el-form>
        <div style="font-size:20px;margin-bottom:10px">The money you donate will go into this account:</div>
        <div style="color:#ff8737">{{address[0]}}</div>
        <div style="font-size:20px;margin-top:10px">Amount:</div>
        <el-input type="number" v-model="amount" auto-complete="off"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="donate">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import { reqGetAddress, reqGetBalance } from "@/api/index";

export default {
  async created() {
    this.address = await reqGetAddress();
    const balanceData = await reqGetBalance(this.address[0]);
    this.balance = BigNumber(balanceData.balance).dividedBy(1e8);
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
    async donate() {
      if (!this.amount) return
      if (JSON.stringify(this.$store.state.vsys.wallet) === "{}") return alert("TO CONTINUE, YOU MUST CONECT YOUR WALLET!")
      if (!this.address) return alert('Invalid address')
      var res = await this.$store.commit("sendToken", {
        publicKey: this.$store.state.vays.wallet.publicKey,
        recipient: this.address[0],
        amount: this.amount
      });
      this.dialogFormVisible = false
      alert('Payment submitted successfully, please refresh page later')
    }
  },
  components: {}
};
</script>

<style scoped>
@media screen and (min-width: 500px) {
  .placeholderDiv {
    width: 50px;
  }
}
.dontate-btn {
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #ff8737;
  padding: 5px 10px;
  cursor: pointer;
}
.dontate-btn:hover {
  background: #ff8737;
}
</style>
