$("#logout").on("click", function(){
    dataFetch("/logout");
    location.reload();
})