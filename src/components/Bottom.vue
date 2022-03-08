<template>
  <div id="bottom">
    <img
      class="placeholderDiv"
      style="padding:10px;width:30px;"
      src="@/assets/imgs/footer_icon.svg"
      width="30"
    />
    <div class="content" style="flex:1;color:white;text-align:center;">
      <span class="placeholderDiv" style="font-weight:bold;color:#FB8809">MINTED WORDS:</span>
      <span class="placeholderDiv">{{ NFTCount }}</span>
      <span class="placeholderDiv" style="font-weight:bold;color:#FB8809">&nbsp;|&nbsp;LAST MINTED:</span>
      <span class="placeholderDiv">{{ lastSavedWords }}</span>
      <span class="placeholderDiv" style="font-weight:bold;color:#FB8809">&nbsp;|&nbsp;</span>
      <span class="balance_label" style="font-weight:bold;color:#FB8809">Balance</span>
      &nbsp;
      <span class="balance_amount">{{ balance }} VSYS</span>
      <div @click="dialogFormVisible=true" class="dontate-btn">DONATE</div>
    </div>
    <div class="placeholderDiv">
      <div style="position: absolute;transform: translate(-180px,-8px);width: 180px;">
        <span @click="openUrl('https://dara.global/')" style="color:#FB8809;cursor:pointer">DARA</span>&nbsp;
        <span
          @click="openUrl('https://theimmutable.net/')"
          style="color:white;cursor:pointer"
        >Immutable DAO</span>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :show-close="false" top="25vh" append-to-body @closed="closeDonate">
      <div v-if="isShowTips"  slot="title">
        <div style="width:100%;text-align:right;">
          <img
            width="30"
            src="@/assets/imgs/donate_close.svg"
            style="cursor:pointer;"
            @click="dialogFormVisible=false"
          />
        </div>
        <div style="width:100%;text-align:center;font-family: sen-bold;font-size:18px">
          <div style="width:70%;margin-left:15%;margin-top:15px;">
           If you would like to support Felix Dictionary you can send DARA (DARA) or VSYS (V Systems). Thanks!
          </div>
        </div>
        <div style="width:100%;display:flex;flex-direction:column;align-items:center;">
          <div @click="chooseDonationType(true)" style="width:288px;height:43px;background:#FB8809;color:#F3EDE6;font-family: sen-regular;font-size:20px;text-align:center;line-height:43px;border-radius:8px;cursor:pointer;margin-top:35px;">DONATE VSYS</div>
          <div @click="chooseDonationType(false)" style="width:288px;height:43px;background:#FB8809;color:#F3EDE6;font-family: sen-regular;font-size:20px;text-align:center;line-height:43px;border-radius:8px;cursor:pointer;margin-top:20px;">DONATE DARA</div>
        </div>
      </div>
      <div v-else slot="title">
        <div style="font-family: sen-bold;font-size:18px">Thank you for your donation!</div>
        <el-form style="margin-top:25px;">
          <div
            style="font-family: sen-regular;font-size:18px;"
          >The money you donate will go into this account:</div>
          <div style="color:#FB8809;font-family: sen-regular;font-size:18px">{{ isDonateVSYS ?  address : daraAddress }}</div>
          <div style="font-family: sen-regular;font-size:18px;margin-top:20px;margin-bottom:10px;">Amount {{isDonateVSYS ? 'VSYS' : 'DARA'}}:</div>
          <el-input type="number" v-model="amount" auto-complete="off"></el-input>
        </el-form>
      </div>
        <div v-if="!isShowTips" slot="footer" style="display:flex;justify-content:space-between">
          <el-button @click="dialogFormVisible = false" style="border:1px solid #000000;color:#171616;" plain>Cancel</el-button>
          <el-button @click="donate" style="border:none;background:#FB8809;color:#FFFFFF;" plain>Confirm</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import {
  reqGetBalance,
  reqGetLastSaved,
  reqGetCountNFT
} from "@/api/index";
import Web3 from 'web3'

export default {
  async created() {
    const balanceData = await reqGetBalance();
    if (balanceData) {
      let values = Object.values(balanceData);
      this.address = values[0].address;
      this.balance = BigNumber(values[0].balance).dividedBy(1e8);
    }
    const lastSavedWordsList = await reqGetLastSaved();
    if (lastSavedWordsList) {
      for (var savedWord in lastSavedWordsList) {
        this.lastSavedWords =
          this.lastSavedWords +
          " " +
          JSON.parse(lastSavedWordsList[savedWord])["word"] +
          ", ";
      }
      this.lastSavedWords = this.lastSavedWords.slice(
        0,
        this.lastSavedWords.length - 2
      );
    }
    this.NFTCount = await reqGetCountNFT();
  },
  data() {
    return {
      address: "",
      daraAddress: "0xcB613BFC2fA5F14F64024b4E012aBB742AA1B677",
      balance: 0,
      amount: "",
      dialogFormVisible: false,
      lastSavedWords: "",
      NFTCount: 0,
      isShowTips: true,
      isDonateVSYS: true
    };
  },
  methods: {
    chooseDonationType(val){
      this.isShowTips = false
      this.isDonateVSYS = val
    },
    closeDonate(){
      this.isShowTips = true
      this.amount = ''
    },
    openUrl(url) {
      window.open(url, "_blank");
    },
    async donate() {
      if (!this.amount) return;
      if (this.isDonateVSYS) {
        if (!this.$store.state.vsys.wallet.address) {
          alert("TO DONATE, YOU MUST CONNECT YOUR V WALLET");
        } else if (!this.address) {
          return alert("Invalid address");
        } else if (BigNumber(this.$store.state.vsys.wallet.amount).isLessThan(this.amount)) {
          return alert("Insufficient VSYS token in your v wallet")
        } else {
          let res = await window.vsys.request({
            method: "send",
            params: {
              publicKey: this.$store.state.vsys.wallet.publicKey,
              recipient: this.address,
              amount: this.amount,
              description: "donation"
            }
          });
          if (res.result && res.message === "OK") {
            this.dialogFormVisible = false;
            alert("Payment submitted successfully, please refresh page later");
          } else {
            console.log(res, "cancel");
          }
        }
      } else {
        let sender = this.$store.state.eth.wallet.address
        if (!sender) {
          alert("TO DONATE, YOU MUST CONNECT YOUR METAMASK WALLET");
        } else if (!this.address) {
          return alert("Invalid address")
        } else if (BigNumber(this.$store.state.eth.wallet.amount).isLessThan(this.amount)) {
          return alert("Insufficient DARA token in your metamask wallet")
        }else {
          const web3 = new Web3(window.ethereum)
          const tokenABI = [{"inputs":[{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"uint8","name":"tokenDecimals","type":"uint8"},{"internalType":"uint256","name":"tokenTotalSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCounter","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int256","name":"key","type":"int256"}],"name":"getHash","outputs":[{"internalType":"string","name":"value","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"","type":"int256"}],"name":"store","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"value","type":"string"}],"name":"storeHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
          const tokenInst = new web3.eth.Contract(tokenABI, "0x0255af6c9f86F6B0543357baCefA262A2664f80F")
          const tx = {
            from: sender,
            to: tokenInst._address,
            data: tokenInst.methods.transfer(this.daraAddress, web3.utils.toWei( this.amount )).encodeABI(),
          }
          web3.eth.sendTransaction(tx).then(res => {
            this.dialogFormVisible = false;
            alert("Payment submitted successfully, please check your metamask wallet later");
            console.log("res",res)
          }).catch(err => {
            console.log("err",err)
          });
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-button {
    width:141px;
    height:37px;
    line-height:37px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    /deep/ span {
        font-family: sen-regular;
        font-size:20px;
        font-weight: normal;
    }
}
@media screen and (min-width: 500px) {
  .placeholderDiv {
    position: relative;
    width: 50px;
  }
  .content {
    margin-right: 150px;
  }
}
@media screen and (max-width: 500px) {
  .placeholderDiv {
    display: none;
  }
  .balance_label {
    margin-left: 20px;
  }
  .dontate-btn {
    margin-right: 20px;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
.el-dialog__wrapper /deep/ .el-dialog {
  width: 489px !important;
  border-radius: 20px;
}
.dontate-btn {
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #fb8809;
  padding: 5px 10px;
  cursor: pointer;
  background: #fb8809;
  margin: 10px 20px;
}
</style>
