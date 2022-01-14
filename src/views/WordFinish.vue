<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#FB8809;font-size:20px;font-weight:600"
    >back to home screen</i>
    <div style="margin-top:39px">You have successfully saved the words</div>
    <div v-for="(item, index) in $store.state.words" :key="index">
        <h3 style="color:#FB8809">{{ item.word.toUpperCase() }}</h3>
    </div>
    <div style="min-height:100px;flex:1"></div>
    <div class="base-button" @click="shuffle">MINT NFTs</div>
    <div class="base-button" @click="router_to_save" style="margin-top:20px">VIEW YOUR SAVED WORDS</div>
  </div>
</template>

<script>
</script>

<style scoped>
.base-button {
  position: relative;
  z-index: 2;
  padding: 5px;
  text-align: center;
  border: 1px solid #FB8809;
  border-radius: 5px;
  color: #FB8809;
  margin: 0 12px;
}
.base-button:hover {
  color: white;
  background: #FB8809;
}
</style>