<template>
  <div>
    <v-card-title class="card-title" flat>{{ labels.familyStructure[lang] }}</v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col offset-md="1">
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="newFamily.name.mm"
                    :label="labels.name[lang]"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="newFamily.relation.mm"
                    :label="labels.relationships[lang]"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="newFamily.age"
                    :label="labels.age[lang]"
                    outlined
                    dense
                    type="Number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="newFamily.job.mm"
                    :label="labels.jobPosition[lang]"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="newFamily.monthlyIncome.mm"
                    :label="labels.monthlyIncome[lang]"
                    outlined
                    dense
                    type="Number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="newFamily.monthlyExpense.mm"
                    :label="labels.monthlyExpense[lang]"
                    outlined
                    dense
                    type="Number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="1">
                  <v-btn @click="addFamily" color="primary" fab small :disabled="disabled">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-container v-if="families != ''">
      <v-row style="margin-top: -50px;">
        <v-col offset-md="1">
          <template>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">{{ labels.name[lang] }}</th>
                    <th class="text-left">{{ labels.relationships[lang] }}</th>
                    <th class="text-left">{{ labels.age[lang] }}</th>
                    <th class="text-left">{{ labels.jobPosition[lang] }}</th>
                    <th class="text-left">{{ labels.monthlyIncome[lang] }}</th>
                    <th class="text-left">{{ labels.monthlyExpense[lang] }}</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in families" :key="index">
                    <td>{{ item.name.mm }}</td>
                    <td>{{ item.relation.mm }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.job.mm }}</td>
                    <td>{{ item.monthlyIncome.mm }}</td>
                    <td>{{ item.monthlyExpense.mm }}</td>
                    <td>
                      <v-icon @click="remove(index)">mdi-close-circle</v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["families"],
  data: () => ({
    newFamily: {
      name: {
        mm: "",
        jp: ""
      },
      relation: {
        mm: "",
        jp: ""
      },
      age: "",
      job: {
        mm: "",
        jp: ""
      },
      monthlyIncome: {
        mm: "",
        jp: ""
      },
      monthlyExpense: {
        mm: "",
        jp: ""
      }
    }
  }),
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang"
    }),
    disabled() {
      if (this.newFamily.name != "" && this.newFamily.relation != "") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    addFamily() {
      this.families.push({ ...this.newFamily });
      this.newFamily.name = {
        mm: "",
        jp: ""
      };
      this.newFamily.relation = {
        mm: "",
        jp: ""
      };
      this.newFamily.age = "";
      this.newFamily.job = {
        mm: "",
        jp: ""
      };
      this.newFamily.monthlyIncome = {
        mm: "",
        jp: ""
      };
      this.newFamily.monthlyExpense = {
        mm: "",
        jp: ""
      };
    },
    remove(index) {
      this.families.splice(index, 1);
    }
  }
};
</script>

<style lang="stylus">
.v-input .v-label {
  height: 25px;
  line-height: 17px;
}
</style>
