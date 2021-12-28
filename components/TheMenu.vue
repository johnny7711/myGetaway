<template>
  <v-navigation-drawer
    app
    :value="toggle"
    @input="$emit('update:toggle', $event)"
    class="light"
    left
    :permanent="permanent"
  >
    <v-list nav>
      <v-list-item class="ma-3" to="/users/0000">
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6">John Leider</v-list-item-title>
          <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="(item, i) in main"
        :key="item.text"
        link
        :to="item.to"
      >
        <v-list-item-icon>
          <v-badge v-if="item.icon == 'mdi-bell'" color="green" content="6">
            <v-icon v-text="item.icon"></v-icon>
          </v-badge>
          <v-icon v-else v-text="item.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mt-8"></v-divider>

      <v-list-item v-for="(item, i) in others" :key="item.text" link>
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn dark block color="pink" @click="logout"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      required: true,
      default: false,
    },
    permanent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      main: [
        {
          text: "チェックリスト",
          icon: "mdi-playlist-check",
          to: "/checklists",
        },
        {
          text: "通知",
          icon: "mdi-bell",
          to: "/notifications",
        },
      ],
      others: [
        { text: "友達を招待する", icon: "mdi-account-check", to: "/" },
        { text: "アプリについて", icon: "mdi-information", to: "/" },
      ],
    };
  },
  methods:{
    logout(){
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push('/login')
      });
    }
  }
};
</script>