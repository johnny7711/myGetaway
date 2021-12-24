<template>
  <div style="height: 100%">
    <GmapMap
      map-type-id="roadmap"
      :center="center"
      :zoom="16"
      :style="styleMap"
      :options="mapOptions"
      ref="mapRef"
    >
      <GmapMarker
        :position="myLocation"
        :icon="{
          url: 'avatar/myLocation.png',
          scaledSize: { width: 30, height: 30, f: 'px', b: 'px' },
        }"
        :animation="4"
      />
      <GmapMarker
        v-for="(shop, i) in shops"
        :key="shop.id"
        :position="shop.position"
        :clickable="true"
        :icon="{
          url: shop.lovers[0].avatar.slice(1),
          scaledSize: { width: 30, height: 30, f: 'px', b: 'px' },
        }"
        @click="onMarkerClick(shop)"
      />
    </GmapMap>

    <div class="d-flex justify-center">
      <v-text-field
        style="position: absolute; top: 10px; background: white"
        dense
        hide-details
        single-line
        placeholder="エリアで検索"
        outlined
        rounded
        v-model="area"
        @blur="searchArea"
      />

      <v-btn
        color="white"
        small
        rounded
        fixed
        style="top: 64px"
        @click="getCenter"
      >
        <v-icon left>mdi-reload</v-icon>
        このエリアを検索
      </v-btn>

      <v-card
        v-if="selectedShop"
        class="card"
        rounded="lg"
        :to="`/shops/${selectedShop.id}`"
      >
        <v-responsive width="340">
          <v-row>
            <v-col class="pa-0" cols="4">
              <v-avatar tile height="110" width="135">
                <v-img :src="selectedShop.src"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ selectedShop.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ "$".repeat(selectedShop.budget) }}
                  </v-list-item-subtitle>
                  <v-chip-group>
                    <v-chip
                      x-small
                      class="mx-1"
                      v-for="c in selectedShop.tags"
                      :key="c"
                      >{{ c }}</v-chip
                    >
                  </v-chip-group>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-responsive>
      </v-card>
    </div>

    <div class="d-flex justify-end mr-2">
      <v-btn
        fab
        x-small
        color="white"
        @click="filterToggle = !filterToggle"
        top
        fixed
        v-if="!isWeb"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
      <TheFilter
        :toggle.sync="filterToggle"
        :permanent="isWeb"
      />
      <TheMenu :toggle.sync="menuToggle" :permanent="isWeb" />
    </div>
  </div>
</template>

<script>
export default {
  emits: ["onMarkerClick"],
  props: {
    shops: {
      type: Array,
      required: true,
    },
    isWeb: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      zoom: 15,
      styleMap: {
        width: "100%",
        height: "100%",
      },
      mapOptions: {
        gestureHandling: "greedy",
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      },
      filterToggle: false,
      menuToggle: false,
      area: "",
    };
  },
  computed: {
    center() {
      return this.$store.getters["map/center"];
    },
    myLocation() {
      return this.$store.getters["map/myLocation"];
    },
    selectedShop() {
      return this.$store.getters["shop/selectedShop"];
    },
  },
  methods: {
    onMarkerClick(item) {
      this.$store.commit("map/setCenter", {
        lat: item.position.lat,
        lng: item.position.lng,
      });
      this.$store.commit("shop/setSelectedShop", item);
      this.$emit("onMarkerClick");
    },
    getCenter() {
      this.$refs.mapRef.$mapPromise.then((map) => {
        const position = map.getCenter();
        console.log(position.lat());
        console.log(position.lng());
      });
    },
    async searchArea() {
      if (this.area) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          {
            address: this.area,
            region: "jp",
          },
          (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              this.$store.commit('map/setCenter', {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              })
            } else {
              console.log("NG");
            }
          }
        );
      }
    },
  },
  mounted() {
    if (navigator.geolocation) {
      this.$store.dispatch("map/watchPosition");
      this.selectedShop
        ? this.$store.commit(
            "map/setCenter",
            this.$store.getters["shop/selectedShop"].position
          )
        : this.$store.commit(
            "map/setCenter",
            this.$store.getters["map/myLocation"]
          );
    } else {
      console.log("geolocation not supported");
    }
  },
};
</script>

<style scoped>
.card {
  position: absolute;
  bottom: 120px;
}
</style>