<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <TheNav>
      <template #title> マイページ </template>
      <template #actions>
        <v-btn text to="/shops/new">
          <v-icon left>mdi-note-plus-outline</v-icon>
          <strong>新規登録</strong>
        </v-btn>
      </template>
    </TheNav>
    <v-main>
      <v-container>
        <v-row justify="center" class="mt-13">
          <v-col md="4" order-md="last">
            <UserProfile />
          </v-col>
          <v-col md="8" lg="7">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

