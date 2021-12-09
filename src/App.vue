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
          <router-view class="base-ui"/>
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
