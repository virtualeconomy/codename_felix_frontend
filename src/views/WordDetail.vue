<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#ff8737;font-size:20px;font-weight:600"
    >search</i>
    <div style="display:flex;align-items:baseline">
      <h1>{{ word }}</h1>&nbsp;&nbsp;
      <!-- <i class="el-icon-star-off" style="color:black;"></i> -->
    </div>
    <div>
      <span
        style="color:#ff8737"
        v-for="(item,index) in lexical_category"
        :key="index"
      >{{ item }}&nbsp;</span>
      <h3>DEFINITIONS</h3>
      <div style="position:relative;z-index:2;" v-for="(item, index) in wordDetail" :key="item.id">{{index + 1}}. {{item.definition}}</div>
    </div>
  </div>
</template>

<script>
import { reqLemmaWord } from "@/api/index";

export default {
  name: "WordDetail",
  data() {
    return {
      wordDetail: [],
      word: ""
    };
  },
  computed: {
    lexical_category() {
      var array = [];
      for (var i = 0; i < this.wordDetail.length; i++) {
        if (array.indexOf(this.wordDetail[i].lexical_category) === -1) {
          array.push(this.wordDetail[i].lexical_category);
        }
      }
      return array;
    }
  },
  watch: {
    async word(newValue) {
      if (newValue && JSON.stringify(newValue) !== "{}") {
        this.wordDetail = await reqLemmaWord(newValue);
      }
    }
  },
  mounted() {
    this.word = this.$route.query[0];
  },
  activated() {
    this.word = this.$route.query[0];
  }
};
</script>

<style scoped>
</style>