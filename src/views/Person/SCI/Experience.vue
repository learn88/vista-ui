<template>
  <v-row v-if="jobs.lenght != 0">
    <v-col cols="12" md="12" class="pt-0">
      <span>{{ labels.workExperience[lang] }}</span>
      <!-- <v-spacer></v-spacer> -->
      <table class="table table-bordered" style="margin-bottom: 0">
        <tbody v-for="(job, index) in jobs" :key="index">
          <tr style="line-height: 0px" v-show="index == 0">
            <td width="15%" class="table-active">{{ labels.period[lang] }}</td>
            <td width="69%" colspan="5">{{ labels.experienceTitle[lang] }}</td>
            <td colspan="2" width="16%">{{ labels.monthlyAvgSalary[lang] }}</td>
          </tr>
          <tr>
            <!-- <tr v-for="(job, index) in jobs" :key="index+1"> -->
            <td>({{index+1}}) {{period(job.fromDate, job.toDate)}}</td>
            <td width="9%">{{ labels.companyName[lang] }}</td>
            <td>{{ job.name[lang] }}</td>
            <td width="12%" class="table-active">{{ labels.businessType[lang] }}</td>
            <td>{{ job.businessType[lang] }}</td>
            <td width="12%" class="table-active">{{ labels.businessDetail[lang] }}</td>
            <td colspan="2">{{ job.businessDetail[lang] }}</td>
          </tr>
          <tr>
            <td>{{job.fromDate | moment("YYYY - MM - DD")}} {{labels.from[lang]}}</td>
            <td colspan="2" class="table-active">{{ labels.jobPosition[lang] }}</td>
            <td colspan="2">{{ job.jobPosition[lang] }}</td>
            <td class="table-active">{{labels.avgSalary[lang]}}</td>
            <td class="text-right">{{ job.avgSalary[lang] }}</td>
            <td width="3%">{{labels.currency[lang]}}</td>
          </tr>
          <tr style="line-height: 0px">
            <td>~ {{job.toDate | moment("YYYY - MM - DD") }} {{labels.to[lang]}}</td>
            <td colspan="2">{{labels.description[lang]}}</td>
            <td colspan="2">{{job.description[lang]}}</td>
            <td class="table-active">{{labels.overtime[lang]}}</td>
            <td></td>
            <td>{{labels.currency[lang]}}</td>
          </tr>
        </tbody>
      </table>
    </v-col>
  </v-row>
</template>

<script>
// import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: ["jobs"],
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang"
    })
  },
  methods: {
    period(fromDate, toDate) {
      // var sdt = new Date('1972-11-30');
      var difdt = new Date(new Date(fromDate) - new Date(toDate));
      var myYear = difdt.toISOString().slice(0, 4) - 1970;
      var myMonth = difdt.getMonth() + 1;
      if (myYear != 0) {
        if (myYear == 1) {
          return myYear + "-year / " + myMonth + "-months";
        } else {
          return myYear + "-years / " + myMonth + "-months";
        }
      } else {
        return myMonth + "-months";
      }
    }
  }
};
</script>
