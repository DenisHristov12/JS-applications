import {html} from '../../node_modules/lit-html/lit-html.js';
import { createAlbum } from '../api/data.js';

const createTemplate = (onCreate) => html `
<section id="create">
        <div class="form" @submit=${onCreate}>
          <h2>Add Album</h2>
          <form class="create-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;

export function showCreate(ctx) {
    

    ctx.render(createTemplate(onCreate));

    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        if(!data.singer || !data.album || !data.release || !data.imageUrl || !data.label || !data.sales){
            return;
        }

        try {
            await createAlbum(data);

            ctx.page.redirect('/dashboard/');
        } catch (err) {
            console.log(err.message);
            return;
        }
    }
}