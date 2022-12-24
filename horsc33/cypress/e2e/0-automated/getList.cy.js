/// <reference types="cypress" />

describe("get Celebrity birthday", () => {
  let array = [];
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    let url =
      "https://es.wikipedia.org/wiki/Categor%C3%ADa:Futbolistas_argentinos_nacionalizados_en_Espa%C3%B1a";
    cy.visit(url);
  });

  it("search the list", () => {
    // let array = [];
    let links = [];
    let result = [];
    let linkGlobal = ''

    /* extraer 1 link de Directorio */

    cy.get(":nth-child(1) > ul > :nth-child(3) > a").then(($el) => {
      const link = $el.attr("href");
      //console.log(link)
    });

    cy.get("#mw-pages").within(($page) => {

      cy.get("ul > li > a").each((el) => {
        cy.get(el).then(($el) => {
          let object = { name: "", link: "" };
          let link = $el.attr("href");
          let name = $el.text();
          object.name = name;

          object.link = link;
          result.push(object);
        });
      });
      setTimeout(() => {
        linkGlobal = result[0].link;
        console.log(linkGlobal);
        console.log(JSON.stringify(result))
      }, 1);




    });
  });

});
