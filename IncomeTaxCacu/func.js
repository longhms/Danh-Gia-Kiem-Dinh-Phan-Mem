const personalDeduction = 11000000;
const dependentsDeduction = 4400000;

function App() {
  const [salary, setSalary] = React.useState(20000000);
  const [person, setPerson] = React.useState(1);

  const getListTaxes = incomeTaxes => {
    const listTaxes = [];
    listTaxes.push({
      base: 1,
      text: 'Đến 5 triệu đồng (trđ)',
      percent: '5%',
      value: incomeTaxes > 5000000 ? 250000 : incomeTaxes * 5 / 100 });


    if (incomeTaxes > 5000000) {
      listTaxes.push({
        base: 2,
        text: 'Trên 5 trđ đến 10 trđ',
        percent: '10%',
        value: incomeTaxes > 10000000 ? 500000 : incomeTaxes * 10 / 100 - 250000 - 250000 });

    }

    if (incomeTaxes > 10000000) {
      listTaxes.push({
        base: 3,
        text: 'Trên 10 trđ đến 18 trđ',
        percent: '15%',
        value: incomeTaxes > 18000000 ? 1200000 : incomeTaxes * 15 / 100 - 750000 - 750000 });

    }

    if (incomeTaxes > 18000000) {
      listTaxes.push({
        base: 4,
        text: 'Trên 18 trđ đến 32 trđ',
        percent: '20%',
        value: incomeTaxes > 32000000 ? 2800000 : incomeTaxes * 20 / 100 - 1950000 - 1650000 });

    }

    if (incomeTaxes > 32000000) {
      listTaxes.push({
        base: 5,
        text: 'Trên 32 trđ đến 52 trđ',
        percent: '25%',
        value: incomeTaxes > 52000000 ? 5000000 : incomeTaxes * 25 / 100 - 4750000 - 3250000 });

    }

    if (incomeTaxes > 52000000) {
      listTaxes.push({
        base: 6,
        text: 'Trên 52 trđ đến 80 trđ',
        percent: '30%',
        value: incomeTaxes > 80000000 ? 8400000 : incomeTaxes * 30 / 100 - 9750000 - 5850000 });

    }

    if (incomeTaxes > 80000000) {
      listTaxes.push({
        base: 7,
        text: 'Trên 80 trđ',
        percent: '35%',
        value: incomeTaxes * 35 / 100 - 18150000 - 9850000 });

    }

    return listTaxes;
  };

  const formatCurrency = number => {
    return new Intl.NumberFormat('vn', { style: 'currency', currency: 'vnd' }).format(number);
  };

  const renderPersonalTax = () => {
    const incomeTaxes = salary - personalDeduction - dependentsDeduction * person;
    const taxes = incomeTaxes > 0 ? getListTaxes(incomeTaxes) : [];
    const taxesFee = taxes.reduce((num, item) => {
      return item.value + num;
    }, 0);

    // eslint-disable-next-line no-unused-expressions
    return /*#__PURE__*/(
      React.createElement("table", null, /*#__PURE__*/
      React.createElement("tbody", null, /*#__PURE__*/
      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", { colSpan: "3" }, "T\u1ED5ng thu nh\u1EADp"), /*#__PURE__*/
      React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, formatCurrency(salary)))), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", { colSpan: "3" }, "Gi\u1EA3m tr\u1EEB c\xE1 nh\xE2n"), /*#__PURE__*/
      React.createElement("td", null, formatCurrency(personalDeduction))), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", { colSpan: "3" }, "Gi\u1EA3m tr\u1EEB ph\u1EE5 thu\u1ED9c"), /*#__PURE__*/
      React.createElement("td", null, formatCurrency(dependentsDeduction * person))), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", { colSpan: "3" }, "S\u1ED1 ti\u1EC1n t\xEDnh thu\u1EBF thu nh\u1EADp c\xE1 nh\xE2n"), /*#__PURE__*/
      React.createElement("td", null, formatCurrency(incomeTaxes > 0 ? incomeTaxes : 0))), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", { colSpan: "3" }, "Thu\u1EBF ph\u1EA3i n\u1ED9p"), /*#__PURE__*/
      React.createElement("td", null, formatCurrency(taxesFee))), /*#__PURE__*/

      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("td", { colSpan: "3" }, "S\u1ED1 ti\u1EC1n \u0111\u01B0\u1EE3c l\u0129nh"), /*#__PURE__*/
      React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, formatCurrency(salary - taxesFee)))),


      taxes.length > 0 && /*#__PURE__*/
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("tr", null, /*#__PURE__*/
      React.createElement("th", null, "B\u1EADc"), /*#__PURE__*/
      React.createElement("th", null, "Thu nh\u1EADp t\xEDnh thu\u1EBF/th\xE1ng"), /*#__PURE__*/
      React.createElement("th", null, "Thu\u1EBF su\u1EA5t"), /*#__PURE__*/
      React.createElement("th", null, "S\u1ED1 ti\u1EC1n")),


      taxes.map((item) => /*#__PURE__*/
      React.createElement("tr", { key: item.base }, /*#__PURE__*/
      React.createElement("td", null, item.base), /*#__PURE__*/
      React.createElement("td", null, item.text), /*#__PURE__*/
      React.createElement("td", null, item.percent), /*#__PURE__*/
      React.createElement("td", null, formatCurrency(item.value))))))));








  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "App" }, /*#__PURE__*/
    React.createElement("div", { className: "input-group" }, /*#__PURE__*/
    React.createElement("label", null, "T\u1ED5ng thu nh\u1EADp:"), /*#__PURE__*/
    React.createElement("input", { placeholder: "T\u1ED5ng thu nh\u1EADp", type: "number", value: salary, onChange: e => {setSalary(e.target.value);} })), /*#__PURE__*/

    React.createElement("div", { className: "input-group" }, /*#__PURE__*/
    React.createElement("label", null, "S\u1ED1 ng\u01B0\u1EDDi ph\u1EE5 thu\u1ED9c:"), /*#__PURE__*/
    React.createElement("input", { placeholder: "Ng\u01B0\u1EDDi ph\u1EE5 thu\u1ED9c", type: "number", value: person, onChange: e => {setPerson(e.target.value);} })),

    renderPersonalTax()));


}


function tick() {
  ReactDOM.render( /*#__PURE__*/
  React.createElement(App, null),
  document.getElementById('root'));

}

tick();