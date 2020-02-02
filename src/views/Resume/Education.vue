<template>
  <div>
    <v-card-title class="card-title" flat>{{ labels.educationBackground[lang] }}</v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row class="rowtop">
            <v-col cols="12" md="3">
              <v-text-field
                v-model="attendanceSchoolMM"
                :label="labels.attendanceSchool[lang]"
                required
                autofocus
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                v-model="education"
                :items="appData.education"
                :item-text="[lang]"
                return-object
                :label="labels.education[lang]"
                outlined
                dense
              ></v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                v-if="isCategorie"
                v-model="selectedEdu"
                :items="degrees(categories)"
                item-text="degree[mm]"
                return-object
                :label="labels.degree[lang]"
                outlined
                dense
              ></v-select>
              <v-text-field
                v-if="!isCategorie"
                v-model="degreeMM"
                :label="labels.degree[lang]"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                v-if="isCategorie"
                v-model="majorMM"
                :items="majors"
                :label="labels.major[lang]"
                outlined
                dense
              ></v-select>
              <v-text-field
                v-if="!isCategorie"
                v-model="majorMM"
                :label="labels.major[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="rowtop">
            <v-col cols="12" md="3">
              <v-select
                v-model="eduStatus"
                :items="appData.eduStatus"
                :item-text="lang"
                :label="labels.eduStatus[lang]"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="fromDateFormatted"
                    clearable
                    :label="labels.from[lang]"
                    readonly
                    outlined
                    dense
                    v-on="on"
                    @click:clear="eduFromDate = null"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="eduFromDate" @change="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="3">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                max-width="290"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="toDateFormatted"
                    clearable
                    :label="labels.to[lang]"
                    readonly
                    v-on="on"
                    outlined
                    dense
                    @click:clear="eduToDate = null"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="eduToDate" @change="menu1 = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                v-model="achievementLevel"
                :items="appData.achievementLevel"
                :item-text="lang"
                return-object
                :label="labels.achievementLevel[lang]"
                outlined
                dense
              >
                <template v-slot:append-outer>
                  <v-slide-x-reverse-transition mode="out-in">
                    <v-icon
                      v-if="!isClear"
                      color="success"
                      @click="createEdu"
                      v-text="'mdi-check-outline'"
                    ></v-icon>
                    <v-icon v-if="isClear" color="error" @click="clear" v-text="'mdi-window-close'"></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <!-- {{edus}} -->
          <v-row v-if="edus.length != 0">
            <table class="table table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">{{ labels.attendanceSchool[lang] }}</th>
                  <th scope="col">{{ labels.degree[lang] }}/ {{ labels.major[lang] }}</th>
                  <th scope="col">{{ labels.achievementLevel[lang] }}</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(edu, index) in edus" :key="index">
                  <td>
                    {{ edu.attendanceSchool[lang] }}
                    <br />
                    {{ edu.eduFromDate | moment("MMM - YYYY")}} ~ {{ edu.eduToDate | moment("MMM - YYYY")}} ({{period(edu.eduFromDate, edu.eduToDate)}})
                  </td>
                  <td class="text-left">
                    - {{ edu.education[lang] }}
                    <br />
                    - {{ edu.degree[lang] }} ({{edu.major[lang]}})
                  </td>
                  <td>{{ edu.eduStatus[lang]+ ' / '+edu.achievementLevel[lang] }}</td>
                  <td>
                    <v-icon @click="remove(index)">mdi-close-circle</v-icon>
                  </td>
                </tr>
              </tbody>
            </table>
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
  props: ["edus"],
  data: () => ({
    isClear: false,
    selectedEdu: "",
    menu1: false,
    menu2: false,
    majors: [],
    attendanceSchool: {
      mm: "",
      jp: ""
    },
    attendanceSchoolMM: "",
    degreeMM: "",
    degree: {
      mm: "",
      jp: ""
    },
    major: {
      mm: "",
      jp: ""
    },
    majorMM: "",
    education: "",
    eduStatus: "",
    eduFromDate: null,
    eduToDate: null,
    achievementLevel: ""
    // }
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    selectedEdu: function(val) {
      this.getMajor(val);
    }
    // edus(val) {
    //   if (val.length) {
    //     this.clear();
    //   }
    // }
  },
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      appData: "app/getData",
      categories: "resume/getCategories",
      lang: "app/getLang"
    }),
    isCategorie() {
      if (this.categories == "IT") {
        return true;
      }
      if (this.categories == "Engineer") {
        return true;
      } else {
        return false;
      }
    },
    toDateFormatted() {
      return this.eduToDate
        ? moment(this.eduToDate).format("DD - MMM - YYYY")
        : "";
    },
    fromDateFormatted() {
      return this.eduFromDate
        ? moment(this.eduFromDate).format("DD - MMM - YYYY")
        : "";
    }
  },
  methods: {
    async getMajor(val) {
      this.majors = await val.majors;
    },
    degrees(val) {
      return this.appData[val];
    },
    createEdu() {
      if (this.isCategorie) {
        this.degree = this.selectedEdu.degree;
        this.major.mm = this.majorMM;
      } else {
        this.degree.mm = this.degreeMM;
        this.major.mm = this.majorMM;
      }
      this.attendanceSchool.mm = this.attendanceSchoolMM;
      this.edus.push({
        attendanceSchool: this.attendanceSchool,
        education: this.education,
        degree: this.degree,
        major: this.major,
        eduStatus: this.eduStatus,
        eduToDate: this.eduToDate,
        eduFromDate: this.eduFromDate,
        achievementLevel: this.achievementLevel
      });
      this.selectedEdu = "";
      this.degreeMM = "";
      this.attendanceSchoolMM = "";
      this.education = "";
      this.degree = "";
      this.majorMM = "";
      this.eduStatus = "";
      this.eduToDate = null;
      this.eduFromDate = null;
      this.achievementLevel = "";
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    period(toDate, fromDate) {
      // var sdt = new Date('1972-11-30');
      var difdt = new Date(new Date(toDate) - new Date(fromDate));
      var myYear = difdt.toISOString().slice(0, 4) - 1970;
      var myMonth = difdt.getMonth() + 1;
      if (myYear != 0) {
        return myYear + "-years / " + myMonth + "-months";
      } else {
        return myMonth + "-months";
      }
    },
    remove(index) {
      this.edus.splice(index, 1);
      // this.$store.dispatch("person/spliceEdu", index);
    },
    clearEdu() {
      // this.$store.dispatch("person/setEdu", "");
      this.edus = [];
    },
    clear() {
      this.attendanceSchoolMM = "";
      this.attendanceSchool.jp = "";
      this.degree = "";
      this.majorMM = "";
      this.major.jp = "";
      this.eduStatus = "";
      this.eduDate = null;
      this.achievementLevel = "";
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
