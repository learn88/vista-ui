<template>
  <v-form>
    <v-row>
      <v-col>
        <!-- <v-stepper non-linear> -->
        <v-stepper v-model="active.isActive" non-linear>
          <v-stepper-header>
            <v-stepper-step
              step="1"
              :editable="active.isActive < 2"
              :complete="active.isActive > 1"
              @click="activeStepper(1)"
            >အခြေခံ လိုအပ်ချက်</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="2"
              :editable="active.isActive < 3"
              :complete="active.isActive > 2"
              @click="activeStepper(2)"
            >Interview ရန် အသင့်</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="3"
              :editable="active.isActive < 4"
              :complete="active.isActive > 3"
              @click="activeStepper(3)"
            >အောင်</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="5"
              :editable="active.isActive < 5"
              :complete="active.isActive > 4"
              @click="activeStepper(4)"
            >လုပ်ငန်းခွင်၀င်ရောက်</v-stepper-step>

            <!-- <v-divider></v-divider>

            <v-stepper-step
              step="5"
              :editable="active.isActive < 5"
              :complete="active.isActive > 4"
              @click="activeStepper(4)"
            >Done</v-stepper-step>-->
          </v-stepper-header>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8">
        <v-row>
          <v-col cols="12" sm="6" md="4">
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

          <v-col cols="6" md="4">
            <v-text-field
              v-model="personDetail.noOfInterview"
              :label="labels.noOfInterview[lang]"
              outlined
              dense
              :hint="labels.times[lang]"
              type="Number"
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="4">
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
          <v-col cols="6" md="4">
            <v-text-field
              v-model="personDetail.height"
              :label="labels.height[lang]"
              outlined
              dense
              type="Number"
              hint="cm"
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="4">
            <v-text-field
              v-model="personDetail.weight"
              :label="labels.weight[lang]"
              outlined
              dense
              type="Number"
              hint="kg"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <span class="pl-3">{{ labels.costToJp[lang] }}</span>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="personDetail.self"
              :label="labels.self[lang]"
              append-icon="%"
              outlined
              dense
              type="Number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="personDetail.parents"
              :label="labels.parents[lang]"
              append-icon="%"
              outlined
              dense
              type="Number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="personDetail.relative"
              :label="labels.relative[lang]"
              append-icon="%"
              outlined
              dense
              type="Number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="personDetail.bank"
              :label="labels.bank[lang]"
              append-icon="%"
              outlined
              dense
              type="Number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="personDetail.other"
              :label="labels.other[lang]"
              append-icon="%"
              outlined
              dense
              type="Number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="personDetail.threeYearIncome.mm"
              :label="labels.threeYearIncome[lang]"
              outlined
              dense
              type="Number"
              :hint="labels.currency[lang]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="personDetail.howToUse.mm"
              rows="3"
              outlined
              :label="labels.howToUse[lang]"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="personDetail.remarks.mm"
              rows="3"
              outlined
              :label="labels.remarks[lang]"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="3" offset-md="1">
        <v-switch
          color="primary"
          v-model="personDetail.tattoo"
          :label="`${labels.tattoo[lang]} - ${personDetail.tattoo ? labels.yes[lang] : labels.no[lang]}` "
        ></v-switch>
        <v-switch
          color="primary"
          v-model="personDetail.smoke"
          :label="`${labels.smoke[lang]} - ${personDetail.smoke ? labels.dinkyes[lang] : labels.dinkno[lang]}` "
        ></v-switch>
        <v-switch
          color="primary"
          v-model="personDetail.alcohol"
          :label="`${labels.alcohol[lang]} - ${personDetail.alcohol ? labels.dinkyes[lang] : labels.dinkno[lang]}` "
        ></v-switch>
        <v-switch
          color="primary"
          v-model="personDetail.livingWithPeople"
          :label="`${labels.livingWithPeople[lang]} - ${personDetail.livingWithPeople ? labels.yes[lang] : labels.no[lang]}` "
        ></v-switch>
        <v-switch
          color="primary"
          v-model="personDetail.married"
          :label="`${labels.married[lang]} - ${personDetail.married ? labels.yes[lang] : labels.no[lang]}` "
        ></v-switch>
        <v-switch
          color="primary"
          v-model="personDetail.lover"
          :label="`${labels.lover[lang]} - ${personDetail.lover ? labels.yes[lang] : labels.no[lang]}` "
        ></v-switch>
        <v-switch
          color="primary"
          v-model="personDetail.wedding"
          :label="`${labels.wedding[lang]} - ${personDetail.wedding ? labels.yes[lang] : labels.no[lang]}` "
        ></v-switch>
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
  </v-form>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: ["personDetail", "active"],
  data: () => ({
    menu: false
  }),
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      appData: "app/getData",
      lang: "app/getLang"
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
    },
    activeStepper(val) {
      this.active.isActive = val;
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
