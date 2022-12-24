<template>
  <div class="text-center text-info q-px-lg">
    <h1>Football Zodiac</h1>
    <h2 class="text-h6">
      Busca el horóscopo de un futbolista argentino nacionalizado en España
    </h2>
    <div class="row justify-center">
      <q-select
        filled
        bg-color="info"
        :value="model"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        @input-value="setModel"
        hint="Busca el nombre del jugador"
        class="col-6 q-my-md text-h6 text-info"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <!--       <q-input
        bg-color="info"
        filled
        class="col-6 q-my-md text-h6"
        label="Busca un famoso"
        v-model="inputText"
      /> -->
    </div>
    <!--     <q-btn
      text-color="dark"
      @click="searchByName(model)"
      color="info"
      class="q-mt-md q-pa-sm"
      icon="search"
      label="Buscar"
      style="font-size: 2vw"
    /> -->
    <div>
      <br />
      <div class="row justify-center">
        <div v-if="this.apiSigns" class="col-8">
          <q-btn
            text-color="dark"
            @click="searchBySign(sign)"
            color="info"
            class="q-mt-md q-pa-sm q-mx-sm"
            :label="sign"
            style="font-size: 1vw"
            :key="sign.id"
            v-for="sign in this.apiSigns.map((el) => el.name)"
          />
          <q-btn
            text-color="dark"
            @click="getPlayersAPI()"
            color="info"
            class="q-mt-md q-pa-sm q-mx-sm"
            :label="sign"
            style="font-size: 0.5vw"
            icon="close"
            dense
          />
        </div>
      </div>
      <div class="row justify-center">
        <ol>
          <li
            class="row q-pa-md items-center"
            v-for="player in apiPlayers"
            :key="player.name"
          >
            <div
              :style="`width: 100px; height: 100px; border-radius: 50%; background-image: url(${player.image}); background-size: cover`"
              class="q-mr-md"
            ></div>
            <span> {{ player.name }} </span>
            <span class="text-bold"> - {{ player.sign }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { DB, DB_SIGN, DB_IMG } from "src/DB.js";
const stringOptions = [
  "Google",
  "Facebook",
  "Twitter",
  "Apple",
  "Oracle",
].reduce((acc, opt) => {
  for (let i = 1; i <= 5; i++) {
    acc.push(opt + " " + i);
  }
  return acc;
}, []);
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
  name: "MainLayout",
  components: {},
  data() {
    return {
      model: null,
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
  methods: {
    filterFn(val, update, abort) {
      if (this.apiPlayers) {
        update(() => {
          const needle = val.toLocaleLowerCase();
          this.options = this.allPlayers
            .map((el) => el.name)
            .filter((v) => v.toLocaleLowerCase().indexOf(needle) > -1);
        });
      }
    },

    setModel(val) {
      this.model = val;
      this.searchByName(this.model);
    },
    async searchByName(name) {
      try {
        const res = await axios.get(
          `http://localhost:3000/players.json?name=${name}`
        );
        this.apiPlayers = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async searchBySign(sign) {
      try {
        const res = await axios.get(
          `http://localhost:3000/players.json?sign=${sign}`
        );
        this.apiPlayers = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async creactePlayersAPI() {
      console.log(this.filterDB()[0]);
      let player = this.filterDB()[0];

      this.filterDB().forEach((player) => {
        axios
          .post("http://localhost:3000/players", {
            name: player.name,
            sign: player.sign,
            birthday: player.birthday3,
            image: player.img,
          })
          .then((result) => {
            console.log(result);
            console.log(result.data);
          });
      });
    },

    async getSignsAPI() {
      const res = await axios.get("http://localhost:3000/signs.json");
      this.apiSigns = res.data;
    },

    async getPlayersAPI() {
      try {
        const res = await axios.get("http://localhost:3000/players.json");
        this.apiPlayers = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    filterDB() {
      console.log("*********************");
      let values = this.getDB_IMG;
      let array = [];
      values.forEach((el) => {
        let index = el.birthday.search(/[0-9]/);
        let newDate = el.birthday.slice(index);
        let transDate = newDate.split("(")[0].trim();
        el.birthday2 = transDate;
      });
      console.log("xec", values);

      //    let transArray = [];
      values.forEach((el) => {
        let parseDate = el.birthday2.replace(/de/g, "").replace(/\s{2}/g, " ");
        let momentDate = moment(parseDate, "DD MMMM YYYY", "es").format(
          "DD/MM/YYYY"
        );
        el.birthday3 = momentDate;
        el.sign = this.getHoroscope(momentDate);
      });
      // console.log('xec2', values,  )
      //this.findPlayerDate()
      console.log("xec-2", values);

      return values;
    },
    findPlayerDate(date) {
      this.result = "";

      //this.getHoroscope(date);
      /*   setTimeout(() => {
        this.result = this.sign;
        this.mark = true;

        this.loading = false;
      }, 1000); */
      //this.loading = false;
    },

    findDate() {
      this.result = "";
      /*   (this.mark = false), */
      console.log("case 2", this.notFound, this.loading);

      this.getHoroscope(this.date);
      setTimeout(() => {
        this.result = this.sign;
        this.mark = true;

        this.loading = false;
      }, 1000);
      //this.loading = false;
    },
    async fetchCelebrity() {
      const url = `https://api.api-ninjas.com/v1/celebrity?name=${this.inputText}`;

      const result = await fetch(url, {
        headers: {
          "X-Api-Key": "9CzZfrgxOAMFyFCJzuejVw==BWv3UVcmX3LHcGUe",
        },
      })
        .then((response) => response.json())
        .then((data) => (this.celebrity = data[0]));
      console.log(result);
    },
    async getCelebrity() {
      //inicia el spinner
      this.result = "";
      this.mark = false;
      console.log("spinner on");
      this.loading = true;
      if (this.notFound) {
        this.findDate();
        return;
      }
      console.log("%cstep 1: geting input", "color:red", this.inputText);
      // this.getCeleb();
      await this.fetchCelebrity();
      /*   const url = `https://api.api-ninjas.com/v1/celebrity?name=${this.inputText}`;

      const result = await fetch(url, {
        headers: {
          "X-Api-Key": "9CzZfrgxOAMFyFCJzuejVw==BWv3UVcmX3LHcGUe",
        },
      })
        .then((response) => response.json())
        .then((data) => (this.celebrity = data[0])); */

      //   let date = moment(this.celebrity.birthday, "YYYY-MM-DD");
      //   let formatDate = moment(date).format("DD/MM/YYYY");
      //   let celebHoroscope = this.getHoroscope(formatDate);
      //    console.log("%cstep 2: fething api", "color:red", result);
      if (this.celebrity === undefined) {
        console.log("%cstep 2.2: fething api: NOT FOUND", "color:red");
        this.result =
          "Lo siento, famosito no encontrado, introduce su fecha de cumpleaños";
        this.notFound = true;
        // this.loading = false;
      } else {
        console.log(
          "%cstep 2.1: fething api: FOUND",
          "color:red",
          this.celebrity
        );
        let date = moment(this.celebrity.birthday, "YYYY-MM-DD");
        let formatDate = moment(date).format("DD/MM/YYYY");
        let transformDate = formatDate.slice(0, -4) + "2022";
        console.log(
          "%cstep 3: transforming birtday",
          "color:red",
          transformDate
        );
        this.getHoroscope(transformDate);
        this.result = this.sign;
      }
      console.log("reach the end");
      console.log("spinner off");
      this.mark = true;

      this.loading = false;
    },
    filterPlayers(sign) {
      let result = [];
      result = this.getDB_SIGN.filter((player) => player.sign === sign.name);
      return result;
    },
    getHoroscope(date) {
      let transformDate = date.slice(0, -4) + "2022";
      this.result = "";
      this.loading = true;

      const Moment = require("moment"),
        MomentRange = require("moment-range"),
        moment = MomentRange.extendMoment(Moment);

      // let day = moment(date, "DD/MM/YYYY");
      console.log(
        "%cstep 4: getting HOROSCOPE from",
        "color:red",
        date,
        transformDate
      );
      signs.forEach((sign) => {
        let range = moment.range(
          moment(sign.from, "DD/MM/YYYY"),
          moment(sign.to, "DD/MM/YYYY")
        );
        if (range.contains(moment(transformDate, "DD/MM/YYYY"))) {
          console.log("%cstep 5: RESULT", "color:red", sign.name);

          //this.loading = false;
          this.sign = sign.name;
        }
      });
      console.log(this.sign);

      return this.sign;
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.avatar {
}
.q-field__messages {
  color: var(--info) !important;
}
</style>
