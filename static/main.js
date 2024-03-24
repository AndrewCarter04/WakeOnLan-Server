
function trigger_wakeup() {
    let id = this.dataset.id
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "/wake", true);
    xhr.onload = e => {
        if (xhr.readyState === 4) { // Once Request is Complete
            if (xhr.status === 200) {
                alert("Success!")
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
                    alert("Device Online")
                } else if (resObj.status === "offline") {
                    alert("Device Offline")
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
    for (let item of document.getElementsByClassName("wol-trigger")) {
        item.addEventListener("click", trigger_wakeup)
    }
    for (let item of document.getElementsByClassName("ping-test")) {
        item.addEventListener("click", ping_test)
    }

})