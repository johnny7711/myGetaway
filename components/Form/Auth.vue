<template>
  <v-row>
    <v-card
      :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
      class="mx-auto fill-width mt-5"
      flat
      max-width="640"
    >
      <v-card-title class="text-center pa-8">
        <h4 class="fill-width">
          {{ title }}
        </h4>
      </v-card-title>
      <v-divider> </v-divider>
      <div class="px-6 py-8">
        <div style="max-width: 344px" class="mx-auto">
          <div>
            <slot name="auth-option"></slot>
          </div>

          <div class="pt-6">
            <div>
              <v-text-field
                v-model="email"
                :rules="[emailRules.required, emailRules.regex]"
                autofocus
                dense
                height="48px"
                outlined
                placeholder="メールアドレス"
              ></v-text-field>

              <v-text-field
                class="mb-1"
                v-model="password"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.regex]"
                :type="passwordShow ? 'text' : 'password'"
                hide-details="auto"
                dense
                height="48px"
                name="input-password"
                outlined
                placeholder="パスワード"
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
              <slot name="pw-option"></slot>
            </div>
            <div class="login-btn py-8">
              <v-btn
                class="fill-width caption"
                color="#FFCB00"
                depressed
                height="48px"
                tile
                @click="authClick"
              >
                {{ btnTitle }}
              </v-btn>
            </div>
            <v-divider></v-divider>
            <div class="pt-5 pb-4">
              <slot name="option"></slot>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    btnTitle: {
      type: String,
      required: true,
    },
    DefaultAuth: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      email: null,
      emailRules: {
        required: (value) => !!value || "メールアドレスは必須です",
        regex: (value) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) || "メールアドレスの形式が違います",
      },
      password: null,
      passwordShow: false,
      passwordRules: {
        required: (value) => !!value || "パスワードは必須です",
        regex: (value) =>
          /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,128}$/.test(value) ||
          "半角英小文字大文字数字をそれぞれ1種類以上含む7文字以上128文字以下で入力してください",
      },
    };
  },
  methods: {
    authClick() {
      this.DefaultAuth({ email: this.email, pw: this.password });
    },
  },
};
</script>

<style>
.fill-width {
  width: 100%;
}
.link-caption {
  text-decoration: none;
  color: #666 !important;
  font-size: 0.75rem;
}
.separator {
  margin-top: 30px;
  margin-bottom: 30px;
  height: 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #fff;
  position: relative;
}
.middle_separator {
  position: absolute;
  padding: 0 16px;
  color: #ccc;
  background: #fff;
  font-size: 11px;
  text-shadow: 0 1px 0 #fff;
  text-transform: uppercase;
  top: -7px;
  left: 30%;
}
.middle_separator {
  color: #777;
  font-size: 13px;
  top: -9px;
  left: 41%;
}
</style>