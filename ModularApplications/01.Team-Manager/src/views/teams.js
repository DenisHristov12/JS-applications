import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllTeams, getAllTeamMembers } from "../api/data.js";

const teamsTemplate = (user, teams, groups) => html `
<section id="browse">

<article class="pad-med">
    <h1>Team Browser</h1>
</article>

${user ? html`
<article class="layout narrow">
    <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
</article>
` : nothing}

${teams.map( (team) => html `
<article class="layout">
    <img src="${team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${groups[team._id]} Members</span>
        <div><a href="/teams/${team._id}" class="action">See details</a></div>
    </div>
</article>
`)}

</section>
`;

export async function showTeams(ctx) {
    const teams = await getAllTeams();

    const members = await getAllTeamMembers();

    const groups = {};

    members.forEach(({teamId}) => {
        if(groups[teamId]){
            groups[teamId] += 1;
        }else{
            groups[teamId] = 1;
        }
    });

    console.log(members);

    ctx.render(teamsTemplate(ctx.user, teams, groups));
}