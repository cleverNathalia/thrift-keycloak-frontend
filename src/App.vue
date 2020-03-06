<template>
  <v-app>
    <Nav v-bind:headerName="headerName" v-bind:keycloak="keycloak" />
    <!-- Call the correct components according to data -->
    <v-content>
      <br>
      <span class="display-3 font-weight-thin pa-8">Thrift Example:</span>
      <component
        v-bind:is="componentName"
        v-bind:peopleArr="peopleArr"
        v-bind:peopleHeader="peopleHeader"
      />
      <!-- <v-btn v-on:click="logOut">LOGOUT</v-btn> -->
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// ADD THE NEW COMPONENTS
import User from "./components/User.vue";
import Admin from "./components/Admin.vue";
import Nav from "./components/Nav.vue";
// ADD KEYCLOAK
import Keycloak from "../node_modules/keycloak-js/dist/keycloak";
// ADD THRIFT
import {
  createHttpConnection,
  createHttpClient,
  HttpConnection,
  TBufferedTransport,
  TJSONProtocol
} from "thrift";
//ADD STUBS
// import { Client as HelloServiceClient } from "@/gen-js/HelloService";
import { Client as HelloServiceClient } from "@/gen-js/HelloService";
import { Person } from "@/gen-js/Person";

// The location of the server endpoint
const CONFIG = {
  hostName: "localhost",
  port: 9090
};

const options = {
  transport: TBufferedTransport,
  protocol: TJSONProtocol,
  https: false,
  headers: {
    Host: CONFIG.hostName
  }
};

const connection: HttpConnection = createHttpConnection(
  CONFIG.hostName,
  CONFIG.port,
  options
);
const thriftClient: HelloServiceClient = createHttpClient(
  HelloServiceClient,
  connection
);

export default Vue.extend({
  name: "App",

  components: {
    User,
    Admin,
    Nav
  },

  data: () => ({
    componentName: "",
    peopleArr: [],
    objArr: [],
    peopleHeader: ["ID", "Name", "Address", "Phone"],
    role: String,
    headerName: String,
    initOptions: {
      realm: "keycloak-demo",
      url: "http://localhost:8080/auth/",
      clientId: "vue-test-app"
    },
    keycloak: Keycloak()
  }),
  methods: {
    loadPage(): any {
      // THIS IS THE COPIED CODE FROM THE KEYCLOAK ADMINISTRATION CONSOLE. JUST ADAPT IT, SO THAT IT MATHES THIS FORMAT
      this.keycloak = Keycloak(this.initOptions);

      let roles = "";

      this.keycloak
        .init({
          onLoad: "login-required"
        })
        .success((auth: any) => {
          // CHECK IF THE USER IS AUTHENTICATED
          if (!auth) {
            window.location.reload();
          } else {
            console.log("SUCCESSFULLY AUTHENTICATED");

            // CHECK WHAT ROLES THEY HAVE AND DISPLAY THE COMPONENT ACCORDING TO THE ROLE
            roles = JSON.parse(JSON.stringify(this.keycloak.tokenParsed));
            this.role = roles.realm_access.roles;
            this.componentName = String(this.role);

            this.headerName = this.componentName == "admin" ? "deep-purple lighten-1" : "purple darken-4";

            console.log("Submitting...");

            thriftClient
              .getRole(this.componentName)
              .then((response: string) => {
                this.peopleArr.push(response.id);
                this.peopleArr.push(response.name);
                if (response.address == "") {
                  this.peopleArr.push("CONFIDENTIAL");
                } else {
                  this.peopleArr.push(response.address);
                }
                if (response.phone == "") {
                  this.peopleArr.push("CONFIDENTIAL");
                }else{
                   this.peopleArr.push(response.phone);
                }
              })
              .catch(console.error);

            // console.log(peopleArr);
          }

          // SET THE TOKEN IN THE LOCALSTORAGE
          localStorage.setItem("vue-token", String(this.keycloak.token));
          localStorage.setItem(
            "vue-refresh-token",
            String(this.keycloak.refreshToken)
          );

          // HANDLE TOKEN TIMEOUT
          setTimeout(() => {
            this.keycloak
              .updateToken(70)
              .success(refreshed => {
                if (refreshed) {
                  console.log("Token Refreshed");
                } else {
                  console.log("Token Not Refreshed");
                }
              })
              .error(() => {
                console.log("Failed To Refresh Token");
              });
          }, 60000);
        })
        .error(() => {
          console.log("AUTHENTICATION FAILED");
        });

      // keycloak.logout();
    }
  },
  mounted() {
    this.loadPage();
  }
});
</script>
