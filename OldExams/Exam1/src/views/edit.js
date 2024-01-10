import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getFactById, editFactById } from "../api/data.js";

const editTemplate = (fact, onEdit) => 
    // const isCreator = fact._ownerId === user?._id;
    // return 
    html`
    <section id="edit">
    <div class="form">
      <h2>Edit Fact</h2>
      <form class="edit-form" @submit=${onEdit}>
        <input
        type="text"
        name="category"
        id="category"
        placeholder="Category"
        value="${fact.category}"
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
        value="${fact.imageUrl || fact["image-url"]}"
      />
      <textarea
      id="description"
      name="description"
      placeholder="Description"
      rows="10"
      cols="50"
    >${fact.description}</textarea>
    <textarea
      id="additional-info"
      name="additional-info"
      placeholder="Additional Info"
      rows="10"
      cols="50"
    >${fact.moreInfo || fact["additional-info"]}</textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  </section>
`;


export async function showEdit(ctx) {
    
    const id = ctx.params.id;
    const fact = await getFactById(id);
    
    ctx.render(editTemplate(fact, onEdit));


    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        console.log(data);

        if(!data.category || !data["image-url"] || !data.description || !data["additional-info"]){
            console.log("Error");
            return;
        }

        try {
            await editFactById(ctx.params.id, data);

            ctx.page.redirect('/details/' + ctx.params.id);
        } catch (error) {
            console.log(err.message);
            return;
        }
    }
}