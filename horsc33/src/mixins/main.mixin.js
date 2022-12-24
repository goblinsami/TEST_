import axios from "axios";
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
    filterFnSign(val, update, abort) {
      if (this.apiPlayers) {
        update(() => {
          const needle = val.toLocaleLowerCase();
          this.options = this.apiSigns.map((el) => el.name)
            .filter((v) => v.toLocaleLowerCase().indexOf(needle) > -1);
        });
      }
    },
    setModelSign(val) {
      this.modelSign = val;
      this.searchBySign(this.modelSign);
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

    test() {
      alert("hel");
    },
    async searchBySign(sign) {
      this.mark = false;

      try {
        const res = await axios.get(
          `http://localhost:3000/players.json?sign=${sign}`
        );
        this.apiPlayers = res.data;
      } catch (error) {
        console.log(error);
      }
      this.mark = true;
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
      this.mark = false;
      try {
        const res = await axios.get("http://localhost:3000/players.json");
        this.apiPlayers = res.data;
      } catch (error) {
        console.log(error);
      }
      this.mark = true;
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
    checkFx() {
      console.log("check");
      //ARIES
      this.getHoroscope("14/04/1973");
      //TAURO
      this.getHoroscope("04/05/1977");
      //GEMINIS
      this.getHoroscope("01/06/1988");
      //CANCER
      this.getHoroscope("29/06/1988");
      //LEO
      this.getHoroscope("04/08/1974");

      //VIRGO
      /*   this.getHoroscope("22/09/1976");
      this.getHoroscope("02/09/1961"); */
      //CAPRICORNIO
      console.log("sign:", this.getHoroscope("11/01/1996"));
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
      //ACEPTA FECHAS 14/04/1973, DEVUELVE EL SIGNO
      let year = "2022";
      if (date[6] == 1) {
        year = "2023";
      }
      let transformDate = date.slice(0, -4) + year;
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
      return this.sign;
    },
  },
};
