import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getTeamById, getTeamMemberByTeamId } from "../api/data.js";

const detailsTemplate = (user, team, members) => html `
            <section id="team-home">
                <article class="layout">
                    <img src="./assets/rocket.png" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">${members.length} Members</span>
                        <div>
                            <a href="/edit" class="action">Edit team</a>
                            <a href="/join" class="action">Join team</a>
                            <a href="/leave" class="action invert">Leave team</a>
                            Membership pending. <a href="#">Cancel request</a>
                        </div>
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                            <li>My Username</li>
                            ${members.map((tm) => html`
                            <li>${tm.name}<a href="#" class="tm-control action">Remove from team</a></li>
                            `)}
                        </ul>
                    </div>
                    <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">

                        ${members.map((tm) => html`
                        <li>${tm.name}<a href="#" class="tm-control action">Approve</a><a href="#"
                                    class="tm-control action">Decline</a></li>
                            `)}
                        </ul>
                    </div>
                </article>
            </section>
`;

export async function showDetails(ctx) {
    const id = ctx.params.id;

    const team = await getTeamById(id);

    const members = await getTeamMemberByTeamId(id);

    ctx.render(detailsTemplate(ctx.user, team, members));
}