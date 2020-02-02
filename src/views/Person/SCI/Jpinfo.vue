<template>
  <v-row>
    <v-col cols="12" md="12" class="pt-0">
      <!-- <v-spacer></v-spacer> -->
      <table class="table table-bordered" style="margin-bottom: 0">
        <tbody>
          <tr>
            <td colspan="2" width="12%" class="table-active">{{labels.familyInJapan[lang]}}</td>
            <td width="5%">{{ jpInfo.familyInJapan.yesno[lang] }}</td>
            <td width="6%" class="table-active">{{labels.ifFromJp[lang]}}</td>
            <td width="3%" class="table-active">{{labels.number[lang]}}</td>
            <td width="5%">{{ jpInfo.familyInJapan.number }}</td>
            <td width="15%" class="table-active">{{labels.liveIn[lang]}}</td>
            <td colspan="4" width="32%">{{ jpInfo.familyInJapan.address[lang] }}</td>
            <td width="8%" class="table-active">{{labels.visaType[lang]}}</td>
            <td width="10%">{{ jpInfo.familyInJapan.visaType }}</td>
          </tr>
          <tr>
            <td class="table-active">{{labels.overseasTravelling[lang]}}</td>
            <td colspan="3" class="text-right">
              {{ jpInfo.overseas.yesno[lang] }}
              <br />
              <v-spacer></v-spacer>
              <span
                v-if="jpInfo.overseas.yesno.name == 'yes'"
              >{{jpInfo.overseas.countries[lang]}} {{labels.countries[lang]}}</span>
            </td>
            <td colspan="2" class="table-active">{{labels.teachingPeriod[lang]}}</td>
            <td>
              <!-- {{jpInfo.jpLevels}} -->
              <div v-for="jplevel in jpInfo.jpLevels" :key="jplevel.id">
                {{ jplevel.jpLanguageLevel }}
                <span class="text-right ml-2">
                  - {{ jplevel.certificate[lang] }}
                  <br />
                  ({{jplevel.teachingPeriod | moment("YYYY-MMM-DD")}})
                  <v-icon
                    small
                    :key="`icon-${isPass(jplevel.training[lang])}`"
                    :color="isPass(jplevel.training[lang]) ? 'success' : 'warning'"
                    v-text="isPass(jplevel.training[lang]) ? 'mdi-check-outline' : 'mdi-bell-check-outline'"
                  ></v-icon>
                </span>
              </div>
            </td>
            <td width="12%" class="table-active">{{labels.otherLanguages[lang]}}</td>
            <td>
              <span>
                {{jpInfo.otherLanguages.yesno[lang]}}
                <br />
                {{jpInfo.otherLanguages.languages[lang]}}
              </span>
            </td>
            <td width="5%" class="table-active">{{ labels.passport[lang] }}</td>
            <td width="5%">{{jpInfo.passport.yesno[lang]}}</td>
            <td class="table-active">{{ labels.expirationDate[lang] }}</td>
            <!-- <td>{{ moment(jpInfo.passport.expirationDate, "YYYY-MM-DD")}}</td> -->
            <td>{{ jpInfo.passport.expirationDate | moment("YYYY-MM-DD")}}</td>
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
  props: ["jpInfo"],
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      lang: "app/getLang"
    })
  },
  methods: {
    isPass(val) {
      if (val == "pass") {
        return true;
      } else {
        return false;
      }
      // return true;
    }
  }
};
</script>
