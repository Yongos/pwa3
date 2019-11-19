//Créer les fonctionnalité dynamique de l'application

// Création d'une variable saisie par l'utilisateurs (à convertir)
// Création d'une variable sortie par l'application (convertit)
const input = document.getElementById('lbsInput');
const output = document.getElementById('output');

// Ne aps afficher la conversation avant que l'utilisateurs est saisie une valeur
output.style.visibility = 'hidden';

//Crée un événement à suivre : cet événement est la saisie d'une valeurs par l'utilisateurs
input.addEventListener('input', (e) => {
  let lbs = e.target.value;

  // SI saisie, alors les convertions deviennent visible
  output.style.visibility = 'visible';

  //Convertion en gr
  let grams = document.getElementById('gOutput');
  grams.innerHTML = lbs / 0.0022046;

  //Convertion en Kg
  let kiloGrams = document.getElementById('kgOutput');
  kiloGrams.innerHTML = lbs / 2.2046;

  //Convertion en Ounces
  let ounces = document.getElementById('ozOutput');
  ounces.innerHTML = lbs * 16;

  e.preventDefault();
});

//Vérifier l'état de marche du service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../sw.js').then(() => {
      console.log('Service Worker Registered')
    })
  })
}
