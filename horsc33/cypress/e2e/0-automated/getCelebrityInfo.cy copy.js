/// <reference types="cypress" />

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
    {
      name: "Cristian Osvaldo Álvarez",
      link: "/wiki/Cristian_Osvaldo_%C3%81lvarez",
    },
    {
      name: "Cristian Darío Álvarez",
      link: "/wiki/Cristian_Dar%C3%ADo_%C3%81lvarez",
    },
    { name: "Daniel Toribio Aquino", link: "/wiki/Daniel_Toribio_Aquino" },
    { name: "Rodolfo Arruabarrena", link: "/wiki/Rodolfo_Arruabarrena" },
    { name: "Roberto Ayala", link: "/wiki/Roberto_Ayala" },
    { name: "Éver Banega", link: "/wiki/%C3%89ver_Banega" },
    { name: "Leonardo Biagini", link: "/wiki/Leonardo_Biagini" },
    { name: "Fernando Cáceres", link: "/wiki/Fernando_C%C3%A1ceres" },
    { name: "Ángel Correa", link: "/wiki/%C3%81ngel_Correa" },
    {
      name: "Pedro de la Vega (futbolista)",
      link: "/wiki/Pedro_de_la_Vega_(futbolista)",
    },
    { name: "Hermes Desio", link: "/wiki/Hermes_Desio" },
    { name: "Alfredo Di Stéfano", link: "/wiki/Alfredo_Di_St%C3%A9fano" },
    {
      name: "Cristian Fabián Díaz",
      link: "/wiki/Cristian_Fabi%C3%A1n_D%C3%ADaz",
    },
    { name: "Víctor Hugo Doria", link: "/wiki/V%C3%ADctor_Hugo_Doria" },
    {
      name: "Juan Eduardo Esnáider",
      link: "/wiki/Juan_Eduardo_Esn%C3%A1ider",
    },
    { name: "Carlos Fenoy", link: "/wiki/Carlos_Fenoy" },
    { name: "Enzo Ferrero", link: "/wiki/Enzo_Ferrero" },
    { name: "Santiago Feuillassier", link: "/wiki/Santiago_Feuillassier" },
    { name: "José Oscar Flores", link: "/wiki/Jos%C3%A9_Oscar_Flores" },
    { name: "Ezequiel Garay", link: "/wiki/Ezequiel_Garay" },
    {
      name: "Adolfo García Alonso",
      link: "/wiki/Adolfo_Garc%C3%ADa_Alonso",
    },
    { name: "Kily González", link: "/wiki/Kily_Gonz%C3%A1lez" },
    { name: "Ariel Ibagaza", link: "/wiki/Ariel_Ibagaza" },
    { name: "Mauro Icardi", link: "/wiki/Mauro_Icardi" },
    { name: "Federico León", link: "/wiki/Federico_Le%C3%B3n" },
    {
      name: "Claudio Javier López",
      link: "/wiki/Claudio_Javier_L%C3%B3pez",
    },
    {
      name: "Gustavo Adrián López",
      link: "/wiki/Gustavo_Adri%C3%A1n_L%C3%B3pez",
    },
    { name: "Lionel Messi", link: "/wiki/Lionel_Messi" },
    { name: "Hugo Módigo", link: "/wiki/Hugo_M%C3%B3digo" },
    { name: "Horacio Abel Moyano", link: "/wiki/Horacio_Abel_Moyano" },
    { name: "Marcelo Ojeda", link: "/wiki/Marcelo_Ojeda" },
    { name: "Mariano Pernía", link: "/wiki/Mariano_Pern%C3%ADa" },
    { name: "Diego Perotti", link: "/wiki/Diego_Perotti" },
    { name: "Juan Antonio Pizzi", link: "/wiki/Juan_Antonio_Pizzi" },
    { name: "Mauricio Pochettino", link: "/wiki/Mauricio_Pochettino" },
    { name: "Martín Posse", link: "/wiki/Mart%C3%ADn_Posse" },
    { name: "Fernando Redondo", link: "/wiki/Fernando_Redondo" },
    {
      name: "Gonzalo Javier Rodríguez",
      link: "/wiki/Gonzalo_Javier_Rodr%C3%ADguez",
    },
    { name: "Javier Saviola", link: "/wiki/Javier_Saviola" },
    { name: "Gabriel Schürrer", link: "/wiki/Gabriel_Sch%C3%BCrrer" },
    { name: "Valentino Scotta", link: "/wiki/Valentino_Scotta" },
    { name: "Diego Simeone", link: "/wiki/Diego_Simeone" },
    { name: "Santiago Solari", link: "/wiki/Santiago_Solari" },
    { name: "Alexander Szymanowski", link: "/wiki/Alexander_Szymanowski" },
    { name: "Marcelo Trobbiani", link: "/wiki/Marcelo_Trobbiani" },
    { name: "Leonardo Ulloa", link: "/wiki/Leonardo_Ulloa" },
    { name: "Jorge Valdano", link: "/wiki/Jorge_Valdano" },
    { name: "Pablo Zabaleta", link: "/wiki/Pablo_Zabaleta" },
    { name: "Rafael Zuviría", link: "/wiki/Rafael_Zuvir%C3%ADa" },
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
    // let array = [];
    /*     let object = DB[0];
    let link = object.link
    cy.visit(url + link); */
    let transDB = [];
    DB.forEach((object) => {
      let link = object.link;
      cy.visit(url + link);
      cy.get("th")
        .contains("Nacimiento")
        .next()
        .then(($el) => {
          const txt = $el.text();
          object.birthday = txt;
        });
      transDB.push(object);
    });
    console.log(transDB);
  });
});
