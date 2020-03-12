let submit;
let pilotName;
let coPilotName;
let fuel;
let mass;
let faultyItems;
let pilotStatus;
let coPilotStatus;
let fuelStatus;
let cargoStatus;
let launchStatus;
let missionTarget;


function getPlanet(){
   // fetch returns a promise
   // .then is a method we can call on promises
   // the .then method, tells our progam what to do, after the promise returns the data
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(
      function(response){
         //The json() method of the Body mixin takes a Response stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as JSON.
         response.json().then( function(jsonArray){
            let randomIndex = Math.floor(Math.random() * jsonArray.length)
            let planet = jsonArray[randomIndex]
            missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${planet.name}</li>
               <li>Diameter: ${planet.diameter}</li>
               <li>Star: ${planet.star}</li>
               <li>Distance from Earth: ${planet.distance}</li>
               <li>Number of Moons: ${planet.moons}</li>
            </ol>
            <img src="${planet.image}">`

         })
      }
   )
}

function main(){
   pilotName = document.querySelector("#pilotName")
   coPilotName = document.querySelector("input[name='copilotName']")
   fuel = document.querySelector("input[name = 'fuelLevel']")
   cargoMass = document.querySelector("input[name = 'cargoMass']")
   faultyItems = document.querySelector("#faultyItems");
   pilotStatus = document.querySelector("#pilotStatus");
   coPilotStatus = document.querySelector("#copilotStatus");
   fuelStatus = document.querySelector("#fuelStatus")
   cargoStatus = document.querySelector("#cargoStatus")
   launchStatus = document.querySelector("#launchStatus")
   missionTarget = document.querySelector("#missionTarget")

   getPlanet();

   submit = document.querySelector("#formSubmit")
   submit.addEventListener("click", function(event){
      event.preventDefault();

      validate(event, pilotName, 'string')
      validate(event, coPilotName, 'string')
      validate(event, fuel, 'number')
      validate(event, cargoMass, 'number')
      
      pilotStatus.innerText = pilotName.value
      coPilotStatus.innerText = coPilotName.value
      if (fuel.value < 10000){
         faultyItems.style.visibility = "visible";
         fuelStatus.innerText = 'There is not enough fuel for the journey.' 
         launchStatus.innerText = "Shuttle not ready for launch"
         launchStatus.style.color = "red"
      }
      else if(cargoMass.value > 10000){
         faultyItems.style.visibility = "visible"
         cargoStatus.innerText = "There is too much mass for the shuttle to take off. "
         launchStatus.innerText = "Shuttle not ready for launch"
         launchStatus.style.color = "red"
      }
      else { // if there is no problems with fuel or corgoMass
         faultyItems.style.visibility = "visible"
         launchStatus.style.color = "green"
         launchStatus.innerText = "Shuttle is ready for launch"
         fuelStatus.innerText = 'Fuel level high enough for launch' 
         cargoStatus.innerText = "Cargo mass low enough for launch"
      }

      }
   )
}

function validate(event, HTMLElement, codeRunner){
   let validType;
   let label = HTMLElement.parentNode.innerText
   if (codeRunner === 'string'){ 
      validType =  isNaN(HTMLElement.value)
      //console.log(HTMLElement.value," is a string: ", validType)
   }
   if (codeRunner === 'number'){
      validType =  !isNaN(HTMLElement.value)
      //console.log(HTMLElement.value," is a number: ", validType)
   }
   if (HTMLElement.value === '' || !validType ){
      event.preventDefault();
      alert(`${label}is an invalid entry.`)
   }

   
}
window.addEventListener('load',main);
