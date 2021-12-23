<template>
  <v-bottom-navigation app v-model="value">
    <v-btn value="recent" to="/">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn value="favorites" to="/checklists">
      <v-icon>mdi-playlist-check</v-icon>
    </v-btn>

    <v-btn value="nearby" to="/notifications">
      <v-badge dot overlap color="red">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-btn value="nearby" to="/users/0000">
      <v-avatar size="24">
        <img src="/avatar/avatar-me.jpg" alt="John" />
      </v-avatar>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
    };
  },
};
</script>

<style scoped>
.btnText {
  font-size: 5px;
}
</style>