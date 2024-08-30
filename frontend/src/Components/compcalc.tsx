import React, { useEffect, useState } from "react";

const ComponentenCalulator = () => {
  const [PMinAmount, SetPMinAmount] = useState(50000);
  const [PMaxAmount, SetPMaxAmount] = useState(4000000);
  const [PAmount, SetPAmount] = useState(PMinAmount);
  const [PSAmount, SetPSAmount] = useState(0);

  const [PMinInterest, SetPMinInterest] = useState(11.25);
  const [PMaxInterest, SetPMaxInterest] = useState(25);
  const [PInterest, SetPInterest] = useState(PMinInterest);

  const [PMinTenure, SetPMinTenure] = useState(1);
  const [PMaxTenure, SetPMaxTenure] = useState(7);
  const [PTenure, SetPTenure] = useState(PMinTenure);

  const [HMinAmount, SetHMinAmount] = useState(300000);
  const [HMaxAmount, SetHMaxAmount] = useState(50000000);
  const [HAmount, SetHAmount] = useState(HMinAmount);
  const [HSAmount, SetHSAmount] = useState(0);

  const [HMinInterest, SetHMinInterest] = useState(6.9);
  const [HMaxInterest, SetHMaxInterest] = useState(11);
  const [HInterest, SetHInterest] = useState(HMinInterest);

  const [HMinTenure, SetHMinTenure] = useState(1);
  const [HMaxTenure, SetHMaxTenure] = useState(30);
  const [HTenure, SetHTenure] = useState(HMinTenure);

  const [CMinAmount, SetCMinAmount] = useState(100000);
  const [CMaxAmount, SetCMaxAmount] = useState(10000000);
  const [CAmount, SetCAmount] = useState(CMinAmount);
  const [CSAmount, SetCSAmount] = useState(0);

  const [CMinInterest, SetCMinInterest] = useState(7);
  const [CMaxInterest, SetCMaxInterest] = useState(17.5);
  const [CInterest, SetCInterest] = useState(CMinInterest);

  const [CMinTenure, SetCMinTenure] = useState(1);
  const [CMaxTenure, SetCMaxTenure] = useState(7);
  const [CTenure, SetCTenure] = useState(CMinTenure);

  function calculateEMI(
    principal: number,
    annualRate: number,
    tenureYears: number
  ): number {
    const monthlyRate = annualRate / (12 * 100);
    const tenureMonths = tenureYears * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    let payment = Number(emi.toFixed(2));
    payment = Math.round(payment);

    return payment;
  }

  useEffect(() => {
    const MonthlyInstallment = calculateEMI(PAmount, PInterest, PTenure);
    SetPSAmount(MonthlyInstallment);
  }, [PAmount, PInterest, PTenure]);

  useEffect(() => {
    const MonthlyInstallment = calculateEMI(HAmount, HInterest, HTenure);
    SetHSAmount(MonthlyInstallment);
  }, [HAmount, HInterest, HTenure]);

  useEffect(() => {
    const MonthlyInstallment = calculateEMI(CAmount, CInterest, CTenure);
    SetCSAmount(MonthlyInstallment);
  }, [CAmount, CInterest, CTenure]);

  function formatIndianCurrency(number: number) {
    const numStr = number.toString();
    const lastThree = numStr.slice(-3);
    const otherNumbers = numStr.slice(0, -3);
    const formattedNumber =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
      (otherNumbers ? "," : "") +
      lastThree;
    return formattedNumber;
  }

  return (
    <>
      <section className="columns">
        {/* Personal Loan EMI Calculator */}
        <div className="column" role="region" aria-labelledby="personal-loan">
          <h1 id="personal-loan">Personal Loan EMI Calculator</h1>

          <div className="load_input_head">
            <label htmlFor="personal-loan-amount" className="heading">
              Loan Amount (₹)
            </label>
            <div className="input">
              <input
                id="personal-loan-amount"
                type="text"
                value={formatIndianCurrency(PAmount)}
                disabled
                aria-readonly="true"
                aria-labelledby="personal-loan-amount"
              />
            </div>
          </div>

          <div className="slider_input">
            <input
              type="range"
              aria-label="Personal Loan Amount"
              min={PMinAmount}
              max={PMaxAmount}
              onChange={(e) => {
                SetPAmount(Number(e.target.value));
              }}
              defaultValue={PMinAmount}
              step={50000}
            />
          </div>
          <div className="slider_input_info">
            <div className="col1">50K</div>
            <div className="col2">40L</div>
          </div>

          <div className="load_input_head">
            <label htmlFor="personal-loan-interest" className="heading">
              Interest Rate (p.a)
            </label>
            <div className="input">
              <input
                id="personal-loan-interest"
                type="number"
                value={PInterest}
                disabled
                aria-readonly="true"
              />
            </div>
          </div>

          <div className="slider_input">
            <input
              type="range"
              aria-label="Personal Loan Interest Rate"
              min={PMinInterest}
              max={PMaxInterest}
              onChange={(e) => {
                SetPInterest(Number(e.target.value));
              }}
              step={0.25}
              defaultValue={PMinInterest}
            />
          </div>
          <div className="slider_input_info">
            <div className="col1">11.25%</div>
            <div className="col2">25%</div>
          </div>

          <div className="load_input_head">
            <label htmlFor="personal-loan-tenure" className="heading">
              Tenure (years)
            </label>
            <div className="input">
              <input
                id="personal-loan-tenure"
                type="number"
                value={PTenure}
                disabled
                aria-readonly="true"
              />
            </div>
          </div>

          <div className="slider_input">
            <input
              type="range"
              aria-label="Personal Loan Tenure"
              min={PMinTenure}
              max={PMaxTenure}
              defaultValue={PMinTenure}
              onChange={(e) => {
                SetPTenure(Number(e.target.value));
              }}
              step={1}
            />
          </div>
          <div className="slider_input_info">
            <div className="col1">1</div>
            <div className="col2">7</div>
          </div>

          <div className="final_info">
            <div>Equated Monthly Installments</div>
            <div>EMI</div>
            <div aria-live="polite">
              (₹) {formatIndianCurrency(PSAmount)}
            </div>
            <div>
              <button aria-label="Apply for Personal Loan">Apply Now</button>
            </div>
          </div>
        </div>

        {/* Home Loan EMI Calculator */}
        <div className="column" role="region" aria-labelledby="home-loan">
          <h1 id="home-loan">Home Loan EMI Calculator</h1>
          <div className="load_input_head">
            <label htmlFor="home-loan-amount" className="heading">
              Loan Amount (₹)
            </label>
            <div className="input">
              <input
                id="home-loan-amount"
                type="text"
                value={formatIndianCurrency(HAmount)}
                disabled
                aria-readonly="true"
                aria-labelledby="home-loan-amount"
              />
            </div>
          </div>

          <div className="slider_input">
            <input
              type="range"
              aria-label="Home Loan Amount"
              min={HMinAmount}
              max={HMaxAmount}
              onChange={(e) => {
                SetHAmount(Number(e.target.value));
              }}
              defaultValue={HMinAmount}
              step={100000}
            />
          </div>
          <div className="slider_input_info">
            <div className="col1">3L</div>
            <div className="col2">5Cr</div>
          </div>

          <div className="load_input_head">
            <label htmlFor="home-loan-interest" className="heading">
              Interest Rate (p.a)
            </label>
            <div className="input">
              <input
                id="home-loan-interest"
                type="number"
                value={HInterest}
                disabled
                aria-readonly="true"
              />
            </div>
          </div>

          <div className="slider_input">
            <input
              type="range"
              aria-label="Home Loan Interest Rate"
              min={HMinInterest}
              max={HMaxInterest}
              onChange={(e) => {
                SetHInterest(Number(e.target.value));
              }}
              step={0.1}
              defaultValue={HMinInterest}
            />
          </div>
          <div className="slider_input_info">
            <div className="col1">6.9%</div>
            <div className="col2">11%</div>
          </div>

          <div className="load_input_head">
            <label htmlFor="home-loan-tenure" className="heading">
              Tenure (years)
            </label>
            <div className="input">
              <input
                id="home-loan-tenure"
                type="number"
                value={HTenure}
                disabled
                aria-readonly="true"
              />
            </div>
          </div>

          <div className="slider_input">
            <input
              type="range"
              aria-label="Home Loan Tenure"
              min={HMinTenure}
              max={HMaxTenure}
              defaultValue={HMinTenure}
              onChange={(e) => {
                SetHTenure(Number(e.target.value));
              }}
              step={1}
            />
          </div>
          <div className="slider_input_info">
            <div className="col1">1</div>
            <div className="col2">30</div>
          </div>

          <div className="final_info">
            <div>Equated Monthly Installments</div>
            <div>EMI</div>
            <div aria-live="polite">
              (₹) {formatIndianCurrency(HSAmount)}
            </div>
            <div>
              <button aria-label="Apply for Home Loan">Apply Now</button>
            </div>
          </div>
        </div>

        {/* Car Loan EMI Calculator */}
        <div className="column" role="region" aria-labelledby="car-loan">
          <h1 id="car-loan">Car Loan EMI Calculator</h1>
          <div className="load_input_head">
            <label htmlFor="car-loan-amount" className="heading">
              Loan Amount (₹)
            </label>
            <div className="input">
              <input
                id="car-loan-amount"
                type="text"
                value={formatIndianCurrency(CAmount)}
                disabled
                aria-readonly="true"
                aria-labelledby="car-loan-amount"
              />
            </div>
          </div>

          <div className="slider_input">
            <input
              type="range"
              aria-label="Car Loan Amount"
              min={CMinAmount}
              max={CMaxAmount}
              onChange={(e) => {
                SetCAmount(Number(e.target.value));
              }}
              defaultValue={CMinAmount}
              step={50000}
            />
          </div>
          <div className="slider_input_info">
            <div className="col1">1L</div>
            <div className="col2">1Cr</div>
          </div>

          <div className="load_input_head">
            <label htmlFor="car-loan-interest" className="heading">
              Interest Rate (p.a)
            </label>
            <div className="input">
              <input
                id="car-loan-interest"
                type="number"
                value={CInterest}
                disabled
                aria-readonly="true"
              />
            </div>
          </div>

          <div className="slider_input">
            <input
              type="range"
              aria-label="Car Loan Interest Rate"
              min={CMinInterest}
              max={CMaxInterest}
              onChange={(e) => {
                SetCInterest(Number(e.target.value));
              }}
              step={0.1}
              defaultValue={CMinInterest}
            />
          </div>
          <div className="slider_input_info">
            <div className="col1">7%</div>
            <div className="col2">17.5%</div>
          </div>

          <div className="load_input_head">
            <label htmlFor="car-loan-tenure" className="heading">
              Tenure (years)
            </label>
            <div className="input">
              <input
                id="car-loan-tenure"
                type="number"
                value={CTenure}
                disabled
                aria-readonly="true"
              />
            </div>
          </div>

          <div className="slider_input">
            <input
              type="range"
              aria-label="Car Loan Tenure"
              min={CMinTenure}
              max={CMaxTenure}
              defaultValue={CMinTenure}
              onChange={(e) => {
                SetCTenure(Number(e.target.value));
              }}
              step={1}
            />
          </div>
          <div className="slider_input_info">
            <div className="col1">1</div>
            <div className="col2">7</div>
          </div>

          <div className="final_info">
            <div>Equated Monthly Installments</div>
            <div>EMI</div>
            <div aria-live="polite">
              (₹) {formatIndianCurrency(CSAmount)}
            </div>
            <div>
              <button aria-label="Apply for Car Loan">Apply Now</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComponentenCalulator;
