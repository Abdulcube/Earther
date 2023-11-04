const form = document.getElementById("form");
const ul = document.getElementById("lists");
const submit = document.getElementById("submit");
const reponser = document.getElementById("responser");
const newGame = document.getElementById("newGame");
var guesses = []
var guessNames = []
var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
var answer = ""
var answerLoc = []

function camelCase(str) {
  let c = str.toLowerCase();
  return (c.charAt(0).toUpperCase() + c.slice(1));
}

function distance(lat1, lon1, lat2, lon2) {
  const r = 6371; // km
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                  (1 - Math.cos((lon2 - lon1) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

async function sortCountries() {
  guesses.sort(function(a,b){return a["distance"]- b["distance"]})
  console.log(guesses)
}

function showStart(){
  newGame.style.display = "block"
}

async function add() {
  reponser.style.display = "block"
  var country = camelCase(form.value)
  if (guessNames.includes(country)){
    reponser.innerHTML = "You already guessed " + country
    return
  }
  var url = "https://restcountries.com/v3.1/name/" + country
  try {
    const response = await fetch(url);
    const jValue = await response.json();
    const person = new Object()
    person.countryName = country
    person.short = jValue[0].cca2
    person.location = jValue[0].latlng
    let img = document.createElement('img');
    img.src = "https://flagsapi.com/" + person.short +"/flat/24.png"
    person.image = img
    person.distance = distance(answerLoc[0], answerLoc[1], person.location[0], person.location[1])
    console.log(person.distance)
    guesses.push(person)
    guessNames.push(country)
    reponser.innerHTML = "Country is " + parseInt(person.distance) + " miles away"
  } catch(Error){
    console.log(Error)
    reponser.innerHTML = country + " is not in our database"
  }
  sortCountries()
  displayCountries()

  if (country == answer){
    reponser.innerHTML = country + " is the answer!"
    endState()
    return
  }
  form.value = ""

}

function endState(){
  submit.setAttribute("disabled", "disabled");
  form.setAttribute("disabled", "disabled");
  newGame.style.display = "block"
}



function displayCountries(){
  while(ul.firstChild) ul.removeChild(ul.firstChild);
  
  var text = ""
  for (let i = 0; i < guesses.length; i++) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(guesses[i]["countryName"]));
    li.appendChild(guesses[i]["image"]);
    ul.appendChild(li);
  }
}

submit.onclick = () => {
  add();
};

async function startGame(){
  
  while (true)
    try {
      answer = country_list[Math.floor(Math.random() * country_list.length)]
      const response = await fetch("https://restcountries.com/v3.1/name/" + answer);
      const jValue = await response.json();
      answerLoc = jValue[0].latlng
      break
    } catch (Error) {
      
    }

  newGame.style.display = "none"
  
  submit.removeAttribute('disabled');
  reponser.style.display = "none"
  form.removeAttribute('disabled');
  console.log("Result = " +  answer);

  while(ul.firstChild) ul.removeChild(ul.firstChild);
  guesses = []
  guessNames = []
  
  

}

form.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submit.click();
  }
});

startNew.onclick = () => {
  startGame();
};

startGame()
// submit.click();