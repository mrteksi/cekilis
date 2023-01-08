let bigDiv = document.getElementById("kullanıcı-girişi");
let secondDiv = document.getElementById("adaylar");
let kazananlarDiv = document.getElementById("kazananlar");
let adayDiv = "";
let adayLabel = "";
let adayInput = "";
let kazananP = "";
let adaySayısı;
let kazananSayısı;
function forStart() {
  adaySayısı = Number(prompt("Aday sayısı giriniz"));
  kazananSayısı = Number(prompt("Kazanacak kişi sayısını giriniz"));
  while (isNaN(adaySayısı) || adaySayısı === false || adaySayısı === 0) {
    alert("Lütfen bir sayı giriniz");
    adaySayısı = Number(prompt("Aday sayısı giriniz"));
  }
  while (
    isNaN(kazananSayısı) ||
    kazananSayısı === false ||
    kazananSayısı === 0
  ) {
    alert("Lütfen bir sayı giriniz");
    kazananSayısı = Number(prompt("Kazanacak kişi sayısını giriniz"));
  }
  while (kazananSayısı > adaySayısı) {
    alert("Kazanacak kişiler Aday sayısından fazla olamaz");
    kazananSayısı = Number(
      prompt(
        "Kazanacak kişi sayısını giriniz" + `  Aday Sayısı:(${adaySayısı})`
      )
    );
  }
  while (kazananSayısı === adaySayısı) {
    alert("Adayların hepsi kazanamaz");
    kazananSayısı = Number(
      prompt(
        "Kazanacak kişi sayısını giriniz" + `  Aday Sayısı:(${adaySayısı})`
      )
    );
  }
}
forStart();
function adayTablosu() {
  for (let i = 1; i <= adaySayısı; i++) {
    adayDiv = document.createElement("div");
    adayLabel = document.createElement("label");
    adayInput = document.createElement("input");
    adayDiv.setAttribute("class", "adaylar");
    adayDiv.setAttribute("id", `aday${i}`);
    adayLabel.setAttribute("for", `a${i}`);
    adayLabel.innerHTML = `${i}.Aday:`;
    adayInput.setAttribute("id", `a${i}`);
    adayLabel.appendChild(adayInput);
    adayDiv.appendChild(adayLabel);
    secondDiv.appendChild(adayDiv);
  }
  for (let i = 1; i <= adaySayısı; i++) {
    document.getElementById(`aday${i}`).style.display = "block";
  }
  for (let i = 1; i <= kazananSayısı; i++) {
    kazananP = document.createElement("p");
    kazananP.setAttribute("id", `kazananAday${i}`);
    kazananlarDiv.appendChild(kazananP);
  }
}
adayTablosu();

// this function check is valid form
function checkIsValid() {
  let isValid = true;
  for (let i = 1; i <= adaySayısı; i++) {
    sessionStorage.setItem(`aday${i}`, document.getElementById(`a${i}`).value);
    if (!document.getElementById(`a${i}`).value) {
      alert("Katılımcı İsimlerini doldurunuz");
      isValid = false;
      break;
    }
  }
  return isValid;
}

function sonuç_belirleme() {
  let kazananZarı = Math.floor(Math.random() * adaySayısı + 1); // [1,adaysayısı]
  let a = 1;
  let b = 1;
  if (checkIsValid()) {
    for (let i = 1; i <= adaySayısı; i++) {
      if (kazananZarı === i) {
        document.getElementById(`kazananAday${a++}`).innerHTML =
          `${b}.` + sessionStorage.getItem(`aday${i}`);
        btnSonuç.disabled = true;
        if (kazananSayısı > 1) {
          for (let n = 1; n <= kazananSayısı; n++) {
            sessionStorage.setItem(`kazananZarı${n}`, kazananZarı);
            kazananZarı = Math.floor(Math.random() * adaySayısı + 1);
            for (let a = 1; a <= n; a++) {
              while (kazananZarı == sessionStorage.getItem(`kazananZarı${a}`)) {
                kazananZarı = Math.floor(Math.random() * adaySayısı + 1);
                a = 1;
              }
            }

            for (let index = 1; index <= adaySayısı; index++) {
              if (index === kazananZarı) {
                document.getElementById(`kazananAday${a++}`).innerHTML =
                  `${++b}.` + sessionStorage.getItem(`aday${index}`);
                break;
              }
            }
          }
        }
      }
    }
  }
}
function reset() {
  while (secondDiv.hasChildNodes()) {
    secondDiv.removeChild(secondDiv.firstChild);
  }
  while (kazananlarDiv.hasChildNodes()) {
    kazananlarDiv.removeChild(kazananlarDiv.firstChild);
  }
  forStart();
  adayTablosu();
  btnSonuç.disabled = false;
}
