<template>
  <div class="wrapper" :data-open="state === 'open' ? 1 : 0">
    <div
      ref="card"
      class="card"
      :data-state="isMove ? 'move' : state"
      :style="{ top: `${isMove ? y : calcY()}px` }"
    >
      <div class="pan-area" ref="pan">
        <div class="bar" ref="bar" :style="{ backgroundColor: barColor }"></div>
        <slot name="title">
          <h1 class="text-center mt-3">content</h1>
        </slot>
      </div>
      <div class="contents" ref="contents" @scroll="saveScrollPosition">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
if (process.browser) {
  require("hammerjs");
}

export default {
  emits: ["transformHeight"],
  props: {
    openY: {
      type: Number,
      default: 0.15,
    },
    halfY: {
      type: Number,
      default: 0.5,
    },
    closeY: {
      type: Number,
      default: 0.84,
    },
    barColor: {
      type: String,
      default: "rgba(0, 0, 0, .1)",
    },
  },
  data() {
    return {
      mc: null,
      y: 0,
      startY: 0,
      isMove: false,
      rect: {},
    };
  },
  computed: {
    state() {
      return this.$store.getters["swiper/toggle"];
    },
    selectedShop() {
      return this.$store.getters["shop/selectedShop"];
    },
  },
  mounted() {
    window.onresize = () => {
      this.rect = this.$refs.card.getBoundingClientRect();
    };
    this.rect = this.$refs.card.getBoundingClientRect();
    this.mc = new Hammer(this.$refs.pan);
    this.mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    this.mc.on("panup pandown", (evt) => {
      this.y = evt.center.y - 16;

      if (this.state == "half" && evt.deltaY > 10) {
        const height = 60 + evt.deltaY / 5;
        height > 100 ? null : this.$emit("transformHeight", height);
      }
      if (this.state == "close" && evt.deltaY < 0) {
        const height = 100 + evt.deltaY / 6;
        height < 60 ? null : this.$emit("transformHeight", height);
      }
      if (this.state == "open" && evt.deltaY > 300) {
        const height = 60 + (evt.deltaY - 300) / 5;
        height > 100 ? null : this.$emit("transformHeight", height);
      }
    });
    this.mc.on("panstart", (evt) => {
      this.startY = evt.center.y;
      this.isMove = true;
    });
    this.mc.on("panend", (evt) => {
      this.isMove = false;
      switch (this.state) {
        case "close":
        case "half":
          if (this.state == "close") {
            if (this.startY - evt.center.y > 120) {
              this.$store.commit("swiper/setToggle", "half");
            }
            if (this.startY - evt.center.y > 320) {
              this.$store.commit("swiper/setToggle", "open");
            }

            if (this.startY - evt.center.y < 120) {
              this.$emit("transformHeight", 100);
            }
            break;
          }
          if (this.startY - evt.center.y > 120) {
            this.$store.commit("swiper/setToggle", "open");
          }
          if (this.startY - evt.center.y < -50) {
            this.$store.commit("swiper/setToggle", "close");
            this.$emit("transformHeight", 100);
          }
          break;
        case "open":
          if (this.startY - evt.center.y < -120) {
            this.$store.commit("swiper/setToggle", "half");
            this.$emit("transformHeight", 60);
          }
          if (this.startY - evt.center.y < -270) {
            this.$store.commit("swiper/setToggle", "close");
            this.$emit("transformHeight", 100);
          }
          break;
      }
    });

    setTimeout(() => {
      this.$refs.contents.scrollTop =
        this.$store.getters["swiper/scrollPosition"];
    });
  },
  beforeDestroy() {
    this.mc.destroy();
    window.onresize = null;
  },
  methods: {
    calcY() {
      switch (this.state) {
        case "close":
          return this.rect.height * this.closeY;
        case "open":
          return this.rect.height * this.openY;
        case "half":
          return this.rect.height * this.halfY;
        default:
          return this.y;
      }
    },
    setState(state) {
      this.$store.commit("swiper/setToggle", state);
    },
    saveScrollPosition() {
      this.$store.commit(
        "swiper/setScrollPosition",
        this.$refs.contents.scrollTop
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper[data-open="1"] {
  position: fixed;
  top: 0;
  left: 0;
}
.wrapper[data-open="1"] .bg {
  display: block;
  transition: all 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.card {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: white;
  border-radius: 25px 25px 0 0;
  box-shadow: 0 -3px 4px rgba(0, 0, 0, 0.1);
  left: 0;
  padding-bottom: 100px
}
.card[data-state="half"],
.card[data-state="open"],
.card[data-state="close"] {
  transition: top 0.3s ease-out;
}
.card[data-state="close"] {
  box-shadow: none;
}
.bar {
  width: 40px;
  height: 4px;
  border-radius: 14px;
  margin: 0 auto;
  cursor: pointer;
}
.pan-area {
  top: 0;
  right: 0;
  left: 0;
  padding: 15px 0;
  .bar {
    &:hover {
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }
  }
}
// Moved the pan area above the card content to be ale to swipe from closed state to half/open
.card[data-state="close"] .pan-area {
  top: -28px;
}
.contents {
  position: relative;
  overflow-y: scroll;
  max-height: 100%;
  padding-bottom: calc(100vh * 0.2);
  box-sizing: border-box;
}
</style>