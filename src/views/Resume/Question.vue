<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-radio-group v-model="questions.n4CanYouWin" row style="margin-top: -1px">
        <div class="pr-3">{{ labels.canPassN4[lang] }}</div>
        <v-radio label="Yes" :value="true" color="primary"></v-radio>
        <v-radio label="No" :value="false" color="primary"></v-radio>
      </v-radio-group>
      <v-radio-group v-model="questions.tiredness" row style="margin-top: -1px">
        <div class="pr-3">{{ labels.tiredness[lang] }}</div>
        <v-radio label="Yes" :value="true" color="primary"></v-radio>
        <v-radio label="No" :value="false" color="primary"></v-radio>
      </v-radio-group>
      <v-radio-group v-model="questions.weakness" row style="margin-top: -1px">
        <div class="pr-3">{{ labels.weakness[lang] }}</div>
        <v-radio label="Yes" :value="true" color="primary"></v-radio>
        <v-radio label="No" :value="false" color="primary"></v-radio>
      </v-radio-group>
      <v-radio-group v-model="questions.surgeries" row style="margin-top: -1px">
        <div class="pr-3">{{ labels.surgeries[lang] }}</div>
        <v-radio label="Yes" :value="true" color="primary"></v-radio>
        <v-radio label="No" :value="false" color="primary"></v-radio>
      </v-radio-group>
      <!-- </v-col>
      <v-col cols="12" md="6">-->
      <v-radio-group v-model="questions.noOvertime" row style="margin-top: -1px">
        <div class="pr-3">{{ labels.noOvertime[lang] }}</div>
        <v-radio label="Yes" :value="true" color="primary"></v-radio>
        <v-radio label="No" :value="false" color="primary"></v-radio>
      </v-radio-group>
      <v-radio-group v-model="questions.familySurgeries" row style="margin-top: -1px">
        <div class="pr-3">{{ labels.familySurgeries[lang] }}</div>
        <v-radio label="Yes" :value="true" color="primary"></v-radio>
        <v-radio label="No" :value="false" color="primary"></v-radio>
      </v-radio-group>
      <v-radio-group v-model="questions.workIsFast" row style="margin-top: -1px">
        <div class="pr-3">{{ labels.workIsFast[lang] }}</div>
        <v-radio label="Yes" :value="true" color="primary"></v-radio>
        <v-radio label="No" :value="false" color="primary"></v-radio>
      </v-radio-group>
      <v-radio-group v-model="questions.bodybuilding" row style="margin-top: -1px">
        <div class="pr-3">{{ labels.bodybuilding[lang] }}</div>
        <v-radio label="Yes" :value="true" color="primary"></v-radio>
        <v-radio label="No" :value="false" color="primary"></v-radio>
      </v-radio-group>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["questions", "view"],
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang",
      isShow: "resume/isShow"
    })
  }
};
</script>

<style lang="stylus" scoped>
.v-input .v-label {
  height: 25px;
  line-height: 17px;
}
</style>
