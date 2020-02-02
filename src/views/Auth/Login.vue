<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md4 class="mt-10">
      <v-card class="elevation-2" align-center>
        <v-toolbar dark color="primary" class="elevation-2">
          <v-img src="@/assets/VISTA-logo.png" max-width="40px"></v-img>
          <v-spacer></v-spacer>
          <v-toolbar-title>VISTA INTERNATIONAL CO., LTD</v-toolbar-title>
          <!-- <v-icon small @click="$router.back()">mdi-close-circle</v-icon> -->
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="mdi-email"
              name="email"
              label="Email"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              id="password"
              prepend-icon="mdi-lock"
              name="password"
              label="Password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPass = !showPass"
              :type="showPass ? 'text' : 'password'"
              v-model="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="primary" @click="login" :disabled="disabled">Login</v-btn>
        </v-card-actions>
        <v-card-actions>
          <!-- <v-btn block @click="$router.back()">Forget your password ?</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
// import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapActions } = createNamespacedHelpers('auth')
import AuthenticationService from "@/api/AuthenticationService";
import NrcService from "@/api/NrcService";

export default {
  props: {
    source: String
  },
  data() {
    return {
      drawer: null,
      // name: 'login',
      nrclists: [],
      showPass: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+((\.-)?\w+)*@\w+((\.-)?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      register: false,
      error: null
    };
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      lang: "app/getLang"
    }),

    disabled() {
      if (this.email != "" && this.password != "") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    async getNrc() {
      this.nrclists = (await NrcService.index()).data.nrclists[0].nrclists;
    },
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
        // if (response.data.status === 200) {
        //   return console.log(response.data)
        // }

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("auth/setUser", response.data.user);
        this.$store.dispatch("auth/setCompany", response.data.company);
        this.$store.dispatch("app/setLabel", response.data.labels);
        await this.getNrc();
        const nrc = await this.nrclists;
        await this.$store.dispatch("app/setNrc", nrc);
        // this.email = null
        // this.password = null
        this.$router.push({ name: "home" });
      } catch (err) {
        this.error = err.response.data.error;
      }
    }
  }
};
</script>
