<template>
  <div class="home">
    <div style="display:flex;justify-content:space-between;margin-bottom:32px">
      <a
        :class="{active: selected === 'Dic'}"
        style="text-decoration:none;cursor:pointer"
        @click="selected = 'Dic'"
      >Dictionary</a>
      <a
        :class="{active: selected === 'Save'}"
        style="text-decoration:none;cursor:pointer"
        @click="selected = 'Save'"
      >Save a word</a>
    </div>

    <div
      style="margin-bottom:10px"
      v-if="selected === 'Save'"
    >Select the word(s) you would like to save</div>

    <el-input
      class="custom-input"
      style="width:100%"
      v-model="value"
      placeholder="Search here"
      @keyup.enter.native="querySearchAsync"
    >
      <el-button
        @click="querySearchAsync"
        class="goon"
        style="backgroud:#ff8737"
        slot="append"
        icon="el-icon-search"
      ></el-button>
    </el-input>

    <div style="margin:24px 0 150px 0;position:relative;z-index:2;">
      <div style="margin-bottom:10px;fon-size:20px;font-weight:600">Random words</div>
      <div
        :style="{color:selectedArray.indexOf(item)>-1?'#ff8737':''}"
        class="word-ui"
        v-for="(item, index) in wordHistory"
        :key="item.id"
        @click="detail_selected(item,index)"
      >{{item.word}}</div>
    </div>

    <div v-if="selected === 'Save'">
      <div class="base-button" @click="shuffle">SHUFFLE UNSELECTED WORDS</div>
      <div class="base-button" @click="router_to_save" style="margin-top:20px">SELECT THESE WORDS</div>
    </div>
  </div>
</template>

<script>
import { reqRandomWords } from "@/api/index";

export default {
  data() {
    return {
      wordHistory: [],
      links: [],
      value: "",
      selected: "Dic",
      selectedArray: []
    };
  },
  methods: {
    querySearchAsync() {
      console.log(this.value);
      this.$router.push({ path: "/word_detail", query: { 0: this.value } });
    },
    detail_selected(item, index) {
      if (this.selected === "Save") {
        if (this.selectedArray.indexOf(item) > -1) {
          this.selectedArray.splice(this.selectedArray.indexOf(item), 1);
        } else {
          this.selectedArray.push(item);
        }
      } else {
        this.$router.push({ path: "/word_detail", query: { 0: item.word } });
      }
    },
    router_to_save() {
      if (this.selectedArray.length > 0) {
        this.$store.commit("vsys/savedWords", this.selectedArray);
        this.$router.push("/word_save");
      }
    },
    async shuffle() {
      var newWords = await reqRandomWords(
        this.wordHistory.length - this.selectedArray.length
      );
      this.wordHistory = this.selectedArray.concat(newWords);
    }
  },
  async mounted() {
    this.wordHistory = await reqRandomWords();
    console.log(this.wordHistory);
  }
};
</script>

<style scoped>
.word-ui {
  margin-bottom: 10px;
  font-family: coves-light;
}
.word-ui:hover {
  background: #ff8737;
  color: white;
  cursor: pointer;
  padding-left: 5px;
  border-radius: 5px;
}
.active {
  color: #ff8737;
  text-decoration: underline !important;
}
.custom-input >>> input,
.custom-input >>> input::-webkit-input-placeholder {
  color: #ff8737;
}
.base-button {
  position: relative;
  z-index: 2;
  padding: 5px;
  text-align: center;
  border: 1px solid #ff8737;
  border-radius: 5px;
  color: #ff8737;
  margin: 0 12px;
}
.base-button:hover {
  color: white;
  background: #ff8737;
}
.goon {
  background: #ff8737 !important;
  border-radius: 0 5px 5px 0;
}
.goon >>> .el-icon-search::before {
  color: white;
}
</style>
