<template>
  <div class="navbar">
    <img style="height:40px" src="@/assets/imgs/header_logo.svg" alt />
      <div v-if="showWalletInfo" class="wallet_info">
        <img @click="$router.push('/settings')" src="@/assets/imgs/settings.svg" width="25" alt />
        <div
          style="margin-left:1.2rem;color:#ff8737"
        >{{$store.state.wallet.address.slice(0,5)+'...'+$store.state.wallet.address.slice(-3)}}</div>
      </div>
      <div v-else class="connect_to_wallet" @click="connectWallet">
        <div v-if="loadingWallet">
          <i class="el-icon-loading" /> LOADING
        </div>
        <div v-else>CONNECT WALLET</div>
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
.navbar {
  margin: 15px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wallet_info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
}
.connect_to_wallet {
  color: #ff8737;
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
