
<template>
  <v-card>
    <v-card-text>
      <pinfo :personInfo="personInfo" />
      <pdetail :personDetail="personDetail" />
      <jpinfo :jpInfo="jpInfo" />
      <edu :edus="edus" />
      <experience :jobs="jobs" />
      <family :families="families" />
      <question :questions="questions" />
      <other :other="other"></other>
    </v-card-text>
  </v-card>
</template>

<script>
import Pinfo from "./Pinfo";
import Pdetail from "./Pdetail";
import Jpinfo from "./Jpinfo";
import Edu from "./Edu";
import Experience from "./Experience";
import Family from "./Family";
import Question from "./Question";
import Other from "./Other";
// import Gallery from "./Gallery";
import { mapGetters } from "vuex";
import PersonService from "@/api/PersonService";

export default {
  components: {
    Pinfo,
    Pdetail,
    Jpinfo,
    Edu,
    Experience,
    Family,
    Question,
    Other
    //   PersonDetail,
    //   JpInfo,
    //   Education,
    //   WorkExperience,
    //   Families,
    //   Questions,
    //   Other,
    //   Gallery
  },
  data: () => ({
    error: "",
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
      gender: {
        jp: "",
        mm: ""
      },
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
      leftOrRight: "",
      height: "",
      weight: "",
      tattoo: "",
      alcohol: "",
      smoke: "",
      livingWithPeople: "",
      married: "",
      lover: "",
      wedding: "",
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
        right: false,
        left: false
      },
      glasses: {
        right: false,
        left: false
      },
      colorView: undefined,
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
    images: [
      // {
      //   name: "",
      //   caption: "Profile 1",
      //   src: "../../assets/profile1.jpg"
      // },
      // {
      //   name: "",
      //   caption: "Profile 2",
      //   src: "../../assets/Caregiver.jpg"
      // },
      // {
      //   name: "",
      //   caption: "Profile 3",
      //   src: "../../assets/Caregiver.jpg"
      // },
      // {
      //   name: "",
      //   caption: "Profile 4",
      //   src: "../../assets/Caregiver.jpg"
      // }
    ],
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
      isEdit: "resume/isEdit",
      isShow: "resume/isShow"
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
      // this.editPerson = res.data.person._id;
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
          personInfo: this.personInfo,
          personDetail: this.personDetail,
          jpInfo: this.jpInfo,
          edus: this.edus,
          jobs: this.jobs,
          families: this.families,
          questions: {},
          other: this.other,
          galleryImage: this.galleryImage
          // images: this.images
        });
        this.$store.dispatch("resume/setShow", true);
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
