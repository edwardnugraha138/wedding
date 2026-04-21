// var tempMusic = ''
// var music = document.querySelector('.music')

// if (tempMusic) {
//     music.src = tempMusic
// }

// function mulai() {
//     window.scrollTo(0, 0)

//     var soundDoor = document.querySelector('.sound-door')
//     var doorSection = $('#door-section')
//     var video = document.getElementById('myVideo')
//     var mainContent = document.querySelector('.main-content')

//     soundDoor.play()

//     var doors = document.querySelectorAll('.door')
//     doors.forEach(function (door, index){
//         var direction = (index === 0) ? -1 : 1
//         door.style.transform = 'rotateY(' + (70 * direction) + 'deg)'
//     })

//     setTimeout(function (){
//         music.play()
//         video.play()

//         doorSection.css('transform', 'scale(6)')
//     }, 300)

//     setTimeout(function (){
//         doorSection.css({
//             opacity: 0,
//             display: 'none'
//         })

//         $('body').removeClass('overflow-hidden')
//         $('body').addClass('transition')

//         // ✅ tampilkan konten setelah pintu hilang
//         mainContent.style.display = 'block'

//         AOS.refresh()
//     }, 200)
// }

//     AOS.init({
//     duration: 1000,
//     once: true
//   })


var tempMusic = ''
var music = document.querySelector('.music')
var soundDoor = document.querySelector('.sound-door')
var video = document.getElementById('myVideo')

var isPlaying = false

if (tempMusic) {
    music.src = tempMusic
}

// 🔥 INIT AOS
AOS.init({
    duration: 1000,
    once: true
})

function mulai() {
    window.scrollTo(0, 0)

    var doorSection = $('#door-section')
    var mainContent = document.querySelector('.main-content')

    // 🔥 WAJIB: PLAY DI SINI (langsung dari klik)
    if (music) {
        music.currentTime = 0
        music.play().catch(err => console.log("music gagal:", err))
    }

    if (video) {
        video.currentTime = 0
        video.play().catch(err => console.log("video gagal:", err))
    }

    if (soundDoor) {
        soundDoor.currentTime = 0
        soundDoor.play().catch(()=>{})
    }

    isPlaying = true
    updateButtonUI()

    // animasi pintu
    document.querySelectorAll('.door').forEach((door, index) => {
        var direction = (index === 0) ? -1 : 1
        door.style.transform = 'rotateY(' + (70 * direction) + 'deg)'
    })

    // ❗ HANYA animasi pakai delay, BUKAN play audio
    setTimeout(function (){
        doorSection.css('transform', 'scale(6)')
    }, 300)

    setTimeout(function (){
        doorSection.css({
            opacity: 0,
            display: 'none'
        })

        document.body.classList.remove('overflow-hidden')
        document.body.style.overflow = 'auto'

        mainContent.style.opacity = 1
        mainContent.style.visibility = 'visible'

    }, 300)
}

// 🔥 UPDATE BUTTON
function updateButtonUI() {
    var icon = document.getElementById('iconMusic')
    var text = document.getElementById('textMusic')

    if (isPlaying) {
        icon.src = "assets/icon-pause-26b49139.svg"
        text.innerText = "Pause"
    } else {
        icon.src = "assets/icon-play-36bd56d6.svg"
        text.innerText = "Play"
    }
}

// 🎵 TOGGLE MUSIC + VIDEO
function toggleMusic() {
    if (isPlaying) {
        if (music) music.pause()
        if (video) video.pause()
        if (soundDoor) soundDoor.pause()

        isPlaying = false
    } else {
        if (music) music.play().catch(()=>{})
        if (video) video.play().catch(()=>{})

        isPlaying = true
    }

    updateButtonUI()
}

  // GANTI tanggal target di sini
  const targetDate = new Date("2026-06-14 19:00:00").getTime();

  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(countdown);
      document.getElementById("days").innerText = "0";
      document.getElementById("hours").innerText = "0";
      document.getElementById("minutes").innerText = "0";
      document.getElementById("seconds").innerText = "0";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }, 1000);

   // ambil parameter dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const nama = urlParams.get('to');

  // tampilkan ke HTML
  const elemen = document.querySelector('.text-gray-700');

  if (nama) {
    elemen.innerText = decodeURIComponent(nama);
  } else {
    elemen.innerText = "";
  }

    const ya = document.getElementById("ya");
  const tidak = document.getElementById("tidak");
  const wrapper = document.getElementById("total_hadir_wrapper");

  ya.addEventListener("change", function() {
    if (this.checked) {
      wrapper.style.display = "block";
    }
  });

  tidak.addEventListener("change", function() {
    if (this.checked) {
      wrapper.style.display = "none";
    }
  });

const scriptURL = "https://script.google.com/macros/s/AKfycbySHRXKf6d6seNlVl4-Spb65dGwP15yqTMjI_YpVVCa0ViNa9Xf-a6klvdanjf1j96kHg/exec";

// FORM RSVP
document.querySelector("#rsvp-form + div button").addEventListener("click", function() {
  const data = {
    nama: document.getElementById("name_rsvp").value,
    phone: document.getElementById("phone").value,
    kehadiran: document.querySelector('input[name="fav_language"]:checked').id,
    total: document.getElementById("total_hadir").value,
    ucapan: ""
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  }).then(() => alert("Data RSVP terkirim"));
});

// FORM UCAPAN
document.querySelectorAll(".btn-confirm")[1].addEventListener("click", function() {
  const data = {
    nama: document.getElementById("fname_ucapan").value,
    phone: "",
    kehadiran: "",
    total: "",
    ucapan: document.getElementById("prayer").value
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  }).then(() => alert("Ucapan terkirim"));
});

const popup = document.getElementById("imgPopup");
const popupImg = document.getElementById("popupImg");
const closeBtn = document.querySelector(".img-popup .close");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

// ambil semua gambar
const images = Array.from(document.querySelectorAll(".column-img, .row-img"));
let currentIndex = 0;

// buka popup
images.forEach((img, index) => {
  img.addEventListener("click", function () {
    currentIndex = index;
    popup.style.display = "flex";
    popupImg.src = this.src;
  });
});

// fungsi update gambar
function showImage(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  currentIndex = index;
  popupImg.src = images[currentIndex].src;
}

// arrow click
leftArrow.addEventListener("click", function (e) {
  e.stopPropagation();
  showImage(currentIndex - 1);
});

rightArrow.addEventListener("click", function (e) {
  e.stopPropagation();
  showImage(currentIndex + 1);
});

// close popup
closeBtn.addEventListener("click", function () {
  popup.style.display = "none";
});

// klik background untuk close
popup.addEventListener("click", function (e) {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});