import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFacts } from "../api/data.js";

const dashboardTemplate = (facts) => html`
<h2>Fun Facts</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${!facts ? html`
          <h2>No Fun Facts yet.</h2>
          ` : 
          facts.map( (fact) => html `
          <div class="fact">
            <img src="${fact.imageUrl}" alt="example" />
            <h3 class="category">${fact.category}</h3>
            <p class="description">${fact.description}</p>
            <a class="details-btn" href="/details/${fact._id}">More Info</a>
          </div>
          `)}
        </section>
`;

export async function showDashboard(ctx) {
    
    const facts = await getAllFacts();
    console.log(facts);
    
    ctx.render(dashboardTemplate(facts));
}