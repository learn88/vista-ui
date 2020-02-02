<template>
  <div>
    <v-row v-if="edus.lenght != 0">
      <v-col cols="12" md="12" class="pt-0">
        <span>{{ labels.educationBackground[lang] }}</span>
        <!-- <v-spacer></v-spacer> -->
        <table class="table table-bordered" style="margin-bottom: 0">
          <tbody>
            <tr v-for="(edu, index) in edus" :key="index">
              <td class="table-active" width="15%">{{ labels.attendanceSchool[lang] }}</td>
              <td>
                -
                <span>{{ edu.attendanceSchool[lang] }}</span>
                <br />-
                <span>{{ edu.education[lang] }}</span>
              </td>
              <td>
                - {{ edu.eduFromDate | moment("YYYY") }} {{labels.year[lang]}}
                {{ edu.eduFromDate | moment("MMM") }} {{labels.month[lang]}} {{ labels.from[lang]}}
                {{ edu.eduToDate | moment("YYYY") }} {{labels.year[lang]}}
                {{ edu.eduToDate | moment("MMM") }} {{labels.month[lang]}} {{ labels.to[lang]}}
                <br />
                {{ period(edu.eduFromDate, edu.eduToDate ) }}
                <br />
                - {{ edu.eduStatus[lang] }}
              </td>
              <td width="8%" class="table-active">{{ labels.major[lang] }}</td>
              <td width="15%">
                - {{edu.degree[lang]}}
                <br />
                - {{ edu.major[lang] }}
              </td>
              <td width="8%" class="table-active">{{ labels.achievementLevel[lang] }}</td>
              <td>{{ edu.achievementLevel[lang]}}</td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>{{edus}}</v-col>
    </v-row>-->
  </div>
</template>

<script>
// import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: ["edus"],
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang"
    })
  },
  methods: {
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
    }
  }
};
</script>
