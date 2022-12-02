let brukerTidViser = document.querySelector('#brukerTidViser')
let brukerTid = document.querySelector('#brukerTid')
let startEl = document.querySelector('#start')
let poengEl = document.querySelector('#poeng')
let oppgaveEl = document.querySelector('#oppgave')
let svarEl = document.querySelector('#svar')
let sjekkBtn = document.querySelector('#sjekk')
let konklusjonEl = document.querySelector('#konklusjon')

let a = Math.floor(Math.random() * 10)
let b = Math.floor(Math.random() * 10)

let produkt = a*b
let score = 0

oppgaveEl.innerHTML = `${a} x ${b} = ?`

sjekkBtn.addEventListener('click', sjekkSvar)


poengMulig = false

// Sjekker om svaret er riktig
function sjekkSvar(){
    // Passer på at timeren er på når poengene går opp
    if (poengMulig == true){
        let svar = Number(svarEl.value)

        if (svar == produkt && poengMulig == true){
            konklusjonEl.innerHTML = "Du har rett!"
            score = ++score
            poengEl.style.color = "rgb(72, 197, 58)"
        }
        else if (poengMulig == true) {
            konklusjonEl.innerHTML = "Det var dessverre feil..."
            score = --score
            poengEl.style.color = "rgb(221, 79, 79)"

        }
        a = Math.floor(Math.random() * 10)
        b = Math.floor(Math.random() * 10)
        produkt = a*b

        oppgaveEl.innerHTML = `${a} x ${b} = ?`
        svarEl.value = ""
        poengEl.innerHTML = `Du har ${score} poeng`
    }
}

// Svarer når mann trykker på enter
svarEl.addEventListener('keyup', enter)
function enter(e){
    if (e.keyCode === 13) {
        sjekkBtn.click();
    }
}

startEl.addEventListener('click', klokke)

// Legger til delay funksjon
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

brukerTidViser.innerHTML = `Velg tid på slideren: ${brukerTid.value} sekunder`
// Brukeren velger tid
brukerTid.oninput = function(){brukerTidViser.innerHTML = `Velg tid på slideren: ${brukerTid.value} sekunder`}

// Teller ned fra brukerens tid og viser resultater
async function klokke(){
    poengMulig = true
    let time = brukerTid.value
    let timeScore = brukerTid.value
    startEl.removeEventListener('click', klokke)
    while (time > -1){
        timerKlokke.innerHTML = `Du har ${time} sekunder igjen`
        time = -- time
        await sleep(1000);
        console.log(time)
    }
    console.log("tiden er ute")
    timerKlokke.innerHTML = `Tiden er ute!`
    if(score > 0){
        poengEl.innerHTML = `Du klarte å løse ${Math.abs(score)} mattestykker på ${timeScore} sekunder! Da klarte du ${score/timeScore} mattestykker per sekund!`
        poengEl.style.color = "rgb(72, 197, 58)"
    }
    else{
        poengEl.innerHTML = `Du bomma dessverre på ${Math.abs(score)} mattestykker :(`
        poengEl.style.color = "rgb(221, 79, 79)"
    }
    score = 0
    startEl.addEventListener('click', klokke)
    poengMulig = false
}
