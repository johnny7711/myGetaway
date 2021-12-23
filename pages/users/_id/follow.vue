<template>
  <section>
    <v-tabs centered fixed-tabs v-model="tab">
      <v-tab>フォロワー</v-tab>
      <v-tab>フォロー中</v-tab>
    </v-tabs>
    <v-divider></v-divider>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <UserFollow
          :data="followers"
          type="followers"
          @onFollowBtn="followBtnHandler"
        ></UserFollow>
      </v-tab-item>

      <v-tab-item>
        <UserFollow
          :data="following"
          @onFollowBtn="followBtnHandler"
        ></UserFollow>
      </v-tab-item>
    </v-tabs-items>
  </section>
</template>
<script>
export default {
  layout: "user",
  beforeRouteUpdate(to, _, next) {
    this.tab = parseInt(to.query.tab);
    next();
  },
  async asyncData({ query }) {
    const tab = !!query.tab ? parseInt(query.tab) : null;
    return { tab };
  },
  data() {
    return {
      following: [
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
      followers: [
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
    followBtnHandler(i, type) {
      if (type === "following") {
        if (!!this.following[i].status) {
          this.following[i].status = 0;
        } else {
          this.following[i].status = 2;
        }
      } else {
        if (!!this.followers[i].status) {
          this.followers[i].status = 0;
        } else {
          this.followers[i].status = 2;
        }
      }
    },
  },
};
</script>