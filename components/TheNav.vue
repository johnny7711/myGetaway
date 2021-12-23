<template>
  <div>
    <v-app-bar app color="white">
      <v-app-bar-nav-icon v-if="isWeb" to="/"></v-app-bar-nav-icon>
      <v-btn icon v-else @click="back">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-toolbar-title>
        <slot name="title"></slot>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      
      <slot name="actions" :isWeb="isWeb"></slot>
    </v-app-bar>
    <TheMenu :toggle.sync="menuToggle" :permanent="isWeb" />
    <TheBottom v-if="!isWeb" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuToggle: false,
    };
  },
  computed: {
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
    back() {
      return this.$router.go(-1);
    },
  },
};
</script>