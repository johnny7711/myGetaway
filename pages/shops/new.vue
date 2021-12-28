<template>
  <v-stepper v-model="e6" vertical max-width="1064">
    <v-stepper-step :complete="e6 > 1" step="1"> お店を検索 </v-stepper-step>

    <v-stepper-content step="1">
      <v-text-field
        class="mb-2"
        v-model="search"
        single-line
        label="お店を検索"
        placeholder="店名、場所、キーワードを入力"
        append-outer-icon="mdi-magnify"
        clearable
        @click:append-outer="onSearch"
        style="width: 90%"
        :error="searchError.error"
        :error-messages="searchError.messages"
      />
      <v-card class="mb-2" height="400px" width="1064px">
        <GmapMap
          map-type-id="roadmap"
          :center="center"
          :zoom="zoom"
          :style="styleMap"
          :options="mapOptions"
          ref="searchMap"
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
      </v-card>
      <v-list dense v-if="searchedShop">
        <v-list-item>
          <v-list-item-avatar size="20">
            <v-icon x-small class="grey lighten-1" dark>
              mdi-map-marker
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-caption">
            {{ searchedShop.formatted_address }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn
        v-if="searchedShop && !searchError.error"
        class="mt-2"
        color="primary"
        @click="e6 = 2"
      >
        次へ
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">
      写真をアップロード
    </v-stepper-step>

    <v-stepper-content step="2">
      <input
        ref="uploader"
        class="d-none"
        type="file"
        accept="image/*"
        @change="onFileChanged"
        multiple
      />
      <v-btn
        color="primary"
        class="mb-4 text--none"
        block
        rounded
        depressed
        :disabled="dt && dt.files.length > max_uploaded"
        @click="onAddImage"
      >
        <v-icon left>mdi-cloud-upload</v-icon>写真をアップロード
      </v-btn>
      <v-slide-group multiple v-show="previewUrls">
        <v-slide-item v-for="(preview, i) in previewUrls" :key="i" class="pa-3">
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
              <v-img :src="preview" contain height="100" width="100"></v-img>
            </v-badge>
          </v-card>
        </v-slide-item>
      </v-slide-group>
      <p class="caption text-right" v-show="previewUrls.length > 0">
        {{ previewCounter }}
      </p>
      <v-btn color="primary" @click="e6 = 3"> 次へ </v-btn>
      <v-btn text @click="e6 = 1"> 戻る </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3"> その他情報 </v-stepper-step>

    <v-stepper-content step="3">
      <v-card flat v-if="searchedShop">
        <v-card-text class="pb-3">
          <div v-if="result" class="text-caption pink--text">
            このお店はすでに登録されています。
          </div>
          <p class="text-h5 text--primary mb-0">{{ searchedShop.name }}</p>
          <p>{{ searchedShop.formatted_address }}</p>
          <v-slide-group multiple class="my-1" v-if="previewUrls.length > 0">
            <v-slide-item
              v-for="(preview, i) in previewUrls"
              :key="i"
              class="pa-3"
            >
              <v-card class="ma-1" outlined>
                <v-img :src="preview" contain height="100" width="100"></v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
          <v-combobox
            class="my-5"
            v-model="tags"
            :loading="loading"
            :items="tagsList"
            :search-input.sync="tagSearch"
            prepend-icon="mdi-tag-multiple"
            hide-selected
            dense
            label="タグ"
            hint="最大5つ"
            placeholder="タグを入力または、選択する"
            multiple
            deletable-chips
            persistent-hint
            small-chips
            @keydown.enter="addNewTag"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    "<strong>{{ tagSearch }}</strong
                    >"のタグ候補が見つかりません。
                    <kbd>enter</kbd>で新規作成する。
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
          <v-textarea
            filled
            counter
            prepend-icon="mdi-comment"
            :rules="rules"
            label="コメント"
            v-model="comment"
          ></v-textarea>
        </v-card-text>
      </v-card>

      <v-btn v-if="result" color="primary" @click="addShop(searchedShop)">
        マイリストへ追加する
      </v-btn>
      <v-btn v-else color="primary" @click="addShop(searchedShop)">
        お店を登録する
      </v-btn>
      <v-btn text @click="e6 = 2"> 戻る </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  layout: "page",
  mounted() {
    this.$gmapApiPromiseLazy().then(() => {
      console.log(google)
      this.placeService = new google.maps.places.PlacesService(
        this.$refs.searchMap.$mapObject
      );
    });
    this.$store.dispatch('firestore/getShop')
    this.$store.dispatch('firestore/createShop', 123)
  },
  data() {
    return {
      placeService: null,
      e6: 1,
      zoom: 16,
      styleMap: {
        width: "100%",
        height: "100%",
      },
      mapOptions: {
        gestureHandling: "greedy",
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
      },
      center: { lat: 35.681382, lng: 139.766084 },
      search: "",
      markers: [],
      searchedShop: null,
      dt: null,
      previewUrls: [],
      max_uploaded: 10,
      result: false,
      searchError: {
        error: false,
        messages: "",
      },
      tagsList: [],
      tags: [],
      loading: false,
      newTags: [],
      tagSearch: null,
      rules: [(v) => v.length <= 100 || "最大100文字"],
      comment: "",
    };
  },
  watch: {
    tags(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    },
    tagSearch(val) {
      val && val !== this.tags && this.tagsSelections(val);
    },
  },
  computed: {
    previewCounter() {
      return `${this.previewUrls.length} / ${this.max_uploaded}`;
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
  },
  methods: {
    onSearch() {
      if (!this.search) return;
      this.clearMarkers();
      this.placeService.findPlaceFromQuery(
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
            const typeError = ["bar", "cafe", "food", "restaurant"].some(
              (type) => place.types.includes(type)
            );
            this.searchError = typeError
              ? {
                  error: false,
                  messages: "",
                }
              : {
                  error: true,
                  messages: "飲食店、レストランではありません。",
                };

            console.log(place);
            this.createMarker(place);
            this.center = place.geometry.location;
            this.$refs.searchMap.$mapObject.setZoom(this.zoom);
            this.$refs.searchMap.$mapObject.panTo(place.geometry.location);
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
        const _dt = new DataTransfer();
        [].forEach.call(e.target.files, (file) => {
          _dt.items.add(file);
        });
        this.dt = _dt;
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
    addShop(shop) {
      this.placeService.getDetails(
        {
          placeId: shop.place_id,
        },
        async (place, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            const week = _.groupBy(
              place.opening_hours.periods,
              (res) => res.open.day
            );
            const shopObj = {
              id: place.place_id,
              name: place.name,
              address: place.formatted_address,
              position: place.geometry.location,
              budget: place.price_level,
              phone: place.formatted_phone_number,
              open: week,
              website: "website" in place ? place.website : place.url,
              tags: this.tags,
              comment: this.comment
            };
            await this.$store.dispatch("firestore/createShop", shopObj)
            await this.$store.dispatch("storage/savePhoto", {shopId: shopObj.id, files: this.dt.files})
            // this.$store.commit("shop/addShop", shopObj);
            // this.$store.commit("shop/addMyLists", shopObj);
            // this.$store.commit("shop/setTags", this.newTags);
            // this.$router.push("/users/0000");
          } else {
            console.log("NG");
          }
        }
      );
    },
    tagsSelections(v) {
      this.loading = true;
      setTimeout(() => {
        const lists = this.$store.getters["shop/tagsSelections"];
        this.tagsList = lists.filter((e) => e.indexOf(v) > -1);
        this.loading = false;
      }, 500);
    },
    addNewTag(event) {
      this.newTags.push(event.target.value);
    }
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