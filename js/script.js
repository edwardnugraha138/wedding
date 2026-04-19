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

if (tempMusic) {
    music.src = tempMusic
}

// 🔥 INIT AOS (taruh di awal, tapi aman)
AOS.init({
    duration: 1000,
    once: true
})

function mulai() {
    window.scrollTo(0, 0)

    var soundDoor = document.querySelector('.sound-door')
    var doorSection = $('#door-section')
    var video = document.getElementById('myVideo')
    var mainContent = document.querySelector('.main-content')

    soundDoor.play()

    var doors = document.querySelectorAll('.door')
    doors.forEach(function (door, index){
        var direction = (index === 0) ? -1 : 1
        door.style.transform = 'rotateY(' + (70 * direction) + 'deg)'
    })

    // 🎬 buka pintu
    setTimeout(function (){
        music.play()
        video.play()

        doorSection.css('transform', 'scale(6)')
    }, 300)

    setTimeout(function (){

        doorSection.css({
            opacity: 0,
            display: 'none'
        })

        $('body').removeClass('overflow-hidden')
        $('body').addClass('transition')


        mainContent.style.opacity = 1
        mainContent.style.visibility = 'visible'

        // 🔥 WAJIB delay render browser dulu
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                AOS.refreshHard()
            })
        })

    }, 200)
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

const scriptURL = "https://script.google.com/macros/s/AKfycbw42tjCMMHn-uv7CBhERa996ZjJnbd0evivlP4w5rm4nUrLCZ-iwZNenfkJa6WefDdQTA/exec";

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