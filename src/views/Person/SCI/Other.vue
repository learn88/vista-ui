<template>
  <v-row v-if="other.length != 0">
    <v-col cols="12" md="12" class="pt-0">
      <table class="table table-bordered" style="margin-bottom: 0">
        <tbody>
          <tr>
            <td width="15%" class="table-active">{{labels.advantages[lang]}}</td>
            <td width="38%">{{other.advantages[lang]}}</td>
            <td width="8%" class="table-active">{{labels.disadvantage[lang]}}</td>
            <td>{{other.disadvantage[lang]}}</td>
          </tr>
          <tr>
            <td class="table-active">{{labels.personality[lang]}}</td>
            <td colspan="3">{{other.personality[lang]}}</td>
          </tr>
          <tr>
            <td class="table-active">{{labels.happyTime[lang]}}</td>
            <td colspan="3">{{other.happyTime[lang]}}</td>
          </tr>
          <tr>
            <td class="table-active">{{labels.difficultTime[lang]}}</td>
            <td colspan="3">{{other.difficultTime[lang]}}</td>
          </tr>
        </tbody>
      </table>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["other"],
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang"
    })
  }
};
</script>