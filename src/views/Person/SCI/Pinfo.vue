<template>
  <v-row align="end">
    <v-col cols="12" md="10">
      <v-row>
        <v-col md="4">
          <v-btn-toggle>
            <v-btn color="white" @click="$router.back()">
              <v-icon color="primary">mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-btn color="white">
              <v-icon color="primary">mdi-printer</v-icon>
            </v-btn>

            <v-btn color="white">
              <v-icon color="primary">mdi-pdf-box</v-icon>
            </v-btn>

            <v-btn color="white" @click="$router.push({ name: 'japan-form' })">
              <v-row align="center" class="flex-column" justify="center">
                <v-sheet tile height="20" width="26" color="grey lighten-3">
                  <v-icon class="cols 12" color="red">mdi-circle-medium</v-icon>
                </v-sheet>
              </v-row>
            </v-btn>

            <v-btn color="white" @click="$router.push({ name: 'resume-form'})">
              <v-icon color="primary">mdi-square-edit-outline</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col md="4">
          <h3 class="text-center">{{labels.title[lang]}}</h3>
        </v-col>
        <v-col md="4"></v-col>
      </v-row>
      <table class="table table-bordered" style="margin-bottom: 0">
        <tbody>
          <tr>
            <td class="table-active" width="12%">{{labels.name[lang]}}</td>
            <td width="35%" v-text="personInfo.name[lang]"></td>
            <td width="11%" class="table-active">{{labels.age[lang]}}</td>
            <td width="15%">{{age}} {{labels.year[lang]}}</td>
            <td width="10%" class="table-active">{{labels.dob[lang]}}</td>
            <td width="15%">{{ personInfo.dob | moment("YYYY - MM - DD")}}</td>
          </tr>
          <tr>
            <td class="table-active">{{labels.homeAddress[lang]}}</td>
            <td>{{personInfo.homeAddress[lang]}}</td>
            <td class="table-active">{{labels.gender[lang]}}</td>
            <td>
              <span v-text="personInfo.gender ? labels.male[lang] : labels.female[lang]"></span>
            </td>
            <td class="table-active">{{labels.religion[lang]}}</td>
            <td>{{personInfo.religion[lang]}}</td>
          </tr>
          <tr>
            <td class="table-active">{{labels.currentAddress[lang]}}</td>
            <td>{{personInfo.currentAddress[lang]}}</td>
            <td class="table-active">{{labels.blood[lang]}}</td>
            <td>{{personInfo.blood}}</td>
            <td class="table-active">{{labels.nation[lang]}}</td>
            <td>{{personInfo.nation[lang]}}</td>
          </tr>
        </tbody>
      </table>
    </v-col>
    <v-col cols="12" md="2">
      <v-avatar width="150" height="200" class="elevation-1" tile>
        <img :src="imageURL" :alt="personInfo.name[lang]" />
      </v-avatar>
      <!-- <img :src="imageURL" :alt="personInfo.name[lang]" /> -->
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["personInfo"],
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang",
      baseImageURL: "auth/getImageUrl"
    }),
    age() {
      if (this.personInfo.dob == "") {
        return 18;
      } else {
        const millis = Date.now() - Date.parse(this.personInfo.dob);
        return new Date(millis).getFullYear() - 1970;
      }
    },
    imageURL() {
      return this.baseImageURL + this.personInfo.profileImage;
    }
  }
};
</script>
