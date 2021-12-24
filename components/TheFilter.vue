<template>
  <v-navigation-drawer
    app
    :value="toggle"
    @input="$emit('update:toggle', $event)"
    class="light"
    right
    :permanent="permanent"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-icon size="24" color="grey">mdi-filter</v-icon>
          <span class="grey--text text--lighten-1 font-weight-light"
            >絞り込み</span
          >
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item>
        <v-autocomplete
          v-model="filterQuery.tags"
          :loading="loading"
          :items="tagsList"
          :search-input.sync="tagSearch"
          cache-items
          flat
          chips
          deletable-chips
          small-chips
          hide-selected
          hide-no-data
          multiple
          label="タグ"
          @change="tagsChange"
        ></v-autocomplete>
      </v-list-item>

      <v-list-item>
        <v-select
          v-model="filterQuery.budget"
          :items="budgets"
          :label="'予算'"
          item-value="value"
          clearable
          @change="changeQuery"
        ></v-select>
      </v-list-item>

      <v-list-item>
        <v-autocomplete
          v-model="filterQuery.users"
          :items="followees"
          color="blue-grey lighten-2"
          label="フォロー"
          item-text="name"
          item-value="name"
          multiple
          @change="changeQuery"
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
            >
              <v-avatar left>
                <v-img :src="data.item.avatar"></v-img>
              </v-avatar>
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="!data.item">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <img :src="data.item.avatar" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.group"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-list-item>

      <v-list-item>
        <v-btn
          dark
          block
          color="grey"
          depressed
          class="grey-darken-4-text mt-5"
          @click="clearFilter"
          >クリア</v-btn
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      required: true,
      default: false,
    },
    permanent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      filterToggle: false,
      tagsList: [],
      tagSearch: null,
      loading: false,
      budgets: [
        {
          text: "$ (1000-3000円)",
          value: 1,
        },
        {
          text: "$$ (5000-10000円)",
          value: 2,
        },
        {
          text: "$$$ (10000-20000円)",
          value: 3,
        },
        {
          text: "$$$$ (20000円以上)",
          value: 4,
        },
      ],
      followees: [
        {
          name: "Johnny",
          avatar: "avatar/avatar-3.jpg",
        },
        {
          name: "Max",
          avatar: "avatar/avatar-2.jpg",
        },
        {
          name: "Serina",
          avatar: "avatar/avatar-4.jpg",
        },
        {
          name: "Frank",
          avatar: "avatar/avatar.jpg",
        },
        {
          name: "Dan",
          avatar: "avatar/avatar-me.jpg",
        },
        {
          name: "Sara",
          avatar: "avatar/avatar-5.jpg",
        },
        {
          name: "Marcus",
          avatar: "avatar/avatar-7.jpg",
        },
      ],
      filterQuery: {},
    };
  },
  watch: {
    tagSearch(val) {
      val && val !== this.filterQuery.tags && this.tagsSelections(val);
    },
  },
  mounted() {
    this.filterQuery = _.cloneDeep(this.$store.getters["shop/filterQuery"]);
    if (this.filterQuery.tags) this.tagsList = this.filterQuery.tags;
  },
  computed: {
    filterdItems() {
      return this.$store.getters["shop/filterdItems"];
    },
  },
  methods: {
    changeQuery() {
      this.$store.commit("shop/setFilterQuery", this.filterQuery);
      if (this.filterdItems.length) {
        this.$store.commit("shop/setSelectedShop", this.filterdItems[0]);
        this.$store.commit("map/setCenter", this.filterdItems[0].position);
      } else {
        this.$store.commit("shop/setSelectedShop", null);
      }
    },
    clearFilter() {
      this.filterQuery = {
        tags: [],
        budget: null,
        users: [],
      };
      this.$store.commit("shop/setFilterQuery", this.filterQuery);
      this.$store.commit("shop/setSelectedShop", this.filterdItems[0]);
      this.$store.commit("map/setCenter", this.filterdItems[0].position);
    },
    tagsSelections(v) {
      this.loading = true;
      setTimeout(() => {
        const lists = this.$store.getters["shop/tagsSelections"];
        this.tagsList = lists.filter((e) => e.indexOf(v) > -1);
        this.loading = false;
      }, 500);
    },
    tagsChange() {
      this.tagSearch = "";
      this.changeQuery();
    },
  },
};
</script>

<style scoped>
.filter {
  position: absolute;
}
</style>

