import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllAlbums } from '../api/data.js';

const dashboardTemplate = (albums) => html `
<section id="dashboard">
        <h2>Albums</h2>
        ${albums.length !== 0 ? html`
        <ul class="card-wrapper">
            ${albums.map(a => html`
          <li class="card">
            <img src="http://127.0.0.1:5500/Advanced/JSApplications/ExamPrep2${a.imageUrl}" alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${a.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${a.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${a.sales}</span></p>
            <a class="details-btn" href="/details/${a._id}">Details</a>
          </li>
          `)}
        </ul>
        `: html`
        <h2>There are no albums added yet.</h2>
        `}
      </section>
`;

export async function showDashboard(ctx) {
    const albums = await getAllAlbums();

    // console.log(albums);

    ctx.render(dashboardTemplate(albums));
}