var mouseMoves = []; // Mouse koordinatlarını tutmak için dizi tanımlaması
var totalDistance = 0; // Mouse'un sitede toplam gezinmesini tutar
var startTime = Date.now(); // Geçerli zamanı alır ve milisaniye cinsinden startTime değişkenine atar
var flag = true; // flag değişkeni koordinatların sadece bir kez kaydedilmesini sağlamak için kullanılır

// Mouse hareketlerini dinleme
document.addEventListener("mousemove", async function (event) {
  // Mouse pozisyonlarını elde etme
  var x = event.clientX;
  var y = event.clientY;
  if (flag) {
    localStorage.setItem("firstPoints", JSON.stringify({ x: x, y: y }));
    flag = false;
  }
  /* Mouse hareketlerini kaydetme, Her mouse hareketi oluştuğunda,
    x ve y koordinatları bir nesne olarak oluşturulur ve listeye eklenir */
  mouseMoves.push({ x: x, y: y });
  // Verileri localStorage'de depolar  !! NOT: localStorage'da depolanabilen veriler metin tabanlı olarak saklanır
  localStorage.setItem("mouseMoves", JSON.stringify(mouseMoves));
  localStorage.setItem(
    "totalDistance",
    JSON.stringify({ totalDistance: totalDistance })
  );
  localStorage.setItem("lastPoints", JSON.stringify({ x: x, y: y }));
  var firstPoints = JSON.parse(localStorage.getItem("firstPoints"));

  // İlk nokta ile son nokta arasındaki mesafeyi hesaplama
  var distanceX = Math.sqrt(
    (firstPoints.x - x) * (firstPoints.x - x) +
      (firstPoints.y - y) * (firstPoints.y - y)
  );
  avergaeSpeed(totalDistance, distanceX);
  localStorage.setItem(
    "positionDistance",
    JSON.stringify({ distance: distanceX })
  );
});

//Mouse'ın ortalama hızını hesaplama
function avergaeSpeed(distance, timeDiff) {
  var averageSpeed = distance / timeDiff;
  totalDistance += distance;
  localStorage.setItem(
    "averageSpeed",
    JSON.stringify({ averageSpeed: averageSpeed.toFixed(2) })
  );
}

// Kullanıcının sayfada kalma süresini hesaplayan fonksiyon
window.onunload = function () {
  var endTime = Date.now();
  var timeSpent = endTime - startTime;
  localStorage.setItem(
    "totalTime",
    "total time in the page: " + (timeSpent / 1000).toFixed(2) + "sn"
  );
};

// Mouse pozisyonunu gösteren fonksiyon
function showMousePosition() {
  var x = mouseMoves[mouseMoves.length - 1]?.x;
  var y = mouseMoves[mouseMoves.length - 1]?.y;
  console.log("Mouse position:", x, y);
}

// Saniyede bir kez mouse pozisyonunu gösteren fonksiyon
setInterval(showMousePosition, 1000);

// Sayfa kaydırma
var prevY = 0;
var prevTime;
var scrollSpeed;
var delay = 500; // milisaniye cinsinden gecikme süresi
var currTime = null;
let scrollTimeout;
window.addEventListener("scroll", function () {
  clearTimeout(scrollTimeout);
  if (!document.body.classList.contains("scrolling")) {
    document.body.classList.add("scrolling"); // sayfanın hala kaydırılıp kaydırılmadığını kontrol eder
    prevY = window.pageYOffset;
    currTime = new Date().getTime();
    window.dispatchEvent(new Event("scrollStart"));
  }

  scrollTimeout = setTimeout(function () {
    document.body.classList.remove("scrolling");
    var currY = window.pageYOffset;
    var currTime = new Date().getTime();

    var distance = 1;
    var timeDiff = 1;
    if (prevY && prevTime) {
      distance = Math.abs(currY - prevY);
      timeDiff = currTime - prevTime;
      scrollSpeed = distance / timeDiff; // hızı hesaplar
      console.log("Kaydırma hızı: " + scrollSpeed.toFixed(2) + " piksel/ms");
    }
    avergaeSpeed(distance, timeDiff);
    prevY = currY;
    prevTime = currTime;
    window.dispatchEvent(new Event("scrollEnd"));
  }, 100);
});

const mrefreshinterval = 500; // Her 500 ms'de bir güncelleme
let lastmousex = -1;
let lastmousey = -1;
let lastmousetime;
let mousetravel = 0;

// Sayfada tüm gezinmeyi gösteren foonksiyon
document.querySelector("html").addEventListener("mousemove", (e) => {
  const mousex = e.pageX;
  const mousey = e.pageY;

  if (lastmousex > -1) {
    mousetravel += Math.max(
      Math.abs(mousex - lastmousex),
      Math.abs(mousey - lastmousey)
    );
    console.log("mouse travel:", mousetravel);
    totalDistance = mousetravel;
  }
  lastmousex = mousex;
  lastmousey = mousey;
  console.log("last mouse x:", lastmousex, "last mouse y:", lastmousey);
});
