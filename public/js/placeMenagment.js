// const { text } = require("body-parser");

var miejsce = $("#miejsce")[0];
var typ = $("#typ")[0];
var sub1 = $("#sub1")[0];
var map = $("#map")[0];
var game = $("#game")[0];
var nicInstance1;
var text1;
var select1 = $("#miejsceSel")[0];
var mgType = 0;
var id;
var currentId1

function getPlaces(i) {
    mgType = i;
    dataFetch("/get_all_places")
        .then(data => {
            if (mgType == 2)
                for (i = 0; i < data.length; i++) {
                    select1.innerHTML += "<option value=" + data[i]._id + " >" + data[i].name + "</option>";
                }
            else if (mgType == 1) {
                for (i = 0; i < data.length; i++) {
                    select1.innerHTML += "<option value=" + i + " >" + data[i].name + "</option>";
                }
                function updatePlaces(i) {
                    if (!nicInstance1) {
                        nicInstance1 = nicEditors.findEditor('text1');
                        console.log(nicInstance1);
                    }
                    typ.value = data[i].type;
                    map.value = data[i].map_url;
                    game.value = data[i].game_url;
                    nicInstance1.setContent(data[i].description);
                    currentId1 = data[i]._id;
                }

                select1.onchange = function () {
                    updatePlaces(select1.value)
                }
            }
        })
}

function sendPlace() {
    if (mgType != 2) {
        if (!nicInstance1) {
            nicInstance1 = nicEditors.findEditor('text1');
            console.log(nicInstance1);
        }
        text1 = nicInstance1.getContent();
    }

    if (mgType == 0) {
        authorizedFetch("/add_place", { "name": miejsce.value, "type": typ.value, "description": text1, "map_url": map.value, "game_url": game.value });
        miejsce.value = "";
        typ.value = "";
        map = "";
        game = "";
        nicInstance1.setContent("");
    }
    else if (mgType == 1) {
        authorizedFetch("/update_place", { "id": currentId1,"type": typ.value, "description": text1, "map_url": map.value, "game_url": game.value });
        select1.innerHTML = "<option disabled selected value>--wybierz miejsce--</option>"
        getPlaces(1);
    }
    else {
        authorizedFetch("/delete_place", { "id": select1.value });
        select1.innerHTML = "<option disabled selected value>--wybierz miejsce--</option>"
        getPlaces(2);
    }
}



sub1.onclick = sendPlace;
