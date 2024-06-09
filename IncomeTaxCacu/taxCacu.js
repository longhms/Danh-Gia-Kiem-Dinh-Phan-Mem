function calculateTax() {
    var income = parseInt(document.getElementById("income").value);
    var dependents = parseInt(document.getElementById("dependents").value);
    
    if (isNaN(income) || income < 0 || isNaN(dependents) || dependents < 0) {
        document.getElementById("warning").innerHTML = "Giá trị nhập vào phải là số lớn hơn 0!";
        document.getElementById("totalIncome").innerHTML = "0 ₫";
        document.getElementById("dependentDeduction").innerHTML = "0 ₫";
        document.getElementById("taxableIncome").innerHTML = "0 ₫";
        document.getElementById("taxAmount").innerHTML = "0 ₫";
        document.getElementById("netIncome").innerHTML = "0 ₫";
        document.getElementById("taxBracket1").innerHTML = "0 ₫";
        document.getElementById("taxBracket2").innerHTML = "0 ₫";
        document.getElementById("taxBracket3").innerHTML = "0 ₫";
        document.getElementById("taxBracket4").innerHTML = "0 ₫";
        document.getElementById("taxBracket5").innerHTML = "0 ₫";
        document.getElementById("taxBracket6").innerHTML = "0 ₫";
        document.getElementById("taxBracket7").innerHTML = "0 ₫";
        return;
    }
    
    var personalDeduction = 11000000;
    var dependentDeduction = dependents * 4400000;
    var taxableIncome = income - personalDeduction - dependentDeduction;
    var tax = 0;
    var bracketTaxes = [0, 0, 0, 0, 0, 0, 0];

    if (taxableIncome <= 0) {
        document.getElementById("warning").innerHTML = "";
        taxableIncome = 0;
        tax = 0;
        var netIncome = income - tax;
        document.getElementById("totalIncome").innerHTML = income.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        document.getElementById("dependentDeduction").innerHTML = dependentDeduction.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        document.getElementById("taxableIncome").innerHTML = taxableIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        document.getElementById("taxAmount").innerHTML = tax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        document.getElementById("netIncome").innerHTML = netIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        for (var i = 0; i < bracketTaxes.length; i++) {
            document.getElementById("taxBracket" + (i + 1)).innerHTML = bracketTaxes[i].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }
        return;
    }

    if (taxableIncome > 0 & taxableIncome <= 5000000) {
        tax = taxableIncome * 0.05;
        bracketTaxes[0] = taxableIncome * 0.05;
    } else if (taxableIncome > 5000000 & taxableIncome <= 10000000) {
        tax = 250000 + 0.1 * (taxableIncome - 5000000);
        bracketTaxes[0] = 250000;
        bracketTaxes[1] = 0.1 * (taxableIncome - 5000000);
    } else if (taxableIncome > 10000000 & taxableIncome <= 18000000) {
        tax = 750000 + 0.15 * (taxableIncome - 10000000);
        bracketTaxes[0] = 250000;
        bracketTaxes[1] = 500000;
        bracketTaxes[2] = 0.15 * (taxableIncome - 10000000);
    } else if (taxableIncome > 18000000 & taxableIncome <= 32000000) {
        tax = 1950000 + 0.2 * (taxableIncome - 18000000);
        bracketTaxes[0] = 250000;
        bracketTaxes[1] = 500000;
        bracketTaxes[2] = 1200000;
        bracketTaxes[3] = 0.2 * (taxableIncome - 18000000);
    } else if (taxableIncome > 32000000 & taxableIncome <= 52000000) {
        tax = 4750000 + 0.25 * (taxableIncome - 32000000);
        bracketTaxes[0] = 250000;
        bracketTaxes[1] = 500000;
        bracketTaxes[2] = 1200000;
        bracketTaxes[3] = 2800000;
        bracketTaxes[4] = 0.25 * (taxableIncome - 32000000);
    } else if (taxableIncome > 32000000 & taxableIncome <= 80000000) {
        tax = 9750000 + 0.3 * (taxableIncome - 52000000);
        bracketTaxes[0] = 250000;
        bracketTaxes[1] = 500000;
        bracketTaxes[2] = 1200000;
        bracketTaxes[3] = 2800000;
        bracketTaxes[4] = 5000000;
        bracketTaxes[5] = 0.3 * (taxableIncome - 52000000);
    } else {
        tax = 18150000 + 0.35 * (taxableIncome - 80000000);
        bracketTaxes[0] = 250000;
        bracketTaxes[1] = 500000;
        bracketTaxes[2] = 1200000;
        bracketTaxes[3] = 2800000;
        bracketTaxes[4] = 5000000;
        bracketTaxes[5] = 8400000;
        bracketTaxes[6] = 0.35 * (taxableIncome - 80000000);
    }
    
    
    var netIncome = income - tax;
    document.getElementById("warning").innerHTML = "";
    document.getElementById("totalIncome").innerHTML = income.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("dependentDeduction").innerHTML = dependentDeduction.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("taxableIncome").innerHTML = taxableIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("taxAmount").innerHTML = tax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("netIncome").innerHTML = netIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    for (var i = 0; i < bracketTaxes.length; i++) {
        document.getElementById("taxBracket" + (i + 1)).innerHTML = bracketTaxes[i].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
}

module.export = calculateTax

function re() {
    document.getElementById("warning").innerHTML = "";
    document.getElementById("totalIncome").innerHTML = "0 ₫";
    document.getElementById("dependentDeduction").innerHTML = "0 ₫";
    document.getElementById("taxableIncome").innerHTML = "0 ₫";
    document.getElementById("taxAmount").innerHTML = "0 ₫";
    document.getElementById("netIncome").innerHTML = "0 ₫";
    document.getElementById("taxBracket1").innerHTML = "0 ₫";
    document.getElementById("taxBracket2").innerHTML = "0 ₫";
    document.getElementById("taxBracket3").innerHTML = "0 ₫";
    document.getElementById("taxBracket4").innerHTML = "0 ₫";
    document.getElementById("taxBracket5").innerHTML = "0 ₫";
    document.getElementById("taxBracket6").innerHTML = "0 ₫";
    document.getElementById("taxBracket7").innerHTML = "0 ₫";
 }
 