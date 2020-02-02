<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="250px">
      <template v-slot:activator="{ on }">
        <div>
          <v-fab-transition>
            <v-btn v-on="on" color="primary" dark absolute top right fab small>
              <v-icon>mdi-image-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </div>
>
        <!-- <div style="height: 100px;" position: relative></div> -->
      </template>
      <template>
        <v-card class="pt-5">
          <v-card-text>
            <v-row>
              <v-image-input
                v-model="newImage.name"
                clearable
                :imageHeight="212"
                :imageWidth="150"
                overlayPadding="15px"
                image-format="jpeg"
              />
            </v-row>
            <v-row>
              <v-textarea
                v-model="newImage.caption"
                outlined
                label="Caption"
                required
                clearable
                dense
              ></v-textarea>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
            <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
import VImageInput from "vuetify-image-input/a-la-carte";
export default {
  // props: ['images'],
  components: {
    VImageInput
  },
  data() {
    return {
      dialog: false,
      newImage: {
        name: "",
        caption: "",
        src: ""
      }
    };
  }
};
</script>

<style scoped>
.imageInput:hover {
  color: red;
  text-decoration: none;
  font-weight: none;
}
</style>