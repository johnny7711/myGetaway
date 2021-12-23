<template>
  <v-dialog
    :value="dialog"
    @input="$emit('update:dialog', $event)"
    :retain-focus="false"
    max-width="300"
  >
    <v-card class="pa-4 pb-8">
      <template v-if="item.status === 1">
        <v-card-title class="text-h6">
          @{{ item.headline }} をフォロー解除しますか？
        </v-card-title>

        <v-card-text class="mb-4">
          もう一度フォローしたい場合は、再度フォローリクエストを送信する必要があります。
        </v-card-text>

        <v-btn dark rounded block depressed @click="confirm">
          フォロー解除
        </v-btn>
        <v-btn class="mt-4" outlined block rounded depressed @click="cancel">
          キャンセル
        </v-btn>
      </template>

      <template v-else>
        <v-card-title class="text-h6">
          @{{ item.headline }}へのフォローリクエストを取消しますか？
        </v-card-title>

        <v-card-text class="mb-4">
          プロフィールを表示することはできます。
        </v-card-text>

        <v-btn dark rounded block depressed @click="confirm">
          リクエスト取消
        </v-btn>
        <v-btn class="mt-4" outlined block rounded depressed @click="cancel">
          キャンセル
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  emits: ["confirm"],
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: false,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    cancel() {
      this.$emit("update:dialog", false);
    },
    confirm() {
      this.$emit("update:dialog", false);
      this.$emit("confirm");
    },
  },
};
</script>