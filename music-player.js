const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");

const songs = [
    {
        image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/63/fb/14/63fb149b-4b27-ac16-3029-e815083e16e2/196925612890.jpg/100x100bb.jpg",
        name: "Overdose",
        artist: "natori",
        audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/98/b5/84/98b5844f-182c-5b36-b530-c120e9d72211/mzaf_2021308778489823369.plus.aac.p.m4a"
    }
];

const audio = document.createElement("audio");
let currentSongIndex = 0;

updateSong();

prevSongButton.addEventListener("click", function() {
    if (currentSongIndex == 0) {
        return;
    }
    currentSongIndex--;
    updateSong();
});

nextSongButton.addEventListener("click", function() {
    if (currentSongIndex == songs.length - 1) {
        return;
    }
    currentSongIndex++;
    updateSong();
});

playpauseButton.addEventListener("click", function() {
    if (!audio.paused) {
        audio.pause();
    }
    else {
        audio.play();
    }
});

function updateSong() {
    const song = songs[currentSongIndex];
    songImage.src = song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;

    audio.src = song.audio;
    audio.onloadedmetadata = function() {
        songSlider.value = 0;
        songSlider.max = audio.duration;
    };
}

songSlider.addEventListener("change", function() {
    audio.currentTime = songSlider.value;
})

function moveSlider() {
    songSlider.value = audio.currentTime;
};

setInterval(moveSlider, 1000);


function searchiTunes() {
    term = document.getElementById('term').value; 
    const url = `https://itunes.apple.com/search?term=${term}&limit=25&entity=song`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
      audio.src = data.results[0].previewUrl;

    //   new_song = {
    //     image: data.results[0].artworkUrl100,
    //     name: data.results[0].trackName,
    //     artist: data.results[0].artistName,
    //     audio: data.results[0].previewUrl
    //   }

      toRet = takeTenSearches(data);
      searchMenu(toRet);

    //   songs.push(new_song);
      updateSong();
    })
    .catch(error => {
      // Handle the error here
      console.error(error);
    });
}

function takeTenSearches(data){
    top_results = [];

    for(let i = 0; i < 10; i++){
        console.log(data.results[i].previewUrl)
        new_song = {
        image: data.results[i].artworkUrl100,
        name: data.results[i].trackName,
        artist: data.results[i].artistName,
        audio: data.results[i].previewUrl
      }
      console.log(top_results)
      top_results.push(new_song);
    }
    return top_results;

}

function searchMenu(tenSearches){
    console.log("hello search menu")
    // console.log(tenSearches);
    for(let i = 0; i < 5; i++){

        let div = document.createElement("div");
        div.setAttribute("class", "song-container")
        // maybe add an ID to show which number song this is? 

        let p_number = document.createElement("p")
        let text_number = document.createTextNode(`${[i + 1]}`);
        p_number.appendChild(text_number)
        let img = document.createElement("img");
        img.setAttribute("src", tenSearches[i].image)

    
        

        let p_artist = document.createElement("p");
        let text_artist = document.createTextNode(`${tenSearches[i].artist}`);
        p_artist.appendChild(text_artist)
        let p_songname = document.createElement("p");
        let text_song = document.createTextNode(`${tenSearches[i].name}`);
        p_songname.appendChild(text_song)

        let p_text = document.createElement("p"); 
        p_text.setAttribute("class", "p-text")
        p_text.append(p_songname, p_artist);


        div.append(p_number, img, p_text);

        let main_div = document.getElementById("song-grid-container");

        main_div.appendChild(div);

    }

}


function clearBox()
{
    document.getElementById("song-grid-container").innerHTML = "";
}