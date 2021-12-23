<template>
  <v-main>
    <client-only>
      <template v-if="isWeb">
        <v-row no-gutters :style="{ height: mapHeight }">
          <v-col sm="12" md="7">
            <Map :shops="shops" :isWeb="isWeb" />
          </v-col>
          <v-col sm="12" md="5">
            <v-container
              style="overflow-y: scroll; height: 100%; max-height: 100vh"
              ref="scrollList"
            >
              <template v-if="shops.length > 0">
                <div v-for="shop in shops" :key="shop.id" class="px-5">
                  <ShopItem
                    btn
                    :shop="shop"
                    addCheckIcon
                    :onClick="changeMapView"
                  />
                </div>
              </template>
              <p v-else>お店が見つかりません。</p>
            </v-container>
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <section :style="{ height: mapHeight }">
          <Map
            @onMarkerClick="closeBottomSheet"
            :shops="shops"
            :isWeb="isWeb"
          />
          <SwiperableBottomSheet
            ref="swipeableBottomSheet"
            @transformHeight="transformHeight"
          >
            <template #title>
              <p class="text-center subtitle-1 mt-3">
                {{ shops.length }}件のお店
              </p>
            </template>

            <template #default>
              <v-container>
                <v-row v-if="shops.length > 0">
                  <v-col v-for="shop in shops" :key="shop.id">
                    <ShopItem
                      btn
                      :shop="shop"
                      addCheckIcon
                      :onClick="changeMapView"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </SwiperableBottomSheet>
        </section>
      </template>
    </client-only>
    <TheBottom v-if="!isWeb" />
  </v-main>
</template>


<script>
export default {
  data() {
    return {
      menuToggle: false,
      mapHeight: "100%",
    };
  },
  mounted() {
    this.mapHeight = this.toggle == "close" ? "100%" : "60%";
    // console.log(this.$fire)
    // this.$fire.db.collection('cafes').get().then(snapshot => console.log(snapshot.docs))
  },
  computed: {
    shops() {
      return this.$store.getters["shop/filterdItems"];
    },
    isWeb() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
        case "xl":
          return true;
        default:
          return false;
      }
    },
    toggle() {
      return this.$store.getters["swiper/toggle"];
    },
  },
  methods: {
    closeBottomSheet() {
      this.$refs.swipeableBottomSheet.setState("close");
      this.mapHeight = "100%";
    },
    transformHeight(value) {
      this.mapHeight = `${value}%`;
    },
    changeMapView(shop) {
      this.$store.commit("map/setCenter", {
        lat: shop.position.lat,
        lng: shop.position.lng,
      });
      this.$store.commit("shop/setSelectedShop", shop);
    },
  },
};
</script>