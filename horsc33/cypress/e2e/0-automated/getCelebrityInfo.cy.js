/// <reference types="cypress" />
import axios from "axios";

describe("get Celebrity birthday", () => {
  const url = "https://es.wikipedia.org";
  const DB_small = [
    { name: "Kun Agüero", link: "/wiki/Kun_Ag%C3%BCero" },
    { name: "Pablo Aimar", link: "/wiki/Pablo_Aimar" },
    {
      name: "Cristian Osvaldo Álvarez",
      link: "/wiki/Cristian_Osvaldo_%C3%81lvarez",
    },
  ];
  const DB = [
    { name: "Kun Agüero", link: "/wiki/Kun_Ag%C3%BCero" },
    { name: "Pablo Aimar", link: "/wiki/Pablo_Aimar" },
    /*     {
      name: "Cristian Osvaldo Álvarez",
      link: "/wiki/Cristian_Osvaldo_%C3%81lvarez",
    }, */
    {
      name: "Cristian Darío Álvarez",
      link: "/wiki/Cristian_Dar%C3%ADo_%C3%81lvarez",
    },
    /*     { name: "Daniel Toribio Aquino", link: "/wiki/Daniel_Toribio_Aquino" }, */
    { name: "Rodolfo Arruabarrena", link: "/wiki/Rodolfo_Arruabarrena" },
    { name: "Roberto Ayala", link: "/wiki/Roberto_Ayala" },
    { name: "Éver Banega", link: "/wiki/%C3%89ver_Banega" },
    /*     { name: "Leonardo Biagini", link: "/wiki/Leonardo_Biagini" }, */
    { name: "Fernando Cáceres", link: "/wiki/Fernando_C%C3%A1ceres" },
    { name: "Ángel Correa", link: "/wiki/%C3%81ngel_Correa" },
    /*     {
      name: "Pedro de la Vega (futbolista)",
      link: "/wiki/Pedro_de_la_Vega_(futbolista)",
    }, */
    /* { name: "Hermes Desio", link: "/wiki/Hermes_Desio" }, */
    { name: "Alfredo Di Stéfano", link: "/wiki/Alfredo_Di_St%C3%A9fano" },
    /*     {
      name: "Cristian Fabián Díaz",
      link: "/wiki/Cristian_Fabi%C3%A1n_D%C3%ADaz",
    }, */
    /*     { name: "Víctor Hugo Doria", link: "/wiki/V%C3%ADctor_Hugo_Doria" }, */
    /*     {
      name: "Juan Eduardo Esnáider",
      link: "/wiki/Juan_Eduardo_Esn%C3%A1ider",
    }, */
    /*    { name: "Carlos Fenoy", link: "/wiki/Carlos_Fenoy" }, */
    { name: "Enzo Ferrero", link: "/wiki/Enzo_Ferrero" },
    /*  { name: "Santiago Feuillassier", link: "/wiki/Santiago_Feuillassier" }, */
    /*    { name: "José Oscar Flores", link: "/wiki/Jos%C3%A9_Oscar_Flores" }, */
    { name: "Ezequiel Garay", link: "/wiki/Ezequiel_Garay" },
    /*     {
      name: "Adolfo García Alonso",
      link: "/wiki/Adolfo_Garc%C3%ADa_Alonso",
    }, */
    { name: "Kily González", link: "/wiki/Kily_Gonz%C3%A1lez" },
    { name: "Ariel Ibagaza", link: "/wiki/Ariel_Ibagaza" },
    { name: "Mauro Icardi", link: "/wiki/Mauro_Icardi" },
    /*     { name: "Federico León", link: "/wiki/Federico_Le%C3%B3n" }, */
    /*     {
      name: "Claudio Javier López",
      link: "/wiki/Claudio_Javier_L%C3%B3pez",
    }, */
    /*     {
      name: "Gustavo Adrián López",
      link: "/wiki/Gustavo_Adri%C3%A1n_L%C3%B3pez",
    }, */
    { name: "Lionel Messi", link: "/wiki/Lionel_Messi" },
    /*     { name: "Hugo Módigo", link: "/wiki/Hugo_M%C3%B3digo" }, */
    /*     { name: "Horacio Abel Moyano", link: "/wiki/Horacio_Abel_Moyano" },
     */ /*  { name: "Marcelo Ojeda", link: "/wiki/Marcelo_Ojeda" }, */
    { name: "Mariano Pernía", link: "/wiki/Mariano_Pern%C3%ADa" },
    { name: "Diego Perotti", link: "/wiki/Diego_Perotti" },
    { name: "Juan Antonio Pizzi", link: "/wiki/Juan_Antonio_Pizzi" },
    { name: "Mauricio Pochettino", link: "/wiki/Mauricio_Pochettino" },
    /*     { name: "Martín Posse", link: "/wiki/Mart%C3%ADn_Posse" }, */
    { name: "Fernando Redondo", link: "/wiki/Fernando_Redondo" },
    {
      name: "Gonzalo Javier Rodríguez",
      link: "/wiki/Gonzalo_Javier_Rodr%C3%ADguez",
    },
    { name: "Javier Saviola", link: "/wiki/Javier_Saviola" },
    /*   { name: "Gabriel Schürrer", link: "/wiki/Gabriel_Sch%C3%BCrrer" }, */
    /*     { name: "Valentino Scotta", link: "/wiki/Valentino_Scotta" }, */
    { name: "Diego Simeone", link: "/wiki/Diego_Simeone" },
    { name: "Santiago Solari", link: "/wiki/Santiago_Solari" },
    { name: "Alexander Szymanowski", link: "/wiki/Alexander_Szymanowski" },
    { name: "Marcelo Trobbiani", link: "/wiki/Marcelo_Trobbiani" },
    { name: "Leonardo Ulloa", link: "/wiki/Leonardo_Ulloa" },
    { name: "Jorge Valdano", link: "/wiki/Jorge_Valdano" },
    { name: "Pablo Zabaleta", link: "/wiki/Pablo_Zabaleta" },
    /*     { name: "Rafael Zuviría", link: "/wiki/Rafael_Zuvir%C3%ADa" }, */
  ];
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    let url = "https://es.wikipedia.org";
    cy.visit(url);
  });

  it("search the celebrity", () => {
        cy.visit(url);

    // let array = [];
    /*     let object = DB[0];
    let link = object.link
    cy.visit(url + link); */
    //let transDB = [];
 /*    DB.forEach((object) => {
      let link = object.link;
      cy.visit(url + link);
      cy.get(".imagen > .image > img").then(($el) => {
        const img = $el[0].currentSrc;
        object.img = img;
      });

      cy.get("th")
        .contains("Nacimiento")
        .next()
        .then(($el) => {
          const txt = $el.text();
          object.birthday = txt;
        });
      transDB.push(object);
    }); */
 /*    axios.get("http://localhost:3000/signs.json").then((result) => {
      console.log(result);
      console.log(result.data);
    }); */
    axios
      .post("http://localhost:3000/players", {
        name: "Bere",
        sign: "Leo",
        birthday: "12/11/2001",
      })
      .then((result) => {
        console.log(result);
        console.log(result.data);
      });
  });
});

[
  {
    name: "Kun Agüero",
    link: "/wiki/Kun_Ag%C3%BCero",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ag%C3%BCero_in_2018.jpg/338px-Ag%C3%BCero_in_2018.jpg",
    birthday: "\nQuilmes, Argentina[1]​[2]​2 de junio de 1988 (34 años)",
  },
  {
    name: "Pablo Aimar",
    link: "/wiki/Pablo_Aimar",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Match_legends_2017_CC_%284%29.jpg/368px-Match_legends_2017_CC_%284%29.jpg",
    birthday: "\nRío Cuarto, Córdoba3 de noviembre de 1979 (42 años)",
  },
  {
    name: "Cristian Darío Álvarez",
    link: "/wiki/Cristian_Dar%C3%ADo_%C3%81lvarez",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/CristianAlvarez.JPG/368px-CristianAlvarez.JPG",
    birthday: "\nRosario, Santa Fe13 de noviembre de 1985 (36 años)",
  },
  {
    name: "Rodolfo Arruabarrena",
    link: "/wiki/Rodolfo_Arruabarrena",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Rodolfo_Arruabarrena_1995_%28cropped%29.jpg",
    birthday: "\nMarcos Paz, Buenos Aires20 de julio de 1975 (47 años)",
  },
  {
    name: "Roberto Ayala",
    link: "/wiki/Roberto_Ayala",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Roberto_Ayala_with_the_Telstar_18_Futsal_%2844201074712%29.jpg/368px-Roberto_Ayala_with_the_Telstar_18_Futsal_%2844201074712%29.jpg",
    birthday: "\nParaná, Argentina14 de abril de 1973 (49 años)",
  },
  {
    name: "Éver Banega",
    link: "/wiki/%C3%89ver_Banega",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/FRA-ARG_%281%29_%28cropped%29.jpg",
    birthday: "\nRosario, Argentina29 de junio de 1988 (34 años)",
  },
  {
    name: "Fernando Cáceres",
    link: "/wiki/Fernando_C%C3%A1ceres",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Fernando_C%C3%A1ceres_2020.jpg/368px-Fernando_C%C3%A1ceres_2020.jpg",
    birthday:
      "\nSan Isidro, Buenos Aires, Argentina7 de febrero de 1969 (53 años)",
  },
  {
    name: "Ángel Correa",
    link: "/wiki/%C3%81ngel_Correa",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/%C3%81ngel_Correa.jpg/330px-%C3%81ngel_Correa.jpg",
    birthday: "\nRosario, Santa Fe, Argentina9 de marzo de 1995 (27 años)",
  },
  {
    name: "Alfredo Di Stéfano",
    link: "/wiki/Alfredo_Di_St%C3%A9fano",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/07/Distefano_eg_1958.jpg",
    birthday: "\nBuenos Aires, Argentina4 de julio de 1926[4]​",
  },
  {
    name: "Enzo Ferrero",
    link: "/wiki/Enzo_Ferrero",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Ferrero_%28Boca%29_-_El_Gr%C3%A1fico_2722.jpg/368px-Ferrero_%28Boca%29_-_El_Gr%C3%A1fico_2722.jpg",
    birthday: "\nCampana, Buenos Aires3 de enero de 1953 (69 años)",
  },
  {
    name: "Ezequiel Garay",
    link: "/wiki/Ezequiel_Garay",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Ezequiel_Garay_Benfica.jpg/368px-Ezequiel_Garay_Benfica.jpg",
    birthday: "\nRosario, Santa Fe, Argentina10 de octubre de 1986 (36 años)",
  },
  {
    name: "Kily González",
    link: "/wiki/Kily_Gonz%C3%A1lez",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Kily_Gonzalez.jpg",
    birthday: "\nRosario, Argentina4 de agosto de 1974 (48 años)",
  },
  {
    name: "Ariel Ibagaza",
    link: "/wiki/Ariel_Ibagaza",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/32/Ariel_ibagaza_argentina_u20.jpg",
    birthday: "\nBuenos Aires, Argentina27 de octubre de 1976 (45 años)",
  },
  {
    name: "Mauro Icardi",
    link: "/wiki/Mauro_Icardi",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Zen-Int_%283.1%29.jpg",
    birthday: "\nRosario19 de febrero de 1993 (29 años)",
  },
  {
    name: "Lionel Messi",
    link: "/wiki/Lionel_Messi",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Lionel_Messi_20180626.jpg/368px-Lionel_Messi_20180626.jpg",
    birthday: "\nRosario, Argentina24 de junio de 1987 (35 años)",
  },
  {
    name: "Mariano Pernía",
    link: "/wiki/Mariano_Pern%C3%ADa",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Mariano_Pern%C3%ADa.jpg/368px-Mariano_Pern%C3%ADa.jpg",
    birthday: "\nTandil, Buenos Aires, Argentina4 de mayo de 1977 (45 años)",
  },
  {
    name: "Diego Perotti",
    link: "/wiki/Diego_Perotti",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Rus-Arg_2017_%285%29.jpg/368px-Rus-Arg_2017_%285%29.jpg",
    birthday: "\nMoreno26 de julio de 1988 (34 años)",
  },
  {
    name: "Juan Antonio Pizzi",
    link: "/wiki/Juan_Antonio_Pizzi",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Juan_Antonio_Pizzi.jpg/375px-Juan_Antonio_Pizzi.jpg",
    birthday: "\nSanta Fe, Argentina7 de junio de 1968 (54 años)",
  },
  {
    name: "Mauricio Pochettino",
    link: "/wiki/Mauricio_Pochettino",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Mauricio_Pochettino_2016_%28cropped%29.jpg",
    birthday: "\nMurphy, Santa Fe, Argentina2 de marzo de 1972 (50 años)",
  },
  {
    name: "Fernando Redondo",
    link: "/wiki/Fernando_Redondo",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Redondo_v_australia_%28cropped%29.jpg",
    birthday: "\nAdrogué, Buenos Aires6 de junio de 1969 (53 años)",
  },
  {
    name: "Gonzalo Javier Rodríguez",
    link: "/wiki/Gonzalo_Javier_Rodr%C3%ADguez",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Gonzalo_Javier_Rodriguez_2.jpg/368px-Gonzalo_Javier_Rodriguez_2.jpg",
    birthday: "\nBuenos Aires, Argentina10 de abril de 1984 (38 años)",
  },
  {
    name: "Javier Saviola",
    link: "/wiki/Javier_Saviola",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Javier_Saviola_-_S.L._Benfica_player.jpg/368px-Javier_Saviola_-_S.L._Benfica_player.jpg",
    birthday: "\nBuenos Aires11 de diciembre de 1981(40 años)",
  },
  {
    name: "Diego Simeone",
    link: "/wiki/Diego_Simeone",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Diego_Simeone.jpg/368px-Diego_Simeone.jpg",
    birthday: "\nBuenos Aires28 de abril de 1970 (52 años)",
  },
  {
    name: "Santiago Solari",
    link: "/wiki/Santiago_Solari",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Santiago_Solari_%28cropped%29.jpg/368px-Santiago_Solari_%28cropped%29.jpg",
    birthday: "\n Rosario, Argentina7 de octubre de 1976 (46 años)",
  },
  {
    name: "Alexander Szymanowski",
    link: "/wiki/Alexander_Szymanowski",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/El_CD_Legan%C3%A9s_a_Primera_%2826911425003%29_Szymanowski_%28cropped%29.jpg/368px-El_CD_Legan%C3%A9s_a_Primera_%2826911425003%29_Szymanowski_%28cropped%29.jpg",
    birthday: "\nBuenos Aires, Argentina13 de octubre de 1988 (34 años)",
  },
  {
    name: "Marcelo Trobbiani",
    link: "/wiki/Marcelo_Trobbiani",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MARCELO_TROBIANNI_%2825390359206%29.jpg/368px-MARCELO_TROBIANNI_%2825390359206%29.jpg",
    birthday: "\nCasilda, Argentina17 de febrero de 1955 (67 años)",
  },
  {
    name: "Leonardo Ulloa",
    link: "/wiki/Leonardo_Ulloa",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Leonardo_Ulloa_20140705_%28cropped%29.jpg/330px-Leonardo_Ulloa_20140705_%28cropped%29.jpg",
    birthday:
      "\nGeneral Roca, Río Negro, Argentina26 de julio de 1986 (36 años)",
  },
  {
    name: "Jorge Valdano",
    link: "/wiki/Jorge_Valdano",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Valdano.jpg",
    birthday:
      "\nLas Parejas, Santa Fe, Argentina4 de octubre de 1955 (67 años)",
  },
  {
    name: "Pablo Zabaleta",
    link: "/wiki/Pablo_Zabaleta",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Hertha_BSC_vs._West_Ham_United_20190731_%28127%29.jpg/375px-Hertha_BSC_vs._West_Ham_United_20190731_%28127%29.jpg",
    birthday: "\nArrecifes, Buenos Aires16 de enero de 1985 (37 años)",
  },
];
