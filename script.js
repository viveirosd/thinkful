function promptUser() {
	var mealCost = prompt("Enter meal cost");
	var taxRate = prompt("Enter percentage value of tax rate");
	var tipPercent = prompt("Enter percentage of desired tip");
	var obj = new RateCalc(mealCost, taxRate, tipPercent);
	return obj;
}

function buildResultStr(obj) {
	var baseCost = obj.mealCost;
	var taxCost = obj.mealCost * (obj.taxRate / 100);
	var subtotal = baseCost + taxCost;
	var tipCost = subtotal * (obj.tipPercent / 100);
	var totalCost = subtotal + tipCost;
	var output = "Total amount to pay:  " + totalCost + "\nBase cost:  " + baseCost
		+ "\nTax cost:  " + taxCost + "\nSubtotal:  " + subtotal + "\nTip cost:  " + tipCost;
	return output;

}

function tipCalculator() {
	var obj = promptUser();
	alert(buildResultStr(obj));
}


function RateCalc(mealCost, taxRate, tipPercent) {
	this.mealCost = Number(mealCost);
	this.taxRate = Number(taxRate);
	this.tipPercent = Number(tipPercent);
}