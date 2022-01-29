<template>
  <div class="gallery" style="text-align: center; font-family: serif">
    <div
      style="font-size: 48px; color: #fb8809; text-align: center; margin: 10px"
    >
      GALLERY
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
          border-bottom: 1px solid grey;
          padding: 10px;
          margin-bottom: 45px;
        "
      >
        LIST OF SAVED WORDS THAT ARE NOW NFTs - 09/12/2021 - 19:57
      </div>

      <div style="display: flex; min-height: 750px; flex-wrap: wrap">
        <div class="words-col" v-for="i in 6" :key="i">
          <div v-for="(j, index) in numberCol" :key="index">
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
          <div v-if="i <= remainder" class="" style="margin-top: 40px">
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
      </div>
    </div>
  </div>
</template>

<script>
import { reqInspectNft } from "@/api/index";

export default {
  name: "SavedWords",
  data() {
    return {
      options: [
        {
          value: "Oldest",
          label: "Oldest",
        },
        {
          value: "Newest",
          label: "Newest",
        },
      ],
      value: "",
      nftWords: [
        {
          word: "happy",
          definition:
            "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
          origin: "by FRANZ KAFKA",
        },
        {
          word: "table",
          definition: "skdhlfsjhldjnflsjdnlj",
          origin: "skdjfdfg",
        },
        {
          word: "song",
          definition: "skdhlfsjhldjnflsjdnlj",
          origin: "skdjfdfg",
        },
        {
          word: "legal",
          definition: "skdhlfsjhldjnflsjdnlj",
          origin: "skdjfdfg",
        },
        {
          word: "leggings",
          definition: "skdhlfsjhldjnflsjdnlj",
          origin: "A thousand unknown plants",
        },
        {
          word: "music",
          definition: "skdhlfsjhldjnflsjdnlj",
          origin: "skdjfdfg",
        },
        {
          word: "happy",
          definition:
            "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
          origin: "by FRANZ KAFKA",
        },
        {
          word: "happy",
          definition: "skdhlfsjhldjnflsjdnlj",
          origin: "skdjfdfg",
        },
      ],
    };
  },
  computed: {
    numberCol() {
      return Math.floor(this.nftWords.length / 6); // one column display
    },
    remainder() {
      return this.nftWords.length % 6;
    },
  },
  methods: {},
  async mounted() {
    if (localStorage["nft"]) {
      var result = await reqInspectNft(JSON.parse(localStorage["nft"]));
      console.log(result);
      var arg_inspectnft = [];
      result["nft"].forEach((element) => {
        element.forEach(async (item) => {
          arg_inspectnft.push(item[1][0]);
        });
      });
      console.log(arg_inspectnft);
      this.nftWords = await reqInspectNft(); // The data parsed to unify structure for rendering
    }
    //     {
    //     "nft": [
    //         [
    //             210,
    //             [
    //                 "97uq4W21JXhMBVJVSScWjsxTkArcienYxc16oubocqf2",
    //                 "TWst8k7NgZNzxiXSncex9uvSzt4kSaJZE8tkLKzo8"
    //             ]
    //         ],
    //         [
    //             211,
    //             [
    //                 "97uq4W21JXhMBVJVSScWjsxTkArcienYxc16oubocqf2",
    //                 "TWst8k7NgZNzxiXSncex9uvSzt4kSaJZE8tkLKzo8"
    //             ]
    //         ]
    //     ],
    //     "sent": [
    //         [
    //             "CassH2MrofLtoZF2dQ3b6zAZ9o5XGVpWAdpaZuVYRK6R",
    //             "TWst8k7NgZNzxiXSncex9uvSzt4kSaJZE8tkLKzo8"
    //         ],
    //         [
    //             "HYP5nhXMqZwC4qD9mUkJn21SX3858fJ8rwxAMnGacp4k",
    //             "TWst8k7NgZNzxiXSncex9uvSzt4kSaJZE8tkLKzo8"
    //         ]
    //     ]
    // }

    // this.saveWord = this.$store.state.words;
    // need to backend api
  },
};
</script>

<style scoped>
@media screen and (max-width: 500px) {
  .gallery {
    background: #121212;
  }
}
.checkWords >>> .el-input__inner {
  border: 0;
  border-bottom: 2px solid gray;
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
  border-left: 1px solid white;
  border-right: 1px solid white;
  padding: 10px;
}
.origin-info {
  margin: auto;
  width: 80px;
  border-top: 1px solid grey;
}
</style>
