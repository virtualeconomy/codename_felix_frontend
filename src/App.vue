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
        <img
          :style="{'display':watchRoute === '/gallery' ? 'none' :'block'}"
          style="position: absolute; width: 200px; left: 50%; transform: translate(-50%, -340px);"
          src="@/assets/imgs/felix_logo.svg"
        />
        <div
          @click="routeTo"
          class="gallery-btn"
        >{{watchRoute === '/gallery' ? 'BACK TO DICTIONARY' : 'GALLERY'}}</div>
      </el-main>
      <!-- bottom -->
      <Bottom class="home-footer" />
    </el-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Bottom from "@/components/Bottom";
export default {
  name: "app",
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
        this.$router.go(-1);
      } else {
        this.$router.push("/gallery");
      }
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
  },
  // activated(){
  //   this.watchRoute = this.$route.path
  // },
  components: {
    Navbar,
    Bottom
  }
};
</script>
<style scoped>
@media screen and (max-width: 500px) {
  .home_header {
    background: black;
  }
  #bg {
    display: none;
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
  .gallery-btn {
    margin: 20px auto !important;
    border-radius: 10px;
  }
}
#app {
  font-family: "coves-bold";
  font-size: 20px;
}
.base-ui {
  position: relative;
  margin: auto;
  max-width: 414px;
  min-height: 750px;
  padding: 20px;
  border-radius: 10px;
}
.gallery-btn {
  text-align: center;
  margin: 20px auto 0 auto;
  background: #ff8737;
  color: white;
  max-width: 414px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
