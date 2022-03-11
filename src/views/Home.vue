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
      >Mint</a>
    </div>

    <div
      style="margin-bottom:10px"
      v-if="selected === 'Save'"
    >Select the word(s) you would like to save</div>

    <el-input
      class="custom-input"
      style="width:100%;font-family:sen-light!important;"
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
      <div style="font-family:sen-bold;margin-bottom:10px;fon-size:20px;font-weight:600;color:#FB8809">Random words</div>
      <div
        :style="{color:selectedArray.find((value)=>value.id===item.id)?'#FB8809':''}"
        class="word-ui"
        v-for="(item, index) in wordHistory"
        :key="item.id"
        @click="detail_selected(item,index)"
      >{{item.word}}
        <span v-if="item.blockchainhash || item.isMinted" style="font-size:10px;font-weight:600;float:right;margin-top:8px;">
          WORD IS NFT
        </span>
      </div>
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
      <div class="base-button mint_btn" @click="router_to_save" style="margin-top:20px;">MINT</div>
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
  created() {
    if (window.vsys) {
      window.vsys.on('chainChanged', this.handleChainChanged);
    }
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', this.handleMetamaskAccountChanged)
    }
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
  watch: {
    $route: {
      async handler() {
        if(this.$route.query.menu && this.$route.query.menu === 'save'){
          this.selected = 'Save'
        }
        let nfts = JSON.parse(window.localStorage.getItem('nfts'))
        if(nfts){
          this.wordHistory.map(h=>{
            h.isMinted = nfts.some(item => h.id === item.nft_word_ids[0])
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    handleMetamaskAccountChanged(accounts) {
      this.$store.commit(`eth/updateWallet`, {
        address: "",
        net: "",
        publicKey: "",
        walletName: ""
      });
      localStorage[`ethWallet`] = ''
    },
    handleChainChanged(chain) {
      if (chain.networkType === "T") {
        this.$store.commit(`vsys/updateWallet`, {
          address: "",
          net: "",
          publicKey: "",
          walletName: ""
        });
        localStorage[`vsysWallet`] = ''
      }
    },
    async querySearchAsync() {
      var wordDetail = await reqLemmaWord(this.value);
      if (!wordDetail.length) return alert('Unfortunately, the word was not found')
      this.$router.push({ path: "/word_detail", query: { 0: wordDetail.some(item=>item.blockchainhash) ? wordDetail[wordDetail.findIndex(idx=>idx.blockchainhash)] : wordDetail[0]} });
    },
    detail_selected(item, index) {
      if (this.selected === "Save") {
        if(!item.isMinted){
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
        }
      } else {
        this.$router.push({ path: "/word_detail", query: { 0: item } });
      }
    },
    router_to_save() {
      if (this.selectedArray.length > 0) {
        this.$store.commit("app/savedWords", this.selectedArray);
        this.$router.push("/word_finish");
        // this.$router.push("/word_save");
      }
    },
    async shuffle() {
      this.wordHistory = await reqRandomWords();
      this.wordHistory.map(item=>item.isMinted = false)
    }
  },
  async mounted() {
    this.wordHistory = await reqRandomWords();
    this.wordHistory.map(item=>item.isMinted = false)
  }
};
</script>

<style scoped>
.word-ui {
  margin-bottom: 10px;
  font-family: sen-light!important;
}
.word-ui:hover {
  background: #fb8809;
  color: white !important;
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
  font-family: sen-light!important;
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
/* .base-button:hover {
  color: white;
  background: #fb8809;
} */
.mint_btn{
  background: #fb8809;
  color: white;
  font-weight: bold;
}
.goon {
  background: #fb8809 !important;
  border-radius: 0 5px 5px 0;
}
.goon >>> .el-icon-search::before {
  color: white;
}
</style>
