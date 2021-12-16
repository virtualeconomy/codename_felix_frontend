<template>
  <div id="app">
    <el-container class="home_container">
      <!--header-->
      <el-header class="home_header">
        <navbar />
      </el-header>

      <!-- middle -->
      <!-- el-aside -->

      <el-main style="padding:0">
        <keep-alive>
          <router-view class="base-ui" />
        </keep-alive>
        <img
          style="position: absolute; width: 200px; left: 50%; transform: translate(-50%, -340px);"
          src="@/assets/imgs/felix_logo.svg"
        />
        <div class="gallery-btn">GALLERY</div>
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
          window.location.reload();
        }, loginTimer * 60 * 1000);
      };
    }
  },
  mounted() {
    // auto lock function code
    let eventListenerArr = ["mousemove", "mousedown", "touchstart"];
    for (var i = 0; i < eventListenerArr.length; i++) {
      document.addEventListener(
        eventListenerArr[i],
        this.debounce(() => {
          this.resetTimer();
        }, 1000)
      );
    }
  },
  components: {
    Navbar,
    Bottom
  }
};
</script>
<style scoped>
@media screen and (max-width: 960px) {
  .home_header {
    background: black;
  }
}
@media only screen and (min-width: 960px) {
  #app {
    background-image: url(./assets/imgs/back.jpg);
    background-repeat: round;
  }
  .base-ui {
    background-color: whitesmoke;
  }
  .gallery-btn {
    margin: 20px auto;
    border-radius: 10px;
  }
}
#app {
  font-family: 'coves-bold';
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
  margin-top: 20px;
  background: #ff8737;
  color: white;
  max-width: 414px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
