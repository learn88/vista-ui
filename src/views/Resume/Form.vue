<template>
  <v-card>
    <v-card-text class="pb-0">
      <v-row>
        <v-col md="4" class="pb-0">
          <v-btn-toggle>
            <v-btn color="white" @click="$router.back()">
              <v-icon color="primary">mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-btn color="white">
              <v-icon color="primary">mdi-printer</v-icon>
            </v-btn>

            <v-btn color="white">
              <v-icon color="primary">mdi-pdf-box</v-icon>
            </v-btn>

            <v-btn color="white" @click="save" v-if="!isEdit">
              <v-icon color="primary">mdi-check-bold</v-icon>
            </v-btn>
            <v-btn color="white" @click="update" v-if="isEdit">
              <v-icon color="primary">mdi-check-bold</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col md="6" class="hidden-sm-and-down pb-0">
          <h4 class="pl-4">
            {{ labels.title[lang] }}
            <span class="pl-5 grey--text">- ({{ categories }})</span>
          </h4>
        </v-col>
        <v-col sm="12" md="2" class="text-right"></v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>mdi-account</v-icon>Info
        <v-spacer></v-spacer>
      </v-tab>
      <v-tab>
        <v-icon left>mdi-account-card-details-outline</v-icon>Detail
        <v-spacer></v-spacer>
      </v-tab>
      <v-tab>
        <v-icon left>mdi-passport-biometric</v-icon>JP Info
        <v-spacer></v-spacer>
      </v-tab>
      <v-tab>
        <v-icon left>mdi-cast-education</v-icon>Education
        <v-spacer></v-spacer>
      </v-tab>
      <v-tab>
        <v-icon left>mdi-briefcase</v-icon>Experience
        <v-spacer></v-spacer>
      </v-tab>
      <v-tab>
        <v-icon left>mdi-account-group</v-icon>Family
        <v-spacer></v-spacer>
      </v-tab>
      <v-tab>
        <v-icon left>mdi-help-circle-outline</v-icon>Questions
        <v-spacer></v-spacer>
      </v-tab>
      <v-tab>
        <v-icon left>mdi-account-badge-horizontal-outline</v-icon>Other
        <v-spacer></v-spacer>
      </v-tab>
      <v-tab disabled>
        <v-icon left>mdi-image-multiple</v-icon>Gallery
        <v-spacer></v-spacer>
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <person-info :personInfo="personInfo" :view="view" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <person-detail :personDetail="personDetail" :active="active" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <jp-info :jpInfo="jpInfo" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <education :edus="edus" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <work-experience :jobs="jobs" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <families :families="families" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <questions :questions="questions" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <other :other="other" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <gallery :images="images" :galleryImage="galleryImage" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import PersonInfo from "./PersonInfo";
import PersonDetail from "./PersonDetail";
import JpInfo from "./JpInfo";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import Families from "./Family";
import Questions from "./Question";
import Other from "./Other";
import Gallery from "./Gallery";
import { mapGetters } from "vuex";
import PersonService from "@/api/PersonService";

export default {
  components: {
    PersonInfo,
    PersonDetail,
    JpInfo,
    Education,
    WorkExperience,
    Families,
    Questions,
    Other,
    Gallery
  },
  data: () => ({
    error: "",
    active: {
      isActive: 1
    },
    view: {
      image: false
    },
    personInfo: {
      name: {
        mm: "",
        jp: ""
      },
      nrc: "",
      nrcSelect: null,
      nrcNo: "",
      dob: "",
      gender: null,
      religion: {
        mm: "",
        jp: ""
      },
      nation: {
        mm: "",
        jp: ""
      },
      email: "",
      phoneNo: "",
      homeAddress: {
        mm: "",
        jp: ""
      },
      currentAddress: {
        mm: "",
        jp: ""
      },
      blood: "",
      profileImage: ""
    },
    personDetail: {
      dateOfDecision: null,
      noOfInterview: "",
      leftOrRight: {
        jp: "左",
        mm: "ညာ",
        name: "right"
      },
      height: "",
      weight: "",
      tattoo: false,
      alcohol: false,
      smoke: false,
      livingWithPeople: true,
      married: false,
      lover: false,
      wedding: false,
      self: "",
      parents: "",
      relative: "",
      bank: "",
      other: "",
      threeYearIncome: {
        mm: "",
        jp: ""
      },
      howToUse: {
        mm: "",
        jp: ""
      },
      remarks: {
        mm: "",
        jp: ""
      },
      nanGlasses: {
        right: "",
        left: ""
      },
      glasses: {
        right: "",
        left: ""
      },
      colorView: 1,
      handPower: {
        left: "",
        right: ""
      }
    },
    jpInfo: {
      jpLevels: [],
      familyInJapan: {
        yesno: {
          name: "no",
          mm: "မရှိ",
          jp: "いや"
        },
        number: "",
        address: {
          mm: "",
          jp: ""
        },
        visaType: ""
      },
      overseas: {
        yesno: {
          name: "no",
          mm: "မရှိ",
          jp: "いや"
        },
        countries: {
          mm: "",
          jp: ""
        }
      },
      passport: {
        yesno: {
          name: "no",
          mm: "မရှိ",
          jp: "いや"
        },
        passportNo: "",
        expirationDate: ""
      },
      otherLanguages: {
        yesno: {
          name: "no",
          mm: "မရှိ",
          jp: "いや"
        },
        languages: {
          mm: "",
          jp: ""
        }
      }
    },
    edus: [],
    jobs: [],
    families: [],
    questions: {
      n4CanYouWin: true,
      tiredness: false,
      weakness: false,
      surgeries: false,
      noOvertime: true,
      familySurgeries: false,
      workIsFast: true,
      bodybuilding: true
    },
    other: {
      advantages: {
        mm: "",
        jp: ""
      },
      disadvantage: {
        mm: "",
        jp: ""
      },
      personality: {
        mm: "",
        jp: ""
      },
      happyTime: {
        mm: "",
        jp: ""
      },
      difficultTime: {
        mm: "",
        jp: ""
      }
    },
    images: [],
    galleryImage: {
      name: "",
      src: "",
      caption: "",
      person: ""
    }
  }),
  created() {
    if (this.editPerson != "") {
      this.getPerson();
    }
  },
  computed: {
    ...mapGetters({
      labels: "app/getLabels",
      appData: "app/getData",
      lang: "app/getLang",
      editPerson: "resume/getPerson",
      categories: "resume/getCategories",
      isEdit: "resume/isEdit"
      // isShow: "resume/isShow"
    }),
    isSave() {
      if (this.personInfo.name != "" && this.personInfo.profileImage != "") {
        return false;
      } else {
        return true;
      }
    },
    fullNRC: {
      // getter
      get: function() {
        return this.personInfo.nrcSelect + " " + this.personInfo.nrcNo;
      },
      // setter
      set: function(value) {
        var nrcfull = value.split(" ");
        this.personInfo.nrcSelect = nrcfull[0];
        this.personInfo.nrcNo = nrcfull[nrcfull.length - 1];
      }
    }
  },
  methods: {
    async getPerson() {
      const res = (await PersonService.show(this.editPerson)).data.person;
      // this.res = res;
      this.active.isActive = res.isActive;
      this.personInfo = res.personInfo;
      this.personDetail = res.personDetail;
      this.jpInfo = res.jpInfo;
      this.edus = res.edus;
      this.jobs = res.jobs;
      this.families = res.families;
      this.questions = res.questions;
      this.other = res.other;
      // this.images = res.images;
      this.view.image = true;
    },
    async save() {
      try {
        this.personInfo.nrc = this.fullNRC;
        const res = await PersonService.post({
          isActive: this.active.isActive,
          categories: this.categories,
          personInfo: this.personInfo,
          personDetail: this.personDetail,
          jpInfo: this.jpInfo,
          edus: this.edus,
          jobs: this.jobs,
          families: this.families,
          questions: this.questions,
          other: this.other,
          images: this.images
        });

        this.$store.dispatch("resume/setPerson", res.data.person._id);
        this.$store.dispatch("resume/setShow", true);
        this.$router.push({ name: "persons-show" });
        // this.personInfo = res.data.person.personInfo;
        // this.personDetail = res.data.person.personDetail;
        // this.jpInfo = res.data.person.jpInfo;
        // this.jobs = res.data.person.jobs;
        // this.edus = res.data.person.edus;
        // this.families = res.data.person.families;
        // this.other = res.data.person.other;
        // this.images = res.data.person.images;
        // this.$store.dispatch("resume/setPerson", res.data.person._id);
        // this.view.image = true;
        // this.$router.push({
        //   name: "edit-form",
        //   params: { _id: "asdfasd233444" }
        // });
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
    async edit() {
      // await this.$router.push({ name: "register-form" });
      await this.$store.dispatch("resume/setShow", false);
    },
    async update() {
      try {
        await PersonService.put({
          person: this.editPerson,
          isActive: this.active.isActive,
          personInfo: this.personInfo,
          personDetail: this.personDetail,
          jpInfo: this.jpInfo,
          edus: this.edus,
          jobs: this.jobs,
          families: this.families,
          questions: this.questions,
          other: this.other,
          galleryImage: this.galleryImage
          // images: this.images
        });
        this.$store.dispatch("resume/setShow", true);
        this.$router.push({ name: "persons-show" });
      } catch (err) {
        this.error = err.response.data.error;
      }
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
