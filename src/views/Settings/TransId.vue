<template>
  <div>
    <i
        class="el-icon-arrow-left"
        @click="$router.go(-1)"
        style="color:#FB8809;font-size:20px;font-weight:600;cursor:pointer"
    >back to settings</i>
    <h3>List of transactions ID</h3>
    <div class="transaction_detail" 
        v-for="(item,index) in transaction_list"
        :key="index">
        <div class="session_status">#{{index+1}} SESSION - {{ item.word }}</div>
        <div class="detail_content">{{item.txId}}</div>
        <div class="session_status">STATUS</div>
        <div class="detail_content">{{item.status}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransId",
  data() {
    return {
        transaction_list: [
            {"word":"BOOK", "txId":"0x966e5D...3BA2D41701A", "status":"done"},{"word":"MATURE", "txId":"0x966e5D...3BA2D41701A", "status":"done"} 
        ]
    };
  },
  methods: {},
  mounted() {
  }
};
</script>

<style scoped>
.transaction_detail{
    margin-top:14px;
    height:120px;
    border-bottom: solid black 1px;
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
</style>