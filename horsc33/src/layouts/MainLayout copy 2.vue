<template>
  <div class="text-center text-info q-px-lg">
    <h1>Celebrity Zodiac</h1>
    <h5>Football Edition</h5>
    <h2 class="text-h5">Busca el horóscopo de un futbolista argentino</h2>

    <q-btn
      text-color="dark"
      @click="getHoroscope(date)"
      color="info"
      class="q-mt-md q-pa-sm"
      icon="search"
      label="Buscar"
      style="font-size: 2vw"
    />
    <div>
      <br />

      <ol>
        <li v-for="player in getDB_IMG" :key="player.name">
          {{ player.name }}
          <div
            :style="`width: 100px; height: 100px; border-radius: 50%; background-image: url(${player.img}); background-size: cover`"
          ></div>
        </li>
      </ol>
      {{ apiSigns.map((el) => [el.name, el.range]) }}
      <h5>Total jugadores: {{ getDB_SIGN.length }}</h5>
      <!--       <ul>
        <li :key="sign.name" v-for="sign in getSigns">
          <h6>{{ sign.name }}</h6>
          <ul>
            <li :key="player.name" v-for="player in filterPlayers(sign)">
              {{ player.name }} ::  {{ player.sign }}
            </li>
          </ul>
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { DB, DB_SIGN, DB_IMG } from "src/DB.js";

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
      apiSigns: null,
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
    /*     filterDB() {
      let date = DB[3].birthday;
      console.log('*******************', date);
      const index = date.search(/[0-9]/);
     let  newDate = date.slice(index)
      console.log(newDate.split('(')[0].trim());
      console.log('*******************');

      return DB.map((el) => el.birthday);
    }, */
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
  created() {
    //this.date = this.today;
    this.mark = false;
    this.getSignsApi();
  },
  methods: {
    async getSignsApi() {
      try {
        await axios.get("http://localhost:3000/signs.json").then((result) => {
          console.log(result);
          this.apiSigns = result.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    filterDB() {
      console.log("*********************");
      let values = this.getDB;
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

      /* console.log('here we test');
let transDB = this.getDB
transDB.forEach(el => {
  el.name = 'Heredia'
}) */
      /* console.log(transDB);
       */ /*    let testDate = "9 de enero de 1978";
      let parseDate = testDate.replace(/de/g, "").replace(/\s{2}/g, " ");
      console.log(parseDate);
      let momentDate = moment(parseDate, "DD MMMM YYYY", "es").format(
        "DD/MM/YYYY"
      ); */
      //console.log(momentDate, "*********************");

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
</style>
