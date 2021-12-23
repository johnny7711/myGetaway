<template>
  <v-dialog
    :value="dialog"
    @input="$emit('update:dialog', $event)"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar flat>
        <v-btn icon @click="$emit('update:dialog', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-container :style="width">
        <v-row dense>
          <v-col cols="12" align="center">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              src="https://picsum.photos/id/11/500/300"
              aspect-ratio="2"
            ></v-img>
          </v-col>
          <v-col cols="6" align="center">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-col>
          <v-col cols="6" align="center">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-col>
          <v-col cols="12" align="center">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              src="https://picsum.photos/id/11/500/300"
              aspect-ratio="2"
            ></v-img>
          </v-col>
          <v-col cols="6" align="center">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-col>
          <v-col cols="6" align="center">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
        case "xl":
          return { width: "50%" };
        default:
          return { width: "100%" };
      }
    },
  },
};
</script>
    