<template>
  <div class="navbar">
    <img id="felix_logo" @click="$router.push('/')" style="height:40px;cursor:pointer" src="@/assets/imgs/header_logo.svg" />
    <div class="connect-wallet" @click="isShow = !isShow">
      <transition name="fade">
        <div class="wallet-list" v-show="isShow">
          <!-- MATAMASK WALLET -->
          <div class="wallet-list-item">METAMASK WALLET</div>
          <!-- account list of eth -->
          <div
            class="wallet-list-item wallet_column_list"
            style="color:white;cursor:pointer"
            v-for="address in EthWalletList"
            :key="address"
            @click="switchWallet('eth')"
          >
           <div style="width:100%">
            <img
              v-if="$store.state.app.curWallet.address === address"
              src="@/assets/imgs/selected.svg"
              width="20"
            />
            <i v-else style="width:20px"></i>
            &nbsp;&nbsp;
            {{address.slice(0, 5) + "..." + address.slice(-3)}}</div>
            <div class="coin_num">{{ daraBalance }} DARA</div>
          </div>
          <!-- Metamask Settings -->
          <div
            v-if="EthWalletList.length"
            class="wallet-list-item"
            style="color:white;cursor:pointer"
          >
            <img src="@/assets/imgs/more.svg" width="20" />&nbsp;&nbsp;
            Metamask Settings
          </div>
          <div
            v-else
            @click="toConnectWalletPage('eth')"
            class="wallet-list-item"
            style="color:white;cursor:pointer"
          >
            <i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;
            Connect Metamask
          </div>

          <!-- V WALLET -->
          <div class="wallet-list-item">V WALLET</div>
          <!-- account list of vsys -->
          <div
            class="wallet-list-item wallet_column_list"
            style="color:white;cursor:pointer"
            v-for="address in VsysWalletList"
            :key="address"
            @click="switchWallet('vsys')"
          >
          <div style="width:100%;">
            <img
              v-if="$store.state.app.curWallet.address === address"
              src="@/assets/imgs/selected.svg"
              width="20"
            />
            <i v-else style="width:20px"></i>
            &nbsp;&nbsp;
            {{address.slice(0, 5) + "..." + address.slice(-3)}}
          </div>
            <div class="coin_num">0 VSYS</div>
          </div>
          <!-- V Wallet Settings -->
          <div
            v-if="VsysWalletList.length"
            class="wallet-list-item"
            style="color:white;cursor:pointer"
          >
            <img src="@/assets/imgs/more.svg" width="20" />&nbsp;&nbsp;
            V Wallet Settings
          </div>
          <div
            v-else
            @click="toConnectWalletPage('vsys')"
            class="wallet-list-item"
            style="color:white;cursor:pointer"
          >
            <i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;
            Connect Vsys
          </div>

          <!-- Felix Settings -->
          <div
            class="wallet-list-item"
            style="border:0px;color:white;cursor:pointer"
            @click="$router.push('/settings')"
          >
            <img src="@/assets/imgs/settings.svg" width="20" />&nbsp;&nbsp;
            Felix Settings
          </div>
        </div>
      </transition>

      <!-- User Info -->
      <img
        v-if="showWalletInfo"
        style="cursor: pointer;transform:translateX(150px)"
        src="@/assets/imgs/user.svg"
        width="25"
      />
      <div v-else style="color: #FB8809;cursor: pointer;" class="connect_text_btn">
        <div>CONNECT WALLETS</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Vue from "vue";
export default {
  name: "navbar",
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    daraBalance() {
      return this.$store.state.eth.wallet.amount;
    },
    showWalletInfo() {
      return this.$store.state.app.curWallet.address;
    },
    EthWalletList() {
      var address = this.$store.state.eth.wallet.address;
      if (address) return [address];
      else return [];
    },
    VsysWalletList() {
      var address = this.$store.state.vsys.wallet.address;
      if (address) return [address];
      else return [];
    }
  },
  methods: {
    toConnectWalletPage(walletName) {
      if (walletName == this.$route.query[0]) return;
      this.$router.push({
        path: "/connect_wallet",
        query: { 0: walletName }
      });
    },
    switchWallet(walletName) {
      this.$store.commit(
        "app/updateWallet",
        this.$store.state[walletName].wallet
      );
    }
  }
};
</script>
<style lang="less">
.navbar {
  margin: 15px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.connect-wallet {
  min-width: 220px;
  position: relative;
}
.wallet-list {
  position: absolute;
  z-index: 99;
  background: #FB8809;
  border-radius: 5px;
  min-width: 229px;
  top: 34px;
  transform: translateX(-50px);
}
.connect_to_wallet {
  color: #FB8809;
  cursor: pointer;
}
.connect_to_wallet_font {
  width: 110px;
  overflow: scroll;
  font: normal normal normal 15px/19px Rajdhani;
  color: #f9fcfd;
}
.wallet-list-item {
  padding: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
}
.wallet_column_list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.coin_num{
  width: 100%;
  font-size: 15px;
  margin-left: 85px;
  margin-top: 5px;
}
.fade-leave-active {
  transition: opacity 0.3s;
}
@media screen and(max-width:768px) {
  .navbar {
    .wallet-list {
  top: 44px;
  transform: translateX(-0px);
}
.connect_text_btn{
    font-size: 16px;
    font-weight: bolder;
    text-align: right;
}
  }
}
</style>
