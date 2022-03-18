<template>
  <div>
    <i
        class="el-icon-arrow-left"
        @click="$router.push('/settings')"
        style="color:#FB8809;font-size:20px;font-weight:600;cursor:pointer"
    ><span style="font-family:sen-light!important;">back to settings</span></i>
    <h3>About us</h3>
    <div style="margin-bottom:19px;font-family:'sen-light'">
      Felix is the first dictionary on a blockchain.
      It was inspired by The Immutable (DARA),
      a community led project focused on immortalizingthe most valuable content and informationin the world today.Felix is powered by
      V Systems technology.
    </div>
    <div style="font-size:1.17em;font-weight:bold">Official website</div>
    <span style="color:#FB8809">saveaword.com</span>
    <div style="font-size:1.17em;font-weight:bold;margin-top:19px">Version</div>
    <span style="color:#FB8809">{{ vNumber }}</span>
  </div>
</template>
<script>
import { WALLET_VERSION } from '@/constants'
export default {
  name: "About",
  data() {
    return {
      vNumber: WALLET_VERSION
    };
  },
  methods: {},
  mounted() {
    // this.saveWord = this.$store.state.words;
    // need to backend api
  }
};
</script>

<style scoped>
</style>