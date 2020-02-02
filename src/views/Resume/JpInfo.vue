<template>
  <div>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                v-model="jpInfo.familyInJapan.yesno"
                :items="appData.yesno"
                :label="labels.familyInJapan[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <transition name="fade" mode="out-in">
              <v-col cols="12" md="2" v-if="jpInfo.familyInJapan.yesno.name == 'yes'">
                <v-text-field
                  v-model="jpInfo.familyInJapan.number"
                  :label="labels.number[lang]"
                  outlined
                  dense
                  type="Number"
                ></v-text-field>
              </v-col>
            </transition>
            <transition name="fade" mode="out-in">
              <v-col cols="12" md="4" v-if="jpInfo.familyInJapan.yesno.name == 'yes'">
                <v-text-field
                  v-model="jpInfo.familyInJapan.address.mm"
                  :label="labels.liveIn[lang]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </transition>
            <transition name="fade" mode="out-in">
              <v-col cols="12" md="3" v-if="jpInfo.familyInJapan.yesno.name == 'yes'">
                <v-text-field
                  v-model="jpInfo.familyInJapan.visaType"
                  :label="labels.visaType[lang]"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </transition>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                v-model="jpInfo.overseas.yesno"
                :items="appData.yesno"
                :label="labels.overseasTravelling[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <transition name="fade" mode="out-in">
              <v-col cols="12" md="9" v-if="jpInfo.overseas.yesno.name == 'yes'">
                <v-text-field
                  v-model="jpInfo.overseas.countries.mm"
                  :label="labels.countries[lang]"
                  outlined
                  dense
                  type="String"
                ></v-text-field>
              </v-col>
            </transition>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                v-model="jpInfo.passport.yesno"
                :items="appData.yesno"
                :label="labels.passport[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <transition name="fade" mode="out-in">
              <v-col cols="12" md="3" v-if="jpInfo.passport.yesno.name == 'yes'">
                <v-text-field
                  v-model="jpInfo.passport.passportNo"
                  :label="labels.passportNo[lang]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </transition>
            <transition name="fade" mode="out-in">
              <v-col cols="12" md="3" v-if="jpInfo.passport.yesno.name == 'yes'">
                <v-menu
                  v-model="expirationDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="expirationDateFormatted"
                      clearable
                      :label="labels.expirationDate[lang]"
                      readonly
                      outlined
                      dense
                      v-on="on"
                      @click:clear="jpInfo.passport.expirationDate = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="jpInfo.passport.expirationDate"
                    @change="expirationDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </transition>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                v-model="jpLanguageLevel"
                :items="appData.jpLanguageLevel"
                :label="labels.jpLanguageLevel[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <transition name="fade" mode="out-in">
              <v-col cols="12" md="3" v-if="jpLanguageLevel != ''">
                <v-select
                  v-model="certificate"
                  :items="appData.certificate"
                  :label="labels.certificate[lang]"
                  :item-text="lang"
                  return-object
                  outlined
                  dense
                ></v-select>
              </v-col>
            </transition>
            <transition name="fade" mode="out-in">
              <v-col cols="12" md="3" v-if="jpLanguageLevel != ''">
                <v-menu
                  v-model="teachingPeriodMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="teachingPeriodFormatted"
                      clearable
                      :label="labels.teachingPeriod[lang]"
                      readonly
                      outlined
                      dense
                      v-on="on"
                      @click:clear="teachingPeriod = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="teachingPeriod" @change="teachingPeriodMenu = false"></v-date-picker>
                </v-menu>
              </v-col>
            </transition>
            <transition name="fade" mode="out-in">
              <v-col cols="12" md="3" v-if="jpLanguageLevel != ''">
                <v-select
                  v-model="training"
                  :items="appData.training"
                  :label="labels.class[lang]"
                  :item-text="lang"
                  return-object
                  outlined
                  dense
                >
                  <template v-slot:append-outer>
                    <v-slide-x-reverse-transition mode="out-in">
                      <v-icon color="success" @click="pushJpLevel" v-text="'mdi-check-outline'"></v-icon>
                    </v-slide-x-reverse-transition>
                  </template>
                </v-select>
              </v-col>
            </transition>
          </v-row>
          <v-row v-if="jpInfo.jpLevels != ''">
            <table class="table table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col" width="20%">{{ labels.jpLanguageLevel[lang] }}</th>
                  <th scope="col" width="20%">{{ labels.certificate[lang] }}</th>
                  <th scope="col" width="30%">{{ labels.teachingPeriod[lang] }}</th>
                  <th scope="col" width="20%">{{ labels.class[lang] }}</th>
                  <th scope="col" width="20%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(jpLevel, index) in jpInfo.jpLevels" :key="index">
                  <td scope="row">{{ jpLevel.jpLanguageLevel }}</td>
                  <td>{{ jpLevel.certificate[lang] }}</td>
                  <td>{{ jpLevel.teachingPeriod | moment("DD - MMM - YYYY") }}</td>
                  <td>{{ jpLevel.training[lang] }}</td>
                  <td>
                    <v-icon @click="remove(index)">mdi-close-circle</v-icon>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                v-model="jpInfo.otherLanguages.yesno"
                :items="appData.yesno"
                :label="labels.otherLanguages[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <transition name="fade" mode="out-in">
              <v-col cols="12" md="4" v-if="jpInfo.otherLanguages.yesno.name == 'yes'">
                <v-text-field
                  v-model="jpInfo.otherLanguages.languages.mm"
                  :label="labels.otherLanguages[lang]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </transition>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: ["jpInfo"],
  data: () => ({
    // isJpLevel: false,
    expirationDateMenu: false,
    teachingPeriodMenu: false,
    jpLanguageLevel: "",
    teachingPeriod: "",
    certificate: "",
    training: ""
  }),
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      appData: "app/getData",
      lang: "app/getLang",
      isShow: "resume/isShow"
    }),
    expirationDateFormatted() {
      return this.jpInfo.passport.expirationDate
        ? moment(this.jpInfo.passport.expirationDate).format("DD - MMM - YYYY")
        : "";
    },
    teachingPeriodFormatted() {
      return this.teachingPeriod
        ? moment(this.teachingPeriod).format("DD - MMM - YYYY")
        : "";
    }
  },
  methods: {
    // addJpLevel() {
    //   this.isJpLevel = true;
    // },
    async pushJpLevel() {
      await this.jpInfo.jpLevels.push({
        jpLanguageLevel: this.jpLanguageLevel,
        certificate: this.certificate,
        teachingPeriod: this.teachingPeriod,
        training: this.training
      });
      // this.isJpLevel = false;
      this.jpLanguageLevel = "";
      this.certificate = "";
      this.teachingPeriod = "";
      this.training = "";
    },
    remove(index) {
      this.jpInfo.jpLevels.splice(index, 1);
    }
  }
};
</script>

<style lang="stylus">
.v-input .v-label {
  height: 25px;
  line-height: 17px;
}
</style>
