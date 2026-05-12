var tempMusic = ''
var music = document.querySelector('.music')
var soundDoor = document.querySelector('.sound-door')
var video = document.getElementById('myVideo')

var isPlaying = false
var autoPlayBlocked = false

if (tempMusic && music) {
    music.src = tempMusic
}

// INIT AOS
AOS.init({
    duration: 1000,
    once: true
})

function mulai() {
    window.scrollTo(0, 0)

    var doorSection = $('#door-section')
    var mainContent = document.querySelector('.main-content')

    // 🔥 PENTING: PLAY MUSIK LANGSUNG (tanpa setTimeout)
    if (music) {
        music.muted = false
        music.currentTime = 0
        music.play().then(() => {
            isPlaying = true
            updateButtonUI()
        }).catch(err => {
            console.log("Gagal play musik:", err)
        })
    }

    // 🔊 sound pintu (optional, kadang iOS blok kalau barengan)
    if (soundDoor) {
        soundDoor.currentTime = 0
        soundDoor.play().catch(() => {})
    }

    // animasi pintu
    document.querySelectorAll('.door').forEach(function (door, index) {
        var direction = (index === 0) ? -1 : 1
        door.style.transform = 'rotateY(' + (70 * direction) + 'deg)'
    })

    // 🎬 video boleh pakai delay (karena bukan audio utama)
    setTimeout(function () {
        if (video) {
            video.muted = true // iOS wajib muted untuk autoplay video
            video.play().catch(() => {})
        }

        doorSection.css('transform', 'scale(6)')
    }, 300)

    // masuk ke konten
    setTimeout(function () {
        doorSection.css({
            opacity: 0,
            display: 'none'
        })

        document.body.classList.remove('overflow-hidden')
        document.body.style.overflow = 'auto'

        if (mainContent) {
            mainContent.style.opacity = 1
            mainContent.style.visibility = 'visible'
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                AOS.refreshHard()
            })
        })

    }, 300)
}

// UPDATE BUTTON
function updateButtonUI() {
    var icon = document.getElementById('iconMusic')
    var text = document.getElementById('textMusic')

    if (!music) return

    if (!music.paused) {
        if (icon) icon.src = "assets/icon-pause-26b49139.svg"
        if (text) text.innerText = "Pause"
        isPlaying = true
    } else {
        if (icon) icon.src = "assets/icon-play-36bd56d6.svg"
        if (text) text.innerText = "Play"
        isPlaying = false
    }
}

// TOGGLE MUSIC ONLY
function toggleMusic() {
    autoPlayBlocked = true

    if (!music) return

    if (!music.paused) {
        music.pause()
    } else {
        music.play().catch(() => {})
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


const scriptURL = "https://script.google.com/macros/s/AKfycbw9kHzLGF1qLpRPTUAHLGiab13Lv5t_U0cTKazn8GjJrhKNR6qDinQ-G8faNjvrr_9C3w/exec";

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


const scriptWish = "https://script.google.com/macros/s/AKfycbxl2ikoQdZmDvMq9-zJzDg3PKE5gZ02CgrvLZHua8NvxUFLW1F5s5g6GTEDoaXYSdiohg/exec";

document.getElementById("submitWish").addEventListener("click", function(e) {
    e.preventDefault();

    const nama = document.getElementById("fname_ucapan").value;
    const ucapan = document.getElementById("prayer").value;

    if (!nama || !ucapan) {
        alert("Harap isi nama dan ucapan");
        return;
    }

    const now = new Date();
    const waktu = now.toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    // ✅ 1. TAMPILKAN LANGSUNG (tanpa nunggu server)
    addWishToUI(nama, ucapan, waktu);

    // reset input
    document.getElementById("fname_ucapan").value = "";
    document.getElementById("prayer").value = "";

    // ✅ 2. KIRIM KE GOOGLE SHEETS (background)
    fetch(scriptWish, {
        method: "POST",
        body: JSON.stringify({
            nama: nama,
            ucapan: ucapan,
            waktu: waktu
        })
    })
    .catch(err => console.error("Gagal kirim:", err));
});


// fungsi untuk langsung tampil
function addWishToUI(nama, ucapan, waktu) {
    const container = document.getElementById("wishes-container");

    const div = document.createElement("div");
    div.classList.add("flexbox", "flex-col", "mb-4");

    div.innerHTML = `
        <p class="caption-2">${nama}</p>
        <p class="caption-3">${waktu}</p>
        <p class="caption-4">${ucapan}</p>
    `;

    container.prepend(div); // biar muncul paling atas
}


// tetap load dari spreadsheet saat buka halaman
function loadWishes() {
    fetch(scriptWish)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("wishes-container");
        container.innerHTML = "";

        data.slice(1).reverse().forEach(row => {
            const [nama, ucapan, waktu] = row;
            addWishToUI(nama, ucapan, waktu);
        });
    });
}

setInterval(loadWishes, 500);


//Pop Up Image
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