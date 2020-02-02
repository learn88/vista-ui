<template>
  <div>
    <v-card-text>
      <v-form>
        <v-container>
          >
          <v-row>
            <v-col cols="12" sm="6" md="2">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                max-width="290"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="dateOfDecisionFormated"
                    clearable
                    :label="labels.dateOfDecision[lang]"
                    readonly
                    v-on="on"
                    outlined
                    dense
                    @click:clear="personDetail.dateOfDecision = null"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="personDetail.dateOfDecision" @change="menu = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6" md="2">
              <v-text-field
                v-model="personDetail.noOfInterview"
                :label="labels.noOfInterview[lang]"
                outlined
                dense
                :hint="labels.times[lang]"
                type="Number"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="2">
              <v-select
                v-model="personDetail.leftOrRight"
                :items="appData.leftOrRight"
                :label="labels.leftOrRight[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="6" md="2">
              <v-text-field
                v-model="personDetail.height"
                :label="labels.height[lang]"
                outlined
                dense
                type="Number"
                hint="cm"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="2">
              <v-text-field
                v-model="personDetail.weight"
                :label="labels.weight[lang]"
                outlined
                dense
                type="Number"
                hint="kg"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-switch
                align="center"
                v-model="personDetail.tattoo"
                :label="`${labels.tattoo[lang]} - ${personDetail.tattoo ? labels.yes[lang] : labels.no[lang]}` "
              ></v-switch>
            </v-col>
          </v-row>
          <v-row class="rowtop">
            <v-col cols="6" md="2">
              <v-select
                v-model="personDetail.smoke"
                :items="appData.drink"
                :label="labels.smoke[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="6" md="2">
              <v-select
                v-model="personDetail.alcohol"
                :items="appData.drink"
                :label="labels.alcohol[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="personDetail.livingWithPeople"
                :items="appData.yesno"
                :label="labels.livingWithPeople[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="personDetail.married"
                :items="appData.yesno"
                :label="labels.married[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="personDetail.lover"
                :items="appData.yesno"
                :label="labels.lover[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="personDetail.wedding"
                :items="appData.yesno"
                :label="labels.wedding[lang]"
                :item-text="lang"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="rowtop">
            <v-col cols="12" md="2" class="text-right" style="padding-top: 20px; font-size:1.2em">
              <span>{{ labels.costToJp[lang] }}</span>
            </v-col>
            <v-col cols="6" md="2">
              <v-text-field
                v-model="personDetail.self"
                :label="labels.self[lang]"
                append-icon="%"
                outlined
                dense
                type="Number"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="2">
              <v-text-field
                v-model="personDetail.parents"
                :label="labels.parents[lang]"
                append-icon="%"
                outlined
                dense
                type="Number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="personDetail.relative"
                :label="labels.relative[lang]"
                append-icon="%"
                outlined
                dense
                type="Number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="personDetail.bank"
                :label="labels.bank[lang]"
                append-icon="%"
                outlined
                dense
                type="Number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="personDetail.other"
                :label="labels.other[lang]"
                append-icon="%"
                outlined
                dense
                type="Number"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="rowtop">
            <v-col cols="6" md="4">
              <v-text-field
                v-model="personDetail.threeYearIncome.mm"
                :label="labels.threeYearIncome[lang]"
                outlined
                dense
                type="Number"
                :hint="labels.currency[lang]"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="4">
              <v-textarea
                v-model="personDetail.howToUse.mm"
                rows="3"
                outlined
                :label="labels.howToUse[lang]"
              ></v-textarea>
            </v-col>
            <v-col cols="6" md="4">
              <v-textarea
                v-model="personDetail.remarks.mm"
                rows="3"
                outlined
                :label="labels.remarks[lang]"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <table class="table table-bordered text-center">
                <thead>
                  <tr>
                    <th scope="col" colspan="4">{{ labels.vision[lang] }}</th>
                    <th scope="col" width="20%">{{ labels.colorView[lang] }}</th>
                    <th scope="col" width="40%" colspan="2">{{ labels.handPower[lang] }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row" colspan="2">{{ labels.nanGlasses[lang] }}</td>
                    <td colspan="2">{{ labels.glasses[lang] }}</td>
                    <td>{{ labels.bothEye[lang] }}</td>
                    <td>{{ labels.left[lang] }}</td>
                    <td>{{ labels.right[lang] }}</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <v-text-field
                        v-model="personDetail.nanGlasses.right"
                        :label="labels.rightEye[lang]"
                        outlined
                        dense
                        type="Number"
                      ></v-text-field>
                    </td>
                    <td colspan="2">
                      <v-text-field
                        v-model="personDetail.glasses.right"
                        :label="labels.rightEye[lang]"
                        outlined
                        dense
                        type="Number"
                      ></v-text-field>
                    </td>
                    <td rowspan="2">
                      <v-btn-toggle v-model="personDetail.colorView" mandatory dense>
                        <v-btn value="1">
                          <v-icon>mdi-circle-outline</v-icon>
                        </v-btn>
                        <v-btn value="2">
                          <v-icon>mdi-triangle-outline</v-icon>
                        </v-btn>
                        <v-btn value="3">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </td>
                    <td rowspan="2">
                      <v-text-field
                        v-model="personDetail.handPower.left"
                        append-icon="kg"
                        outlined
                        dense
                        type="Number"
                      ></v-text-field>
                    </td>
                    <td rowspan="2">
                      <v-text-field
                        v-model="personDetail.handPower.right"
                        append-icon="kg"
                        outlined
                        dense
                        type="Number"
                      ></v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <v-text-field
                        v-model="personDetail.nanGlasses.left"
                        :label="labels.leftEye[lang]"
                        outlined
                        dense
                        type="Number"
                      ></v-text-field>
                    </td>
                    <!-- <td>{{ labels.leftEye[lang] }}</td> -->
                    <td colspan="2">
                      <v-text-field
                        v-model="personDetail.glasses.left"
                        :label="labels.leftEye[lang]"
                        outlined
                        dense
                        type="Number"
                      ></v-text-field>
                      <!-- <v-checkbox class="checkbuttom" v-model="personDetail.glasses.left"></v-checkbox> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: ["personDetail"],
  data: () => ({
    menu: false
  }),
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      appData: "app/getData",
      lang: "app/getLang",
      isShow: "resume/isShow"
    }),
    dateOfDecisionFormated() {
      return this.personDetail.dateOfDecision
        ? moment(this.personDetail.dateOfDecision).format("DD - MMM - YYYY")
        : "";
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    }
  }
};
</script>

<style lang="stylus">
.v-input .v-label {
  height: 25px;
  line-height: 17px;
}

.checkbuttom {
  margin: 0;
  padding: 0;
  max-height: 25px;
}
</style>
