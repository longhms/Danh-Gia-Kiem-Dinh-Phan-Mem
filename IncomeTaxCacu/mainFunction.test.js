// const chai = require('chai');

import * as chai from 'chai';

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


describe("kiểm tra func chính", function() {
  // it("So sánh kết quả mong muốn với incomeTaxes = 1000000", function() {
  //   const incomeTaxes = 1000000;
  //   chai.expect(getListTaxes(incomeTaxes)[0].value).to.equal(100000)
  // });
 describe("KIểm tra kết quả với incometaxes = 100000000", function() {
  const res = getListTaxes(100000000);
  it ('Case 1: ', function() {
    chai.expect(res[0].value).to.equal(250000)
  });
  it ("Case 2: ", function() {
    chai.expect(res[1].value).to.equal(500000)
  });
  it ("Case 3: ", function() {
    chai.expect(res[2].value).to.equal(1200000)
  });
  it ("Case 4: ", function() {
    chai.expect(res[3].value).to.equal(2800000)
  });
  it ("Case 5: ", function() {
    chai.expect(res[4].value).to.equal(5000000)
  });
  it ("Case 6: ", function() {
    chai.expect(res[5].value).to.equal(8400000)
  });
  it ("Case 7: ", function() {
    chai.expect(res[6].value).to.equal(7000000)
  });
 }) 
});

console.log(getListTaxes(100000000))