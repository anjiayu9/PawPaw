const apiKey = "AIzaSyCfTIJgyraAPohYyzkSnPJakFlNEXzD2cE";
const engineID = "1148ff606ea12418a";
const searchForm = document.getElementById("search-form");
const resultsDiv = document.getElementById("results");

gapi.load("client", () => {
  gapi.client.setApiKey(apiKey);
  gapi.client.load("https://language.googleapis.com/$discovery/rest?version=v1");
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const zipCode = document.getElementById("zip-code").value;
  const query = `therapy animal near ${zipCode}`;
  const nlpQuery = await analyzeQuery(query);
  const results = await retrieveInfo(nlpQuery);
  displayResults(results);
});

async function analyzeQuery(query) {
  const response = await gapi.client.language.documents.analyzeEntities({
    document: {
      content: query,
      type: "PLAIN_TEXT",
    },
  });

  const entities = response.result.entities || [];
  const processedQuery = entities.map(entity => entity.name).join(" ");
  return processedQuery;
}

async function retrieveInfo(query) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineID}&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.items || [];
}

function displayResults(results) {
  resultsDiv.innerHTML = "";
  results.forEach(result => {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("card");
    resultDiv.innerHTML = `
        <h3 class="card-title">${result.title}</h3>
        <a href="${result.link}" target="_blank">${result.link}</a>
        <p>${result.snippet}</p>
    `;
    resultsDiv.appendChild(resultDiv);
  });
}
