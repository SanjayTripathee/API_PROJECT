

const BASE_URL =
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".form select");
let toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){//arrays or array-like objects, the for...of loop is more suitable
  for(currCode in countryList){//It's important to note that for...in should generally be used with objects
   let newOption = document.createElement("option");
   newOption.innerText = currCode;
   newOption.value = currCode;
   if(select.name === "form" && currCode === "USD"){
    newOption.selected = 'selected';
   } else if(select.name === "to" && currCode === "INR"){
    newOption.selected = 'selected';
   }
   select.append(newOption);
  }
  select.addEventListener('change',(event)=>{
     updateFlag(event.target);
  });
}

const updateFlag = (element)=>{
let currCode = element.value;
let counteryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${counteryCode}/flat/64.png`
let img = element.parentElement.querySelector("img");
img.src = newSrc;
}

const updateExchangeRate =async ()=>{
  let amount = document.querySelector(".amount input");
 let amtvalue = amount.value;
 console.log(amtvalue);
 if(amtvalue === "" || amtvalue<1){
    amtvalue = 1;
    amount.value = "1";
 }
 //console.log(fromCurr.value,toCurr.value);
 const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
 let response = await fetch(URL);
 let data = await response.json();
 let rate = data[toCurr.value.toLowerCase()];
 
 let finalAmount = amtvalue * rate;
 msg.innerText = `${amtvalue}${fromCurr.value} = ${finalAmount}${toCurr.value}`
}

//addEventlistner
btn.addEventListener('click',(event)=>{
  event.preventDefault();//button will not perform itself .now btn in our control
  updateExchangeRate();
 });

 window.addEventListener('load',()=>{
  updateExchangeRate();
 })


//
for(code in countryList){
  console.log(code);
}