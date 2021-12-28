<template>
  <FormAuth title="ログイン" btn-title="ログイン" :default-auth="login">
    <template #pw-option>
      <nuxt-link to="/login">
        <span class="text-caption">パスワードをお忘れですか？</span>
      </nuxt-link>
    </template>
    <template #option>
      <p class="ma-2 text-center">
        <span>新規登録は</span>
        <nuxt-link to="/signup" style="text-decoration: none">こちら</nuxt-link>
      </p>
    </template>
  </FormAuth>
</template>

<script>
export default {
  layout: "auth",
  methods: {
    async login(credential) {
      await this.$store.dispatch("auth/login", credential);
      this.$router.push("/");
    },
  },
};
</script>