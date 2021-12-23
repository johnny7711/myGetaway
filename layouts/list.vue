<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <TheNav>
      <template #title> チェックリスト </template>
    </TheNav>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>