<template>
  <div>
    <i
      class="el-icon-arrow-left"
      @click="$router.push('/')"
      style="color:#FB8809;font-size:20px;font-weight:600"
    >search</i>
    <div class="scroll_container">
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
    </div>
    <div
      @click="$router.push('/')"
      class="base-add-button"
      style="border:1px solid #000;color:#000;"
      v-if="isSaved"
    >WORD IS ALREADY SAVED</div>
    <div @click="addWord" class="base-add-button" v-else>ADD WORD TO LIST FOR SAVE</div>
    <div @click="save" class="base-button" v-if="!isSaved">SAVE THIS WORD</div>
  </div>
</template>

<script>
import { reqLemmaWord } from "@/api/index";
import BigNumber from "bignumber.js";

export default {
  name: "WordDetail",
  data() {
    return {
      wordDetail: [],
      word: "",
      isSaved: false
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
        if (this.$router.currentRoute.name === "Detail") {
          this.word = this.$route.query[0];
          if (this.word && this.word.blockchainhash) {
            this.isSaved = true;
          }
          this.wordDetail = await reqLemmaWord(this.word.word);
        }
      },
      immediate: true
    }
  },
  methods: {
    save() {
      if (!this.$store.state.app.curWallet.address) {
        alert("TO CONTINUE, YOU MUST CONNECT YOUR WALLET");
      } else if (
        !this.$store.state.eth.wallet.amount ||
        BigNumber(this.$store.state.eth.wallet.amount).isEqualTo(0)
      ) {
        alert("Balance of DARA token is zero");
      } else {
        this.$store.commit("app/savedWords", [this.word]);
        this.$router.push("/word_pay");
      }
    },
    addWord() {
      if (
        this.selectedArray.length < 10 &&
        !this.selectedArray.find(value => value.id === this.word.id)
      ) {
        this.selectedArray.push(this.word);
        this.$router.push({
          path: "/",
          query: {
            menu: "save"
          }
        });
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
  border-radius: 5px;
  margin: 0 12px;
  background: #fb8809;
  color: white;
  cursor: pointer;
}

.base-add-button {
  position: relative;
  z-index: 2;
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  margin: 0 12px;
  color: #fb8809;
  cursor: pointer;
  border: 1px solid #fb8809;
  margin-bottom: 10px;
}

.scroll_container{
  overflow: scroll;
  z-index: 2;
  height: 600px;
  margin-bottom: 50px;
}
</style>