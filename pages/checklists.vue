<template>
  <v-row v-if="myCheckLists.length > 0" class="mt-2">
    <v-col md="6" lg="4" v-for="shop in myCheckLists" :key="shop.id">
      <ShopItem card :shop="shop" />
    </v-col>
    <infinite-loading spinner="spiral" @infinite="infiniteHandler">
      <span slot="no-more"></span>
    </infinite-loading>
  </v-row>
  <p v-else>お店が追加されていません。</p>
</template>

<script>
export default {
  layout: "list",
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    myCheckLists() {
      return this.$store.getters["shop/checkLists"];
    },
  },
  methods: {
    infiniteHandler($state) {
      if (this.myCheckLists.length >= this.page) {
        this.page += 1;
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
};
</script>