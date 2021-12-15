<template>
  <div id="app">
    <el-container class="home_container">
      <!--header-->
      <el-header class="home_header">
        <navbar />
      </el-header>

      <!-- middle -->
      <!-- el-aside -->

      <el-main>
        <keep-alive>
          <router-view class="base-ui" />
        </keep-alive>
        <img
          style="position: absolute; width: 200px; left: 50%; transform: translate(-50%, -340px);"
          src="@/assets/imgs/felix_logo.svg"
        />
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
.base-ui {
  position: relative;
  margin: auto;
  max-width: 414px;
  min-height: 750px;
  padding: 20px;
  background-color: #f3ede6;
  border-radius: 10px;
}
</style>
