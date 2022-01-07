<template>
  <div class="navbar">
    <img style="height:40px" src="@/assets/imgs/header_logo.svg" />
    <div class="connect-wallet" @click="isShow = !isShow">
      <transition name="fade">
        <div class="wallet-list" v-show="isShow">
          <!-- MATAMASK WALLET -->
          <div class="wallet-list-item">MATAMASK WALLET</div>
          <!-- account list of eth -->
          <div
            class="wallet-list-item"
            style="color:white;cursor:pointer"
            v-for="address in EthWalletList"
            :key="address"
            @click="switchWallet('eth')"
          >
            <img
              v-if="$store.state.app.curWallet.walletName === 'eth'"
              src="@/assets/imgs/selected.svg"
              width="20"
            />
            <i v-else style="width:20px"></i>
            &nbsp;&nbsp;
            {{address.slice(0, 5) + "..." + address.slice(-3)}}
          </div>
          <!-- Metamask Settings -->
          <div
            v-if="EthWalletList.length"
            @click="toConnectWalletPage('eth')"
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
            Connect Matamask
          </div>

          <!-- V WALLET -->
          <div class="wallet-list-item">V WALLET</div>
          <!-- account list of vsys -->
          <div
            class="wallet-list-item"
            style="color:white;cursor:pointer"
            v-for="address in VsysWalletList"
            :key="address"
            @click="switchWallet('vsys')"
          >
            <img
              v-if="$store.state.app.curWallet.walletName === 'vsys'"
              src="@/assets/imgs/selected.svg"
              width="20"
            />
            <i v-else style="width:20px"></i>
            &nbsp;&nbsp;
            {{address.slice(0, 5) + "..." + address.slice(-3)}}
          </div>
          <!-- V Wallet Settings -->
          <div
            v-if="VsysWalletList.length"
            @click="toConnectWalletPage('vsys')"
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
      <div v-else style="color: #ff8737;cursor: pointer">
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
    showWalletInfo() {
      console.log(this.$store.state.app.curWallet);
      return this.$store.state.app.curWallet.address;
    },
    EthWalletList() {
      var address = this.$store.state.eth.wallet.address;
      if (address) return [address];
      else return [];
    },
    VsysWalletList() {
      var address = this.$store.state.vsys.wallet.address;
      console.log(address)
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

    // async connectWallet() {
    //   this.loadingWallet = true;
    //   const res = await this.$store.dispatch("getAccount");
    //   if (res && !res.result === false) {
    //     alert(res.message);
    //   }
    //   this.loadingWallet = false;
    // },
    // checkDevice() {
    //   if (document.documentElement.clientWidth < 768) {
    //     this.isPhone = true;
    //     this.unfold = false;
    //   } else {
    //     this.isPhone = false;
    //     this.drawer = false;
    //   }
    // },
    //   switchActive(index) {
    //     const currentPath = this.$router.currentRoute.path;
    //     if (
    //       this.activeIndex !== index ||
    //       currentPath !== this.switchTaps[index]
    //     ) {
    //       this.activeIndex = index;
    //       this.$router.replace(this.switchTaps[index].path);
    //     }
    //   }
  }
};
</script>
<style>
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
  background: #ff8737;
  border-radius: 5px;
  opacity: 0.9;
  min-width: 229px;
  top: 34px;
  transform: translateX(-50px);
}
.connect_to_wallet {
  color: #ff8737;
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
.fade-leave-active {
  transition: opacity 0.3s;
}
</style>
