<template>
  <v-row v-if="personDetail.dateOfDecision != null">
    <v-col cols="12" md="12" class="pt-0">
      <table class="table table-bordered" style="margin-bottom: 0">
        <tbody>
          <tr>
            <td rowspan="2" class="table-active" width="10%">{{labels.dateOfDecision[lang]}}</td>
            <td rowspan="2" width="8%">
              {{ personDetail.dateOfDecision | moment("YYYY ") }}{{ labels.year[lang] }}
              <br />
              {{ personDetail.dateOfDecision | moment("MM ") }} {{ labels.month[lang] }}
            </td>
            <td rowspan="2" width="9%" class="table-active">{{labels.noOfInterview[lang]}}</td>
            <td rowspan="2" width="8%">{{ personDetail.noOfInterview }} - {{ labels.times[lang] }}</td>
            <td rowspan="2" width="7.5%" class="table-active">{{labels.leftOrRight[lang]}}</td>
            <td rowspan="2" width="7%">{{personDetail.leftOrRight[lang]}}</td>
            <td colspan="4" class="text-center table-active">{{ labels.vision[lang] }}</td>
            <td class="text-center table-active" width="10%">{{ labels.colorView[lang] }}</td>
            <td colspan="2" class="text-center table-active">{{ labels.handPower[lang] }}</td>
          </tr>
          <tr style="line-height: 0px">
            <td colspan="2" class="text-center table-active">{{ labels.nanGlasses[lang] }}</td>
            <td colspan="2" class="text-center table-active">{{ labels.glasses[lang] }}</td>
            <td class="text-center table-active">{{ labels.bothEye[lang] }}</td>
            <td class="text-center table-active">{{ labels.left[lang] }}</td>
            <td class="text-center table-active">{{ labels.right[lang] }}</td>
          </tr>
          <tr style="line-height:0px">
            <td rowspan="2" class="align-middle table-active">{{ labels.height[lang] }}</td>
            <td rowspan="2" class="align-middle">{{ personDetail.height }} - cm</td>
            <td rowspan="2" class="align-middle table-active">{{ labels.weight[lang] }}</td>
            <td rowspan="2" class="align-middle">{{ personDetail.weight }} - kg</td>
            <td rowspan="2" class="align-middle table-active">{{ labels.tattoo[lang] }}</td>
            <td
              rowspan="2"
              class="align-middle"
            >{{ personDetail.tattoo ? labels.yes[lang] : labels.no[lang] }}</td>
            <td class="table-active" width="8.5%">{{ labels.rightEye[lang] }}</td>
            <td>{{ personDetail.nanGlasses.right }}</td>
            <td class="table-active" width="8.5%">{{ labels.rightEye[lang] }}</td>
            <td>{{ personDetail.glasses.right }}</td>
            <td rowspan="2" class="text-center">
              <v-icon
                small
                class="pr-1"
                v-text="isColorViewA ? 'mdi-checkbox-marked-circle-outline' : 'mdi-circle-outline'"
              ></v-icon>-
              <v-icon small class="pr-1 pl-1">mdi-triangle-outline</v-icon>-
              <v-icon small>mdi-close</v-icon>
            </td>
            <td rowspan="2" class="text-right align-middle">kg</td>
            <td rowspan="2" class="text-right align-middle">kg</td>
          </tr>
          <tr style="line-height: 0px">
            <td class="table-active">{{ labels.leftEye[lang] }}</td>
            <td>{{ personDetail.nanGlasses.left }}</td>
            <td class="table-active">{{ labels.leftEye[lang] }}</td>
            <td>{{ personDetail.glasses.left }}</td>
          </tr>
          <tr>
            <td rowspan="2" class="table-active">{{labels.smoke[lang]}}</td>
            <td rowspan="2">{{personDetail.smoke ? labels.dinkyes[lang] : labels.dinkno[lang]}}</td>
            <td rowspan="2" class="table-active">{{labels.alcohol[lang]}}</td>
            <td rowspan="2">{{ personDetail.alcohol ? labels.dinkyes[lang] : labels.dinkno[lang] }}</td>
            <td rowspan="2" class="table-active">{{ labels.livingWithPeople[lang] }}</td>
            <td rowspan="2">{{ personDetail.livingWithPeople ? labels.yes[lang] : labels.no[lang] }}</td>
            <td rowspan="2" class="table-active">{{ labels.married[lang] }}</td>
            <td rowspan="2">{{ personDetail.married ? labels.yes[lang] : labels.no[lang] }}</td>
            <td rowspan="2" class="table-active">{{ labels.lover[lang] }}</td>
            <td rowspan="2">{{ personDetail.lover ? labels.yes[lang] : labels.no[lang] }}</td>
            <td rowspan="2" class="table-active">{{ labels.wedding[lang] }}</td>
            <td
              colspan="2"
              class="text-center"
              style="line-height: 0px;"
            >{{ personDetail.wedding ? labels.yes[lang] : labels.no[lang] }}</td>
          </tr>
          <tr style="line-height: 0px;">
            <td colspan="2" class="text-right">
              <span>{{labels.year[lang]}}</span>
              <span class="pl-10">{{labels.month[lang]}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="table-active">{{ labels.costToJp[lang] }}</td>
            <td class="table-active">{{labels.self[lang]}}</td>
            <td class="text-right">{{ personDetail.self }} %</td>
            <td class="table-active">{{labels.parents[lang]}}</td>
            <td class="text-right">{{ personDetail.parents }} %</td>
            <td class="table-active">{{labels.relative[lang]}}</td>
            <td class="text-right">{{ personDetail.relative }} %</td>
            <td class="table-active">{{labels.bank[lang]}}</td>
            <td class="text-right">{{ personDetail.bank }} %</td>
            <td class="table-active">{{labels.other[lang]}}</td>
            <td colspan="2" class="text-right">{{ personDetail.other }} %</td>
          </tr>
          <tr>
            <td colspan="3" class="table-active">{{ labels.threeYearIncome[lang] }}</td>
            <td colspan="2">{{ personDetail.threeYearIncome[lang] }} {{ labels.currency[lang] }}</td>
            <td colspan="3" class="table-active">{{ labels.howToUse[lang] }}</td>
            <td colspan="5">{{ personDetail.howToUse[lang] }}</td>
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
  props: ["personDetail"],
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang"
    }),
    isColorViewA() {
      if (this.personDetail.colorView == 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
