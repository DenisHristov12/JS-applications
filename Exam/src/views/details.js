import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteCarById, getCarById } from '../api/data.js';

const detailsTemplate = (car, user, onDelete) => {
  const isCreator = car._ownerId === user?._id;
  return html`
    <section id="details">
      <div id="details-wrapper">
        <img
          id="details-img"
          src="${car.imageUrl || car['image-url']}"
          alt="example1" />
        <p id="details-title">${car.model}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p class="price">Price: ${car.price}</p>
            <p class="weight">Weight: ${car.weight} kg</p>
            <p class="top-speed">Top Speed: ${car.speed} kph</p>
            <p id="car-description">${car.about}</p>
          </div>

          <div id="action-buttons">
            ${isCreator
              ? html` <a
                    href="/edit/${car._id}"
                    id="edit-btn"
                    >Edit</a
                  >
                  <a
                    @click=${onDelete}
                    href=""
                    id="delete-btn"
                    >Delete</a
                  >`
              : nothing}
          </div>
        </div>
      </div>
    </section>
  `;
};

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const car = await getCarById(id);

  ctx.render(detailsTemplate(car, ctx.user, onDelete));

  async function onDelete(e) {
    e.preventDefault();

    const confirmation = confirm('Do you want to delete this car?');

    if (confirmation === true) {
      await deleteCarById(id);

      ctx.page.redirect('/dashboard');
    } else {
      return;
    }
  }
}
