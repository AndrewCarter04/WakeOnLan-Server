
function trigger_wakeup() {
    let id = this.dataset.id
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "/wake", true);
    xhr.onload = e => {
        if (xhr.readyState === 4) { // Once Request is Complete
            if (xhr.status === 200) {
                this.className = "btn btn-success"
                setTimeout(() => { this.className = "btn btn-outline-secondary"}, 1000)
            } else {
                alert(xhr.responseText)
            }
        }
    }
    xhr.onerror = e => {
        console.log(xhr.responseText)
    }
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"id": id}));
}

function ping_test() {
    let id = this.dataset.id
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "/ping", true);
    xhr.onload = e => {
        if (xhr.readyState === 4) { // Once Request is Complete
            if (xhr.status === 200) {
                let resObj = JSON.parse(xhr.responseText)
                if (resObj.status === "online") {
                    this.innerText = "Online"
                    this.className = "btn btn-success"
                } else if (resObj.status === "offline") {
                    this.innerText = "Offline"
                    this.className = "btn btn-danger"
                } else {
                    alert("An Error Occured: " + resObj)
                }
            } else {
                alert(xhr.responseText)
            }
        }
    }
    xhr.onerror = e => {
        console.log(xhr.responseText)
    }
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"id": id}));
}

window.addEventListener("load", () => {
    for (let item of document.getElementsByName("wol-trigger")) {
        item.addEventListener("click", trigger_wakeup)
    }
    for (let item of document.getElementsByName("ping-test")) {
        item.addEventListener("click", ping_test)
        item.dispatchEvent(new CustomEvent("click"))
    }

})