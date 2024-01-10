import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { createFact  } from "../api/data.js";

const createTemplate = (onCreate) => html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>
    
`;


export async function showCreate(ctx) {
    
    const id = ctx.params.id;
    
    ctx.render(createTemplate(onCreate));


    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        console.log(data);

        if(!data.category || !data["image-url"] || !data.description || !data["additional-info"]){
            console.log("Error");
            return;
        }

        try {
            await createFact(data);

            ctx.page.redirect('/dashboard/');
        } catch (error) {
            console.log(err.message);
            return;
        }
    }
}