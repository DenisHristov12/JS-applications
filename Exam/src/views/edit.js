import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getCarById, editCarById } from '../api/data.js';

{
  /* <section id="edit">
          <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form class="edit-form">
              <input type="text" name="model" id="model" placeholder="Model" />
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                id="speed"
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section> */
}

const editTemplate = (car, onEdit) =>
  // const isCreator = fact._ownerId === user?._id;
  // return
  html`
    <section id="edit">
      <div class="form form-auto">
        <h2>Edit Your Car</h2>
        <form
          class="edit-form"
          @submit=${onEdit}>
          <input
            type="text"
            name="model"
            id="model"
            placeholder="Model"
            value=${car.model} />
          <input
            type="text"
            name="imageUrl"
            id="car-image"
            placeholder="Your Car Image URL"
            value=${car.imageUrl} />
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Price in Euro" />
          value=${car.price}
          <input
            type="number"
            name="weight"
            id="weight"
            placeholder="Weight in Kg" />
          value=${car.weight}
          <input
            type="text"
            name="speed"
            id="speed"
            placeholder="Top Speed in Kmh" />
          value=${car.speed}
          <textarea
            id="about"
            name="about"
            placeholder="More About The Car"
            rows="10"
            cols="50">
${car.about}</textarea
          >
          <button type="submit">Edit</button>
        </form>
      </div>
    </section>
  `;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const car = await getCarById(id);

  ctx.render(editTemplate(car, onEdit));

  async function onEdit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    console.log(data);

    if (
      !data.model ||
      !data.imageUrl ||
      !data.speed ||
      !data.price ||
      !data.weight ||
      !data.about
    ) {
      console.log('Error');
      return;
    }

    try {
      await editCarById(ctx.params.id, data);

      ctx.page.redirect('/details/' + ctx.params.id);
    } catch (error) {
      console.log(err.message);
      return;
    }
  }
}
