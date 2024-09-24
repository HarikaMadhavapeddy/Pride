import React from 'react';
import Payment from "payment";

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value,issuer) {
  if (!value) {
    return value;
  }

  //const issuer = Payment.fns.cardType(value);
  console.log(issuer);
  const clearValue = clearNumber(value);
  console.log(value);
  let nextValue;

  switch (issuer) {
    case "amex":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`;
      break;
    case "dinersclub":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 16)}`;
      break;
  }

  console.log(nextValue);
  return nextValue.trim();
}

export function formatCVC(cvv, issuer) {
  const clearValue = clearNumber(cvv);
  let maxLength = 4;

  if (issuer) {
    //const issuer = Payment.fns.cardType(number);
    maxLength = issuer === "amex" ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

/*export function formatFormData(data) {
  return Object.keys(data).map(d => `${d}: ${data[d]}`);
}*/
export function GenerateDate(value){
const today=new Date();
const nextDay=new Date();
nextDay.setDate(today.getDate() + value);
return nextDay.toISOString();
}
export function FormatDate(value){
const date=new Date(value);
return date.toLocaleDateString('en-GB',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
}
export function GetCardLastDigits(number){
  const arr=number.split(' ');
  return arr[arr.length-1];
}
export function ShortFormatDate(value){
  return value.toLocaleDateString('en-GB',{day:'2-digit',month:'short'});
  }
