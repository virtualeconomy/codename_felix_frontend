<template>
  <div class="gallery" style="text-align: center; font-family: serif">
    <div class="gallery_title">
      GALLERY
      <div
        class="wallet_addr"
      >{{currentWalletAddress ? $store.state.app.curWallet.address: 'To view gallery, please connect your wallet.'}}</div>
    </div>

    <div style="max-width: 1400px; margin: auto">
      <div class="checkWords">
        <el-select v-model="value" placeholder="Recently Active">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div id="triangle-down"></div>
      </div>
      <div
        style="
          color: white;
          border: 1px solid #E6E1DC;
          padding: 10px;
          margin-top:20px;
        "
      >LIST OF SAVED WORDS THAT ARE NOW NFTs - {{currentTime}}</div>

      <div class="gellery_nft_content">
        <div class="word_content" v-for="(item,idx) in  nftWordsList" :key="idx" v-if="currentWalletAddress">
          <div >
              <p style="font-size: 40px; font-style: italic">
                {{ item.word}}
              </p>
              <div style="font-weight: 700;font-size:12px;">
                <div
                  style="margin: auto; width: 80px; border-top: 1px solid grey;"
                ></div>
                {{ currentWalletAddress}}
                <div
                  style="margin: auto; width: 80px; border-top: 1px solid grey"
                ></div>
              </div>
              <div style="margin-top: 40px">
                {{ item.definition }}
              </div>
              <img src="@/assets/imgs/share.png" style="width；25px;height:25px;margin-top:10px;cursor:pointer"
              @click="modelOpt('show',item.word)">
          </div>
        </div>
      <div class="word_content_none_contain" v-else>
        <div class="word_content_none" v-for="i in 6" :key="i"></div>
      </div>
      </div>
         <div
      class="isShowWarning"
      style="position:absolute;background-color:rgba(0, 0, 0, 0.5);z-index:100;width:100vw;height:100vh;left:0;top:0;display:none;justify-content:center;align-items:center;"
    >
      <div
       class="modal_container"
        style="width:35%;background:#FB8809;border-radius:5px;text-align:center;padding:25px;box-sizing:border-box;padding-bottom:100px;"
      >
      <div style="width:100%;text-align:right;">
        <img width="30" src="@/assets/imgs/gallery_close.svg" style="cursor:pointer" @click="modelOpt('close')" />
      </div>
        <h2>SHARE</h2>
        <div style="width:100%;display:flex;justify-content:center">
          <div
            style="color:white;font-size:18px;width:70%"
          >Hey, I just saved word {{currentWord}} and made it nto NFT ! Check it out on Felix. </div>
        </div>
      </div>
    </div>

      <!-- <div style="display: flex; min-height: 750px; flex-wrap: wrap; border: 1px solid #E6E1DC;">
        <div class="words-col" v-for="i in 6" :key="i" style="border:1px solid red">
          <div v-for="(j, index) in numberCol" :key="index" style="border:1px solid yellow">
            <p style="font-size: 40px; font-style: italic">
              {{ nftWords[i * numberCol + j].word }}
            </p>
            <div style="font-weight: 700">
              <div
                style="margin: auto; width: 80px; border-top: 1px solid grey"
              ></div>
              {{ nftWords[i * numberCol + j].origin }}
              <div
                style="margin: auto; width: 80px; border-top: 1px solid grey"
              ></div>
            </div>
            <div style="margin-top: 40px">
              {{ nftWords[i * numberCol + j].definition }}
            </div>
          </div>
          <div v-if="i <= remainder" class="" style="margin-top: 40px;border:1px solid green" >
            <p style="font-size: 40px; font-style: italic">
              {{ nftWords[nftWords.length - 1 - i].word }}
            </p>
            <div style="font-weight: 700">
              <div
                style="margin: auto; width: 80px; border-top: 1px solid grey"
              ></div>
              {{ nftWords[nftWords.length - 1 - i].origin }}
              <div
                style="margin: auto; width: 80px; border-top: 1px solid grey"
              ></div>
            </div>
            <div style="margin-top: 40px">
              {{ nftWords[nftWords.length - 1 - i].definition }}
            </div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { reqInspectNft, reqFetchDefinition } from "@/api/index";

export default {
  name: "SavedWords",
  data() {
    return {
      options: [
        {
          value: "Oldest",
          label: "Oldest"
        },
        {
          value: "Newest",
          label: "Newest"
        }
      ],
      value: "",
      nftWordsList: [],
      currentWord:''
    };
  },
  computed: {
    currentWalletAddress() {
      var address = this.$store.state.app.curWallet.address;
      if (address) return address.slice(0, 5) + "..." + address.slice(-3);
      else return false;
    },
    currentTime(){
      return new Date(parseInt(new Date().getTime())).toLocaleString().replace(/:\d{1,2}$/, ' ')
    }
  },
  methods: {
    modelOpt(type,val){
      document.querySelector(".isShowWarning").style.display = type === 'show' ? 'flex' : 'none';
      this.currentWord = val
    }
  },
  async mounted() {
    if (localStorage["nfts"]) {
      let nftRecords = JSON.parse(window.localStorage.getItem("nfts"));
      let nftIds = [];
      if (nftRecords) {
        nftRecords.forEach(element => {
          nftIds.push(element["nftId"]);
        });
      }
      var result = await reqInspectNft(nftIds);
      let nftWordsCurrentList = await reqFetchDefinition(result);
      nftWordsCurrentList.map(item => {
        Object.keys(item).map(val => {
          let nftName = "",
            definition = item[val];
          val = val.slice(val.indexOf(":") + 1);
          nftName = val.slice(0, val.indexOf(":"));
          this.nftWordsList.push({ word: nftName, definition: definition });
        });
      });
    }
  }
};
</script>

<style scoped>
.checkWords >>> .el-input__inner {
  border: 0;
  border-bottom: 2px solid #e6e1dc;
  border-radius: 0;
  background-color: transparent;
}

.checkWords {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
#triangle-down {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 12px solid rgb(168, 164, 164);
  transform: translateX(-25px);
  /* z-index: -2; */
}
.checkWords >>> .el-icon-arrow-up:before {
  content: "";
}
.words-col {
  flex: 1;
  min-width: 150px;
  color: white;
  /* border-left: 1px solid white; */
  /* border-right: 1px solid white; */
  padding: 10px;
}
.origin-info {
  margin: auto;
  width: 80px;
  border-top: 1px solid grey;
}

.gallery_title {
  font-size: 68px;
  color: #fb8809;
  text-align: center;
  margin: 10px;
  font-weight: bold;
}

.wallet_addr {
  color: #fb8809;
  font-size: 15px;
  font-weight: bold;
  overflow: hidden;
}

.gellery_nft_content {
  width:100%;
  height: 562px;
  border: 1px solid #e6e1dc;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
}


.gellery_nft_content::-webkit-scrollbar {
            display: none;
        }

.word_content{
  width: 16.55%;
  color: #fff;
  border-right: 1px solid #e6e1dc;
}

.word_content_none_contain{
  width:100%;
  height: 562px;
display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
}

.word_content_none{
  width: 16.58%;
  height:100%;
  border-right: 1px solid #e6e1dc;
  color: #fff;
}

@media screen and (max-width: 500px) {
  .gallery {
    background: #121212;
  }
  .word_content{
  width: 50%;
  color: #fff;
  border-right: 1px solid #e6e1dc;
}
.word_content_none{
    width: 50%;
}
.modal_container{
  width:70% !important;
}
}
</style>
