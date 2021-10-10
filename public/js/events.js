var events = $("#events")[0];

dataFetch("/get_all_events")
.then(data =>{
    for(i = 0; i < data.length; i++)
    {
        events.innerHTML += '<a href="event/'+i+'/'+data[i]._id+'" class="events__item"><div class="events__photo" style="background-image: linear-gradient(#01302AAA, #01302AAA), url(\''+data[i].img_link+'\')"><div class="events__date">'+data[i].published_on.substr(0,10)+'</div><div class="events__name">'+data[i].title+'</div></div></a>'
    }
})

