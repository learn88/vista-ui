<template>
  <div>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="other.advantages.mm"
                rows="1"
                outlined
                name="input-7-4"
                :label="labels.advantages[lang]"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="other.disadvantage.mm"
                rows="1"
                outlined
                :label="labels.disadvantage[lang]"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="12" class="mt-20">
              <v-textarea
                v-model="other.personality.mm"
                rows="1"
                outlined
                :label="labels.personality[lang]"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="12" class="mt-20">
              <v-textarea
                v-model="other.happyTime.mm"
                rows="1"
                outlined
                :label="labels.happyTime[lang]"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="12" class="mt-20">
              <v-textarea
                v-model="other.difficultTime.mm"
                rows="1"
                outlined
                :label="labels.difficultTime[lang]"
              ></v-textarea>
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
  props: ["other"],
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang"
    })
  }
};
</script>

<style lang="stylus">
.v-input .v-label {
  height: 25px;
  line-height: 17px;
}

.mt-20 {
  margin-top: -20px;
}
</style>
