<template>
  <div id="app">
    <div id="bg">
      <img src="./assets/imgs/back.jpg" alt />
    </div>
    <el-container class="home_container">
      <!--header-->
      <el-header class="home_header">
        <navbar />
      </el-header>

      <!-- middle -->
      <!-- el-aside -->

      <el-main style="padding:0">
        <router-view name="gallery" />
        <keep-alive>
          <router-view class="base-ui" />
        </keep-alive>
        <TipTool />
        <img
          :style="{'display':watchRoute === '/gallery' ? 'none' :'block'}"
          style="position: absolute; width: 200px; left: 50%; transform: translate(-50%, -340px);z-index: 0;"
          src="@/assets/imgs/felix_logo.svg"
        />
        <div
          @click="routeTo"
          class="gallery-btn"
          v-show="$route.path === '/' || $route.path === '/gallery'"
        >{{watchRoute === '/gallery' ? 'BACK TO DICTIONARY' : 'GALLERY'}}</div>
      </el-main>
      <!-- bottom -->
      <Bottom class="home-footer" />
    </el-container>
    <!-- WARNING -->
    <div
      class="isShowWarning"
      style="position:absolute;background-color:rgba(0, 0, 0, 0.5);z-index:100;width:100vw;height:100vh;left:0;top:0;display:flex;justify-content:center;align-items:center"
    >
      <div
        style="width:65%;background:#FB8809;border-radius:5px;text-align:center;padding:25px;box-sizing:border-box;"
      >
        <img width="50" src="@/assets/imgs/settings_aboutus.svg" />
        <h2>WARNING</h2>
        <div>
          To ensure best experience we strongly suggest to use desktop mode for
          <span
            style="color:white;font-size:14px"
          >SAVE A WORD</span>
        </div>
        <div
          style="margin-top:20px;width: 80px;padding: 8px;border-radius: 20px;display: inline-block;border: 1px solid;"
          @click="close"
        >OK</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Bottom from "@/components/Bottom";
import TipTool from "@/views/TipTool";

export default {
  name: "app",
  data() {
    return {
      isShowWarning: false
    };
  },
  computed: {
    watchRoute() {
      return this.$route.path;
    }
  },
  methods: {
    debounce(func, delay) {
      let timeout;
      return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(this, arguments);
        }, delay);
      };
    },
    resetTimer() {
      let timeout;
      return function() {
        clearTimeout(timeout);
        let loginTimer = window.localStorage["sessionTimeout"];
        if (!loginTimer) return;
        timeout = setTimeout(() => {
          window.location.href = "/";
        }, loginTimer * 60 * 1000);
      };
    },
    routeTo() {
      if (this.$route.path === "/gallery") {
        this.$router.replace("/");
      } else {
        this.$router.push("/gallery");
      }
    },
    close() {
      document.querySelector(".isShowWarning").style.display = 'none';
    }
  },
  mounted() {
    // auto lock function code
    let eventListenerArr = ["mousemove", "mousedown", "touchstart"];
    for (var i = 0; i < eventListenerArr.length; i++) {
      document.addEventListener(
        eventListenerArr[i],
        this.debounce(this.resetTimer(), 1000)
      );
    }
    // check local wallet information
    if (localStorage['vsysWallet']) this.$store.commit("vsys/updateWallet", JSON.parse(localStorage['vsysWallet']))
    if (localStorage['ethWallet']) this.$store.commit("eth/updateWallet", JSON.parse(localStorage['ethWallet']))
    if (localStorage['appWallet']) this.$store.commit("app/updateWallet", JSON.parse(localStorage['appWallet']))
  },
  components: {
    Navbar,
    Bottom,
    TipTool
  }
};
</script>
<style scoped>
.gallery-btn {
  text-align: center;
  margin: 20px auto 0 auto;
  background: #fb8809;
  color: white;
  max-width: 414px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 8px;
}
@media screen and (max-width: 500px) {
  .home_header {
    background: black;
  }
  #bg {
    display: none;
  }

  .gallery-btn {
    margin: 1px auto !important;
    border-radius: 0px ;
  }
}
@media only screen and (min-width: 500px) {
  #bg {
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    z-index: -10;
  }
  #bg img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 50%;
    min-height: 50%;
  }
  .base-ui {
    background-color: whitesmoke;
  }
 
  .isShowWarning {
    display: none !important;
  }
}
#app {
  font-family: "coves-bold";
  font-size: 20px;
  padding-bottom: 100px;
}
.base-ui {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: auto;
  max-width: 414px;
  min-height: 750px;
  padding: 20px;
  border-radius: 10px;
}
</style>
