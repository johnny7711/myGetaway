<template>
  <v-card class="mx-auto" max-width="1000" tile>
    <v-list two-line>
      <template v-for="(item, index) in data">
        <v-list-item :key="item.title" to="/">
          <v-list-item-avatar>
            <v-img src="/avatar/avatar-1.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>

            <v-list-item-subtitle v-text="item.headline"></v-list-item-subtitle>
          </v-list-item-content>

          <v-btn class="ma-2" dark depressed color="indigo" small @click.prevent="approve(index)">承認</v-btn>
          <v-btn class="ma-2" outlined small @click.prevent="decline(index)" >削除</v-btn>
        </v-list-item>
        <v-divider
          
          v-if="index < data.length - 1"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  layout: "list",
  data() {
    return {
      data: [
        {
          action: "15 min",
          headline: "Brunch this weekend?",
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Ali Connors",
          status: 2,
        },
        {
          action: "2 hr",
          headline: "Summer BBQ",
          subtitle: `Wish I could come, but I'm out of town this weekend.`,
          title: "me, Scrott, Jennifer",
          status: 1,
        },
        {
          action: "6 hr",
          headline: "Oui oui",
          subtitle: "Do you have Paris recommendations? Have you ever been?",
          title: "Sandra Adams",
          status: 1,
        },
        {
          action: "12 hr",
          headline: "Birthday gift",
          subtitle:
            "Have any ideas about what we should get Heidi for her birthday?",
          title: "Trevor Hansen",
          status: 0,
        },
        {
          action: "18hr",
          headline: "Recipe to try",
          subtitle:
            "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
          title: "Britta Holt",
          status: 1,
        },
      ],
    };
  },
  methods: {
    approve(i){
      this.data.splice(i,1)
    },
    decline(i){
      this.data.splice(i,1)
    }
  },
};
</script>