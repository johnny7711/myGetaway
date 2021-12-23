<template>
  <section>
    <template v-if="isWeb">
      <v-row dense class="mt-2" style="position: relative">
        <v-col cols="12" sm="12" md="7" class="mapSec">
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            src="https://picsum.photos/id/11/500/300"
            ><template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row> </template
          ></v-img>
        </v-col>
        <v-col cols="12" sm="12" md="5">
          <v-row dense>
            <v-col v-for="n in 4" :key="n" class="d-flex child-flex" cols="6">
              <v-img
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                aspect-ratio="1.19"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>
        </v-col>
        <v-btn
          color="white"
          style="position: absolute; bottom: 50px; right: 20px"
          @click="photoDialog = true"
        >
          <v-icon left>mdi-dots-grid</v-icon>
          すべての写真を表示
        </v-btn>
        <PhotoDialog :dialog.sync="photoDialog" />
      </v-row>
    </template>

    <template v-else>
      <v-carousel
        :show-arrows="false"
        hide-delimiters
        height="300"
        class="mb-2"
        v-model="photoIndex"
      >
        <v-carousel-item
          v-for="(n, i) of 9"
          :key="i"
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          reverse-transition="fade-transition"
          transition="fade-transition"
          @click="photoDialog = true"
        >
          <v-chip
            dark
            label
            small
            color="rgba(0,0,0,0.4)"
            style="position: absolute; bottom: 20px; right: 30px"
            >{{ photoCounter }}</v-chip
          >
        </v-carousel-item>
      </v-carousel>
      <PhotoDialog :dialog.sync="photoDialog" />
    </template>

    <v-row :dense="isWeb ? false : true">
      <v-col cols="12" sm="12" md="5" class="mapSec">
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar size="30" class="mr-7">
              <v-icon small class="grey lighten-1" dark>
                mdi-map-marker
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="text-body-2">
              {{ shop.address }}
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-avatar size="30" class="mr-7">
              <v-icon small class="grey lighten-1" dark> mdi-phone </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="text-body-2">
              {{ shop.phone }}
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-avatar size="30" class="mr-7">
              <v-icon small class="grey lighten-1" dark>
                mdi-currency-jpy
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="text-body-2">
              {{ shop.budget }}
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-group no-action active-class="text--primary">
            <template v-slot:activator>
              <v-list-item-avatar size="30" class="mr-7">
                <v-icon small class="grey lighten-1" dark>
                  mdi-clock-time-four
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>営業時間</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-list-item-content>
                <v-simple-table dense>
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="day of shop.open">
                        <td>{{ formatDay(day[0].open.day) }}</td>
                        <td>
                          <p class="mb-0" v-for="d of day">
                            {{ formatTime(d.open.time, d.close.time) }}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-avatar size="30" class="mr-7">
              <v-icon small class="grey lighten-1" dark> mdi-web </v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="text-body-2">
              <a :href="shop.website" target="_blank">{{ shop.website }}</a>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-avatar size="30" class="mr-7">
              <v-icon small class="grey lighten-1" dark>
                mdi-tag-multiple
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-chip-group>
                <v-chip
                  small
                  class="mx-1"
                  v-for="tag in shop.tags"
                  :key="tag"
                  >{{ tag }}</v-chip
                >
              </v-chip-group>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-avatar size="30" class="mr-7">
              <v-icon small class="grey lighten-1" dark>
                mdi-account-star
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list dense>
                <v-avatar
                  size="24"
                  v-for="user in loversCount"
                  :key="user.name"
                >
                  <img :src="user.avatar" :alt="user.name" />
                </v-avatar>
                <span
                  class="grey--text text-caption"
                  v-if="shop.lovers.length > 5"
                  >(+ {{ shop.lovers.length - 5 }} lovers)</span
                >
              </v-list>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" sm="12" md="7">
        <GmapMap
          map-type-id="roadmap"
          :center="shop.position"
          :zoom="16"
          :style="styleMap"
          :options="mapOptions"
        >
          <GmapMarker
            :position="shop.position"
            :icon="{
              url: '/avatar/home.png',
              scaledSize: { width: 37, height: 40, f: 'px', b: 'px' },
            }"
            :animation="4"
          />
        </GmapMap>
      </v-col>

      <v-col cols="12" class="pt-0">
        <v-subheader>コメント</v-subheader>
        <v-divider class="mb-5"></v-divider>

        <template v-if="shop.comments.length > 0">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              v-for="(comment, i) in commentsCount"
              :key="i"
            >
              <v-card class="mx-auto" outlined>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src="comment.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle class="text--primary">{{
                      comment.name
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle class="text-caption"
                      >2020/10/11</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <p class="px-5 pt-2 text-body-2">{{ comment.comment }}</p>
              </v-card>
            </v-col>
          </v-row>

          <v-dialog
            v-model="commentDialog"
            width="500"
            scrollable
            v-if="shop.comments.length > 6"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined v-bind="attrs" v-on="on" class="my-5">
                {{ shop.comments.length }}件のコメントをすべて表示
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-subtitle1">
                <v-btn class="mr-3" icon @click="commentDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                {{ commentsTitle }}
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col
                    cols="12"
                    v-for="(comment, i) in shop.comments"
                    :key="i"
                  >
                    <v-card class="mx-auto" outlined>
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img :src="comment.avatar"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-subtitle class="text--primary">{{
                            comment.name
                          }}</v-list-item-subtitle>
                          <v-list-item-subtitle class="text-caption"
                            >2020/10/11</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                      <p class="px-5 pt-2 text-body-2">
                        {{ comment.comment }}
                      </p>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>
        <template v-else>
          <p class="text-subtitle1">コメントはありません。</p>
        </template>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  layout: "detail",
  validate({params, store}){
    return store.getters["shop/filterdItems"].some(shop => shop.id === params.id)
  },
  data() {
    return {
      zoom: 15,
      styleMap: {
        width: "100%",
        height: "40vh",
      },
      mapOptions: {
        gestureHandling: "cooperative",
        mapTypeControl: false,
      },
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          src: "https://imgfp.hotp.jp/IMGH/01/14/P027070114/P027070114_238.jpg",
          subtitle:
            "Lorem ipsum dolor sit amet consectet Lorem ipsum dolor sit amet consectetur adip Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur quas optio quisquam tempora minima, eos ipsam repellendus. Est repellat voluptas iure ut quos, quidem sequi eius accusantium soluta ea in?",
        },
      ],
      shop: null,
      photoDialog: false,
      photoIndex: 0,
      commentDialog: false,
    };
  },
  asyncData({ store, route }) {
    const shop = store.getters["shop/getShopById"](route.params.id);
    store.commit("updateTitle", shop.name);
    return { shop };
  },
  computed: {
    isWeb() {
      switch (this.$vuetify.breakpoint.name) {
        case "md":
        case "lg":
        case "xl":
          return true;
        default:
          return false;
      }
    },
    photoCounter() {
      return `${this.photoIndex + 1} / 9`;
    },
    loversCount() {
      return this.shop.lovers ? this.shop.lovers.slice(0, 5) : this.shop.lovers;
    },
    commentsCount() {
      return this.shop.comments
        ? this.shop.comments.slice(0, 6)
        : this.shop.comments;
    },
    commentsTitle() {
      return `コメント全${this.shop.comments.length}件`;
    },
  },
  methods: {
    formatDay(day) {
      switch (day) {
        case 0:
          return "日曜日";
        case 1:
          return "月曜日";
        case 2:
          return "火曜日";
        case 3:
          return "水曜日";
        case 4:
          return "木曜日";
        case 5:
          return "金曜日";
        case 6:
          return "土曜日";
      }
    },
    formatTime(open, close) {
      return `${open.slice(0, 2)}:${open.slice(2)} - ${close.slice(
        0,
        2
      )}:${close.slice(2)}`;
    },
  },
};
</script>