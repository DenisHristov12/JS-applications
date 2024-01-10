import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const townTemplate = html`
   <ul>
      ${towns.map(town => html`<li id="${town}">${town}</li>`)}
   </ul>
`;

const townsDiv = document.getElementById('towns');

render(townTemplate, townsDiv);

document.querySelector("button").addEventListener("click", onSearch);

function onSearch(e) {
   const text = document.getElementById("searchText").value;

   const result = towns.filter((t) => {
      if(t.includes(text)){
         const match = document.getElementById(t);
         match.setAttribute("class", "active");
         return t;
      }
   });

   const resultEl = document.getElementById("result");

   resultEl.textContent = `${result.length} matches found`;
}