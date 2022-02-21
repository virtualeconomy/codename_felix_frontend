<template>
  <div>
    <i
        class="el-icon-arrow-left"
        @click="$router.go(-1)"
        style="color:#FB8809;font-size:20px;font-weight:600;cursor:pointer"
    >back to settings</i>
    <h3>List of transactions ID</h3>
    <div class="content">
        <div class="transaction_detail"
            v-for="(item,index) in txId_list"
            :key="index">
            <div class="session_status">#{{index+1}} SESSION - {{ item.word }}</div>
            <div class="detail_content" @click="txInfo(item.txId)"><u>{{item.txId}}</u></div>
            <div class="session_status">STATUS</div>
            <div class="detail_content">{{item.status}}</div>
        </div>
    </div>
    <div @click="importData" class="import-button">IMPORT DATA</div>
    <div @click="exportData" class="export-button">EXPORT DATA</div>
  </div>
</template>

<script>
export default {
  name: "TransId",
  data() {
    return {
        txId_list: []
    };
  },
  created() {
        let nfts = JSON.parse(window.localStorage.getItem('nfts'))
        if(nfts.length > 0){
            for(let i=0; i<nfts.length; i++){
                let nft = {};
                nft["word"] = nfts[i].nft_word_name
                nft["txId"] = nfts[i].nft_creation_txid
                nft["status"] = "done"
                this.txId_list.push(nft)
            }
        }
  },
  methods: {
    txInfo(txId) {
        let NETWORK_BYTE = 'T'
        let EXPLORER = 'https://explorer.v.systems'
        let TEST_EXPLORER = 'https://testexplorer.v.systems'
        let TX_URL = '/transactions/'
        let url = NETWORK_BYTE === 'T' ? TEST_EXPLORER : EXPLORER
        window.open(url + TX_URL + txId)
    },
    importData(){},
    exportData(){},
  },
  mounted() {
  }
};
</script>

<style scoped>
.content{
    overflow: scroll;
    height: 600px;
}
.transaction_detail{
    margin-top:14px;
    height:120px;
    border-bottom: solid black 1px;
    position: relative;
    z-index: 2;
}
.session_status {
    color:171616;
    font-size:20px;
    font-weight:bold 
}
.detail_content {
    color:#FB8809;
    font-size:15px;
    font-weight:bold;
    margin-top: 7px;
    margin-bottom: 7px;
}
.import-button {
  position: relative;
  z-index: 2;
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background: #fb8809;
  color: white;
  cursor: pointer;
}

.export-button {
  position: relative;
  z-index: 2;
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  margin-top: 25px;
  margin-left: 20px;
  margin-right: 20px;
  color: #fb8809;
  cursor: pointer;
  border: 1px solid #fb8809;
  margin-bottom: 10px;
}
</style>