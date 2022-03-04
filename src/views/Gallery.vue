<template>
  <div class="gallery" style="text-align: center; font-family: serif">
    <div class="gallery_title">
      GALLERY
      <div
        class="wallet_addr"
      >{{currentWalletAddress ? $store.state.vsys.wallet.address ? $store.state.app.curWallet.address : 'To view gallery, please connect your vsys wallet.': 'To view gallery, please connect your wallet.'}}</div>
    </div>

    <div style="max-width: 1400px; margin: auto">
      <div class="checkWords">
        <el-input
          placeholder="Search"
          style="width:193px;color:#E6E1DC"
          @keyup.enter.native="searchNft"
          v-model="searchVal"
        >
          <img
            slot="suffix"
            style="width:15px;margin-top:14px;cursor:pointer;"
            src="@/assets/imgs/gallery_search.svg"
            @click="searchNft"
          />
        </el-input>
        <div style="display:flex;align-items:center">
          <el-select v-model="value" placeholder="Recently Active" @change="sort">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div id="triangle-down"></div>
        </div>
      </div>
      <div
        style="
          color: white;
          border: 1px solid #E6E1DC;
          padding: 10px;
          margin-top:20px;
          background: black;
        "
      >YOUR NFTs - {{currentTime}}</div>

      <div class="gellery_nft_content">
        <div
          class="word_content"
          v-for="(item,idx) in  isSeach ? nftSearchWordsList :nftWordsList"
          :key="idx"
          v-if="currentWalletAddress"
        >
          <div>
            <p
              style="font-size: 40px; font-style: italic;word-wrap: break-word;word-break: break-all;"
            >{{ item.word}}</p>
            <div style="font-weight: 700;font-size:12px;cursor:pointer;" @click="click2Copy(item.token_id)">
              <div style="margin: auto; width: 80px; border-top: 1px solid grey;"></div>
              {{ item.token_id.slice(0, 5) + "..." + item.token_id.slice(-3)}}
              <div style="margin: auto; width: 80px; border-top: 1px solid grey"></div>
            </div>
            <div @click="clicl2ShowAllDefinition(item.word,idx)" v-if="item.wordDetail.length < 2 || !item.isShowAllDefinition" style="cursor:pointer;margin-top: 10px;width:90%;margin-left:5%;word-wrap: break-word;word-break: break-all;" v-html="item.definition "></div>
            <div
              style="cursor:pointer;position:relative;z-index:2;font-family:sen-light;margin-top: 10px;width:90%;margin-left:5%;word-wrap: break-word;word-break: break-all;"
              v-for="(val, index) in item.wordDetail"
              :key="val.id"
              v-html="`${index + 1}. ${formatDefinition(val.definition)}`"
              @click="clicl2ShowAllDefinition('',idx)"
              v-else
            ></div>
            <img
              src="@/assets/imgs/share.png"
              style="width；25px;height:25px;margin-top:10px;cursor:pointer"
              @click="modelOpt('show',item.word)"
            />
             <img
              src="@/assets/imgs/send.svg"
              style="width；25px;height:25px;margin-top:10px;margin-left:24px;cursor:pointer"
              @click="modelOpt('show',item.token_id,true)"
            />
          </div>
        </div>
        <div class="word_content_none_contain" v-else>
          <div class="word_content_none" v-for="i in 6" :key="i"></div>
        </div>
      </div>
      <div
        class="isShowGalleryModal"
        style="position:absolute;background-color:rgba(0, 0, 0, 0.5);z-index:100;width:100vw;height:100vh;left:0;top:0;display:none;justify-content:center;align-items:center;"
      >
       <div
          class="modal_container"
          :style="{paddingBottom:isSend ? isSendSuccess ? '30px' : '40px' : ''}"
        >
          <div style="width:100%;text-align:right;">
            <img
              width="30"
              src="@/assets/imgs/gallery_close.svg"
              style="cursor:pointer"
              @click="modelOpt('close')"
            />
          </div>
          <h2 v-show="!isSendSuccess">{{isSend ? 'SEND' : 'SHARE'}}</h2>
          <div v-if="!isSend">
            <div style="width:100%;display:flex;justify-content:center">
              <div
                style="color:white;font-size:18px;width:70%"
              >I just saved the #Wiktionary definition of the word {{currentWord ? currentWord.toLocaleUpperCase() : currentWord}} to #blockchain, and minted a unique #NFT! Check out @FelixDictionary!.
              <div>www.saveaword.com</div>
              </div>
            </div>
            <div @click="toShare($event)" style="transform:translateY(60px)">
              <img id="twitter" src="@/assets/imgs/twitter.svg" style="cursor:pointer;width:30px" />&nbsp;&nbsp;&nbsp;
              <img id="telegram" src="@/assets/imgs/telegram.svg" style="cursor:pointer;width:32px" />&nbsp;&nbsp;&nbsp;
              <img id="discord" src="@/assets/imgs/discord.png" style="cursor:pointer;width:25px" />&nbsp;&nbsp;&nbsp;
              <img id="copy" src="@/assets/imgs/copy.png" style="cursor:pointer;width:25px" />
            </div> 
          </div>
          <div class="sned_nft" v-else>
            <div v-if="!isSendSuccess">
              <div class="sned_title">WRITE OR PASTE ADDRESS</div>
              <div class="send_ipt">
                <el-input v-model="sendAddr" placeholder="WRITE HERE" style="width:95%;height:45px"></el-input>
                <img src="@/assets/imgs/ic_copy.svg" style="cursor:pointer;width:15px;height:19px;" @click="click2Copy(sendAddr)">
              </div>
              <div class="send_btn" @click="sendNft">SEND</div>
            </div>
            <div v-else class="send_result">
              <img :src="isSuccessRes ? require('@/assets/imgs/mint_success.svg') : require('@/assets/imgs/send_fail.svg')" style="width:81px;height:81px">
              <div class="send_result_title">{{isSuccessRes ? 'YOUR NFT IS ON IT’S WAY!' : 'THERE WAS A PROBLEM!'}}</div>
              <div class="send_result_des">{{isSuccessRes ? 'Sending NFT was successful.' : 'Sending NFT failed.You can try again.'}}</div>
              <div class="send_result_des" style="margin-top:5px;" v-if="!isSuccessRes">{{ failedMsg }}}</div>
              <div class="send_result_txid" v-else>
                <span>TRANSACTION ID: <span class="tx_id" @click="openExplorer(txID)">{{ txID.slice(0, 10) + "..." + txID.slice(-5)}}</span></span>
                <img src="@/assets/imgs/ic_copy.svg" style="cursor:pointer;width:15px;height:19px;margin-left:10px;" @click="click2Copy(txID)">
              </div>
              <div class="send_btn" style="width:248px;margin-left:5%;" @click="modelOpt('close')">GO BACK TO GALLERY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import {
  reqInspectNft,
  reqFetchDefinition,
  reqNftIds,
  reqNftContractId,
  reqLemmaWord
} from "@/api/index";
import Base58 from 'base-58';

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
      currentWord: "",
      isSeach: false,
      searchVal: "",
      nftSearchWordsList: [],
      firstNft:'',
      isSend:false,
      isSendSuccess: false,
      isSuccessRes: true,
      failedMsg: "Please make sure the address you are sending to is correct V Wallet address.",
      currentTokenId: "",
      txID:'',
      sendAddr:''
    };
  },
  computed: {
    currentWalletAddress() {
      var address = this.$store.state.vsys.wallet.address;
      if (address) return address.slice(0, 5) + "..." + address.slice(-3);
      else return false;
    },
    currentTime() {
      return new Date(parseInt(new Date().getTime()))
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    }
  },
  methods: {
    async sendNft(){
      this.failedMsg = "Please make sure the address you are sending to is correct V Wallet address."
      const loading = this.$loading({
            lock: true,
            text: 'PLEASE WAIT',
            background: 'rgba(0, 0, 0, 0.8)',
            customClass: 'loading_sty'
      });

      //check address && network
      if (!this.sendAddr || typeof this.sendAddr !== 'string') {
        loading.close()
        this.isSendSuccess = true
        this.isSuccessRes = false
        return
      }
      let address_bytes = Base58.decode(this.sendAddr);
      if (address_bytes[0] !== 5) {
        loading.close()
        this.isSendSuccess = true
        this.isSuccessRes = false
        return
      }
      let walletInfo = await window.vsys.request({ method: 'info' })
      if (walletInfo.result) {
        let network = walletInfo.network.toLowerCase()
        let networkByte = network === "mainnet" ? 'M'.charCodeAt(0) : 'T'.charCodeAt(0)
        if (address_bytes[1] !== networkByte) {
          loading.close()
          this.isSendSuccess = true
          this.isSuccessRes = false
          this.failedMsg = "It seems that the address you are sending to does not match your network type, please select the correct network type in V extension wallet"
          return
        }
      }
      let sendRes = await window.vsys.request({
        method: 'sendNFT',
        params:
            {
              tokenId: this.currentTokenId,
              publicKey: this.$store.state.vsys.wallet.publicKey,
              recipient: this.sendAddr,
              description: 'Send Felix NFT'
            }
      })
      this.isSendSuccess  = true
      if (sendRes.result && sendRes.message === "OK") {
        this.isSuccessRes  = true
        this.txID = sendRes.transactionId
      } else {
        if (sendRes.message === "account is locked") {
          this.failedMsg = "It seems that you have the extension installed, but you didn’t log in to your V Wallet.To continue, please go to your V Wallet extension and log in."
        }
        this.isSuccessRes = false
      }
      loading.close();
      console.log(sendRes, "res")
    },
    openExplorer(txId) {
      let url = this.$store.state.vsys.wallet.net === 'testnet' ? 'https://testexplorer.v.systems' : 'https://explorer.v.systems'
      window.open(url + '/transactions/' + txId)
    },
    async clicl2ShowAllDefinition(word,idx){
      if(word){
        if(this.isSeach){
          this.nftSearchWordsList[idx].isShowAllDefinition = true
          if(this.nftSearchWordsList[idx].wordDetail.length === 0){
            this.nftSearchWordsList[idx].wordDetail = await reqLemmaWord(word)
          }
        }else{
          this.nftWordsList[idx].isShowAllDefinition = true
          if(this.nftWordsList[idx].wordDetail.length === 0){
            this.nftWordsList[idx].wordDetail = await reqLemmaWord(word)
          }
        }
      }else{
        if(this.isSeach){
          this.nftSearchWordsList[idx].isShowAllDefinition = false
        }else{
          this.nftWordsList[idx].isShowAllDefinition = false
        }
      }
      this.$forceUpdate()
    },
    formatDefinition(str) {
      // return str.replace( /\''(.*?)\''/ig,function(item){return `<span style="color:blue;cursor:pointer">${item.substr(1, item.length-3).split('|')[1]}</span>`})
      var str = str.replace( /\''(.*?)\''/ig,function(item){return `<span style="color:blue">${item.substr(1, item.length-3).split('|')[1]}</span>`})
      if(/^[a-zA-Z]+$/.test(str.charAt(0))) return str.charAt(0).toUpperCase()+str.slice(1)
      else return str
    },
    searchNft(){
      if (this.searchVal !== "") {
        this.isSeach = true
        this.nftSearchWordsList = []
        this.nftWordsList.map(item=>{
          if(item.word.indexOf(this.searchVal) != -1){
            this.nftSearchWordsList.push(item)
          }
        })
        this.firstNft = this.nftSearchWordsList[0].word
      }else{
        this.isSeach = false
        this.firstNft = this.nftWordsList[0].word
      }
    },
    modelOpt(type,val,status){
      document.querySelector(".isShowGalleryModal").style.display = type === 'show' ? 'flex' : 'none';
      this.isSend = status
      if (this.isSend) {
        this.currentTokenId = val
      } else {
        this.currentWord = val
      }
      this.isSendSuccess = false
    },
    toShare(e){
      // let shareText = 'Hey, I just saved word ' + this.currentWord.toLocaleUpperCase() + ' and made it into NFT ! Check it out on Felix. www.saveaword.com'
      let shareText = 'I just saved the #Wiktionary definition of the word' + this.currentWord.toLocaleUpperCase() + ' to #blockchain, and minted a unique #NFT! Check out @FelixDictionary! www.saveaword.com'
      if(e.target.id === 'twitter') window.open('https://twitter.com/intent/tweet?text=' + shareText,'_blank')
      if(e.target.id === 'telegram') window.open('https://telegram.me/share/url?url=www.saveaword.com&text=' + shareText,'_blank')
      if(e.target.id === 'discord') window.open('https://discord.com/app','_blank')
      if(e.target.id === 'copy') {
        var target = document.createElement('div');
        target.id = 'tempTarget';
        target.style.opacity = '0';
        target.innerText = shareText;
        document.body.appendChild(target);
        try {
          let range = document.createRange();
          range.selectNode(target);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
          document.execCommand('copy');
          window.getSelection().removeAllRanges();
          this.$message.success('COPY SUCCESSFUL')
          target.parentElement.removeChild(target);
        } catch (e) {
          alert('Fail to copy')
        }
      }
    },
    click2Copy(val){
      navigator.clipboard.writeText(val).then(res=>{
        this.$message.success('COPY SUCCESSFUL')
      }).catch(err=>{
        this.$message.fail('COPY FAIL')
      })
    },
    sort(e){
      if(this.nftWordsList.length >0 || this.nftSearchWordsList.length >0) {
        if(this.isSeach){
          if(this.firstNft === this.nftSearchWordsList[0].word){
            if(e === 'Oldest'){
            this.nftSearchWordsList.reverse()
            }
          }else{
            if(e === 'Newest'){
            this.nftSearchWordsList.reverse()
            }
          }
        }else{
            if(this.firstNft === this.nftWordsList[0].word){
            if(e === 'Oldest'){
            this.nftWordsList.reverse()
            }
          }else{
            if(e === 'Newest'){
            this.nftWordsList.reverse()
            }
          }
        }
      }
    }
  },
  async mounted() {
    if (this.$store.state.vsys.wallet.address) {
      let nftContractId = await reqNftContractId();
      let nftIds = await reqNftIds(
        nftContractId,
        this.$store.state.vsys.wallet.address
      );
      let dbkeys = await reqInspectNft(nftIds);
      let nftWordsCurrentList = await reqFetchDefinition(dbkeys);
      nftWordsCurrentList.map(item => {
        Object.keys(item).map(val => {
          let wordData = JSON.parse(item[val]);
          let nftName = wordData.w;
          let definition = wordData.def;
          this.nftWordsList.push({ word: nftName, definition: definition });
        });
      });
       this.nftWordsList.map((val,idx)=>{
          val.token_id = nftIds[idx]
          val.isShowAllDefinition = false
          val.wordDetail = []
      })
      this.nftWordsList.reverse()
      this.firstNft = this.nftWordsList[0].word
    }
  }
};
</script>

<style scoped>

.loading_sty .el-loading-spinner .path{
      stroke: #FB8809;
    }
.loading_sty  .el-loading-spinner .el-loading-text {
    color: #FB8809 ;
}
.checkWords >>> .el-input__inner {
  border: 0;
  border-bottom: 2px solid #e6e1dc;
  border-radius: 0;
  background-color: transparent;
}

.checkWords {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  width: 100%;
  height: 562px;
  border: 1px solid #e6e1dc;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  background: black;
  box-sizing: border-box;
}

.gellery_nft_content::-webkit-scrollbar {
  display: none;
}

.word_content {
  width: 16.55%;
  color: #fff;
  border-right: 1px solid #e6e1dc;
}

.word_content_none_contain {
  width: 100%;
  height: 562px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
}

.word_content_none {
  width: 16.58%;
  height: 100%;
  border-right: 1px solid #e6e1dc;
  color: #fff;
}

.sned_nft{
  text-align: left;
}

.sned_title{
  font-size: 14px;
  font-weight: bold;
}

.send_ipt{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.send_btn{
  width: 126px;
  height: 42px;
  border: 1px solid #000000;
  border-radius: 48px;
  text-align: center;
  line-height: 42px;
  margin-top: 32px;
  margin-left: 35%;
  cursor: pointer;
  font-size: 20px;
}

.sned_nft >>> .el-input__inner {
  border: 1px solid #000;
  background-color: rgba(0, 0, 0,0.1);
  font-size: 14px;
}
.sned_nft >>> .el-input__inner::placeholder {
  color: #000;
}

.send_result{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.send_result_title{
  font-weight: bold;
  font-size: 25px;
  color: #171616;
  margin-top: 15px;
}

.send_result_des{
    font-size: 14px;
    color: #231815;
    margin-top: 15px;
    width: 50%;
    text-align: center;
}

.send_result_txid{
  font-size: 14px;
  color: #231815;
  margin-top: 11px;
  display: flex;
  align-items: center;
}

.tx_id{
  font-size:15px;
  font-weight: bold;
  color: #000000;
  text-decoration: underline;
  margin-left: 3px;
  cursor: pointer;
}

.modal_container{
  width:35%;background:#FB8809;border-radius:5px;text-align:center;padding:25px;box-sizing:border-box;padding-bottom:100px;
}

@media screen and (max-width: 500px) {
  .gallery {
    background: #121212;
    border:1px solid black;
  }
  .word_content {
    width: 49.5%;
    color: #fff;
    border-right: 1px solid #e6e1dc;
  }
  .word_content_none {
    width: 50%;
  }
  .modal_container {
    width: 70% !important;
  }
}
</style>
