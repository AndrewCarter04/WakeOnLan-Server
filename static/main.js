function raw_trigger(url, id) {
    console.log(id)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, false);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"id": id}));
    return xhr

}

function trigger_wakeup() {
    let result = raw_trigger("/wake", this.dataset.id)
    if (result.status === 200) {
        alert("Success!")
    } else {
        alert(result.responseText)
    }
}

function ping_test() {
    let result = raw_trigger("/ping", this.dataset.id)
    if (result.status === 200) {
        let resObj = JSON.parse(result.responseText)
        if (resObj.status === "online") {
            alert("Device Online")
        } else if (resObj.status === "offline") {
            alert("Device Offline")
        } else {
            alert("An Error Occured: " + resObj)
        }
    }
}

window.addEventListener("load", () => {
    for (let item of document.getElementsByClassName("wol-trigger")) {
        item.addEventListener("click", trigger_wakeup)
    }
    for (let item of document.getElementsByClassName("ping-test")) {
        item.addEventListener("click", ping_test)
    }

})