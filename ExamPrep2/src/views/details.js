import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { deleteAlbumById, getAlbumById, getAllAlbums, getAllLikesByAlbumIdAndUserId, likeAlbumById, likesByAlbumId } from '../api/data.js';

const detailsTemplate = (album, albumLikes, user, isLiked, onDelete, onLike) => {
    const isCreator = album._ownerId === user?._id;
    
    return html `
<section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src="http://127.0.0.1:5500/Advanced/JSApplications/ExamPrep2${album.imageUrl}" alt="example" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${albumLikes}</span></div>

          ${user ? html`
          <div id="action-buttons">
            ${!isCreator && !isLiked ? html`<a href="" id="like-btn" @click=${onLike}>Like</a>` : nothing}
            ${isCreator ? 
                html`
                <a href="/edit/${album._id}" id="edit-btn">Edit</a>
                <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
            ` : nothing}
          </div>
          ` : nothing}
        </div>
      </section>
`;};

export async function showDetails(ctx) {
    const albumId = ctx.params.id;

    const album = await getAlbumById(albumId);

    const albumLikes = await likesByAlbumId(albumId);

    let isLiked = false;

    if(ctx.user){
        isLiked = !!(await getAllLikesByAlbumIdAndUserId(albumId, ctx.user._id));
    }

    ctx.render(detailsTemplate(album, albumLikes, ctx.user, isLiked, onDelete, onLike));

    async function onDelete() {
        try {
            await deleteAlbumById(albumId);

            ctx.page.redirect("/dashboard");
        } catch (err) {
            console.log(err.message);
        }
    }

    async function onLike() {
        try {
            await likeAlbumById({albumId: album._id});

            ctx.page.redirect("/details/" + albumId);
        } catch (err) {
            console.log(err.message);
        }
    }
}