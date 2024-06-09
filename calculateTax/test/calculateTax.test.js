import { expect } from 'chai';
import { calculateTax } from '../calculateTax.js';

describe('Test calculateTax function', function() {
    it('should return correct tax for income of 1000000 and 0 dependents', function() {
        const result = calculateTax(1000000, 0);
        expect(result.warning).to.equal('');
        expect(result.totalIncome).to.equal(1000000);
        expect(result.dependentDeduction).to.equal(0);
        expect(result.taxableIncome).to.equal(0);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(1000000);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should return correct tax for income of 6000000 and 1 dependent', function() {
        const result = calculateTax(6000000, 1);
        expect(result.warning).to.equal('');
        expect(result.totalIncome).to.equal(6000000);
        expect(result.dependentDeduction).to.equal(4400000);
        expect(result.taxableIncome).to.equal(0);  // taxableIncome được điều chỉnh thành 0
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(6000000);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should return correct tax for income of 15000000 and 0 dependents', function() {
        const result = calculateTax(15000000, 0);
        expect(result.warning).to.equal('');
        expect(result.totalIncome).to.equal(15000000);
        expect(result.dependentDeduction).to.equal(0);
        expect(result.taxableIncome).to.equal(15000000 - 11000000);
        expect(result.taxAmount).to.equal(0.05 * (15000000 - 11000000));
        expect(result.netIncome).to.equal(15000000 - 0.05 * (15000000 - 11000000));
        expect(result.bracketTaxes).to.deep.equal([0.05 * (15000000 - 11000000), 0, 0, 0, 0, 0, 0]);
    });

    it('should return correct tax for income of 35000000 and 0 dependents', function() {
        const result = calculateTax(35000000, 0);
        expect(result.warning).to.equal('');
        expect(result.totalIncome).to.equal(35000000);
        expect(result.dependentDeduction).to.equal(0);
        expect(result.taxableIncome).to.equal(35000000 - 11000000);
        const taxableIncome = 35000000 - 11000000;
        const expectedTaxes = [
            250000,
            500000,
            1200000,
            0.2 * (taxableIncome - 18000000),
            0, 0, 0
        ];
        
    });

    // Giá trị không hợp lệ
    it('should show warning for non-numeric income with "abc"', function() {
        const result = calculateTax('200000abc', 2);
        expect(result.warning).to.equal('Giá trị nhập vào phải là số nguyên dương!');
        expect(result.totalIncome).to.equal(0);
        expect(result.dependentDeduction).to.equal(0);
        expect(result.taxableIncome).to.equal(0);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(0);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should show warning for non-numeric income with "NaN"', function() {
        const result = calculateTax(NaN, 2);
        expect(result.warning).to.equal('Giá trị nhập vào phải là số nguyên dương!');
        expect(result.totalIncome).to.equal(0);
        expect(result.dependentDeduction).to.equal(0);
        expect(result.taxableIncome).to.equal(0);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(0);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should show warning for negative income', function() {
        const result = calculateTax(-1000000, 2);
        expect(result.warning).to.equal('Giá trị nhập vào phải là số nguyên dương!');
        expect(result.totalIncome).to.equal(0);
        expect(result.dependentDeduction).to.equal(0);
        expect(result.taxableIncome).to.equal(0);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(0);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should show warning for non-numeric dependents', function() {
        const result = calculateTax(2000000, 'abc');
        expect(result.warning).to.equal('Giá trị nhập vào phải là số nguyên dương!');
        expect(result.totalIncome).to.equal(0);
        expect(result.dependentDeduction).to.equal(0);
        expect(result.taxableIncome).to.equal(0);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(0);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should show warning for negative dependents', function() {
        const result = calculateTax(5000, -1);
        expect(result.warning).to.equal('Giá trị nhập vào phải là số nguyên dương!');
        expect(result.totalIncome).to.equal(0);
        expect(result.dependentDeduction).to.equal(0);
        expect(result.taxableIncome).to.equal(0);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(0);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should show warning for zero income', function() {
        const result = calculateTax(0, 2);
        expect(result.warning).to.equal('Giá trị nhập vào phải là số nguyên dương!');
        expect(result.totalIncome).to.equal(0);
        expect(result.dependentDeduction).to.equal(0);
        expect(result.taxableIncome).to.equal(0);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(0);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should show warning for zero dependents', function() {
        const result = calculateTax(5000000, 0);
        expect(result.warning).to.equal('');
        expect(result.totalIncome).to.equal(5000000);
        expect(result.dependentDeduction).to.equal(0);
        expect(result.taxableIncome).to.equal(0);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(5000000);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    // Giá trị hợp lệ
    it('should return correct tax for income of 8000000 and 2 dependents', function() {
        const result = calculateTax(8000000, 2);
        expect(result.warning).to.equal('');
        expect(result.totalIncome).to.equal(8000000);
        expect(result.dependentDeduction).to.equal(8800000);
        expect(result.taxableIncome).to.equal(0);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(8000000);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should return correct tax for income of 10000000 and 2 dependents', function() {
        const result = calculateTax(10000000, 2);
        expect(result.warning).to.equal('');
        expect(result.totalIncome).to.equal(10000000);
        expect(result.dependentDeduction).to.equal(8800000);
        expect(result.taxableIncome).to.equal(0);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(10000000);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should return correct tax for income of 12000000 and 2 dependents', function() {
        const result = calculateTax(12000000, 2);
        expect(result.warning).to.equal('');
        expect(result.totalIncome).to.equal(12000000);
        expect(result.dependentDeduction).to.equal(8800000);
        expect(result.taxableIncome).to.equal(12000000 - 11000000 - 8800000);
        expect(result.taxAmount).to.equal(0);
        expect(result.netIncome).to.equal(12000000);
        expect(result.bracketTaxes).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should return correct tax for income of 25000000 and 2 dependents', function() {
        const result = calculateTax(25000000, 2);
        expect(result.warning).to.equal('');
        expect(result.totalIncome).to.equal(25000000);
        expect(result.dependentDeduction).to.equal(8800000);
        expect(result.taxableIncome).to.equal(25000000 - 11000000 - 8800000);
        const taxableIncome = 25000000 - 11000000 - 8800000;
        const expectedTaxes = [
            250000,
            0.1 * (taxableIncome - 5000000),
            0,
            0,
            0,
            0,
            0
        ];
        const totalTax = expectedTaxes.reduce((sum, value) => sum + value, 0);
        expect(result.taxAmount).to.equal(totalTax);
        expect(result.netIncome).to.equal(25000000 - totalTax);
        expect(result.bracketTaxes).to.deep.equal(expectedTaxes);
    });

});
