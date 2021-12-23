<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <TheNav />
    <v-main>
      <v-container>
        <v-layout justify-center>
          <Nuxt />
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>