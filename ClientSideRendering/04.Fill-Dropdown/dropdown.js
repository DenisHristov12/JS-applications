import { html, render } from "../node_modules/lit-html/lit-html.js";

async function getAllItems() {
    const response = await fetch("http://localhost:3030/jsonstore/advanced/dropdown");
    const data = await response.json();

    return data;
}

const items = Object.values(await getAllItems());

const itemTemplate = html`
    ${items.map( 
        (item) => html`<option value="${item._id}">${item.text}</option>`
    )}
`;

const menu = document.getElementById("menu");

render(itemTemplate, menu);

document.querySelector("input[type=submit]").addEventListener("click", addItem);

async function addItem(e) {
    //e.preventDefault();
    const text = document.getElementById("itemText").value;

    const response = await fetch("http://localhost:3030/jsonstore/advanced/dropdown", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text})
    });

    if(response.ok){
        // const newItem = await response.json();

        // const newItemTemplate = html`<option value="${newItem._id}">${newItem.text}</option>`;

        // render(newItemTemplate, menu);
    }else{
        console.log("Error");
    }
}