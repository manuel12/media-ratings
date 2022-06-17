/// <reference types="cypress" />

let testData = require("../../fixtures/test-data.json");
const series = testData.map((serie) => serie.title);
const testContexts = [
  "Scoreboard - Search results tests",
  "Scoreboard - Using intercept tests",
  "Scoreboard - Loading icons test",
];

const nonExistantSeries = [
  // "Buffy of Thrones",
  "Breaking Anatomy",
  // "South Mirror",
  // "Stranger Zone",
  // "Better Call MacGyver",
];

const testAllScoreValues = (imdbScore, tomatometerScore, audienceScore) => {
  cy.get("[data-test=imdb-header]")
    .should("be.visible")
    .and("contain.text", "IMDb");

  cy.get("[data-test=imdb-score-value]")
    .should("be.visible")
    .and("contain.text", imdbScore);

  cy.get("[data-test=rottentomatoes-header]")
    .should("be.visible")
    .and("contain.text", "Rottentomatoes");

  cy.get("[data-test=tomatometer-header]")
    .should("be.visible")
    .and("contain.text", "Avg tomatometer");

  cy.get("[data-test=tomatometer-value]")
    .should("be.visible")
    .and("contain.text", tomatometerScore);

  cy.get("[data-test=audience_score-header]")
    .should("be.visible")
    .and("contain.text", "Avg audience score");

  cy.get("[data-test=audience_score-value]")
    .should("be.visible")
    .and("contain.text", audienceScore);
};

// for (const testContext of testContexts) {
//   for (const serie in series) {
//     const currentTestData = testData[serie];

//     if (testContext === "Scoreboard - Loading icons test") {
//       describe(testContext, () => {
//         before(() => {
//           cy.intercept("http://localhost:8000/fetch-score-data/*", {});
//           cy.visit("/");
//           cy.get("#id_search").type(serie);
//           cy.get("[data-test=search-button]").should("be.visible").click();
//         });

//         it("should show loading icons before data is fetched", () => {
//           cy.get("#imdb-score > .spinner-border").should("be.visible");
//           cy.get("#tomatometer-value > .spinner-border").should("be.visible");
//           cy.get("#audience_score-value > .spinner-border").should(
//             "be.visible"
//           );
//         });
//       });
//     } else {
//       describe(`${testContext} for ${currentTestData.title}`, () => {
//         beforeEach(() => {
//           cy.visit("/");
//           cy.get("#id_search").type(currentTestData.title);
//           cy.get("[data-test=search-button]").should("be.visible").click();
//         });

//         it("should display current serie Title, IMDb and Rottentoes data", () => {
//           console.log(currentTestData);
//           cy.get("[data-test=media-title]")
//             .should("be.visible")
//             .and("contain.text", currentTestData.title);

//           testAllScoreValues(
//             currentTestData.imdb,
//             currentTestData.rt.tomatometer,
//             currentTestData.rt.audience_score
//           );
//         });
//       });
//     }
//   }
// }

// for (const serie in series) {
//   const currentTestData = testData[serie];

//   describe("Scoreboard - Parcial data tests", () => {
//     it("should display N/A for imdb score data and rottentomatoes data", () => {
//       const currentTestDataNoIMDB = Object.assign({}, currentTestData);
//       currentTestDataNoIMDB["imdb"] = "N/A";

//       cy.intercept(
//         "http://localhost:8000/fetch-score-data/*",
//         currentTestDataNoIMDB
//       );
//       cy.visit("/");
//       cy.get("#id_search").type(serie);
//       cy.get("[data-test=search-button]").should("be.visible").click();

//       testAllScoreValues(
//         "N/A",
//         currentTestDataNoIMDB.rt.tomatometer,
//         currentTestDataNoIMDB.rt.audience_score
//       );
//     });
//     it("should display score data for imdb score data and N/A for rottentomatoes data", () => {
//       const currentTestDataNoRT = Object.assign({}, currentTestData);
//       currentTestDataNoRT["rt"]["tomatometer"] = "N/A";
//       currentTestDataNoRT["rt"]["audience_score"] = "N/A";

//       cy.intercept(
//         "http://localhost:8000/fetch-score-data/*",
//         currentTestDataNoRT
//       );
//       cy.visit("/");
//       cy.get("#id_search").type(serie);
//       cy.get("[data-test=search-button]").should("be.visible").click();

//       cy.get("[data-test=imdb-header]")
//         .should("be.visible")
//         .and("contain.text", "IMDb");

//       testAllScoreValues(currentTestDataNoRT.imdb, "N/A", "N/A");
//     });
//   });
// }

for (const serie of nonExistantSeries) {
  describe(`Scoreboard - Non-existing series: (${serie}) tests`, () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("#id_search").type(serie);
      cy.get("[data-test=search-button]").should("be.visible").click();
    });

    it("Should display series Title and N/A IMDb and Rottentoes data", () => {
      // cy.get("[data-test=media-title]")
      //   .should("be.visible")
      //   .and("contain.text", serie);

      testAllScoreValues("N/A", "N/A", "N/A");
    });
  });
}
