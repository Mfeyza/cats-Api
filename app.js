const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");
// window.addEventListener("load", () => {
//     cardDiv.style.display = "none"
//     loadingDiv.style.display = "block"
// }, 3000)
//* loading çalıştır
setTimeout(() => {
  loadingDiv.style.display = "none";
}, 3000);
//* verileri getir
let status=0
let veri = "";
const getImage = (() => {
  fetch("https://api.thecatapi.com/v1/images/search?limit=10").then((res) => {
    console.log(res)
    status=res.status;
    if(!res.ok) {
        throw new Error()
    }
    return res.json()
  })
  .then((data) => {
    veri = data
    console.log(veri);
    show(data)
  })
  .catch((err) => containerDiv.innerHTML=`<img src="error.gif"/>`)
//! resimleri yerleştir
  const show = ((catsShow) => {
    cardDiv.innerHTML=""
    catsShow.forEach((image) => {
        cardDiv.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4">
            <div style="height:200px;">
                <img src="${image.url}" class="w-100 h-100" alt="...">
            </div>
        </div>
        `
    })
  })
});
/* -------------------------------------------------------------------------- */
/*                       buttona basınca resim değişsin                       */
/* -------------------------------------------------------------------------- */
btn.addEventListener('click', () =>{
    loadingDiv.style.display="noone"
    getImage()
    setTimeout(() => {
        cardDiv.innerHTML=`<img src="loading.gif"/>`
      }, status);
})
getImage()
/* -------------------------------------------------------------------------- */
/*                              tarihi belirleme                              */
/* -------------------------------------------------------------------------- */
const outputDate=(()=>{
    let currentDate= new Date();
    let datedate = currentDate.toLocaleDateString(); // localden suanki tarih
    let time = currentDate.toLocaleTimeString(); // localden suanki saat
    let currentDateTimeString=datedate + "," + time
    tarih.textContent = currentDateTimeString
})
setInterval(outputDate, 1000)
/* -------------------------------------------------------------------------- */
/*                              window yuklenırken                             */
/* -------------------------------------------------------------------------- */
    console.log("calıstı");
    containerDiv.style.display="none"
    setTimeout(() => {
        loadingDiv.style.display = "none";
        containerDiv.style.display="block"
      }, 2000)
