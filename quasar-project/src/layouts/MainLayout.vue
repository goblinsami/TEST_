<template>
  <div class="text-center text-info q-px-lg">
    <h1>Celebrity Zodiac</h1>
    <h2 class="text-h5">Busca el horóscopo de un famoso</h2>

    <div class="row justify-center">
      <q-input
        v-model="inputText"
        bg-color="info"
        filled
        class="col-6 q-my-md text-h6"
        label="Busca un famoso"
      />
    </div>
    <div v-if="notFound" class="row justify-center">
      <q-input class="col-6 text-h6" filled v-model="date" bg-color="info">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                mask="DD/MM/YYYY"
                v-model="date"
                color="info"
                text-color="dark"
              >
                >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <QBtn
      text-color="dark"
      @click="getCelebrity()"
      color="info"
      class="q-mt-md q-pa-sm"
      icon="search"
      label="Buscar"
      style="font-size: 4vw"
    />
    <!--   <h5>{{ inputText }}</h5> -->
    <div class="text-h5 q-my-md q-py-md row justify-center">
      <!--     <div v-if="celebrity && !loading">nacido el {{ celebrity.birthday }}</div> -->
      <div class="row justify-center">
        <transition name="fade">
          <div v-if="mark" class="q-pa-lg" style="min-width: 300px; border: 4px dashed #c7f9cc">
            <h2 :class="notFound ? 'text-h5' : 'text-h4'">
              {{ result }}
              <div v-if="!notFound">
                Nacido: {{ celebrity.birthday }}
                <br />
                Edad: {{ celebrity.age }}
                <br>
                Profesión: {{ celebrity.occupation }}
              </div>
            </h2>
          </div>
        </transition>
      </div>
      <div class="row justify-center" style="position: absolute">
        <transition name="fade">
          <div v-if="loading">
            <q-spinner-ball size="100px" color="info" />
          </div>
        </transition>
      </div>
    </div>
    <!--   {{ loading }} -->
  </div>
</template>
563492ad6f917000010000011c8dc1e1664f44519b8c2d721bf8118d
<script>
import moment from "moment";
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
  { name: "Capricornio", from: "22/12/2022", to: "19/01/2023" },
  { name: "Acuario", from: "20/01/2022", to: "18/02/2022" },
  { name: "Piscis", from: "19/02/2022", to: "20/03/2022" },
];
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      testString: null,
      show: true,

      notFound: false,
      inputText: null,
      date: null,
      result: null,
      celebrity: null,
      loading: false,
      sign: null,
      mark: true,
    };
  },
  computed: {
    today() {
      return moment().format("DD/MM/YYYY");
    },
  },
  created() {
    this.date = this.today;
    this.mark = false;
  },
  methods: {
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

    getHoroscope(date) {
      console.log("%cstep 4: getting HOROSCOPE from", "color:red", date);
      this.result = "";
      this.loading = true;

      const Moment = require("moment"),
        MomentRange = require("moment-range"),
        moment = MomentRange.extendMoment(Moment);

      // let day = moment(date, "DD/MM/YYYY");
      signs.forEach((sign) => {
        let range = moment.range(
          moment(sign.from, "DD/MM/YYYY"),
          moment(sign.to, "DD/MM/YYYY")
        );
        if (range.contains(moment(date, "DD/MM/YYYY"))) {
          console.log("%cstep 5: RESULT", "color:red", sign.name);

          //this.loading = false;
          this.sign = sign.name;
        }
      });
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
</style>
