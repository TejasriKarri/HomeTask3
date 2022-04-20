const videoCardContainer=document.querySelector('.video-container');
let Api_Key="AIzaSyB6L6z5dUxbnGxtFHi71wxEUpjLAQbNnW0";
let Video_http="https://www.googleapis.com/youtube/v3/videos?";
let Channel_http="https://www.googleapis.com/youtube/v3/channels?";



var SearchLink="https://www.googleapis.com/youtube/v3/search?";
const SearchInput=document.querySelector('.search-bar')
const SearchBtn=document.querySelector('.search-btn')

SearchBtn.addEventListener('click',()=>{
    fetch(SearchLink +new URLSearchParams({
        key:Api_Key,
        part:'snippet',
        type:'video',
        q:SearchInput.value,
        chart:'mostPopular',
        maxResults:15,
        regionCode:'IN'
        
    }))
    .then(res=>res.json())
    .then(data=>{
        //console.log(data)
        next_token=data.nextPageToken;
       //console.log(prev_token)
        data.items.forEach(item => {
            ShowViewCount(item);
            //console.log(data.items)
        
        })
        data.items.forEach(item => {
             //console.log(item)
              DisplayChannelIcon(item);
        })
    })
    NextPrevbutton()
})
const ShowViewCount=(video_data)=>{
    //console.log(video_data)
    fetch(Channel_http + new URLSearchParams({
        key:Api_Key,
        part:'statistics',
        id:video_data.snippet.channelId

    }))
    .then(res=>res.json())
    .then(data=>{
        //console.log(data)
          //console.log(data.items[0].statistics.viewCount);
          video_data.channelviewcount=data.items[0].statistics.viewCount;
          //console.log(video_data)
      
    })
}
const DisplayChannelIcon=(video_data)=>{
    //console.log(video_data)
    fetch(Channel_http+ new URLSearchParams({
        key:Api_Key,
        part:'snippet',
        id:video_data.snippet.channelId

    }))
    .then(res=>res.json())
    .then(data=>{
          //console.log(data);
          video_data.channelTumbnail=data.items[0].snippet.thumbnails.default.url;
          //console.log(video_data)
          MakeVideoCard(video_data)
          
      
    })
}

const MakeVideoCard=(search_data)=>{
   //var k=search_data.channelviewcount
   //console.log(search_data.channelviewcount)
    //console.log(search_data.channelviewcount)
    videoCardContainer.innerHTML+=`
    <div class="video" onclick="location.href='https://www.youtube.com/watch?v=${search_data.id.videoId}'">
    <img src="${search_data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    <div class="content">
       <img src="${search_data.channelTumbnail}" class="channel-icon" alt="">
        <div class="info">
            <h4 class="title">${search_data.snippet.title}</h4>
            <p class="channel-name">${search_data.snippet.channelTitle}</p>
            <p class="views">.${search_data.channelviewcount}views</p>
            <p class="date">${search_data.snippet.publishedAt}</p>

        </div>
    </div>
</div>
`;
//console.log(search_data.channelviewcount)
}


const NextPrevbutton=()=>{
    NextBtn.innerHTML+=`
<button type="button" class="btn1">NEXT</button>
`;
   PrevBtn.innerHTML+=`
   <button type="button" class="btn2">PREV</button>
   `;
}

const NextBtn=document.querySelector('.btn')
NextBtn.addEventListener('click',()=>{
    fetch(SearchLink +new URLSearchParams({
        key:Api_Key,
        part:'snippet',
        pageToken:next_token,
        q:SearchInput.value,
        maxResults:15
        
    }))
    .then(res=>res.json())
    .then(data=>{
        prev_token=data.prevPageToken;
        //console.log(prev_token)
        count=1;
        Remove();
        //console.log(data)
        data.items.forEach(item => {
            ShowViewCount(item);
            //getviewcount(item);
        })
        data.items.forEach(item => {
              DisplayChannelIcon(item);
        })
        //getsearchvideo(data);
    })
})



const PrevBtn=document.querySelector('.btn_btn')
PrevBtn.addEventListener('click',()=>{
    fetch(SearchLink +new URLSearchParams({
        key:Api_Key,
        part:'snippet',
        pageToken:prev_token,
        q:SearchInput.value,
        maxResults:15
        
    }))
    .then(res=>res.json())
    .then(data=>{
        count=2;
        Remove();
        //console.log(data)
        data.items.forEach(item => {
            ShowViewCount(item);
            //getviewcount(item);
        })
        data.items.forEach(item => {
              DisplayChannelIcon(item);
        })
        //getsearchvideo(data);
    })
})

function Remove() {
    if(count==1){
        alert("going to the next page")
    }
    else if(count==2){
        alert("goint to prev page")
    }
    const list = document.getElementById("main");
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
  }  