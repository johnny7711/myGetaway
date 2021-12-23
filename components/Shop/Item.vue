<template>
  <v-card
    class="mx-auto"
    :elevation="+card"
    :key="shop.id"
    :to="`/shops/${shop.id}`"
    @click.native="onClick(shop)"
  >
    <v-carousel
      :show-arrows="isWeb"
      show-arrows-on-hover
      hide-delimiters
      height="200"
      v-model="photoIndex"
      :style="[card ? {} : { 'border-radius': '10px' }]"
    >
      <template v-slot:prev="{ on, attrs }">
        <v-btn icon small v-bind="attrs" @click="wrapPrev(on, $event)"
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
      </template>
      <template v-slot:next="{ on, attrs }">
        <v-btn icon small v-bind="attrs" @click="wrapNext(on, $event)"
          ><v-icon>mdi-chevron-right</v-icon></v-btn
        >
      </template>
      <v-carousel-item
        v-for="(n, i) of 9"
        :key="i"
        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-chip
          dark
          label
          small
          color="rgba(0,0,0,0.4)"
          style="position: absolute; bottom: 20px; right: 30px"
          >{{ photoCounter }}</v-chip
        >
        <v-btn
          v-if="btn && !hasMyList"
          icon
          text
          :color="isChecked ? 'light-green lighten-2' : 'white'"
          @click.stop.prevent="onCheckList"
          style="position: absolute; right: 10px; top: 10px"
        >
          <v-icon size="28">{{checkBtn}}</v-icon>
        </v-btn>
      </v-carousel-item>
    </v-carousel>
    <v-card-title :class="card ? 'pt-2' : 'pt-2 px-1'">
      <span class="text-h6 font-weight-light">{{ shop.name }}</span>
    </v-card-title>

    <v-card-subtitle :class="card ? 'pb-0' : 'pb-0 px-1'">{{
      "$".repeat(shop.budget)
    }}</v-card-subtitle>

    <v-card-text :class="card ? '' : 'px-1'">
      <v-chip x-small class="mx-1" v-for="tag in shop.tags" :key="tag">{{
        tag
      }}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  emits: ["onClick"],
  props: {
    shop: {
      type: Object,
      required: true,
    },
    addCheckIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    card: {
      type: Boolean,
      required: false,
      default: false,
    },
    onClick: {
      type: Function,
      required: false,
      default: () => 1,
    },
    btn: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      photoIndex: 0,
    };
  },
  computed: {
    photoCounter() {
      return `${this.photoIndex + 1} / 9`;
    },
    isChecked() {
      return this.$store.getters["shop/isChecked"](this.shop.id);
    },
    hasMyList(){
      return this.$store.getters["shop/hasMyList"](this.shop.id)
    },
    checkBtn(){
      return this.isChecked ? 'mdi-check-circle-outline' : 'mdi-check-circle'
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
    onCheckList() {
      this.isChecked
        ? this.$store.dispatch("shop/removeCheckLists", this.shop.id)
        : this.$store.dispatch("shop/addCheckLists", this.shop.id);
    },
    wrapNext({ click }, e) {
      e.preventDefault();
      click(e);
    },
    wrapPrev({ click }, e) {
      e.preventDefault();
      click(e);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>