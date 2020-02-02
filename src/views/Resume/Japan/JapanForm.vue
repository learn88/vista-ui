<template>
  <div>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model.trim="personInfo.name.mm"
                :label="labels.name[lang]"
                required
                dense
                :counter="20"
                :rules="nameRules"
                disabled
              ></v-text-field>

              <v-text-field
                v-model.trim="personInfo.name.jp"
                :label="labels.name[lang]"
                required
                outlined
                dense
                :counter="20"
                :rules="nameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="personInfo.religion.mm"
                :label="labels.religion[lang]"
                required
                dense
                disabled
              ></v-text-field>
              <v-text-field
                v-model="personInfo.religion.jp"
                :label="labels.religion[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="personInfo.nation.mm"
                :label="labels.nation[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="personInfo.nation.jp"
                :label="labels.nation[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-textarea
                v-model="personInfo.homeAddress.mm"
                rows="3"
                :label="labels.homeAddress[lang]"
                disabled
              ></v-textarea>
              <v-textarea
                v-model="personInfo.homeAddress.jp"
                rows="3"
                outlined
                :label="labels.homeAddress[lang]"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="4">
              <v-textarea
                v-model="personInfo.currentAddress.mm"
                rows="3"
                :label="labels.currentAddress[lang]"
                disabled
              ></v-textarea>
              <v-textarea
                v-model="personInfo.currentAddress.jp"
                rows="3"
                outlined
                :label="labels.currentAddress[lang]"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row v-for="edu in edus" :key="edu._id">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="edu.attendanceSchool.mm"
                :label="labels.attendanceSchool[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="edu.attendanceSchool.jp"
                :label="labels.attendanceSchool[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="edu.degree.mm"
                :label="labels.degree[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="edu.degree.jp"
                :label="labels.degree[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="edu.major.mm"
                :label="labels.major[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="edu.major.jp"
                :label="labels.major[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row v-for="job in jobs" :key="job._id">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="job.name.mm"
                :label="labels.companyName[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="job.name.jp"
                :label="labels.companyName[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="job.businessType.mm"
                :label="labels.businessType[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="job.businessType.jp"
                :label="labels.businessType[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="job.businessDetail.mm"
                :label="labels.businessDetail[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="job.businessDetail.jp"
                :label="labels.businessDetail[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="job.jobPosition.mm"
                :label="labels.jobPosition[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="job.jobPosition.jp"
                :label="labels.jobPosition[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="job.avgSalary.mm"
                :label="labels.avgSalary[lang]"
                required
                dense
                disabled
                hi
              ></v-text-field>

              <v-text-field
                v-model="job.avgSalary.jp"
                :label="labels.avgSalary[lang]"
                :hint="labels.currency[lang]"
                type="Number"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="job.description.mm"
                :label="labels.description[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="job.description.jp"
                :label="labels.description[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row v-for="family in families" :key="family._id">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="family.name.mm"
                :label="labels.name[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="family.name.jp"
                :label="labels.name[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="family.relation.mm"
                :label="labels.relationships[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="family.relation.jp"
                :label="labels.relationships[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="family.job.mm"
                :label="labels.jobPosition[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="family.job.jp"
                :label="labels.jobPosition[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="family.monthlyIncome.mm"
                :label="labels.monthlyIncome[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="family.monthlyIncome.jp"
                :label="labels.monthlyIncome[lang]"
                required
                outlined
                dense
                :hint="labels.currency[lang]"
                type="Number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="family.monthlyExpense.mm"
                :label="labels.monthlyExpense[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="family.monthlyExpense.jp"
                :label="labels.monthlyExpense[lang]"
                :hint="labels.currency[lang]"
                required
                outlined
                dense
                type="Number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="other.advantages.mm"
                :label="labels.advantages[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="other.advantages.jp"
                :label="labels.advantages[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="other.disadvantage.mm"
                :label="labels.disadvantage[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="other.disadvantage.jp"
                :label="labels.disadvantage[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="other.personality.mm"
                :label="labels.personality[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="other.personality.jp"
                :label="labels.personality[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="other.happyTime.mm"
                :label="labels.happyTime[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="other.happyTime.jp"
                :label="labels.happyTime[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="other.difficultTime.mm"
                :label="labels.difficultTime[lang]"
                required
                dense
                disabled
              ></v-text-field>

              <v-text-field
                v-model="other.difficultTime.jp"
                :label="labels.difficultTime[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["personInfo", "edus", "jobs", "families", "other"],
  data: () => ({
    name: "Form",
    valid: true,
    search: null,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 20) || "Name must be less than 10 characters"
    ]
  }),
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      appData: "app/getData",
      lang: "app/getLang",
      states: "app/getNrc"
    })
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
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
</style>
