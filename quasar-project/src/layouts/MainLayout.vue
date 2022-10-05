<template>
  <div class="text-center text-info q-px-lg">
    <h1>Welcome</h1>
    <h2 class="text-h5">Busca el horóscopo de un famoso</h2>
    <h3 class="text-h6">Busca una fecha</h3>

    <div class="row justify-center">
      <q-input
        v-model="inputText"
        bg-color="info"
        filled
        class="col-6 q-my-md text-h6"
        label="Busca un famoso"
      />
      <q-btn @click="getCelebrity()" bordered flat color="info" icon="search" />
    </div>
    <!--     <div class="row justify-center">
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
    </div> -->
    <!--   <h5>{{ date }}</h5> -->
    <!--     <QBtn
      text-color="dark"
      @click="getHoroscope(date)"
      color="info"
      class="q-mt-md q-pa-sm"
      icon="search"
      label="Buscar"
    /> -->
    <!--   <h5>{{ inputText }}</h5> -->
    <div class="text-h5 q-py-md">
      <div v-if="celebrity">nacido el {{ celebrity.birthday }}</div>
      <br />
      signo: {{ result }}
      <h5></h5>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      inputText: null,
      date: null,
      result: null,
      celebrity: null,
    };
  },
  computed: {
    today() {
      return moment().format("DD/MM/YYYY");
    },
  },
  created() {
    this.date = this.today;
  },
  methods: {
    async getCelebrity() {
      const url = `https://api.api-ninjas.com/v1/celebrity?name=${this.inputText}`;

      const result = await fetch(url, {
        headers: {
          "X-Api-Key": "9CzZfrgxOAMFyFCJzuejVw==BWv3UVcmX3LHcGUe",
        },
      })
        .then((response) => response.json())
        .then((data) => (this.celebrity = data[0]));

      console.log("888888");
      //   console.log(this.celebrity.birthday);
      let date = moment(this.celebrity.birthday, "YYYY-MM-DD");
      console.log(date);
      let formatDate = moment(date).format("DD/MM/YYYY");
      console.log(formatDate);
      let celebHoroscope = this.getHoroscope(formatDate);
      console.log(celebHoroscope);
    },

    getHoroscope(date) {
      console.log('maaaaagic')
      console.log(date);
      const Moment = require("moment"),
        MomentRange = require("moment-range"),
        moment = MomentRange.extendMoment(Moment);

      //const range = moment.range(start, end);
      //console.log(range);
      //const range = moment.range(start, end);

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

      //   let from = moment("23/09/2022", "DD/MM/YYYY");
      // let to = moment("22/10/2022", "DD/MM/YYYY");
      //  const range = moment.range(from, to);

      //    console.log(range);
      let day = moment(date, "DD/MM/YYYY");
      console.log("********************************");
      console.log({ day });
      signs.forEach((sign) => {
        let range = moment.range(
          moment(sign.from, "DD/MM/YYYY"),
          moment(sign.to, "DD/MM/YYYY")
        );
        if (range.contains(day)) {
                console.log("oros: **");

          console.log(sign.name);
          return sign.name;
        }
      });
    },
  },
};
</script>
