// calculateTax.js
export function calculateTax(income, dependents) {
    if (isNaN(income) || income < 0 || isNaN(dependents) || dependents < 0) {
        return {
            warning: "Giá trị nhập vào phải là số nguyên dương!",
            totalIncome: 0,
            dependentDeduction: 0,
            taxableIncome: 0,
            taxAmount: 0,
            netIncome: 0,
            bracketTaxes: [0, 0, 0, 0, 0, 0, 0]
        };
    }
    
    var personalDeduction = 11000000;
    var dependentDeduction = dependents * 4400000;
    var taxableIncome = income - personalDeduction - dependentDeduction;
    
    if (taxableIncome <= 0) {
        return {
            warning: "",
            totalIncome: income,
            dependentDeduction: dependentDeduction,
            taxableIncome: 0,
            taxAmount: 0,
            netIncome: income,
            bracketTaxes: [0, 0, 0, 0, 0, 0, 0]
        };
    }

    var tax = 0;
    var bracketTaxes = [0, 0, 0, 0, 0, 0, 0];

    if (taxableIncome > 0 && taxableIncome <= 5000000) {
        tax = taxableIncome * 0.05;
        bracketTaxes[0] = taxableIncome * 0.05;
    } else if (taxableIncome > 5000000 && taxableIncome <= 10000000) {
        tax = 250000 + 0.1 * (taxableIncome - 5000000);
        bracketTaxes[0] = 250000;
        bracketTaxes[1] = 0.1 * (taxableIncome - 5000000);
    } else if (taxableIncome > 10000000 && taxableIncome <= 18000000) {
        tax = 750000 + 0.15 * (taxableIncome - 10000000);
        bracketTaxes[0] = 250000;
        bracketTaxes[1] = 500000;
        bracketTaxes[2] = 0.15 * (taxableIncome - 10000000);
    } else if (taxableIncome > 18000000 && taxableIncome <= 32000000) {
        tax = 1950000 + 0.2 * (taxableIncome - 18000000);
        bracketTaxes[0] = 250000;
        bracketTaxes[1] = 500000;
        bracketTaxes[2] = 1200000;
        bracketTaxes[3] = 0.2 * (taxableIncome - 18000000);
    } else if (taxableIncome > 32000000 && taxableIncome <= 52000000) {
        tax = 4750000 + 0.25 * (taxableIncome - 32000000);
        bracketTaxes[0] = 250000;
        bracketTaxes[1] = 500000;
        bracketTaxes[2] = 1200000;
        bracketTaxes[3] = 2800000;
        bracketTaxes[4] = 0.25 * (taxableIncome - 32000000);
    } else if (taxableIncome > 52000000 && taxableIncome <= 80000000) {
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
    return {
        warning: "",
        totalIncome: income,
        dependentDeduction: dependentDeduction,
        taxableIncome: taxableIncome,
        taxAmount: tax,
        netIncome: netIncome,
        bracketTaxes: bracketTaxes
    };
}
