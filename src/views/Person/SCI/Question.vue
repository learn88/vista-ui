<template>
  <v-row>
    <v-col cols="12" md="12" class="pt-0">
      <table class="table table-bordered" style="margin-bottom: 0">
        <tbody>
          <tr>
            <td class="pt-1 pb-1 table-active" colspan="2">{{labels.survey[lang]}}</td>
            <td class="pt-1 pb-1" width="4%">Yes</td>
            <td class="pt-1 pb-1" width="5%"></td>
            <td class="pt-1 pb-1" width="4%">No</td>
            <td class="pt-1 pb-1" width="5%"></td>
            <td class="pt-1 pb-1 pl-0 pr-0" width="5px"></td>
            <td class="pt-1 pb-1 table-active" colspan="6">
              <v-icon small color="success" class="pr-3">mdi-check-outline</v-icon>
              {{labels.checkWithSelect[lang]}}
            </td>
          </tr>
          <tr>
            <td width="4%" class="pt-1 pb-1 text-center">1</td>
            <td class="pt-1 pb-1">{{labels.canPassN4[lang]}}</td>
            <td class="pt-1 pb-1 text-center">Yes</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="questions.n4CanYouWin" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 text-center">No</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="!questions.n4CanYouWin" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 pr-0 pl-0 table-active"></td>
            <td class="pt-1 pb-1 text-center">5</td>
            <td class="pt-1 pb-1">{{labels.noOvertime[lang]}}</td>
            <td class="pt-1 pb-1 text-center">Yes</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="questions.noOvertime" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 text-center">No</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="!questions.noOvertime" small color="success">mdi-check-outline</v-icon>
            </td>
          </tr>
          <tr>
            <td class="pt-1 pb-1 text-center">2</td>
            <td class="pt-1 pb-1">{{labels.tiredness[lang]}}</td>
            <td class="pt-1 pb-1 text-center">Yes</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="questions.tiredness" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 text-center">No</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="!questions.tiredness" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 pr-0 pl-0 table-active"></td>
            <td class="pt-1 pb-1 text-center">6</td>
            <td class="pt-1 pb-1">{{labels.familySurgeries[lang]}}</td>
            <td class="pt-1 pb-1 text-center">Yes</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="questions.familySurgeries" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 text-center">No</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="!questions.familySurgeries" small color="success">mdi-check-outline</v-icon>
            </td>
          </tr>
          <tr>
            <td class="pt-1 pb-1 text-center">3</td>
            <td class="pt-1 pb-1">{{labels.weakness[lang]}}</td>
            <td class="pt-1 pb-1 text-center">Yes</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="questions.weakness" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 text-center">No</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="!questions.weakness" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 pr-0 pl-0 table-active"></td>
            <td class="pt-1 pb-1 text-center">7</td>
            <td class="pt-1 pb-1">{{labels.workIsFast[lang]}}</td>
            <td class="pt-1 pb-1 text-center">Yes</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="questions.workIsFast" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 text-center">No</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="!questions.workIsFast" small color="success">mdi-check-outline</v-icon>
            </td>
          </tr>
          <tr>
            <td class="pt-1 pb-1 text-center">3</td>
            <td class="pt-1 pb-1">{{labels.surgeries[lang]}}</td>
            <td class="pt-1 pb-1 text-center">Yes</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="questions.surgeries" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 text-center">No</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="!questions.surgeries" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 pr-0 pl-0 table-active"></td>
            <td class="pt-1 pb-1 text-center">7</td>
            <td class="pt-1 pb-1">{{labels.bodybuilding[lang]}}</td>
            <td class="pt-1 pb-1 text-center">Yes</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="questions.bodybuilding" small color="success">mdi-check-outline</v-icon>
            </td>
            <td class="pt-1 pb-1 text-center">No</td>
            <td class="pt-1 pb-1 text-center">
              <v-icon v-if="!questions.bodybuilding" small color="success">mdi-check-outline</v-icon>
            </td>
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
  props: ["questions"],
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang"
    })
  }
};
</script>
