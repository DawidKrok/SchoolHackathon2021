// const { text } = require("body-parser");

var title = $("#title")[0];
var date = $("#date")[0];
var time = $("#time")[0];
var sub = $("#sub2")[0];
var img_link = $("#img_link")[0];
var nicInstance;
var text1;
var select = $("#eventSel")[0];
var mgType = 0;
var currentId;

function getEvents(i) {
    mgType = i;
    dataFetch("/get_all_events")
        .then(data => {
            if (mgType == 2)
                for (i = 0; i < data.length; i++) {
                    select.innerHTML += "<option value=" + data[i]._id + " >" + data[i].title + "</option>";
                }
            else if (mgType == 1) {
                for (i = 0; i < data.length; i++) {
                    select.innerHTML += "<option value=" + i + " >" + data[i].title + "</option>";
                }

                function updateEvents(i) {
                    if (!nicInstance) {
                        nicInstance = nicEditors.findEditor('text2');
                        console.log(nicInstance);
                    }
                    date.value = data[i].takes_place_on.substr(0, 10);
                    time.value = data[i].takes_place_on.substr(11, 5);
                    img_link.value = data[i].img_link;
                    nicInstance.setContent(data[i].description);
                    currentId = data[i]._id;
                }
                if (mgType == 1)
                    select.onchange = function () {
                        updateEvents(select.value)
                    }
            }
        })
}
function sendPlace() {
    if (mgType != 2) {
        if (!nicInstance) {
            nicInstance = nicEditors.findEditor('text2');
            console.log(nicInstance);
        }
    }
    if (mgType == 0) {
        console.log(date.value + "T" + time.value);
        text1 = nicInstance.getContent();
        authorizedFetch("/add_event", { "title": title.value, "takes_place_on": (date.value + "T" + time.value), "img_link": img_link.value, "description": text1 });
        title.value = "";
        date.value = "";
        time.value = "";
        img_link.value = "";
        nicInstance.setContent("");
    }
    else if (mgType == 1) {
        text1 = nicInstance.getContent();
        authorizedFetch("/update_event", { "id" : currentId,"takes_place_on": (date.value + "T" + time.value), "img_link": img_link.value, "description": text1 });
        select.innerHTML = "<option disabled selected value>--wybierz wydarzenie--</option>"
        getEvents(1);
    }
    else {
        authorizedFetch("/delete_event", { "id": select.value });
        select.innerHTML = "<option disabled selected value>--wybierz wydarzenie--</option>"
        getEvents(2);
    }

}


sub.onclick = sendPlace;
