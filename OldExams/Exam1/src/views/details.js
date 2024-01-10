import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteFactById, getFactById } from "../api/data.js";

const detailsTemplate = (fact, user, onDelete) => {
    const isCreator = fact._ownerId === user?._id;
    return html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fact.imageUrl || fact["image-url"]}" alt="example1" />
            <p id="details-category">${fact.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                  ${fact.description}
                  </p>
                   <p id ="more-info">
                    ${fact.moreInfo || fact["additional-info"]}
                        </p>
              </div>

              <h3>Likes:<span id="likes">0</span></h3>

          <div id="action-buttons">
          ${isCreator ? html`
          <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="" id="delete-btn">Delete</a>` : nothing}
             <!--Bonus - Only for logged-in users ( not authors )-->
             ${user ? html`
             <a href="" id="like-btn">Like</a>
             ` : nothing}

          </div>
            </div>
        </div>
      </section>
`;
}

export async function showDetails(ctx) {
    
    const id = ctx.params.id;
    const fact = await getFactById(id);
    
    ctx.render(detailsTemplate(fact, ctx.user, onDelete));

    async function onDelete(e) {
        e.preventDefault();

        const confirmation = confirm("Do you want to delete this fact?");

        if(confirmation === true){
            await deleteFactById(id);

            ctx.page.redirect("/dashboard");
        }else{
            return;
        }
    }
}