<template>
  <div class="navbar">
    <img class="logo_size" src="@/assets/imgs/header_logo.svg" alt />
    <div v-show="!isPhone" class="right_corner">
      <div v-if="showWalletInfo" class="wallet_info">
        <img @click="$router.push('/settings')" src="@/assets/imgs/settings.svg" width="20" alt />
        <div class="connect_to_wallet_font">{{$store.state.wallet.publicKey}}</div>
      </div>
      <div v-else class="connect_to_wallet" @click="connectWallet">
        <div class="connect_to_wallet_font" v-if="loadingWallet">
          <i class="el-icon-loading" style="margin-right:6px" /> LOADING
        </div>
        <div class="connect_to_wallet_font" v-else>CONNECT WALLET</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "navbar",
  data() {
    return {
      dialogVisible: false,
      totalNum: 0,
      isPhone: false,
      unfold: false,
      drawer: false,
      loadingWallet: false,
      activeIndex: 2,
      selectedWallet: "",
      switchTaps: [
        { path: "/swap", title: "SWAP" },
        { path: "/counter-parties", title: "COUNTER PARTIES" },
        { path: "/about", title: "ABOUT" }
      ],
      pathToTabIndex: {
        swap: 0,
        "counter-parties": 1,
        about: 2
      }
    };
  },
  computed: {
    showWalletInfo() {
      console.log(this.$store.state.wallet);
      return JSON.stringify(this.$store.state.wallet) !== "{}";
    }
  },
  async created() {
    const vsysAcount = await this.$store.dispatch("getAccount");
  },
  methods: {
    async connectWallet() {
      this.loadingWallet = true;
      const res = await this.$store.dispatch("getAccount");
      if (res && !res.result === false) {
        alert(res.message);
      }
      this.loadingWallet = false;
    },
    // checkDevice() {
    //   if (document.documentElement.clientWidth < 768) {
    //     this.isPhone = true;
    //     this.unfold = false;
    //   } else {
    //     this.isPhone = false;
    //     this.drawer = false;
    //   }
    // },
    switchActive(index) {
      const currentPath = this.$router.currentRoute.path;
      if (
        this.activeIndex !== index ||
        currentPath !== this.switchTaps[index]
      ) {
        this.activeIndex = index;
        this.$router.replace(this.switchTaps[index].path);
      }
    }
  }
};
</script>
<style>
.logo_atomic {
  max-width: 100px;
  min-width: 20px;
}
.navbar {
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.right_corner {
  display: flex;
}
.wallet_info {
  display: flex;
  width: 150px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  background: #313134 0% 0% no-repeat padding-box;
  padding: 8px;
}
.connect_to_wallet {
  display: flex;
  width: 138px;
  height: 35px;
  background: #313134 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 31px;
}
.connect_to_wallet_font {
  width: 110px;
  overflow: scroll;
  font: normal normal normal 15px/19px Rajdhani;
  color: #f9fcfd;
}
</style>
