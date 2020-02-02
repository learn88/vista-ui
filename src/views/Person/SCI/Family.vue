<template>
  <v-row v-if="families.length != 0">
    <v-col cols="12" md="12" class="pt-0">
      <span>{{ labels.familyStructure[lang] }}</span>
      <table class="table table-bordered" style="margin-bottom: 0">
        <tbody>
          <tr style="line-height: 0px" class="text-center">
            <td>{{labels.family[lang]}}</td>
            <td>{{labels.relationships[lang]}}</td>
            <td>{{labels.age[lang]}}</td>
            <td>{{ labels.jobs[lang] }}</td>
            <td colspan="2">{{ labels.monthlyIncome[lang] }}</td>
            <td colspan="2">{{ labels.monthlyExpense[lang] }}</td>
          </tr>
          <tr style="line-height: 0px" v-for="(family, index) in families" :key="index">
            <td>{{family.name[lang]}}</td>
            <td>{{family.relation[lang]}}</td>
            <td class="text-right pr-8">{{family.age}} &nbsp; {{labels.year[lang]}}</td>
            <td>{{family.job[lang]}}</td>
            <td class="text-right">{{family.monthlyIncome[lang]}}</td>
            <td width="5%">{{labels.currency[lang]}}</td>
            <td class="text-right">{{family.monthlyExpense[lang]}}</td>
            <td width="5%">{{labels.currency[lang]}}</td>
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
  props: ["families"],
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang"
    })
  }
};
</script>
