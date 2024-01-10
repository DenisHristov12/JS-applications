function attachEvents() {
    // TODO

    // load phonebook -> fetch (GET)
    // update phonebook -> update html content
    // delete entry -> use fetch (DELETE)
    // create entry -> use fetch (POST)
    const baseUrl = "http://localhost:3030/jsonstore/phonebook";

    const ulItem = document.getElementById("phonebook");
    const loadBtn = document.getElementById("btnLoad");

    const personName = document.getElementById("person");
    const phNum = document.getElementById("phone");
    const btnCreate = document.getElementById("btnCreate");


    loadBtn.addEventListener("click", loadItems);

    ulItem.addEventListener("click", deleteEntry);

    btnCreate.addEventListener("click", createEntry);

    async function loadItems(e) {
        const response = await fetch(baseUrl);

        const data = await response.json();

        ulItem.textContent = "";

        Object.values(data).forEach((ph) => {
            const liItem = document.createElement("li");
            const deleteBtn = document.createElement("button");

            liItem.textContent = `${ph.person}: ${ph.phone}`;
            deleteBtn.textContent = "Delete";
            deleteBtn.setAttribute("id", ph._id);
            liItem.appendChild(deleteBtn);
            ulItem.appendChild(liItem);
        });

    }

    async function deleteEntry(e) {
        
        if(e.target.textContent !== "Delete"){
            return;
        }

        const currPhoneID = e.target.id;

        const settings = {
            'method': 'DELETE'
        };

        await fetch(`${baseUrl}/${currPhoneID}`, settings);

        loadItems();
    }

    async function createEntry(e) {
        if(!personName.value.trim() || !phNum.value.trim()){
            alert("Person and Phone fields are required!");
        }

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                person: personName.value,
                phone: phNum.value
            })
        };

        await fetch(baseUrl, settings);

        personName.value = "";
        phNum.value = "";

        loadItems();
    }
}

attachEvents();