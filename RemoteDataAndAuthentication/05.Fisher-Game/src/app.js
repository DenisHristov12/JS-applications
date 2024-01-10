import { html, render} from "../node_modules/lit-html/lit-html.js";

function app() {
    // console.log("here");

    const user = sessionStorage.getItem("user");

    if(user){
        document.querySelector("a#login").style.display = "none";
        document.querySelector("a#register").style.display = "none";
        document.querySelector("span").textContent = JSON.parse(user).email;
        document.querySelector("button.add").removeAttribute("disabled", "");
        // document.querySelector("#addForm .angler").removeAttribute("disabled", "");
        // document.querySelector("#addForm .weight").removeAttribute("disabled", "");
        // document.querySelector("#addForm .species").removeAttribute("disabled", "");
        // document.querySelector("#addForm .location").setAttribute("disabled", "");
        // document.querySelector("#addForm .bait").removeAttribute("disabled", "");
        // document.querySelector("#addForm .captureTime").removeAttribute("disabled", "");
        document.querySelector("button.update").removeAttribute("disabled", "");
        document.querySelector("button.delete").removeAttribute("disabled", "");
    }else{
        document.querySelector("a#login").style.display = "inline";
        document.querySelector("a#register").style.display = "inline";
        document.querySelector("a#logout").style.display = "none";
        document.querySelector("span").textContent = "guest";
        document.querySelector("button.add").setAttribute("disabled", "");
        // document.querySelector("#addForm .angler").setAttribute("disabled", "");
        // document.querySelector("#addForm .weight").setAttribute("disabled", "");
        // document.querySelector("#addForm .species").setAttribute("disabled", "");
        // document.querySelector("#addForm .location").setAttribute("disabled", "");
        // document.querySelector("#addForm .bait").setAttribute("disabled", "");
        // document.querySelector("#addForm .captureTime").setAttribute("disabled", "");
        document.querySelector("button.update").setAttribute("disabled", "");
        document.querySelector("button.delete").setAttribute("disabled", "");
    }

    const url = "http://localhost:3030/users/logout";

    document.getElementById("logout").addEventListener("click", async () => {
        // console.log("works");
        await fetch(url, {
            method: "GET",
            headers: {
            "X-Authorization": accessToken,
            },
        });

        sessionStorage.removeItem("user");

        document.querySelector("a#login").style.display = "inline";
        document.querySelector("a#register").style.display = "inline";
        document.querySelector("a#logout").style.display = "none";
        document.querySelector("span").textContent = "guest";

        window.location = "index.html";
    });

    document.querySelector("button.load").addEventListener("click", load);
    document.querySelector("button.add").addEventListener("click", onAdd);

    async function load(e) {
        //e.preventDefault();

        const main = document.querySelector("fieldset#main");

        const getUrl = "http://localhost:3030/data/catches";

        const response = await fetch(getUrl);
        const data = await response.json();

        // console.log(data);
        // console.log(JSON.parse(sessionStorage.getItem("user"))._id);

        const catchTemplate = (x) => {
            const isCatchOwner = x._ownerId === JSON.parse(sessionStorage.getItem("user"))._id;

            return html`
                    <div class="catch">
                        <label>Angler</label>
                        ${isCatchOwner ? html`<input type="text" class="angler" value="${x.angler}">` : html`<input type="text" class="angler" value="${x.angler}" disabled>`}
                        <label>Weight</label>
                        ${isCatchOwner ? html`<input type="text" class="weight" value="${x.weight}">` : html`<input type="text" class="weight" value="${x.weight}" disabled>`}
                        <label>Species</label>
                        ${isCatchOwner ? html`<input type="text" class="species" value="${x.species}">` : html`<input type="text" class="species" value="${x.species}" disabled>`}
                        <label>Location</label>
                        ${isCatchOwner ? html`<input type="text" class="location" value="${x.location}">` : html`<input type="text" class="location" value="${x.location}" disabled>`}
                        <label>Bait</label>
                        ${isCatchOwner ? html`<input type="text" class="bait" value="${x.bait}">` : html`<input type="text" class="bait" value="${x.bait}" disabled>`}
                        <label>Capture Time</label>
                        ${isCatchOwner ? html`<input type="number" class="captureTime" value="${x.captureTime}">` : html`<input type="number" class="captureTime" value="${x.captureTime}" disabled>`}
                        ${isCatchOwner ? html`<button @click="${onUpdate}" class="update" data-id="${x._id}">Update</button>` : html`<button class="update" data-id="${x._id}" disabled>Update</button>`}
                        ${isCatchOwner ? html`<button @click="${onDelete}" class="delete" data-id="${x._id}">Delete</button>` : html`<button class="delete" data-id="${x._id}" disabled>Delete</button>`}
                    </div>
        `;};

        const loadTemplate = (data) => html`
        <legend>Catches</legend>
        <div id="catches">
            ${data.map((x) => catchTemplate(x))}
        </div>
        `;

        render(loadTemplate(data), main);
    }

    async function onAdd(e) {
        e.preventDefault();

            const postUrl = "http://localhost:3030/data/catches";
            const AT = JSON.parse(sessionStorage.getItem("user")).accessToken;

            //console.log(id);
            // console.log(JSON.parse(sessionStorage.getItem("user")).accessToken);
            // return;

            const angler = document.querySelector("#addForm .angler").value;
            const weight = document.querySelector("#addForm .weight").value;
            const species = document.querySelector("#addForm .species").value;
            const location = document.querySelector("#addForm .location").value;
            const bait = document.querySelector("#addForm .bait").value;
            const captureTime = document.querySelector("#addForm .captureTime").value;

            if (!angler) {
                alert("angler is required!");
              } else if (!weight) {
                alert("weight is required!");
              } else if (!species) {
                alert("species is required!");
              } else if (!location) {
                alert("location is required!");
              } else if (!bait) {
                alert("bait is required!");
              } else if (!captureTime) {
                alert("captureTime is required!");
              }

            const settings = {
                method: "POST",
                headers: {
                    "X-Authorization": AT,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({angler, weight, species, location, bait, captureTime})
            };

            if(angler !== "" && weight !== "" && species !== "" && location !== "" && bait !== "" && captureTime !== ""){
                try {
                    const response = await fetch(postUrl, settings);
                
                    if (!response.ok) {
                      const error = await response.json();
                      throw new Error(error.message);
                    }

                    Array.from(addFormElem.querySelectorAll("input")).forEach(
                        (input) => (input.value = "")
                      );

                    await load();
                  } catch (error) {
                    alert(error.message);
                    throw error;
                  }
            }else{
                alert("Fill the blanks!");
            }

            //console.log(response);
    }

    document.querySelector("button.update").addEventListener("click", onUpdate);
    document.querySelector("button.delete").addEventListener("click", onDelete);

    async function onUpdate(e) {
        e.preventDefault();

        const putUrl = "http://localhost:3030/data/catches/";
        const id = e.target.attributes["data-id"].value;

        // console.log(id);
        // console.log(JSON.parse(sessionStorage.getItem("user")).accessToken);
        // return;

        const angler = document.querySelector(".angler").value.trim();
        const weight = document.querySelector(".weight").value.trim();
        const species = document.querySelector(".species").value.trim();
        const location = document.querySelector(".location").value.trim();
        const bait = document.querySelector(".bait").value.trim();
        const captureTime = document.querySelector(".captureTime").value.trim();

        if (!angler) {
            alert("angler is required!");
          } else if (!weight) {
            alert("weight is required!");
          } else if (!species) {
            alert("species is required!");
          } else if (!location) {
            alert("location is required!");
          } else if (!bait) {
            alert("bait is required!");
          } else if (!captureTime) {
            alert("captureTime is required!");
          }

        const settings = {
            method: "PUT",
            headers: {
                "X-Authorization": `${JSON.parse(sessionStorage.getItem("user")).accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({angler, weight, species, location, bait, captureTime})
        };

        if (angler && weight && species && location && bait && captureTime) {
            try {
                const response = await fetch(`${putUrl}${id}`, settings);
                if (!response.ok) {
                  throw new Error(response.statusText);
                }
        
                await load();
              } catch (err) {
                alert(err.message);
              }
            
        }
    }


    async function onDelete(e) {
        e.preventDefault();

        const delUrl = "http://localhost:3030/data/catches/";
        const id = e.target.attributes["data-id"].value;

        await fetch(`${delUrl}${id}`, {
            method: "DELETE",
            headers: {
                "X-Authorization": `${JSON.parse(sessionStorage.getItem("user")).accessToken}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        } else {
            await load();
        }
    }

}

app();