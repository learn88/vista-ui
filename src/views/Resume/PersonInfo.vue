<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row>
      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model.trim="personInfo.name.mm"
              :label="labels.name[lang]"
              required
              outlined
              dense
              autofocus
              :counter="20"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-row style="margin-top: -12px">
              <v-col md="6">
                <v-autocomplete
                  v-model="personInfo.nrcSelect"
                  :loading="loading"
                  :items="nrcItems"
                  :search-input.sync="search"
                  cache-items
                  flat
                  :label="nrcSelectData"
                  outlined
                  dense
                ></v-autocomplete>
                <!-- <v-autocomplete
                        v-model="personInfo.nrcSelect"
                        :loading="loading"
                        :items="nrcItems"
                        :search-input.sync="search"
                        cache-items
                        outlined
                        hide-no-data
                        hide-details
                        label="ရွေးပါ"
                        dense
                        
                ></v-autocomplete>-->
              </v-col>
              <!-- <v-col cols="1" md="1">
                    <span class="v-text-field pt-5">/</span>
                    </v-col>
              <v-spacer></v-spacer>-->
              <v-col md="6">
                <v-text-field
                  v-model="personInfo.nrcNo"
                  :label="labels.nrc[lang]"
                  required
                  outlined
                  dense
                  type="Number"
                  counter="6"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="3" class="text-right">
        <v-radio-group v-model="personInfo.gender" row class="mt-3">
          <div class="pr-3">{{ labels.gender[lang] }}</div>
          <v-radio :label="labels.male[lang]" :value="true" color="primary"></v-radio>
          <v-radio :label="labels.female[lang]" :value="false" color="primary"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row style="margin-top: -40px">
      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12" md="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="dobDateFormatted"
                  clearable
                  :label="labels.dob[lang]"
                  readonly
                  outlined
                  dense
                  v-on="on"
                  @click:clear="fromDate = null"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="personInfo.dob"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="2" transition="slide-x-reverse-transition">
            <v-text-field
              v-model="age"
              :label="labels.age[lang]"
              type="Number"
              disabled
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              transition="slide-x-reverse-transition"
              v-model="personInfo.blood"
              :items="appData.bloods"
              :label="labels.blood[lang]"
              :item-text="lang"
              return-object
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="personInfo.religion.mm"
              :label="labels.religion[lang]"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="personInfo.nation.mm"
              :label="labels.nation[lang]"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="personInfo.email"
              :label="labels.email[lang]"
              required
              outlined
              dense
              :rules="emailRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model.trim="personInfo.phoneNo"
              :label="labels.phoneNo[lang]"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="personInfo.homeAddress.mm"
              rows="3"
              outlined
              :label="labels.homeAddress[lang]"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="personInfo.currentAddress.mm"
              rows="3"
              outlined
              :label="labels.currentAddress[lang]"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="3">
        <v-row style="padding-top: 12px" v-if="view.image">
          <v-spacer></v-spacer>
          <v-avatar width="73%" height="auto" class="img-thumbnail" left tile>
            <img :src="imageURL" alt="John" />
            <v-spacer></v-spacer>
            <button class="btn-img btn-img__danger image__close" @click="addImage">
              <v-icon dark color="red">mdi-close-circle</v-icon>
            </button>
          </v-avatar>
          <v-spacer></v-spacer>
        </v-row>
        <v-row style="padding-top: 12px" v-if="!view.image">
          <v-spacer></v-spacer>
          <v-image-input
            v-model.trim="personInfo.profileImage"
            :image-quality="0.85"
            clearable
            :imageHeight="200"
            :imageWidth="150"
            overlayBorderColor="fff"
            overlayBorderWidth="4px"
            overlayPadding="5px"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import VImageInput from "vuetify-image-input/a-la-carte";
import PersonService from "@/api/PersonService";

export default {
  props: ["personInfo", "view"],
  components: {
    VImageInput
  },
  data: () => ({
    valid: true,
    imageEdit: false,
    date: null,
    menu: false,
    loading: false,
    nrcItems: [],
    search: null,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 20) || "Name must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),
  watch: {
    search(val) {
      val && val !== this.personInfo.nrcSelect && this.querySelections(val);
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      appData: "app/getData",
      lang: "app/getLang",
      states: "app/getNrc",
      baseImageURL: "auth/getImageUrl",
      isShow: "resume/isShow"
    }),
    imageURL() {
      return this.baseImageURL + this.personInfo.profileImage;
    },
    age() {
      if (this.personInfo.dob == "") {
        return 18;
      } else {
        const millis = Date.now() - Date.parse(this.personInfo.dob);
        return new Date(millis).getFullYear() - 1970;
      }
    },
    dobDateFormatted() {
      return this.personInfo.dob
        ? moment(this.personInfo.dob).format("DD - MMM - YYYY")
        : "";
    },
    nrcSelectData() {
      if (this.personInfo.nrcSelect != null) {
        return this.personInfo.nrcSelect;
      } else {
        return "N R C";
      }
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    addImage() {
      this.view.image = false;
      this.personInfo.profileImage = "";
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.nrcItems = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    async submit() {
      try {
        this.personInfo.age = await this.age;
        await PersonService.post({
          personInfo: this.personInfo
        });
        // this.$router.back()
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.v-input .v-label {
  height: 25px;
  line-height: 17px;
}

.image__close {
  position: absolute;
  right: 15px;
  top: 15px;
}

.img-thumbnail {
  padding: 0.25rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  max-width: 100%;
  height: auto;
}
</style>
