import page from "../../node_modules/page/page.mjs"
import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllMotorcycles, getMCById, updateMC } from "../api/data.js";

const editTemplate = (mc, onEdit) =>  html`
<section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${onEdit}>
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  value="${mc.model}"
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  placeholder="Moto Image"
                  value="${mc.imageUrl}"
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                value="${mc.year}"
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              value="${mc.mileage}"
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              value="${mc.contact}"
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
              >${mc.about}</textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    
    const MC = await getMCById(id);
    
    ctx.render(editTemplate(MC, onEdit));

    console.log(MC);

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        if(!data.about || !data.year || !data.model || !data.contact || !data.mileage || !data.imageUrl){
            alert("No data!");
            return;
        }

        try {
            await updateMC(id, data);

            page.redirect(`/details/${id}`);
        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}