import * as chai from 'chai';

const getListTaxes = incomeTaxes => {
  const listTaxes = [];
  listTaxes.push({
    base: 1,
    text: 'Đến 5 triệu đồng (trđ)',
    percent: '5%',
    value: incomeTaxes > 5000000 ? 250000 : incomeTaxes * 5 / 100
  });

  if (incomeTaxes > 5000000) {
    listTaxes.push({
      base: 2,
      text: 'Trên 5 trđ đến 10 trđ',
      percent: '10%',
      value: incomeTaxes > 10000000 ? 500000 : (incomeTaxes - 5000000) * 10 / 100
    });
  }

  if (incomeTaxes > 10000000) {
    listTaxes.push({
      base: 3,
      text: 'Trên 10 trđ đến 18 trđ',
      percent: '15%',
      value: incomeTaxes > 18000000 ? 1200000 : (incomeTaxes - 10000000) * 15 / 100
    });
  }

  if (incomeTaxes > 18000000) {
    listTaxes.push({
      base: 4,
      text: 'Trên 18 trđ đến 32 trđ',
      percent: '20%',
      value: incomeTaxes > 32000000 ? 2800000 : (incomeTaxes - 18000000) * 20 / 100
    });
  }

  if (incomeTaxes > 32000000) {
    listTaxes.push({
      base: 5,
      text: 'Trên 32 trđ đến 52 trđ',
      percent: '25%',
      value: incomeTaxes > 52000000 ? 5000000 : (incomeTaxes - 32000000) * 25 / 100
    });
  }

  if (incomeTaxes > 52000000) {
    listTaxes.push({
      base: 6,
      text: 'Trên 52 trđ đến 80 trđ',
      percent: '30%',
      value: incomeTaxes > 80000000 ? 8400000 : (incomeTaxes - 52000000) * 30 / 100
    });
  }

  if (incomeTaxes > 80000000) {
    listTaxes.push({
      base: 7,
      text: 'Trên 80 trđ',
      percent: '35%',
      value: (incomeTaxes - 80000000) * 35 / 100 - 18150000 + 5850000
    });
  }

  return listTaxes;
};

describe("Kiểm tra func chính", function() {

  // it("So sánh kết quả mong muốn với incomeTaxes = 1000000", function() {
  //   const incomeTaxes = 1000000;
  //   const result = getListTaxes(incomeTaxes);
  //   chai.expect(result[0].value).to.equal(50000);
  // });

  describe("Kiểm tra kết quả với incomeTaxes = 100000000", function() {
    const res = getListTaxes(100000000);

    it('Case 1: giá trị phần tử đầu tiên', function() {
      chai.expect(res[0].value).to.equal(250000);
    });

    it('Case 2: giá trị phần tử thứ hai', function() {
      chai.expect(res[1].value).to.equal(500000);
    });

    it('Case 3: giá trị phần tử thứ ba', function() {
      chai.expect(res[2].value).to.equal(1200000);
    });

    it('Case 4: giá trị phần tử thứ tư', function() {
      chai.expect(res[3].value).to.equal(2800000);
    });

    it('Case 5: giá trị phần tử thứ năm', function() {
      chai.expect(res[4].value).to.equal(5000000);
    });

    it('Case 6: giá trị phần tử thứ sáu', function() {
      chai.expect(res[5].value).to.equal(8400000);
    });

    it('Case 7: giá trị phần tử thứ bảy', function() {
      chai.expect(res[6].value).to.equal(7000000);
    });

    it('Kiểm tra độ dài của mảng kết quả', function() {
      chai.expect(res.length).to.equal(7);
    });

    it('Kiểm tra tổng giá trị của các phần tử', function() {
      const totalValue = res.reduce((sum, item) => sum + item.value, 0);
      chai.expect(totalValue).to.equal(250000 + 500000 + 1200000 + 2800000 + 5000000 + 8400000 + 7000000);
    });
  });

  describe("Kiểm tra thêm các trường hợp khác", function() {
    it("incomeTaxes = 6000000", function() {
      const result = getListTaxes(6000000);
      chai.expect(result.length).to.equal(2);
      chai.expect(result[0].value).to.equal(250000);
      chai.expect(result[1].value).to.equal(100000);
    });

    it("incomeTaxes = 15000000", function() {
      const result = getListTaxes(15000000);
      chai.expect(result.length).to.equal(3);
      chai.expect(result[0].value).to.equal(250000);
      chai.expect(result[1].value).to.equal(500000);
      chai.expect(result[2].value).to.equal(750000);
    });

    it("incomeTaxes = 35000000", function() {
      const result = getListTaxes(35000000);
      chai.expect(result.length).to.equal(5);
      chai.expect(result[0].value).to.equal(250000);
      chai.expect(result[1].value).to.equal(500000);
      chai.expect(result[2].value).to.equal(1200000);
      chai.expect(result[3].value).to.equal(3400000);  // 1700000 * 20%
      chai.expect(result[4].value).to.equal(750000);  // 3000000 * 25%
    });
  });
});

console.log(getListTaxes(1000000));
