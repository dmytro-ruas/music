const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");

const songs = [
    // {
    //     image: "./album-art1.jpg",
    //     name: "Deck The Halls",
    //     artist: "John Parry",
    //     audio: "./deck-the-halls.mp3"
    // },
    // {
    //     image: "./album-art2.jpg",
    //     name: "Jingle Bells",
    //     artist: "James Lord Pierpont",
    //     audio: "./jingle-bells.mp3"
    // },
    // {
    //     image: "./album-art3.jpg",
    //     name: "Joy To The World",
    //     artist: "Isaac Watts",
    //     audio: "./joy-to-the-world.mp3",
    // },
];

const audio = document.createElement("audio");
let currentSongIndex = 0;

// updateSong();

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
      console.log(data)

      new_song = {
        image: data.results[0].artworkUrl100,
        name: data.results[0].trackName,
        artist: data.results[0].artistName,
        audio: data.results[0].previewUrl
      }

      console.log(takeTenSearches(data));
      toRet = takeTenSearches(data);
      return toRet;

    //   songs.push(new_song);
      console.log(songs);
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
        new_song = {
        image: data.results[i].artworkUrl100,
        name: data.results[i].trackName,
        artist: data.results[i].artistName,
        audio: data.results[i].previewUrl
      }
      top_results.push(new_song);
    }
    return top_results;

}

function searchMenu(tenSearches){
    document.createElement()

}
