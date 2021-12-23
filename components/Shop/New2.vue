<template>
  <v-dialog
    :value="dialog"
    @input="$emit('update:dialog', $event)"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title class="text-subtitle1">
        <v-btn class="mr-3" icon @click="$emit('update:dialog', false)">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        お店の情報を入力
      </v-card-title>
      <GmapMap
        map-type-id="roadmap"
        :center="center"
        :zoom="zoom"
        :style="styleMap"
        :options="mapOptions"
        ref="mapRef"
      >
        <GmapMarker
          v-for="m in markers"
          :position="m.position"
          :title="m.title"
          :clickable="true"
          :draggable="false"
          :icon="m.icon"
          :key="m.id"
          :label="m.label"
        >
        </GmapMarker>
      </GmapMap>
      <div style="position: absolute; top: 70px">
        <v-text-field
          v-model="search"
          solo
          dense
          label="お店を検索"
          placeholder="店名、場所を入力"
          append-icon="mdi-magnify"
          rounded
          clearable
          @click:append="onSearch"
        ></v-text-field>
      </div>
      <div class="d-flex justify-center" v-if="searchedShop">
        <v-btn color="white" small rounded @click="inputShopInfo">
          ここに決定
        </v-btn>
      </div>

      <v-card-text class="mt-2">
        <v-expand-transition>
          <v-form ref="form">
            <v-slide-group multiple v-show="previewUrls">
              <v-slide-item
                v-for="(preview, i) in previewUrls"
                :key="i"
                class="pa-3"
              >
                <v-card class="ma-1" outlined>
                  <v-badge color="rgba(0,0,0,0)" offset-y="-0.5" offset-x="10">
                    <v-btn
                      slot="badge"
                      fab
                      height="20"
                      width="20"
                      @click="removeFile(i)"
                      dark
                      color="grey lighten-1"
                      depressed
                    >
                      <v-icon size="12">mdi-close-thick</v-icon>
                    </v-btn>
                    <v-img
                      :src="preview"
                      contain
                      height="100"
                      width="100"
                    ></v-img>
                  </v-badge>
                </v-card>
              </v-slide-item>
            </v-slide-group>
            <p class="caption text-center" v-show="previewUrls.length > 0">
              {{ previewCounter }}
            </p>
            <v-btn
              color="primary"
              class="mt-1 text--none"
              block
              rounded
              depressed
              :disabled="dt && dt.files.length > max_uploaded"
              @click="onAddImage"
            >
              <v-icon left>mdi-cloud-upload</v-icon>写真をアップロード
            </v-btn>

            <input
              ref="uploader"
              class="d-none"
              type="file"
              accept="image/*"
              @change="onFileChanged"
              multiple
            />
          </v-form>
        </v-expand-transition>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="pa-4"
          color="blue darken-1"
          outlined
          @click="dialog = false"
        >
          下書きに保存
        </v-btn>
        <v-btn
          class="pa-4"
          color="blue darken-1"
          depressed
          dark
          @click="dialog = false"
          >投稿する</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      zoom: 16,
      styleMap: {
        width: "100%",
        height: "35%",
      },
      mapOptions: {
        gestureHandling: "greedy",
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      },
      search: "",
      markers: [],
      searchedShop: null,
      dt: null,
      previewUrls: [],
      max_uploaded: 10,
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
    previewCounter() {
      return `${this.previewUrls.length} / ${this.max_uploaded}`;
    },
  },
  methods: {
    onSearch() {
      if (!this.search) return;
      this.clearMarkers();
      const placeService = new google.maps.places.PlacesService(
        this.$refs.mapRef.$mapObject
      );
      placeService.findPlaceFromQuery(
        {
          query: this.search,
          fields: [
            "name",
            "formatted_address",
            "geometry",
            "place_id",
            "types",
          ],
        },
        ([place], status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(place);
            this.createMarker(place);
            this.$store.commit("map/setCenter", place.geometry.location);
            this.$refs.mapRef.$mapObject.setZoom(this.zoom);
            this.$refs.mapRef.$mapObject.panTo(place.geometry.location);
            this.searchedShop = place;
          }
        }
      );
    },
    createMarker(place) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        title: place.name,
        id: place.place_id,
        label: {
          text: place.name,
          color: "#ffffff",
          fontSize: "10px",
          className: "marker-label",
        },
        icon: {
          url: "/avatar/home.png",
          scaledSize: { width: 37, height: 40, f: "px", b: "px" },
        },
      });
      this.markers.push(marker);
    },
    clearMarkers() {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];
    },
    inputShopInfo() {
      console.log(this.searchedShop);
      const placeService = new google.maps.places.PlacesService(
        this.$refs.mapRef.$mapObject
      );
      placeService.getDetails(
        {
          placeId: this.searchedShop.place_id,
          fields: [
            "name",
            "formatted_address",
            "geometry",
            "url",
            "formatted_phone_number",
            "opening_hours",
            "website",
            "price_level",
          ],
        },
        (place, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(place);
            this.name = place.name;
            this.address = place.formatted_address;
            this.budget = place.price_level;
            this.phone = place.formatted_phone_number;
            this.website = place.website;
            // this.weekday = place.opening_hours.periods.map(p => {
            //   if()
            // })
            this.weekday = _.groupBy(
              place.opening_hours.periods,
              (res) => res.open.day
            );

          }
        }
      );
    },
    onAddImage() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      // 上限アップロード数
      if (e.target.files.length > this.max_uploaded) return;

      if (this.dt) {
        // 上限アップロード数
        if (this.dt.files.length + e.target.files.length > this.max_uploaded)
          return;

        [].forEach.call(e.target.files, (file) => {
          this.dt.items.add(file);
        });
      } else {
        const dt = new DataTransfer();
        [].forEach.call(e.target.files, (file) => {
          dt.items.add(file);
        });
        this.dt = dt;
      }
      // プレビュー読み込み
      [].forEach.call(e.target.files, (file) => {
        this.createPreviewUrls(file);
      });

      e.target.files = this.dt.files;
      this.$refs.uploader.value = "";
    },
    createPreviewUrls(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    removeFile(index) {
      this.dt.items.remove(index);
      this.previewUrls.splice(index, 1);
    },
    upload() {},
    formatDay(day) {
      switch (day) {
        case "0":
          return "月曜日";
        case "1":
          return "火曜日";
        case "2":
          return "水曜日";
        case "3":
          return "木曜日";
        case "4":
          return "金曜日";
        case "5":
          return "土曜日";
        case "6":
          return "日曜日";
      }
    },
  },
};
</script>

<style>
.marker-label {
  position: relative;
  top: 30px;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  padding: 2px 10px;
  border-radius: 8px;
  opacity: 0.8;
}
</style>