import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { createCar } from '../api/data.js';

const createTemplate = (onCreate) => html`
  <section id="create">
    <div class="form form-auto">
      <h2>Share Your Car</h2>
      <form
        class="create-form"
        @submit=${onCreate}>
        <input
          type="text"
          name="model"
          id="model"
          placeholder="Model" />
        <input
          type="text"
          name="imageUrl"
          id="car-image"
          placeholder="Your Car Image URL" />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro" />
        <input
          type="number"
          name="weight"
          id="weight"
          placeholder="Weight in Kg" />
        <input
          type="text"
          name="speed"
          id="speed"
          placeholder="Top Speed in Kmh" />
        <textarea
          id="about"
          name="about"
          placeholder="More About The Car"
          rows="10"
          cols="50"></textarea>
        <button type="submit">Add</button>
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
      await createCar(data);

      ctx.page.redirect('/dashboard/');
    } catch (error) {
      console.log(err.message);
      return;
    }
  }
}
