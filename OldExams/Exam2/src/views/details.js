import page from "../../node_modules/page/page.mjs";
import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteMC, getMCById } from "../api/data.js";

const detailsTemplate = (mc, user, onDelete) => {
    const isCreator = mc._ownerId === user?._id;

    return html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${mc.imageUrl}" alt="example1" />
            <p id="details-title">${mc.title}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${mc.year}</p>
                <p class="mileage">Mileage: ${mc.mileage} km.</p>
                <p class="contact">Contact Number: ${mc.contact}</p>
                   <p id = "motorcycle-description">
                    ${mc.about}
                        </p>
              </div>
               <!--Edit and Delete are only for creator-->
               ${isCreator ? html `
               <div id="action-buttons">
            <a href="/edit/${mc._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="" id="delete-btn">Delete</a>
          </div>
               ` : nothing}
            </div>
        </div>
      </section>
        
`;
}

export async function showDetails(ctx) {
    const id = ctx.params.id;
    
    const MC = await getMCById(id);
    
    ctx.render(detailsTemplate(MC, ctx.user, onDelete));

    // console.log(MC);

    async function onDelete(e) {
        e.preventDefault();

        const confirmation = confirm("Do you want to delete this MC?");

        if(confirmation === true){
            await deleteMC(id);

            ctx.page.redirect("/dashboard");
        }else{
            return;
        }
    }
}