function solve() {
    // TODO

    // get needed elements - buttons, stop info
    // nextStopID = 'depot'
    // get next stop info with next stopID
    // parse response to json
    // update html
    // error handling

    const stopInfo = document.querySelector('div#info span.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let nextStopID = "depot";
    let stopName = "";

    async function depart() {
        //TODO
        try{
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopID}`);

            if(!response.ok){
                const error = new Error();
                error.message = response.statusText;
                error.status = response.status;

                throw error;
            }

            const data = await response.json();

            stopName = data.name;
            nextStopID = data.next;

            stopInfo.textContent = `Next stop ${stopName}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        }catch(err){
            stopInfo.textContent = 'Error';

            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        // TODO
        stopInfo.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();