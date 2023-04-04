
// X ve Y koordinatlarını tutacak değişkenler
var x = 0;
var y = 0;

// Fare hareketlerini dinleme
document.addEventListener("mousemove", function(event) {
  // Fare pozisyonunu güncelleme
  x = event.clientX;
  y = event.clientY;
});

// Saniyede bir kez fare pozisyonunu gösteren fonksiyon
setInterval(function() {
  console.log("Mouse position:", x, y);
}, 1000);

setInterval(function() {
    console.log("Mouse position:", x, y);
  }, 1000);

// Yerel depolama anahtarları
var xKey = "mouseX";
var yKey = "mouseY";

// Verileri yerel depolamaya kaydetme
localStorage.setItem(xKey, x);
localStorage.setItem(yKey, y);


// Kaydedilmiş fare pozisyonlarını gösteren fonksiyon
function showMousePositions() {
  var storedX = localStorage.getItem(xKey);
  var storedY = localStorage.getItem(yKey);
  console.log("Mouse position:", storedX, storedY);
}

// Saniyede bir kez kaydedilmiş fare pozisyonlarını gösteren fonksiyon
setInterval(showMousePositions, 1000);


/*
const fs = require('fs');

// Yazılacak metin dosyası
const dosyaAdi = "/Users/bilgesueski/Desktop/test.rtf";

// Dosyaya yazılacak değerleri bir diziye ekleme
const degerler = ['x', 'y'];

// Dosyayı açın ve değerleri yazın.
fs.writeFile(dosyaAdi, degerler.join('\n'), (hata) => {
  if (hata) throw hata;
  console.log('Dosyaya başarıyla yazıldı.');
});
*/