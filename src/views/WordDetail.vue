<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.go(-1)"
      style="color:#FB8809;font-size:20px;font-weight:600"
    >search</i>
    <div style="display:flex;align-items:baseline">
      <h1>{{ word.word }}</h1>&nbsp;&nbsp;
      <!-- <i class="el-icon-star-off" style="color:black;"></i> -->
    </div>
    <div>
      <span
        style="color:#FB8809"
        v-for="(item,index) in lexical_category"
        :key="index"
      >{{ item }}&nbsp;</span>
      <h3>DEFINITIONS</h3>
      <div style="min-height:500px">
        <div
          style="position:relative;z-index:2;font-family:coves-light"
          v-for="(item, index) in wordDetail"
          :key="item.id"
        >{{index + 1}}. {{item.definition}}</div>
      </div>
    </div>
    <div
      v-if="selectedArray.find((value)=>value.id === word.id)"
      class="base-button"
    >WORDS IS ALREADY SAVE</div>
    <div v-else @click="save" class="base-button">SELECT THESE WORDS</div>
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
    selectedArray: {
      get() {
        return this.$store.state.app.words;
      },
      set(v) {
        return v;
      }
    },
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
    $route: {
      async handler() {
        this.word = this.$route.query[0];
        this.wordDetail = await reqLemmaWord(this.word.word);
      },
      immediate: true
    }
  },
  methods: {
    save() {
      console.log("save");
      if (
        this.selectedArray.length < 10 &&
        !this.selectedArray.find(value => value.id === this.word.id)
      ) {
        this.selectedArray.push(this.word);
      } else {
        alert("Maximum storage is 10");
      }
    }
  }
};
</script>

<style scoped>
.base-button {
  position: relative;
  z-index: 2;
  padding: 5px;
  text-align: center;
  border: 1px solid #fb8809;
  border-radius: 5px;
  color: #fb8809;
  margin: 0 12px;
}
.base-button:hover {
  color: white;
  background: #fb8809;
}
</style>