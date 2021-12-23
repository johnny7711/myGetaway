<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <TheNav>
      <template #title>{{ shop.name }}</template>
      <template #actions="{ isWeb }">
        <template v-if="isWeb">
          <v-btn text v-if="!hasMyList" @click="onCheckList">
            <template v-if="isChecked">
              <v-icon left color="green">mdi-check-circle</v-icon>
              <strong>追加済み</strong>
            </template>
            <template v-else>
              <v-icon left>mdi-check-circle-outline</v-icon>
              <strong>チェックリストへ追加</strong>
            </template>
          </v-btn>

          <v-menu bottom left>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <span>もっと見る</span>
              </v-tooltip>
            </template>

            <v-list dense width="240">
              <template v-if="hasMyList">
                <v-list-item link @click="removeMyLists">
                  <v-list-item-icon>
                    <v-icon color="red">mdi-trash-can-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="red--text">
                      マイリストから削除
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link :to="$route.path + '/my-info'">
                  <v-list-item-icon>
                    <v-icon>mdi-application-edit-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>内容を更新する</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list-item link v-else :to="$route.path + '/my-info'">
                <v-list-item-icon>
                  <v-icon>mdi-star-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>マイリストへ追加</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="share">
                <v-list-item-icon>
                  <v-icon>mdi-share-variant-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>シェア</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-else>
          <v-btn icon v-if="!hasMyList" @click="onCheckList">
            <template v-if="isChecked">
              <v-icon color="green">mdi-check-circle</v-icon>
            </template>
            <template v-else>
              <v-icon>mdi-check-circle-outline</v-icon>
            </template>
          </v-btn>

          <v-bottom-sheet v-model="sheet">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-sheet>
              <v-list>
                <template v-if="hasMyList">
                  <v-list-item link @click="removeMyLists">
                    <v-list-item-icon>
                      <v-icon color="red">mdi-trash-can-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="red--text">
                        マイリストから削除
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider inset></v-divider>

                  <v-list-item link :to="$route.path + '/my-info'">
                    <v-list-item-icon>
                      <v-icon>mdi-application-edit-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>内容を更新する</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-list-item link v-else :to="$route.path + '/my-info'">
                  <v-list-item-icon>
                    <v-icon>mdi-star-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>マイリストへ追加</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
                <v-list-item link @click="share">
                  <v-list-item-icon>
                    <v-icon>mdi-share-variant-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>シェア</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-bottom-sheet>
        </template>
      </template>
    </TheNav>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sheet: false,
    };
  },
  computed: {
    shop() {
      return this.$store.getters["shop/getShopById"](this.$route.params.id);
    },
    isChecked() {
      return this.$store.getters["shop/isChecked"](this.$route.params.id);
    },
    hasMyList() {
      return this.$store.getters["shop/hasMyList"](this.$route.params.id);
    },
  },
  methods: {
    onCheckList() {
      this.isChecked
        ? this.$store.dispatch("shop/removeCheckLists", this.$route.params.id)
        : this.$store.dispatch("shop/addCheckLists", this.$route.params.id);
    },
    removeMyLists(){
      this.$store.dispatch("shop/removeMyLists", this.$route.params.id)
    },
    share() {
      if (navigator.share) {
        navigator
          .share({
            title: "お店をお友達やご家族とシェアしましょう",
            text: this.shop.name,
            url: this.shop.website,
          })
          .then(() => console.log("Success to share"))
          .catch((e) => console.log(e));
      }
    },
  },
};
</script>