<template>
  <v-card :loading="loading" class="mx-auto" max-width="374">
    <v-img height="250" src="../assets/IT.jpg" @click="persons"></v-img>

    <!-- <v-card-title @click="persons">IT</v-card-title> -->

    <v-card-text>
      <div class="my-4 subtitle-1 black--text">Report for {{ name }}</div>
      <div>
        <v-row>
          <v-col md="8" class="text-right">စုစုပေါင်း လူဦးရေ -</v-col>
          <v-col md="4" class="text-right" v-if="it.length != 0">{{
            it.total
          }}</v-col>
        </v-row>
        <v-row>
          <v-col md="8" class="text-right">Interview ဖြေဆိုရန် -</v-col>
          <v-col md="4" class="text-right">{{ it.interviewList }}</v-col>
        </v-row>
        <v-row>
          <v-col md="8" class="text-right">Interview အောင်မြင်သူ -</v-col>
          <v-col md="4" class="text-right">{{ it.interviewPass }}</v-col>
        </v-row>
        <v-row>
          <v-col md="8" class="text-right">လုပ်ငန်းခွင် ၀င်ရောက်သူ -</v-col>
          <v-col md="4" class="text-right">{{ it.onJob }}</v-col>
        </v-row>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions @click="persons">
      <v-btn color="deep-purple accent-4" text>Detail IT</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["it"],
  data: () => ({
    name: "IT",
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
