<template>
  <div class="row">
    <section class="col-12 text-center text-info q-px-lg row justify-center">
      <article id="headings" class="q-pa-none col-12">
        <h1 class="q-my-lg">Football Zodiac</h1>
        <h2 class="text-h6">
          Busca el horóscopo de un futbolista argentino nacionalizado en España
        </h2>
      </article>
      <article id="selects" class="col-12">
        <div class="row justify-center">
          <div class="col-12 col-md-4 row justify-center">
            <q-select
              filled
              :value="model"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="options"
              @filter="filterFn"
              @input-value="setModel"
              class="col-12 q-my-md text-h6 text-info"
              bg-color="info"
              options-selected-class="bg-info text-dark"
              placeholder="Busca un jugador"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-12 col-md-4 row justify-center">
            <q-select
              filled
              :value="modelSign"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="this.apiSigns.map((el) => el.name)"
              @filter="filterFnSign"
              @input-value="setModelSign"
              class="col-12 q-my-md text-h6 text-info"
              bg-color="info"
              options-selected-class="bg-info text-dark"
              placeholder="Busca por signo"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="row justify-center">
          <q-btn
            text-color="dark"
            @click="getPlayersAPI(), (model = null), (modelSign = null)"
            color="info"
            class="q-pa-xs q-mr-md"
            icon="close"
            dense
            v-if="model || modelSign"
            style="font-size: 0.5vw"
          />
        </div>
      </article>
    </section>
    <section class="col-12 text-info q-px-none q-mt-md">
      <article class="col-12">
        <transition name="fade">
          <div v-if="mark" class="">
            <q-list class="">
              <q-item
                v-for="player in apiPlayers"
                :key="player.name"
                clickable
                @click="alert = true"
                class="justify-center"
              >
                <Player :player="player" />
              </q-item>
            </q-list>
          </div>
        </transition>
      </article>
    </section>
  </div>
</template>
<script>
import moment from "moment";
import { DB, DB_SIGN, DB_IMG } from "src/DB.js";
import main from "src/mixins/main.mixin";

const signs = [
  { name: "Aries", from: "21/03/2022", to: "19/04/2022" },
  { name: "Tauro", from: "20/04/2022", to: "22/05/2022" },
  { name: "Géminis", from: "21/05/2022", to: "20/06/2022" },
  { name: "Cáncer", from: "21/06/2022", to: "22/07/2022" },
  { name: "Leo", from: "23/07/2022", to: "22/08/2022" },
  { name: "Virgo", from: "23/08/2022", to: "22/09/2022" },
  { name: "Libra", from: "23/09/2022", to: "22/10/2022" },
  { name: "Escorpio", from: "23/10/2022", to: "21/11/2022" },
  { name: "Sagitario", from: "21/11/2022", to: "21/12/2022" },
  { name: "Capricornio", from: "22/12/2022", to: "19/01/2022" },
  { name: "Acuario", from: "20/01/2022", to: "18/02/2022" },
  { name: "Piscis", from: "19/02/2022", to: "20/03/2022" },
];

import axios from "axios";

export default {
  components: {
    Player: () => import("components/Player.vue"),
  },
  name: "MainLayout",
  mixins: [main],

  data() {
    return {
      alert: false,
      model: null,
      modelSign: null,

      options: this.allPlayers,
      allPlayers: [],
      apiSigns: null,
      apiPlayers: null,
      testString: null,
      show: true,
      notFound: false,
      inputText: null,
      date: "12/07/2022",
      result: null,
      celebrity: null,
      loading: false,
      sign: null,
      mark: true,
    };
  },
  computed: {
    getDB() {
      return DB;
    },

    getSigns() {
      return signs;
    },

    getDB_IMG() {
      return DB_IMG;
    },
    getDB_SIGN() {
      return DB_SIGN;
    },
    today() {
      return moment().format("DD/MM/YYYY");
    },
  },
  async created() {
    //this.date = this.today;
    this.mark = false;
    this.getSignsAPI();
    await this.getPlayersAPI();
    this.allPlayers = this.apiPlayers;
  },
  methods: {},
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.avatar {
}
.q-field__messages {
  color: var(--info) !important;
}
.q-field__messages col {
  color: var(--info) !important;
}
.q-menu {
  background-color: red !important;
}
.-q-menu--square {
  background-color: red !important;
}

div[role="listbox"] {
  background-color: red !important;
}
</style>
