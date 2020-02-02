<template>
  <div>
    <v-row>
      <v-col v-for="item in images" :key="item.caption" cols="12" sm="6" md="3" lg="2">
        <v-card>
          <!-- <v-img :src="item.src" max-height="300" contain> -->
          <v-img src="../../assets/profile1.jpg" contain>
            <!-- <v-icon
              dark
              color="grey"
              class="image__view"
              @click="previewImage(item)"
            >mdi-arrow-expand-all</v-icon>-->
          </v-img>
          <v-divider></v-divider>
          <v-card-title class="subheading font-weight-bold">
            {{
            item.caption
            }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row style="padding-top: 12px; heigth: 300px">
      <v-col cols="12" md="9">
        <v-image-input
          v-model="galleryImage.name"
          :image-quality="0.85"
          imageMinScaling="cover"
          clearable
          :imageHeight="336.8"
          :imageWidth="238"
          overlayBorderColor="fff"
          overlayPadding="5px"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-textarea
          v-model="galleryImage.caption"
          outlined
          label="Caption"
          required
          clearable
          dense
        ></v-textarea>
        <v-btn color="primary">Add IMAGE</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="preview" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ viewImage.caption }}</span>
          <v-spacer></v-spacer>
          <v-icon @click="preview = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-img src="../../assets/profile1.jpg" contain></v-img>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- <v-row justify="center">
      
    </v-row>-->
  </div>
</template>
<script>
import VImageInput from "vuetify-image-input/a-la-carte";
// import PersonService from "@/api/PersonService";
import { mapGetters } from "vuex";
// import ImageUpload from "./ImageUpload";
export default {
  props: ["images", "galleryImage"],
  data: () => ({
    preview: false,
    // images: [],
    viewImage: {
      name: "",
      caption: "",
      src: ""
    }
  }),
  computed: {
    ...mapGetters({
      editPerson: "resume/getPerson",
      baseImageURL: "auth/getImageUrl"
    })
  },
  components: {
    VImageInput
    // Lingallery,
    // ImageUpload
  },
  methods: {
    previewImage(val) {
      this.viewImage = val;
      this.preview = true;
    }
  }
};
</script>

<style scoped>
.image__view {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>
