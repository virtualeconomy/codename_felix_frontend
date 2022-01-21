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
        style="backgroud:#FB8809"
        slot="append"
        icon="el-icon-search"
      ></el-button>
    </el-input>

    <div style="margin:24px 0;z-index:2;">
      <div style="margin-bottom:10px;fon-size:20px;font-weight:600">Random words</div>
      <div
        :style="{color:selectedArray.find((value)=>value.id===item.id)?'#FB8809':''}"
        class="word-ui"
        v-for="(item, index) in wordHistory"
        :key="item.id"
        @click="detail_selected(item,index)"
      >{{item.word}}</div>
    </div>
    <div style="display:flex;z-index:2;min-height:120px;flex-wrap:wrap;align-content:flex-start;justify-content:space-around" v-if="selected === 'Save'">
      <div
        style="display:flex;align-items:center;height:30px;color:#FB8809"
        v-for="item in selectedArray"
        :key="item.id"
      >
        {{item.word}} &nbsp;
        <img
          @click="selectedArray.splice(selectedArray.findIndex(value => value.id === item.id), 1)"
          style="cursor:pointer;width:18px"
          src="@/assets/imgs/remove.svg"
        />
      </div>
    </div>

    <div v-if="selected === 'Save'">
      <div class="base-button" @click="shuffle">SHUFFLE UNSELECTED WORDS</div>
      <div class="base-button" @click="router_to_save" style="margin-top:20px">SELECT THESE WORDS</div>
    </div>
  </div>
</template>

<script>
import { reqRandomWords, reqLemmaWord } from "@/api/index";

export default {
  data() {
    return {
      wordHistory: [],
      links: [],
      value: "",
      selected: "Dic"
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
    }
  },
  methods: {
    async querySearchAsync() {
      var wordDetail = await reqLemmaWord(this.value);
      if (!wordDetail.length) return alert('Unfortunately, the word was not found')
      this.$router.push({ path: "/word_detail", query: { 0: wordDetail[0]} });
    },
    detail_selected(item, index) {
      if (this.selected === "Save") {
        console.log(this.selectedArray.find(value => value === item))
        if (this.selectedArray.find(value => value.id === item.id)) {
          this.selectedArray.splice(
            this.selectedArray.findIndex(value => value.id === item.id),
            1
          );
        } else if (this.selectedArray.length < 10) {
          this.selectedArray.push(item);
        } else {
          alert("Maximum storage is 10");
        }
      } else {
        this.$router.push({ path: "/word_detail", query: { 0: item } });
      }
    },
    router_to_save() {
      if (this.selectedArray.length > 0) {
        this.$store.commit("app/savedWords", this.selectedArray);
        this.$router.push("/word_save");
      }
    },
    async shuffle() {
      this.wordHistory = await reqRandomWords();
    }
  },
  async mounted() {
    this.wordHistory = await reqRandomWords();
    console.log(this.wordHistory);
  },
  activated() {
    this.selectedArray = this.$store.state.app.words;
  }
};
</script>

<style scoped>
.word-ui {
  margin-bottom: 10px;
  font-family: coves-light;
}
.word-ui:hover {
  background: #fb8809;
  color: white;
  cursor: pointer;
  padding-left: 5px;
  border-radius: 5px;
}
.active {
  color: #fb8809;
  text-decoration: underline !important;
}
.custom-input >>> input,
.custom-input >>> input::-webkit-input-placeholder {
  color: #fb8809;
}
.base-button {
  position: relative;
  z-index: 2;
  padding: 5px;
  text-align: center;
  border: 1px solid #fb8809;
  border-radius: 5px;
  color: #fb8809;
  margin: 0 12px;
  cursor: pointer;
}
.base-button:hover {
  color: white;
  background: #fb8809;
}
.goon {
  background: #fb8809 !important;
  border-radius: 0 5px 5px 0;
}
.goon >>> .el-icon-search::before {
  color: white;
}
</style>
