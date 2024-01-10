import { render, html } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";

import { createFurniture } from "../api/data.js";

const createTemplate = () => html `
  <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @onSubmit="${onSubmit}">
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control valid" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
`;

export async function createView(context) {
    console.log("...createView...", context);

    // const id = context.params.id;

    // const data = await createFurniture();

    render(createTemplate(), document.querySelector("body div.container"));
}

function onSubmit(event) {
    console.log("check");

    event.preventDefault();

    const formData = new FormData(event.target);

    const make = formData.get("make");
    const price = formData.get("price");
    const model = formData.get("model");
    const year = formData.get("year");
    const material = formData.get("material");
    const description = formData.get("description");
    const img = formData.get("img");

    //const id = document.querySelector("form").id;

    let isFormValid = true;

    model.length >= 4 ?
        validate(newModelElem, true) :
        validate(newModelElem, false);
    make.length >= 4 ? validate(newMakeElem, true) : validate(newMakeElem, false);
    Number(price) > 0 ?
        validate(newPriceElem, true) :
        validate(newPriceElem, false);
    description.length >= 10 ?
        validate(newDescriptionElem, true) :
        validate(newDescriptionElem, false);
    img !== "" ? validate(newImgElem, true) : validate(newImgElem, false);
    Number(year) >= 1950 && Number(year) <= 2050 ?
        validate(newYearElem, true) :
        validate(newYearElem, false);

    // field validation
    // if true => add class `is-valid`
    // if false => add class `is-invalid` + isFormValid = false

    function validate(element, boolean) {
        if (boolean) {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
        } else {
            isFormValid = false;

            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
        }
    }

    if (isFormValid) {
        const data = {
            make,
            price,
            model,
            year,
            material,
            description,
            img
        };

        createFurniture(data);

        page.redirect("/");
    }
}