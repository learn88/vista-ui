<template>
  <v-card>
    <v-card-title>
      NRC List
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        class="pt-6"
        v-model.trim="newNrc"
        append-outer-icon="mdi-plus"
        outlined
        dense
        clearable
        label="Create NRC List"
        type="text"
        @click:append-outer="addNrc"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn-toggle>
        <v-btn color="white" @click="$router.back()">
          <v-icon color="primary">mdi-arrow-left-bold</v-icon>
        </v-btn>

        <v-btn color="white" @click="createNrc" v-if="!isEdit">
          <v-icon color="primary">mdi-check-bold</v-icon>
        </v-btn>
        <v-btn color="white" @click="updateNrc" v-if="isEdit">
          <v-icon color="primary">mdi-check-bold</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="3">
          <table class="table table-bordered">
            <tbody>
              <tr v-for="(nrc, index) in nrclists" :key="index" v-show="index < 50">
                <td class="text-right">{{ index + 1 }}</td>
                <td>{{ nrc }}</td>
                <td width="10px">
                  <v-icon @click="remove(index)">mdi-close-circle</v-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
        <v-col md="3">
          <table class="table table-bordered">
            <tbody>
              <tr v-for="(nrc, index) in nrclists" :key="index" v-show="index > 49 && 100 > index">
                <td class="text-right">{{ index + 1 }}</td>
                <td>{{ nrc }}</td>
                <td width="10px">
                  <v-icon @click="remove(index)">mdi-close-circle</v-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
        <v-col md="3">
          <table class="table table-bordered">
            <tbody>
              <tr v-for="(nrc, index) in nrclists" :key="index" v-show="index > 99 && 150 > index">
                <td class="text-right">{{ index + 1 }}</td>
                <td>{{ nrc }}</td>
                <td width="10px">
                  <v-icon @click="remove(index)">mdi-close-circle</v-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
        <v-col md="3">
          <table class="table table-bordered">
            <tbody>
              <tr v-for="(nrc, index) in nrclists" :key="index" v-show="index > 149">
                <td class="text-right">{{ index + 1 }}</td>
                <td>{{ nrc }}</td>
                <td width="10px">
                  <v-icon @click="remove(index)">mdi-close-circle</v-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import NrcService from "@/api/NrcService";
export default {
  data: () => ({
    nrclists: [],
    newNrc: "",
    id: ""
  }),
  created() {
    this.getNrc();
  },
  computed: {
    isEdit() {
      if (this.id != "") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    async getNrc() {
      this.nrclists = (await NrcService.index()).data.nrclists[0].nrclists;
      this.id = (await NrcService.index()).data.nrclists[0]._id;
    },
    addNrc() {
      if (this.newNrc != "") {
        this.nrclists.push(this.newNrc);
      }
      this.newNrc = "";
    },
    async createNrc() {
      await NrcService.post({
        nrclists: this.nrclists
      });

      this.getNrc();
      const nrc = this.nrclists;
      this.$store.dispatch("app/setNrc", nrc);
    },
    async updateNrc() {
      await NrcService.put({
        _id: this.id,
        nrclists: this.nrclists
      });

      this.getNrc();
      const nrc = this.nrclists;
      this.$store.dispatch("app/setNrc", nrc);
    },
    remove(index) {
      this.nrclists.splice(index, 1);
    }
  }
};
</script>
