const apiKey = ""; //api key
const engineID = ""; //engine ID
const searchForm = document.getElementById("search-form");
const resultsDiv = document.getElementById("results");

 searchForm.addEventListener("submit", async (event) => {
     event.preventDefault();
     const zipCode = document.getElementById("zip-code").value;
     const query = `therapy animal near ${zipCode}`;
     const results = await retrieveInfo(query);
     displayResults(results);
 });

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
