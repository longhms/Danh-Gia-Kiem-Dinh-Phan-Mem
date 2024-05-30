const { JSDOM } = require('jsdom');
const calculateTax = require('./taxCacu');

describe('calculateTax', () => {
  let dom, document, incomeInput, dependentsInput, warning, totalIncome, dependentDeduction, taxableIncome, taxAmount, netIncome, taxBrackets;

  beforeEach(() => {
      // Set up a JSDOM instance
      dom = new JSDOM(`
          <!DOCTYPE html>
          <html>
          <body>
              <input id="income" />
              <input id="dependents" />
              <div id="warning"></div>
              <div id="totalIncome"></div>
              <div id="dependentDeduction"></div>
              <div id="taxableIncome"></div>
              <div id="taxAmount"></div>
              <div id="netIncome"></div>
              <div id="taxBracket1"></div>
              <div id="taxBracket2"></div>
              <div id="taxBracket3"></div>
              <div id="taxBracket4"></div>
              <div id="taxBracket5"></div>
              <div id="taxBracket6"></div>
              <div id="taxBracket7"></div>
          </body>
          </html>
      `);

      // Get the document object from the JSDOM instance
      document = dom.window.document;

      incomeInput = document.getElementById('income');
      dependentsInput = document.getElementById('dependents');
      warning = document.getElementById('warning');
      totalIncome = document.getElementById('totalIncome');
      dependentDeduction = document.getElementById('dependentDeduction');
      taxableIncome = document.getElementById('taxableIncome');
      taxAmount = document.getElementById('taxAmount');
      netIncome = document.getElementById('netIncome');
      taxBrackets = [
          document.getElementById('taxBracket1'),
          document.getElementById('taxBracket2'),
          document.getElementById('taxBracket3'),
          document.getElementById('taxBracket4'),
          document.getElementById('taxBracket5'),
          document.getElementById('taxBracket6'),
          document.getElementById('taxBracket7')
      ];
  });

  test('should display warning for invalid inputs', () => {
      incomeInput.value = '-10000';
      dependentsInput.value = '2';
      calculateTax();
      expect(warning.textContent).toBe('Giá trị nhập vào phải là số lớn hơn 0!');
      expect(totalIncome.textContent).toBe('0 ₫');
      expect(dependentDeduction.textContent).toBe('0 ₫');
      expect(taxableIncome.textContent).toBe('0 ₫');
      expect(taxAmount.textContent).toBe('0 ₫');
      expect(netIncome.textContent).toBe('0 ₫');
      taxBrackets.forEach(bracket => {
          expect(bracket.textContent).toBe('0 ₫');
      });
  });

  test('should correctly calculate tax for a given income and dependents', () => {
      incomeInput.value = '30000000';
      dependentsInput.value = '1';
      calculateTax();
      expect(warning.textContent).toBe('');
      expect(totalIncome.textContent).toBe('30.000.000 ₫');
      expect(dependentDeduction.textContent).toBe('4.400.000 ₫');
      expect(taxableIncome.textContent).toBe('14.600.000 ₫');
      expect(taxAmount.textContent).toBe('1.960.000 ₫');
      expect(netIncome.textContent).toBe('28.040.000 ₫');
      expect(taxBrackets[0].textContent).toBe('250.000 ₫');
      expect(taxBrackets[1].textContent).toBe('500.000 ₫');
      expect(taxBrackets[2].textContent).toBe('1.200.000 ₫');
      expect(taxBrackets[3].textContent).toBe('0 ₫');
      expect(taxBrackets[4].textContent).toBe('0 ₫');
      expect(taxBrackets[5].textContent).toBe('0 ₫');
      expect(taxBrackets[6].textContent).toBe('0 ₫');
  });

  // Add more tests as necessary to cover different cases and tax brackets
});