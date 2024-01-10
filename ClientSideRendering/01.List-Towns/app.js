import { html, render } from "../node_modules/lit-html/lit-html.js";

document.getElementById("btnLoadTowns").addEventListener("click", (e) => {
    e.preventDefault();

    const input = document.querySelector("#towns").value;

    const towns = input.split(", ");

    const townTemplate = html`
    <ul>
        ${towns.map((town) => html`<li>${town}</li>`)}
    </ul>
    `;

    const rootEl = document.getElementById("root");

    render(townTemplate, rootEl);
});