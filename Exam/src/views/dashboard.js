import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllCars } from '../api/data.js';

const dashboardTemplate = (cars) => html`
  <h3 class="heading">Our Cars</h3>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${!cars
      ? html` <h3 class="nothing">Nothing to see yet</h3> `
      : cars.map(
          (car) => html`
            <div class="car">
              <img
                src="${car.imageUrl}"
                alt="example1" />
              <h3 class="model">${car.model}</h3>
              <div class="specs">
                <p class="price">Price: ${car.price}</p>
                <p class="weight">Weight: ${car.weight} kg</p>
                <p class="top-speed">Top Speed: ${car.speed} kph</p>
              </div>
              <a
                class="details-btn"
                href="/details/${car._id}"
                >More Info</a
              >
            </div>
          `
        )}
  </section>
`;

export async function showDashboard(ctx) {
  const cars = await getAllCars();
  console.log(cars);

  ctx.render(dashboardTemplate(cars));
}
