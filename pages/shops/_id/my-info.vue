<template>
  <v-card flat width="1064">
    <v-card-text class="pb-3">
      <p class="text-overline">基本情報</p>
      <section class="mx-5">
        <p class="text-h5 text--primary mb-0">{{ shop.name }}</p>
        <p>{{ shop.address }}</p>
      </section>

      <v-divider class="my-4"></v-divider>
      <p class="text-overline">写真</p>
      <section class="mx-5">
        <v-slide-group multiple class="my-1" v-if="previewPhotos.length > 0">
          <v-slide-item
            v-for="(photo, i) in previewPhotos"
            :key="i"
            :class="[photo.new ? 'pa-3' : 'pa-3 grey lighten-3']"
          >
            <v-card class="ma-1" outlined>
              <v-badge color="rgba(0,0,0,0)" offset-y="-0.5" offset-x="10">
                <v-btn
                  slot="badge"
                  fab
                  height="20"
                  width="20"
                  @click="removeFile(i, photo)"
                  dark
                  color="grey lighten-1"
                  depressed
                >
                  <v-icon size="12">mdi-close-thick</v-icon>
                </v-btn>
                <v-img
                  :src="photo.src"
                  contain
                  height="100"
                  width="100"
                ></v-img>
              </v-badge>
            </v-card>
          </v-slide-item>
        </v-slide-group>
        <p v-else>あなたの写真はアップロードされていません。</p>
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
          class="mt-4 text--none"
          rounded
          depressed
          :disabled="dt && dt.files.length > max_uploaded"
          @click="onAddImage"
        >
          <v-icon left>mdi-cloud-upload</v-icon>写真をアップロード
        </v-btn>
      </section>

      <v-divider class="my-4"></v-divider>
      <p class="text-overline">タグ</p>

      <section class="mx-5">
        <v-combobox
          class="my-5"
          :loading="loading"
          v-model="tags"
          :items="tagsList"
          :search-input.sync="tagSearch"
          hide-selected
          dense
          hint="最大5つ"
          label="タグ"
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
                  <kbd>enter</kbd>入力で新規作成する。
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </section>

      <v-divider class="my-4"></v-divider>
      <p class="text-overline">コメント</p>

      <section class="mx-5">
        <v-textarea
          filled
          counter
          :rules="rules"
          v-model="comment"
        ></v-textarea>
      </section>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" outlined class="px-10" @click="cancel">
        キャンセル
      </v-btn>

      <v-btn color="primary" depressed class="px-10" @click="submit">
        <template v-if="hasMyList">
          <v-icon left> mdi-pencil </v-icon>
          更新する
        </template>
        <template v-else>
          <v-icon left> mdi-star-plus </v-icon>
          追加する
        </template>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: "page",
  async asyncData({ store, params }) {
    const shop = store.getters["shop/getShopById"](params.id);
    const previewPhotos = shop.photos.filter((p) => p.createdBy == "Johnny");
    const tags = [...shop.tags];
    const tagsList = [...shop.tags];
    const comment = shop.comments.find((c) => c.name === "Johnny") ?? {
      comment: "",
    };

    return { shop, previewPhotos, tags, tagsList, comment: comment.comment };
  },
  data() {
    return {
      dt: null,
      max_uploaded: 10,
      tagSearch: null,
      rules: [(v) => v.length <= 100 || "最大100文字"],
      loading: false,
      newTags: [],
    };
  },
  watch: {
    tagSearch(val) {
      val && val !== this.tags && this.tagsSelections(val);
    },
  },
  computed: {
    hasMyList() {
      return this.$store.getters["shop/hasMyList"](this.shop.id);
    },
  },
  methods: {
    onAddImage() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      // 上限アップロード数
      if (e.target.files.length + this.shop.photos.length > this.max_uploaded)
        return;

      if (this.dt) {
        // 上限アップロード数
        if (
          this.dt.files.length +
            e.target.files.length +
            this.shop.photos.length >
          this.max_uploaded
        )
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
        this.previewPhotos.push({
          _id: new Date().toISOString(),
          src: e.target.result,
          createdBy: "Johnny",
          new: true,
        });
      };
      reader.readAsDataURL(file);
    },
    removeFile(index, photo) {
      photo.new ? this.dt.items.remove(index) : console.log(photo._id);

      this.previewPhotos.splice(index, 1);
    },
    cancel() {
      return this.$router.go(-1);
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
    },
    submit() {
      if (this.hasMyList) {
      } else {
        this.$store.commit("shop/addMyLists", this.shop);
        this.$store.dispatch("shop/removeCheckLists", this.shop.id);
        this.$router.replace("/");
      }
    },
  },
};
</script>