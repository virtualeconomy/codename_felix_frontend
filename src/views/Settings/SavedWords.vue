<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#FB8809;font-size:20px;font-weight:600"
    >back to settings</i>
    <h3>Saved Words</h3>
    <div style="margin-top:19px;font-weight:bold">Here you can find full list of your saved words:</div>
    <div v-for="(item, index) in saveWord" :key="index">
        <h3>{{index+1}}.&nbsp;{{ item.word }}</h3>&nbsp;&nbsp;
      <span style="color:#FB8809">{{ item.lexical_category }}&nbsp;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SavedWords",
  data() {
    return {
      saveWord: [
      ]
    };
  },
  methods: {},
  mounted() {
    this.saveWord = JSON.parse(localStorage['save_words'] || [])
    // this.saveWord = this.$store.state.words;
    // need to backend api
  }
};
</script>

<style scoped>
</style>