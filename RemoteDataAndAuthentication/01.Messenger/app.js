function attachEvents() {
    // TODO

    // get data from html
    // fetch with post
    // update html
    // fetch with get
    // update html

    const url = 'http://localhost:3030/jsonstore/messenger';

    const messagesLog = document.getElementById("messages");
    const sendBtn = document.getElementById("submit");
    const refreshBtn = document.getElementById("refresh");

    const name = document.getElementsByTagName("input")[0];
    const message = document.getElementsByTagName("input")[1];

    sendBtn.addEventListener("click", sendMessage);
    refreshBtn.addEventListener("click", showMessages);

    async function sendMessage(e) {
        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author: name.value,
                content: message.value,
            })
        };

        await fetch(url, settings);

        name.value = "";
        message.value = "";
    }

    async function showMessages(e) {
        messagesLog.textContent = "";
        const response = await fetch(url);

        const data = await response.json();

        Object.values(data).forEach((message) => {
            messagesLog.textContent += `${message.author}: ${message.content}\n`;
        });
    }
}

attachEvents();