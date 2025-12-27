import {moneyCentsToDollars} from '../scripts/utils/money.js';

console.log("CONVERTS CENTS TO DOLLARS");


if(moneyCentsToDollars(2095) === '$20.95') {
    console.log("passed");
}else{
    console.log("failed");  
}

if(moneyCentsToDollars(0) === '$0.00') {
    console.log("passed");
}else{
    console.log("failed");  
}

if (moneyCentsToDollars(2000.5) === '$20.01') {
  console.log("passed");
} else {
  console.log("failed");
}
