import {html} from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html `
<section id="home">
<img src="http://127.0.0.1:5500/Advanced/JSApplications/ExamPrep2/images/landing.png" alt="home" />

<h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
    here!</span></h2>
</section>`;

export function showHome(ctx) {

    // console.log(ctx);

    ctx.render(homeTemplate());
}