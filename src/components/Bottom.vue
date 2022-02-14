<template>
  <div id="bottom">
    <img class="placeholderDiv" style="padding:10px" src="@/assets/imgs/footer_logo.svg" width="30" />
    <div style="flex:1;color:white;text-align:center;">
      <span class="placeholderDiv" style="font-weight:bold;color:#FB8809">MINTED WORDS: </span>
      &nbsp;
      <span class="placeholderDiv" >{{ NFTCount }} </span>
      <span class="placeholderDiv" style="font-weight:bold;color:#FB8809">&nbsp;&nbsp;|&nbsp;&nbsp;LAST MINTED: </span>
      &nbsp;
      <span class="placeholderDiv" >{{ lastSavedWords }} </span>
      <span class="placeholderDiv" style="font-weight:bold;color:#FB8809">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span class="balance" style="font-weight:bold;color:#FB8809"> Balance</span>
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
        <div style="font-size:20px;margin-top:10px">Amount VSYS:</div>
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
import { reqGetBalance,reqGetLastSaved,reqGetCountNFT,reqGetCountSaved } from "@/api/index";

export default {
  async created() {
    const balanceData = await reqGetBalance();
    if (balanceData) {
      let values = Object.values(balanceData)
      this.address = values[0].address
      this.balance = BigNumber(values[0].balance).dividedBy(1e8)
    }
    const lastSavedWordsList = await reqGetLastSaved();
    if (lastSavedWordsList) {
      for (var savedWord in lastSavedWordsList){
        this.lastSavedWords = this.lastSavedWords + " " + JSON.parse(lastSavedWordsList[savedWord])["word"]+ ", "
      }
      this.lastSavedWords = this.lastSavedWords.slice(0, this.lastSavedWords.length-2)
    }
    this.NFTCount = await reqGetCountNFT();
  },
  data() {
    return {
      address: "",
      balance: 0,
      amount: "",
      dialogFormVisible: false,
      lastSavedWords: "",
      NFTCount: 0
    };
  },
  methods: {
    openUrl(url) {
      window.open(url, "_blank");
    },
    async donate() {
      if (!this.amount) return;
      if (!this.$store.state.vsys.wallet.address) {
        alert("TO DONATE, YOU MUST CONNECT YOUR V WALLET");
      } else if (!this.address) {
        return alert("Invalid address");
      } else {
        let res = await window.vsys.request({
          method: 'send',
          params:
              {
                publicKey: this.$store.state.vsys.wallet.publicKey,
                recipient: this.address,
                amount: this.amount,
                description: "donation"
              }
        })
        if (res.result && res.message === 'OK') {
          this.dialogFormVisible = false
          alert("Payment submitted successfully, please refresh page later");
        } else {
          console.log(res, "cancel")
        }
      }
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
  .balance {
    float: left;
    margin-left: 20px
  }
  .dontate-btn {
    float: right;
    margin-right: 20px
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
  margin-left: 20px;
}
</style>
