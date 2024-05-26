const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
   
      if(select.name === 'from' && currCode === 'USD'){
          newOption.selected = 'selected'
      }
      else if(select.name === 'to' && currCode === 'USD'){
        newOption.selected = 'selected'
    }
      select.append(newOption);
  }
  select.addEventListener('change',(evt)=>{
    updateFlag(evt.target)
  })
   


  const updateFlag =(element) =>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newsrc;

  }
}

btn.addEventListener('click', (evt)=>{
   evt.preventDefault();
   updateExchangeRate();
  
})

async function updateExchangeRate(){
    let amt = document.querySelector('form input');
    let amtvalue = amt.value;

    if(amtvalue === "" || amtvalue < 1){
        amtvalue = 1;
        amt.value = "1";
    }


    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
   

     let rate = data[toCurr.value.toLowerCase()];
     

    let finalrate = amtvalue*rate;
    

   msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalrate} ${toCurr.value}`

}

window.addEventListener('load',()=>{
    updateExchangeRate();
})