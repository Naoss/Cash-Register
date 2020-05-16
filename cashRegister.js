function checkCashRegister(price, cash, cid) {


  var unitVal = [
    ["PENNY",0.01],
    ["NICKEL",0.05],
    ["DIME",0.1],
    ["QUARTER",0.25],
    ["ONE",1.00],
    ["FIVE",5.00],
    ["TEN",10.00],
    ["TWENTY",20.00],
    ["ONE HUNDRED",100.00]
  ]

  // This variable displays the type of currency, the amount of it stored in the drawer and its value.

  var currentDrawer = [];

  // This is the change due
  var originalChangeDue = cash - price;
  var changeDue = cash - price;
  console.log("the change due is:", changeDue);

  // This is the array we push a given currency type and its amount in
  var change = [];
  var changeClosed = [];


  for (var i = 0; i < unitVal.length; i++) {
    currentDrawer.push([unitVal[i][0], Math.round(cid[i][1] / unitVal[i][1])])
  }

  currentDrawer.reverse();
  unitVal.reverse();

  for (var j = 0; j < currentDrawer.length; j++) {
    currentDrawer[j][2] = unitVal[j][1]
  }

  console.log("Currency, Amount in Drawer, Value:")
  console.log(currentDrawer);

  // check if the changeDue is exactly equal to one specific currency in the     drawer multiplied by its amount available


  // loop through each item in the drawer
  for (var k = 0; k < currentDrawer.length; k++) {
    var currency = "";
    // if the changeDue > the looped through currency value and there is at least one item of said currency:
    if (changeDue > currentDrawer[k][2] && currentDrawer[k][1] > 0) {
      // for each item of said currency in the drawer, subtract it from the changeDue until there is none left OR until the changeDue is less than the value of said currency (then move on to the next smaller currency in the array)
      let currency = currentDrawer[k][0];
      let amount = 0

      for (var q = 1; q <= currentDrawer[k][1]; q++) {

        if (changeDue >= currentDrawer[k][2]) {
          changeDue -= currentDrawer[k][2]
          changeDue = Math.round(changeDue*100)/100
          amount += 1;
        }
      }

      change.push([currency, amount * currentDrawer[k][2]])
      currency = currency;
    }
  }

  // First we check if the originalChangeDue is higher than our cash availability by looping through the currencies values in our drawer
  var availability = 0
  change.forEach(value => {
    availability += value[1]
  })

  // after we push the currencies and their amounts in the final array, we check the CID (Cash-in-drawer) array. If a given curency amount multiplied by its value is exactly equal to the original changeDue, we store it in the variable below...
  var cidCurrencyAmount = 0;
  cid.map(currency =>{
    if (currency[1] === change[0][1]) {
      cidCurrencyAmount = currency[1];
    }
  })


  // ...so that if we find a positive result, we will ignore the rest of the CID array (change.length will be equal to one) since we already satisfied the changeDue condition. We will push the rest of the currencies and their values for visualization purposes.
  if (change[0][1] === originalChangeDue && change[0][1]===cidCurrencyAmount && change.length == 1) {
    console.log(currency)
    currentDrawer.reverse();
    for (var h = 0; h < currentDrawer.length; h++) {
      if (currentDrawer[h][0] != change[0][0]) {
        change.push([currentDrawer[h][0],currentDrawer[h][1]])
      }
    }
    console.log({status:"CLOSED", change})
  } else if (originalChangeDue > availability) {
    change = [];
    console.log({status: "INSUFFICIENT_FUNDS", change})
  }

  else {
    console.log({status: "OPEN", change})
  }
}


checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
// should return:
//{status: "OPEN", change: [["QUARTER", 0.5]]}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

// should return:
// {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])

// should return:
// {status: "INSUFFICIENT_FUNDS", change: []}

 checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// should return:
// {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
