<template>
  <div class="launchpad container text-light pt-5">
    <h1 v-on:click="addItem">Launchpad</h1>
    <p v-if="!web3Ready">Please connect your wallet</p>
    <div
      v-else
      v-for="(chunk, chunkIndex) in itemChunks"
      :key="chunkIndex"
      class="row"
    >
      <div
        v-for="(item, index) in chunk"
        :key="index"
        class="col-md-6 col-lg-3 col-xl d-flex justify-content-center my-5"
      >
        <div class="item">
          <div class="item-header p-3">
            <span class="item-icon round bg-white text-center text-dark"
              >A</span
            >
            <span class="item-name">
              {{ item.name }}
            </span>
          </div>
          <div class="item-body">
            <ul>
              <li>detail 1</li>
              <li>detail 2</li>
              <li>detail 3</li>
              <li>detail 4</li>
            </ul>
            <div class="text-center text-light w-100">
              <router-link to="/" class="text-light">More info</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "App",
  data: function () {
    return {
      items: [{ name: "item1" }, { name: "item2" }, { name: "item3" }],
    };
  },
  computed: {
    ...mapGetters({
      connectString: "web3/connectString",
      web3Ready: "web3/isAccountActive",
    }),
    itemChunks: function () {
      return this.chunk(this.items, 4);
    },
  },
  methods: {
    ...mapActions({
      connectLaunchpad: "launchpad/connect",
      initializeLaunchpad: "launchpad/initialize",
    }),
    addItem: function () {
      this.items.push({ name: "anotherItem" });
    },
    chunk: function (arr, size) {
      var newArr = [];
      for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
      }
      return newArr;
    },
  },
  mounted: async function () {
    await this.initializeLaunchpad();
    if (this.web3Ready) {
      this.connectLaunchpad();
    }
  },
  watch: {
    web3Ready(newValue) {
      if (newValue) {
        this.connectLaunchpad();
      }
    },
  },
};
</script>

<style lang="scss">
.item {
  width: 15rem;
  .item-header {
    background-color: rgb(88, 88, 88);
    border-radius: 3em 3em 0 0;
    .item-icon {
      border-radius: 50%;
      width: 2em;
      height: 2em;
      display: inline-block;
    }
  }
  .item-body {
    background-color: rgba(211, 211, 211, 0.288);
    border-radius: 0 0 3em 3em;
  }
}
</style>
