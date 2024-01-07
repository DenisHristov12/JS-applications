async function getInfo() {
    //1. get busID from html
    const bussesUL = document.getElementById("buses");
    bussesUL.textContent = "";
    const stopID = document.getElementById("stopId").value;

    //2. fetch data
    try{
        // simulate loading data
        // document.getElementById("stopName").textContent = "Loading...";

        // await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve();
        //     }, 1000);
        // });

        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopID}`);

        if(!response.ok){
            const error = new Error(response.statusText);

            throw error;
        }

        //3. parse response
        const data = await response.json();

        //4. error handling


        //5. create li elements and add data to html
        document.getElementById("stopName").textContent = data.name;

        Object.entries(data.buses).forEach(([busId, time]) => {
            const liEl = document.createElement("li");
            liEl.textContent = `Bus ${busId} arrives in ${time} minutes`;
            bussesUL.appendChild(liEl);
        });
    }catch(err){
        document.getElementById("stopName").textContent = `Error: ${err.message}` || "Error";
    }

}