<template>
  <div class="image__preview" v-if="image" :image="image">
    <img :src="image" class="image__preview" />
    <button class="btn-img btn-img__danger image__close" @click="close">&times;</button>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from "vuex";
// import { imgUrl } from "@/api/imageApi";
export default {
  props: {
    imageData: {
      image: null
    },
    preview: {
      type: [String, File],
      default: null
    }
  },
  data() {
    return {
      image: null
      // imageData: null
    };
  },
  created() {
    this.setPreview();
  },
  watch: {
    preview: "setPreview"
  },
  computed: {
    ...mapGetters({
      imgUrl: "auth/getImageUrl"
    })
  },
  methods: {
    setPreview() {
      if (this.preview instanceof File) {
        const fileReader = new FileReader();
        fileReader.onload = event => {
          this.image = event.target.result;
          this.imageData.image = event.target.result;
        };
        fileReader.readAsDataURL(this.preview);
      } else if (typeof this.preview === "string") {
        // this.image = `/images/${this.preview}`
        // this.image = imgUrl + this.forderPath + this.preview;
        this.image = this.imgUrl + this.preview;
      } else {
        this.image = null;
      }
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.image__preview {
  position: relative;
  /* height: 125px; */
  width: 100%;
}
.image__close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>