<template>
  <v-list two-line>
    <template v-for="(item, index) in data">
      <v-list-item :key="item.title" to="/">
        <v-list-item-avatar>
          <v-img src="/avatar/avatar-1.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>

          <v-list-item-subtitle v-text="item.headline"></v-list-item-subtitle>

          <v-list-item-subtitle
            class="text--primary"
            v-text="item.subtitle"
          ></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action @click.prevent="openDialog(index, item)">
          <v-btn
            v-if="item.status === 1"
            class="ma-2"
            rounded
            outlined
            color="indigo"
            >フォロー中</v-btn
          >

          <v-btn v-else-if="item.status === 2" class="ma-2" rounded dark
            >フォロー許可待ち
          </v-btn>

          <v-btn class="ma-2" v-else dark depressed rounded color="indigo">
            フォロー
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider inset v-if="index < data.length - 1" :key="index"></v-divider>
    </template>
    <UserFollowDialog :dialog.sync="dialog" :item="confirmData" @confirm="confirmDialog" />
  </v-list>
</template>

<script>
export default {
  emits: ["onFollowBtn"],
  props: {
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "following",
    },
  },
  data() {
    return {
      dialog: false,
      confirmData: {},
    };
  },
  methods: {
    openDialog(i, item) {
      this.confirmData = {...item, index: i};
      if (!!item.status) {
        this.dialog = true;
      } else {
        this.$emit("onFollowBtn", i, this.type);
      }
    },
    confirmDialog() {
      this.$emit("onFollowBtn", this.confirmData.index, this.type);
    },
  },
};
</script>