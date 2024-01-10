import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllMotorcycles } from "../api/data.js";

const dashboardTemplate = (mcs) => html`
        <h2>Available Motorcycles</h2>
        <section id="dashboard">
          ${!mcs ? html `<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>` 
          : mcs.map( (mc) => html `
          <div class="motorcycle">
            <img src="${mc.imageUrl}" alt="example1" />
            <h3 class="model">${mc.model}</h3>
            <p class="year">Year: ${mc.year}</p>
            <p class="mileage">Mileage: ${mc.mileage} km.</p>
            <p class="contact">Contact Number: ${mc.contact}</p>
            <a class="details-btn" href="/details/${mc._id}">More Info</a>
          </div>
          `)}
          
        </section>
`;

export async function showDashboard(ctx) {
    const MC = await getAllMotorcycles();
    
    ctx.render(dashboardTemplate(MC));

    console.log(MC);
}