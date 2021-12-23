<template>
  <v-card class="pa-3" width="1064" flat>
    <div class="d-flex grow flex-wrap">
      <v-badge
        class="mx-auto avatar__img"
        color="rgba(0,0,0,0)"
        bottom
        overlap
        left
        offset-x="45"
        offset-y="45"
      >
      <template v-slot:badge>
        <v-avatar color="black" size="40">
          <v-icon size="24" dark> mdi-camera-outline </v-icon>
        </v-avatar>
      </template>
        <v-avatar size="120">
          <v-img src="https://cdn.vuetifyjs.com/images/john.png" />
        </v-avatar>
      </v-badge>
    </div>
    <v-list two-line class="mt-3">
      <v-text-field label="名"></v-text-field>
      <v-text-field label="姓"></v-text-field>
      <v-text-field label="電話番号"></v-text-field>
      <v-text-field label="メールアドレス"></v-text-field>
      <v-textarea outlined label="自己紹介"></v-textarea>
    </v-list>
  </v-card>
</template>

<script>
export default {
  layout: "page",
};
</script>