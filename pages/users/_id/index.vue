<template>
  <section>
    <h3 class="grey--text text--darken-2 mt-n1">マイリスト</h3>
    <v-row v-if="myShops.length > 0" class="mt-2">
      <v-col sm="6" md="12" lg="6" v-for="shop in myShops" :key="shop.id">
        <ShopItem card :shop="shop" />
      </v-col>
      <infinite-loading spinner="spiral" @infinite="infiniteHandler">
        <span slot="no-more"></span>
      </infinite-loading>
    </v-row>
    <p v-else>お店はありません。</p>
  </section>
</template>

<script>
export default {
  layout: "user",
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    myShops() {
      return this.$store.getters["shop/myLists"];
    },
  },
  methods: {
    infiniteHandler($state) {
      if (this.myShops.length >= this.page) {
        this.page += 1;
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
};
</script>