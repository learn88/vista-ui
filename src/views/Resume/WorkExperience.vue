<template>
  <div>
    <v-card-title class="card-title" flat>{{ labels.workExperience[lang] }}</v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="newJob.name.mm"
                :label="labels.companyName[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="newJob.businessType.mm"
                :label="labels.businessType[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="newJob.businessDetail.mm"
                :label="labels.businessDetail[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="newJob.jobPosition.mm"
                :label="labels.jobPosition[lang]"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="newJob.avgSalary.mm"
                :label="labels.avgSalary[lang]"
                required
                outlined
                dense
                type="Number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="newJob.description.mm"
                :label="labels.description[lang]"
                required
                outlined
                dense
              ></v-text-field>
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
                    :label="labels.from[lang]"
                    readonly
                    v-on="on"
                    outlined
                    dense
                    @click:clear="toDate = null"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="newJob.toDate" @change="menu1 = false"></v-date-picker>
              </v-menu>
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
                    :label="labels.to[lang]"
                    readonly
                    outlined
                    dense
                    v-on="on"
                    @click:clear="fromDate = null"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="newJob.fromDate" @change="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-right">
              <v-btn @click="addJob" color="primary" fab small :disabled="disabled">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-container v-if="jobs != ''">
      <v-row style="margin-top: -50px;">
        <v-col offset-md="1">
          <template>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">{{ labels.companyName[lang] }}</th>
                    <th class="text-left">{{ labels.jobPosition[lang] }}</th>
                    <th class="text-left">{{ labels.avgSalary[lang] }}</th>
                    <th class="text-left">{{ labels.from[lang] }}</th>
                    <th class="text-left">{{ labels.to[lang] }}</th>
                    <th class="text-left">{{ labels.period[lang] }}</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(job, index) in jobs" :key="index">
                    <td>{{ job.name[lang] }}</td>
                    <td>{{ job.jobPosition[lang] }}</td>
                    <td>{{ job.avgSalary[lang] }}</td>
                    <td>{{ job.toDate | moment("DD - MMM - YYYY") }}</td>
                    <td>{{ job.fromDate | moment("DD - MMM - YYYY") }}</td>
                    <td>{{ job.period }}</td>
                    <td>
                      <v-icon @click="remove(index)">mdi-close-circle</v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: ["jobs"],
  data: () => ({
    newJob: {
      name: {
        mm: "",
        jp: ""
      },
      businessType: {
        mm: "",
        jp: ""
      },
      businessDetail: {
        mm: "",
        jp: ""
      },
      jobPosition: {
        mm: "",
        jp: ""
      },
      avgSalary: {
        mm: "",
        jp: ""
      },
      description: {
        mm: "",
        jp: ""
      },
      toDate: "",
      fromDate: "",
      period: {
        mm: "",
        jp: ""
      }
    },
    //   date: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false
  }),
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang"
    }),
    disabled() {
      if (
        this.newJob.name != "" &&
        this.newJob.jobPosition != "" &&
        this.newJob.fromDate != "" &&
        this.newJob.toDate != ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    period() {
      // var sdt = new Date('1972-11-30');
      var difdt = new Date(
        new Date(this.newJob.fromDate) - new Date(this.newJob.toDate)
      );
      var myYear = difdt.toISOString().slice(0, 4) - 1970;
      var myMonth = difdt.getMonth() + 1;
      if (myYear != 0) {
        return myYear + "-years / " + myMonth + "-months";
      } else {
        return myMonth + "-months";
      }
    },
    toDateFormatted() {
      return this.newJob.toDate
        ? moment(this.newJob.toDate).format("DD - MMM - YYYY")
        : "";
    },
    fromDateFormatted() {
      return this.newJob.fromDate
        ? moment(this.newJob.fromDate).format("DD - MMM - YYYY")
        : "";
    }
  },
  methods: {
    addJob() {
      this.newJob.period = this.period;
      this.jobs.push({ ...this.newJob });
      this.newJob.name = {
        mm: "",
        jp: ""
      };
      this.newJob.businessType = {
        mm: "",
        jp: ""
      };
      this.newJob.businessDetail = {
        mm: "",
        jp: ""
      };
      this.newJob.jobPosition = {
        mm: "",
        jp: ""
      };
      this.newJob.avgSalary = {
        mm: "",
        jp: ""
      };
      this.newJob.description = {
        mm: "",
        jp: ""
      };
      this.newJob.toDate = "";
      this.newJob.fromDate = "";
      this.newJob.period = {
        mm: "",
        jp: ""
      };
    },
    remove(index) {
      this.jobs.splice(index, 1);
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
