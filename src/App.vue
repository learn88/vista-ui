<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
      v-if="isUserLoggedIn"
    >
      <v-toolbar-title class="ml-0 pl-4">
        <v-avatar>
          <a>
            <v-img
              src="./assets/VISTA-logo.png"
              alt="VISTA INTERNATIONAL"
              style="width:50px;"
            />
          </a>
        </v-avatar>
        <span class="hidden-sm-and-down pl-4" @click="$router.push('/')"
          >VISTA INTERNATIONAL CO., LTD</span
        >
      </v-toolbar-title>
      <v-spacer />
      <v-btn-toggle dense background-color="primary">
        <v-btn
          raised
          small
          @click="onChangeMM"
          v-text="'MM'"
          :disabled="lang == 'mm'"
        ></v-btn>
        <v-btn
          raised
          small
          @click="onChangeJP"
          v-text="'JP'"
          :disabled="lang == 'jp'"
        ></v-btn>
      </v-btn-toggle>
      <!-- <v-btn icon @click="$router.push({ name: 'register-form' })">
        <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn> -->
      <v-btn icon class="ml-5">
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon class="ml-5" @click="$router.push({ name: 'nrc-lists' })">
        <v-icon>mdi-account-card-details-outline</v-icon>
      </v-btn>
      <v-btn icon @click="logout" class="ml-5">
        <v-icon>mdi-lock</v-icon>
      </v-btn>
      <span class="pr-10"></span>
      <!-- <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          />
        </v-avatar>
      </v-btn> -->
    </v-app-bar>
    <v-content>
      <v-container>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
        <!-- <router-view></router-view> -->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    source: String
  },
  computed: {
    ...mapState([
      "isUserLoggedIn"
      // user
    ]),
    ...mapGetters({
      lang: "app/getLang"
    })
  },
  methods: {
    persons(categories) {
      this.$router.push({ name: "persons" });
      this.$store.dispatch("resume/setCategories", categories);
    },
    async onChangeMM() {
      try {
        this.$store.dispatch("app/setLang", "mm");
      } catch (err) {
        this.error = err;
      }
    },
    async onChangeJP() {
      try {
        this.$store.dispatch("app/setLang", "jp");
      } catch (err) {
        this.error = err;
      }
    },
    async logout() {
      try {
        this.$store.dispatch("setToken", null);
        this.$store.dispatch("auth/setUser", null);
        this.$store.dispatch("auth/setCompany", null);
        this.$store.dispatch("app/setLabel", null);
        this.$router.push({
          name: "login"
        });
      } catch (err) {
        this.error = err;
      }
    }
  }
};
</script>

<styles scoped src="@/assets/css/style.scss">
.fade-enter-active,
.fade-leave-active {
  /* transition: opacity .5s; */
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</styles>
