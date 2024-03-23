function trigger_wakeup() {
    console.log(this.dataset.address)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `/wake`, false);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({"address": this.dataset.address}));
    if (xhr.status === 200) {
        alert("Success!")
    } else {
        alert(xhr.responseText)
    }
}

window.addEventListener("load", () => {
    let all_triggers = document.getElementsByClassName("wol-trigger")
    for (let item of all_triggers) {
        //console.log(item.dataset.address)
        item.addEventListener("click", trigger_wakeup)
    }
})