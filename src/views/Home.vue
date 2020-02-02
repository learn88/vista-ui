<template>
  <div>
    <v-row>
      <v-col md="3" sm12>
        <General :general="persons.general" />
      </v-col>
      <v-col md="3" sm12>
        <Caregiver :caregiver="persons.caregiver" />
      </v-col>
      <v-col md="3" sm12>
        <IT :it="persons.it" />
      </v-col>
      <v-col md="3" sm12>
        <Engineer :engineer="persons.engineer" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import IT from "./IT";
import Engineer from "./Engineer";
import General from "./General";
import Caregiver from "./Caregiver";
import PersonService from "@/api/PersonService";
export default {
  components: {
    // use in templates as <text-box> and <dropdown-menu>
    IT,
    Engineer,
    General,
    Caregiver
  },
  data: () => ({
    persons: {
      general: {
        total: null,
        interviewList: null,
        interviewPass: null,
        onJob: null
      },
      caregiver: {
        total: null,
        interviewList: null,
        interviewPass: null,
        onJob: null
      },
      it: {
        total: null,
        interviewList: null,
        interviewPass: null,
        onJob: null
      },
      engineer: {
        total: null,
        interviewList: null,
        interviewPass: null,
        onJob: null
      }
    }
  }),
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.persons = (
        await PersonService.resume_count(this.categories)
      ).data.persons;
    }
  }
};
</script>
