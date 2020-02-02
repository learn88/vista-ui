<template>
  <v-card :loading="loading" class="mx-auto" max-width="374">
    <v-img height="250" src="../assets/Engineer.jpg" @click="persons"></v-img>

    <!-- <v-card-title @click="persons">Engineer</v-card-title> -->

    <v-card-text>
      <!-- <v-row align="center" class="mx-0">
        <v-rating
          :value="3"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">40 (120)</div>
      </v-row> -->

      <div class="my-4 subtitle-1 black--text">Report for {{ name }}</div>
      <div>
        <v-row>
          <v-col md="8" class="text-right">စုစုပေါင်း လူဦးရေ -</v-col>
          <v-col md="4" class="text-right" v-if="engineer != ''">{{
            engineer.total
          }}</v-col>
        </v-row>
        <v-row>
          <v-col md="8" class="text-right">Interview ဖြေဆိုရန် -</v-col>
          <v-col md="4" class="text-right">{{ engineer.interviewList }}</v-col>
        </v-row>
        <v-row>
          <v-col md="8" class="text-right">Interview အောင်မြင်သူ -</v-col>
          <v-col md="4" class="text-right">{{ engineer.interviewPass }}</v-col>
        </v-row>
        <v-row>
          <v-col md="8" class="text-right">လုပ်ငန်းခွင် ၀င်ရောက်သူ -</v-col>
          <v-col md="4" class="text-right">{{ engineer.onJob }}</v-col>
        </v-row>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions @click="persons">
      <v-btn color="deep-purple accent-4" text>Detail {{ name }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["engineer"],
  data: () => ({
    name: "Engineer",
    loading: false,
    selection: 1
  }),

  methods: {
    persons() {
      this.$router.push({ name: "persons" });
      this.$store.dispatch("resume/setCategories", this.name);
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    }
  }
};
</script>
