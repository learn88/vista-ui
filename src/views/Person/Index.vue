<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    show-expand
    :search="search"
    :custom-filter="searchFilter"
    class="elevation-2"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ categories }} List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn fab small color="primary" dark class="mb-2" @click="addPerson">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.code="{ item }">
      <v-row class="pa-5">
        <v-avatar width="90" height="120" class="elevation-3" tile>
          <img :src="imageUrl + item.profileImage" :alt="item.name[lang]" />
        </v-avatar>
      </v-row>
    </template>
    <template v-slot:item.name="{ item }">
      <v-row style="margin-bottom: -20px">
        <v-col class="text-right" lg="4">
          <v-icon
            @click="isCheck = !isCheck"
            :color="isCheck ? 'success' : ''"
            v-text="isCheck ? 'mdi-bookmark-check' : 'mdi-bookmark-plus'"
          ></v-icon>ID :
        </v-col>
        <v-col class="text-left">
          {{ codeID(item.code) }}
          <v-icon class="pl-5" color="orange" v-if="item.isActive == 1">mdi-account-alert</v-icon>
          <v-icon class="pl-5" color="primary" v-if="item.isActive == 2">mdi-account-check-outline</v-icon>
          <v-icon class="pl-5" color="success" v-if="item.isActive == 3">mdi-account-star-outline</v-icon>
          <v-icon class="pl-5" color="success" v-if="item.isActive == 5">mdi-star-circle-outline</v-icon>
        </v-col>
      </v-row>
      <v-row style="margin-bottom: -20px">
        <v-col class="text-right" lg="4">{{ labels.name[lang] }} :</v-col>
        <v-col class="text-left">{{ item.name[lang] }}</v-col>
      </v-row>
      <v-row style="margin-bottom: -20px">
        <v-col class="text-right" lg="4">{{ labels.age[lang] }} :</v-col>
        <v-col class="text-left" v-if="item.age != null">{{ item.age.toFixed() }}</v-col>
      </v-row>
      <v-row style="margin-bottom: -20px">
        <v-col class="text-right" lg="4">{{ labels.phoneNo[lang] }} :</v-col>
        <v-col class="text-left">{{ item.phone }}</v-col>
      </v-row>
      <v-row style="margin-bottom: -20px">
        <v-col class="text-right" lg="4">{{ labels.currentAddress[lang] }} :</v-col>
        <v-col class="text-left">{{ item.address[lang] }}</v-col>
      </v-row>
    </template>
    <template v-slot:item.jpLanguageLevel="{ item }">
      <v-row v-if="item.jpLanguageLevel.length > 0">
        <v-col>
          {{ labels.jpLanguageLevel[lang] }}
          <v-icon
            @click="isMoreJP = !isMoreJP"
            v-text="isMoreJP ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          ></v-icon>
          <div v-if="!isMoreJP">
            {{ item.jpLanguageLevel[item.jpLanguageLevel.length - 1].jpLanguageLevel}}
            <span
              class="text-right ml-2"
            >
              - {{ item.jpLanguageLevel[item.jpLanguageLevel.length - 1].certificate[lang] }} ({{item.jpLanguageLevel[item.jpLanguageLevel.length - 1].teachingPeriod | moment}})
              <v-icon
                :key="`icon-${isPass(item.jpLanguageLevel[item.jpLanguageLevel.length - 1].training[lang])}`"
                :color="isPass(item.jpLanguageLevel[item.jpLanguageLevel.length - 1].training[lang]) ? 'success' : 'warning'"
                v-text="isPass(item.jpLanguageLevel[item.jpLanguageLevel.length - 1].training[lang]) ? 'mdi-check-outline' : 'mdi-bell-check-outline'"
              ></v-icon>
            </span>
          </div>

          <div v-if="isMoreJP">
            <div v-for="jplevel in item.jpLanguageLevel" :key="jplevel.id">
              {{ jplevel.jpLanguageLevel }}
              <span class="text-right ml-2">
                - {{ jplevel.certificate[lang] }} ({{jplevel.teachingPeriod | moment}})
                <v-icon
                  :key="`icon-${isPass(jplevel.training[lang])}`"
                  :color="isPass(jplevel.training[lang]) ? 'success' : 'warning'"
                  v-text="isPass(jplevel.training[lang]) ? 'mdi-check-outline' : 'mdi-bell-check-outline'"
                ></v-icon>
              </span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="item.edus.length > 0">
        <v-col>
          {{ labels.education[lang] }}
          <v-icon
            @click="isMoreEdu = !isMoreEdu"
            v-text="isMoreEdu ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          ></v-icon>
          <div v-if="!isMoreEdu">
            - {{ item.edus[item.edus.length - 1].degree[lang] }}
            <br />
            - {{ item.edus[item.edus.length - 1].major[lang] }}
          </div>
          <div v-if="isMoreEdu">
            <div v-for="edu in item.edus" :key="edu.id">
              - {{ edu.degree[lang] }}
              <br />
              - {{ edu.major[lang] }}
              <br />
              - ({{edu.eduToDate | moment}}) / {{ edu.eduStatus[lang] }}
            </div>
          </div>
        </v-col>
      </v-row>
    </template>
    <template v-slot:item.passport="{ item }">
      <!-- <v-row style="margin-bottom: -20px"> -->
      <div class="mb-3">
        <!-- {{ labels.passport[lang] }} -->
        <v-icon color="error" class="pr-3">mdi-passport</v-icon>
        - {{ item.passport.yesno[lang] }}
      </div>

      <span v-if="item.passport.yesno.name == 'yes'">
        <v-icon color="success" class="pr-3">mdi-clipboard-list-outline</v-icon>
        - {{ item.passport.passportNo }}
        <br />
        <v-icon color="error" class="pr-3">mdi-calendar-alert</v-icon>
        - {{ item.passport.expirationDate | moment }}
      </span>
    </template>
    <template v-slot:item.action="{ item }">
      <div class="d-flex flex-column">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon
              small
              class="pa-2"
              color="primary"
              dark
              v-on="on"
              @click="showItem(item)"
            >mdi-eye</v-icon>
          </template>
          <span>{{labels.toSee[lang]}}</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon
              small
              class="pa-2"
              color="primary"
              dark
              v-on="on"
              @click="editItem(item)"
            >mdi-pencil</v-icon>
          </template>
          <span>{{labels.edit[lang]}}</span>
        </v-tooltip>
        <!-- <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon small class="pa-2" color="primary" dark v-on="on">mdi-settings</v-icon>
          </template>
          <span>{{labels.settings[lang]}}</span>
        </v-tooltip>-->
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon
              small
              class="pa-2"
              color="error"
              dark
              v-on="on"
              @click="deleteItem(item)"
            >mdi-delete</v-icon>
          </template>
          <span>{{labels.delete[lang]}}</span>
        </v-tooltip>
      </div>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  <!-- </v-card> -->
</template>

<script>
import moment from "moment";
import PersonService from "@/api/PersonService";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    // Search
    search: "",
    isCheck: false,
    isMoreEdu: false,
    isMoreJP: false,
    dialog: false,
    headers: [
      {
        text: "Image",
        align: "center",
        sortable: false,
        value: "code",
        width: 50
      },
      { text: "Information", value: "name", sortable: false, width: 300 },
      { text: "Education", value: "jpLanguageLevel", sortable: false },
      { text: "Passport", value: "passport", sortable: false },
      { text: "Actions", value: "action", sortable: false, align: "center" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters({
      categories: "resume/getCategories",
      labels: "app/getLabels",
      lang: "app/getLang",
      imageUrl: "auth/getImageUrl"
    })
  },
  created() {
    this.initialize();
  },
  methods: {
    isPass(val) {
      if (val == "pass") {
        return true;
      } else {
        return false;
      }
      // return true;
    },
    codeID(val) {
      var str = String(val);
      return "VI-" + str.padStart(5, "0");
    },
    searchFilter(val, search, item) {
      let inName = RegExp(search, "i").test(item.name[this.lang]);
      let inID = RegExp(search, "i").test(this.codeID(item.code));
      let inJapanese = "";
      if (item.jpLanguageLevel.length > 0) {
        let Japanese = RegExp(search, "i").test(
          item.jpLanguageLevel[item.jpLanguageLevel.length - 1].jpLanguageLevel
        );
        inJapanese = Japanese;
      }
      let inDegree = "";
      if (!this.isMoreEdu) {
        let degree = RegExp(search, "i").test(
          item.edus[item.edus.length - 1].degree[this.lang]
        );
        inDegree = degree;
      }
      let inMajor = "";
      if (!this.isMoreEdu) {
        let major = RegExp(search, "i").test(
          item.edus[item.edus.length - 1].major[this.lang]
        );
        inMajor = major;
      }
      return inName || inID || inJapanese || inDegree || inMajor;
    },
    addPerson() {
      this.$router.push({ name: "resume-form" });
      this.$store.dispatch("resume/setPerson", "");
      this.$store.dispatch("resume/setShow", false);
    },
    async initialize() {
      this.desserts = (await PersonService.index(this.categories)).data.persons;
    },
    showItem(item) {
      this.$store.dispatch("resume/setPerson", item._id);
      this.$store.dispatch("resume/setShow", true);
      this.$router.push({ name: "persons-show" });
    },
    editItem(item) {
      this.$store.dispatch("resume/setPerson", item._id);
      this.$router.push({
        name: "resume-form"
      });
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    moment: function() {
      return moment();
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD - MMM - YYYY");
    }
  }
};
</script>
