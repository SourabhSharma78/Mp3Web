// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let volume = document.getElementById("volume-slider");

let songs = [
    {songName: "Dark Red", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Dil tu jaan tu", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Choo lo - The Local train", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Bhalwani Gedi", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "SnowMan-Sia", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Somewhere only we know", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "7 Years", filePath: "songs/2.mp3", coverPath: "covers/7.jpeg"},
    {songName: "Salute - Bohemia", filePath: "songs/2.mp3", coverPath: "covers/8.jpeg"},
    {songName: "Lukka Chhuppi - A.R Rehman", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Pariyaan toh Sohni - Amrit Maan", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        audioElement.src = `songs/${songIndex + 1}.mp3`;

        console.log("audioElement.paused:", audioElement.paused);
        console.log("audioElement.currentTime:", audioElement.currentTime);

        // Check if audio is paused or at the beginning
        if (audioElement.paused && audioElement.currentTime <= 0) {
            // Play the audio
            masterSongName.innerText = songs[songIndex].songName; 
            audioElement.currentTime = 0; 
            audioElement.play(); 
            gif.style.opacity = 1;

            // Update icons for play/pause
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            audioElement.paused = false;
        } else {
            // Pause the audio
            console.log("Pausing audio");
            audioElement.pause();
 
            e.target.classList.remove('fa-pause-circle'); 
            e.target.classList.add('fa-play-circle');

            // Update master play button icon
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');

            gif.style.opacity = 0; 
        }
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

volume.addEventListener("change", ()=> {
    audioElement.volume = volume.value;
})