import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAlbumById, updateAlbumById } from '../api/data.js';

const editTemplate = (a, onEdit) => html `
<section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value="${a.singer}" />
            <input type="text" name="album" id="album-album" placeholder="Album" value="${a.album}"/>
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value="${a.imageUrl}"/>
            <input type="text" name="release" id="album-release" placeholder="Release date" value="${a.release}"/>
            <input type="text" name="label" id="album-label" placeholder="Label" value="${a.label}"/>
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value="${a.sales}"/>

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;

export async function showEdit(ctx) {
    const album = await getAlbumById(ctx.params.id);

    ctx.render(editTemplate(album, onEdit));

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        if(!data.singer || !data.album || !data.release || !data.imageUrl || !data.label || !data.sales){
            return;
        }

        try {
            await updateAlbumById(ctx.params.id, data);

            ctx.page.redirect('/details/' + ctx.params.id);
        } catch (err) {
            console.log(err.message);
            return;
        }
    }
}