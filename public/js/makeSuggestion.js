var sub = document.getElementById("sub");
var miejsce = document.getElementById("miejsce");
var opis = document.getElementById("opis");
var sub1 = document.getElementById("sub1");
var miejsce1 = document.getElementById("miejsce1");
var opis1 = document.getElementById("opis1");

function przeslij(){
    dataFetch("/add_suggestion", {"title" : miejsce.value,"description" : opis.value});
    miejsce.value = "";
    opis.value = "";
}

function przeslij1(){
    dataFetch("/add_suggestion", {"title" : miejsce1.value,"description" : opis1.value});
    miejsce1.value = "";
    opis1.value = "";
}

sub.onclick = przeslij;
sub1.onclick = przeslij1;