// Music status animations
var imgCURRENT = document.getElementById('animation').src;
var imgRest = "img/bbPAUSE.png";
var imgPlay = "img/bbPLAY.gif";
var imgStop = "img/bbSTOP.png";

document.querySelector("img").setAttribute("src", imgStop);

// Sets initial background img
if (imgCURRENT == "") {
  imgCURRENT = imgStop;
}

  // currentSong.setAttribute("src", this.currentSong);
// MUSIC -- for PERSONAL USE ONLY
var mPlaylist = ["music/my.wav", "music/sad.mp3", "music/Solo.mp3", "music/Amajor.mp3", "music/Day.mp3", "music/Tristesse.mp3"];
var currentSong = document.getElementById('song');
var thisong = 0;
var songTitle = "A piano song";
var songArtist = "?";

function Jukebox() {
  this.playlist = mPlaylist;
  this.currentSong = this.playlist[thisong];

  currentSong.setAttribute("src", this.currentSong);

  this.addTrack = function(track){
    this.playlist.push(this.currentSong);
    console.log(this.currentSong);
  }

  this.nextsong = function() {
    currentSong.pause();
    currentSong.currentTime = 0;
    playing = false;
    if (thisong <= 0 || thisong < this.playlist.length-1) {
      thisong++;
    }
    document.querySelector("img").setAttribute("src", imgStop);
    currentSong.setAttribute("src", this.playlist[thisong]);
  }

  this.prevsong = function() {
    currentSong.pause();
    currentSong.currentTime = 0;
    playing = false;
    if (thisong >= 1 || thisong >= this.playlist.length-1) {
      thisong--;
    }
    document.querySelector("img").setAttribute("src", imgStop);
    currentSong.setAttribute("src", this.playlist[thisong]);
  }

  this.playsong = function() {
    currentSong.play();
    playing = true;
    $("ul").append("<li>"+ songTitle +" by " + songArtist +"<li>");
    $("#songtitle").text(songTitle);
    $("#songartist").text(songArtist);
  }

  this.pausesong = function() {
    currentSong.pause();
    playing = false;
  }

  this.stopsong = function() {
    currentSong.pause();
    currentSong.currentTime = 0;
    playing = false;
  }

  this.vollevel = function() {
    vollevel = currentSong.volume;
    volpercent = vollevel * 100;
    finalvol = Math.round(volpercent);
    var vollvl = document.getElementById("volume").innerHTML = "Volume Level: " + finalvol + "%";
  }
}

var myJukebox = new Jukebox();
// myJukebox.addTrack();



// Click to play, click again to pause!
var playing = false;

document.getElementById("animation").addEventListener("click", function(){
  if (playing == false){
    myJukebox.playsong();
    document.querySelector("img").setAttribute("src", imgPlay);
  } else {
    myJukebox.pausesong();
    document.querySelector("img").setAttribute("src", imgRest);
  }
})

// STOP playing music
document.getElementById("stopsong").addEventListener("click", function(){
  myJukebox.stopsong();
  document.querySelector("img").setAttribute("src", imgStop);
})


// VOLUME CONTROL
document.getElementById("volup").addEventListener("click", function(){
  if (currentSong.volume >= 1){
    document.getElementById("tip").innerHTML = ("Volume already at maximum!");
  } else {
    currentSong.volume += 0.1;
    myJukebox.vollevel();
    document.getElementById("tip").innerHTML = "";
  }
})

document.getElementById("voldown").addEventListener("click", function(){
  if (currentSong.volume <= .01){
    document.getElementById("tip").innerHTML = ("Volume already at minimum!");
  } else {
    currentSong.volume -= 0.1;
    myJukebox.vollevel();
    document.getElementById("tip").innerHTML = "";
  }
})
// MUTE
document.getElementById("mute").addEventListener("click", function(){
  if (currentSong.volume <= 0){
    currentSong.volume = 1;
    myJukebox.vollevel();
  } else {
    currentSong.volume = 0;
    myJukebox.vollevel();
  }
})


// Displays VOLUME
myJukebox.vollevel();


// SPOTIFY
document.querySelector("form").addEventListener("submit", function(e){
  e.preventDefault();
  var track= document.querySelector("input").value
  $.ajax({
    url: "https://api.spotify.com/v1/search",
    data: {
      q: track,
      type: "track"
    },
    success: function(response){
      currentSong.setAttribute("src", response.tracks.items[0].preview_url);
      // console.log(response);
      playing = false;
      document.querySelector("img").setAttribute("src", imgStop);
      songTitle = response.tracks.items[0].name;
      songArtist = response.tracks.items[0].artists[0].name;
      $("#songtitle").text(songTitle);
      $("#songartist").text(songArtist);
    }
  })
})

// play NEXT song!
document.getElementById("nextsong").addEventListener("click", function(){
  myJukebox.nextsong();
})

// play PREVIOUS song
document.getElementById("prevsong").addEventListener("click", function(){
  myJukebox.prevsong();
})
