<template>
  <v-card class="pa-3 profile-fixed">
    <div class="d-flex grow flex-wrap">
      <v-avatar size="120" class="mx-auto avatar__img elevation-6">
        <v-img src="https://cdn.vuetifyjs.com/images/john.png" />
      </v-avatar>
    </div>
    <v-list two-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"
            >Masaaki Noritake</v-list-item-title
          >
          <v-list-item-subtitle>@heisenberg0011</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn small rounded outlined>編集</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-card-text class="text--primary mt-n5"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
      impedit provident veniam quaerat animi? Voluptate quis iste eligendi
      repudiandae ratione assumenda vel iure labore unde quasi, tempore non
      veniam explicabo?</v-card-text
    >
    <v-card-actions>
      <v-list-item class="grow">
        <v-row align="center">
          <nuxt-link
            :to="`/users/${$route.params.id}/follow?tab=0`"
            style="text-decoration: none; color: inherit"
          >
            <span class="subtitle-1 font-weight-medium">45</span>
            <span class="caption text-decoration-underline mr-5"
              >フォロワー</span
            >
          </nuxt-link>
          <nuxt-link
            :to="`/users/${$route.params.id}/follow?tab=1`"
            style="text-decoration: none; color: inherit"
          >
            <span class="subtitle-1 font-weight-medium">45</span>
            <span class="caption text-decoration-underline">フォロー中</span>
          </nuxt-link>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.avatar__img {
  position: relative;
  top: -64px;
  margin-bottom: -60px;
}
a {
  text-decoration: none;
  color: inherit;
}
span {
  vertical-align: middle;
}
.profile-fixed {
  position: sticky;
  top: 9rem;
}
</style>