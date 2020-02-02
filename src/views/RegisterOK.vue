<template>
  <v-card>
      <v-card-title class="card-title">
          {{label.title[lang]}} 
          <v-spacer />
        <v-row
            align="center"
            justify="center"
        >
            <v-btn-toggle
            v-model="lang"
            >
            <v-btn value="mm" v-text="'Myanmar'">
            </v-btn>
            <v-btn value="jp" v-text="'Japan'">
            </v-btn>
            </v-btn-toggle>
        </v-row>
      </v-card-title>

      <v-card-text>
          
          <v-form v-model="valid">
            <v-container>
            <v-row>
                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="firstname"
                    :rules="nameRules"
                    :counter="10"
                    :label="label.firstname[lang]"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="lastname"
                    :rules="nameRules"
                    :counter="10"
                    label="Last name"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
                </v-col>
            </v-row>
            </v-container>
        </v-form>
      </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      lang: 'mm',
      valid: false,
        mm: {
            title: "Register From",
            firstname: "First Name",
            lastname: "Last Name",
            email: "Email"
        },
        jp: {
            title: "登録元",
            firstname: "ファーストネーム",
            lastname: "苗字",
            email: "Eメール"
        },
        label: {
          title: {
              mm: "Register From",
              jp: "登録元"
          },
          firstname: {
              mm: "First Name",
              jp: "ファーストネーム"
          },
          lastname: {
              mm: "Last Name",
              jp: "苗字"
          },
          email: {
              mm: "Email",
              jp: "Eメール"
          }  
      },
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    })
  }
</script>
