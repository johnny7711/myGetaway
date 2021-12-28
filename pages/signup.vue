<template>
  <FormAuth
    title="会員登録"
    btn-title="会員登録"
    :default-auth="signupWithEmail"
  >
    <template #auth-option>
      <v-btn
        class="fill-width text-capitalize caption"
        height="48px"
        outlined
        style="border-color: #979797"
        tile
        @click="singupWithGoogle"
      >
        <img
          class="button-logo-img mr-4"
          src="https://madeby.google.com/static/images/google_g_logo.svg"
          style="height: 24px"
        />
        Googleで登録
      </v-btn>
      <v-btn
        class="fill-width mt-5 text-capitalize caption"
        color="#385184"
        dark
        depressed
        height="48px"
        tile
      >
        <img
          class="button-logo-img mr-4"
          src="~/static/f_logo_RGB-White_1024.png"
          style="height: 24px"
        />
        Facebookで登録
      </v-btn>

      <div class="separator separator_login_page">
        <div class="middle_separator">または</div>
      </div>
    </template>

    <template #option>
      <nuxt-link to="/login">
        <p class="ma-2 text-center">すでにアカウントをお持ちですか？</p>
      </nuxt-link>
    </template>
  </FormAuth>
</template>

<script>
export default {
  layout: "auth",
  methods: {
    async signupWithEmail(credential) {
      await this.$store.dispatch("auth/signupWithEmail", credential)
      this.$router.push("/");
    },
    singupWithGoogle() {
      this.$store.dispatch("auth/singupWithGoogle");
    },
  },
};
</script>