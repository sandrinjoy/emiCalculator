import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  const [amount, setAmount] = useState(10000);
  const [interest, setInterest] = useState(10);
  const [duration, setDuration] = useState(12);
  const [loanEMI, setLoanEMI] = useState(879);
  const [totalInterest, setTotalInterest] = useState(550);
  const [totalPayment, setTotalPayment] = useState(10550);
  const [show, setShow] = useState(true);

  // useEffect to update loan EMI and total Interest
  useEffect(() => {
    const r = interest / 12 / 100;
    const localLoanEMI =
      (amount * r * Math.pow(1 + r, duration)) /
      (Math.pow(1 + r, duration) - 1);
    setLoanEMI(localLoanEMI);
    const localTotalInterest = localLoanEMI * duration - amount;
    setTotalInterest(localTotalInterest);
  }, [amount, interest, duration]);

  // useEffect to update totalpayement .
  useEffect(() => {
    setTotalPayment(amount + totalInterest);
  }, [amount, totalInterest]);

  // rendering table
  const showEmiTable = () => {
    const r = interest / 12 / 100; //monthly interest rate
    let balance = amount; //remaining principle
    let cPaid = 0; //current month  paid
    let cPrinciple = 0; //current month principle
    let cInterest = 0; //current month interest
    return (
      <>
        <div>
          {/* headers */}
          <div className="tablerow">
            <div>month</div>
            <div>principle</div>
            <div>interest</div>
            <div>total payment</div>
            <div>balance</div>
          </div>
          <div className="tablerow">
            <div>({duration})</div>
            <div>({Math.round(amount)})</div>
            <div>({Math.round(totalInterest)})</div>
            <div>({Math.round(totalPayment)})</div>
            <div></div>
          </div>
          <hr />
          {duration > 0 &&
            Array.from(Array(duration), (_, index) => index + 1).map((x) => {
              cInterest = balance * r; //interest due for the month (correct)
              cPrinciple = loanEMI - cInterest; //emi - due interest of the current month
              cPaid = cInterest + cPrinciple; // just to validate emi = cinterest+cprinciple

              balance = balance - cPrinciple; //updating balance with the paid principle current month

              return (
                <div className="tablerow" key={x}>
                  <div>{x}</div>
                  <div>{Math.round(cPrinciple)}</div>
                  <div>{Math.round(cInterest)}</div>
                  <div>{Math.round(cPaid)}</div>
                  <div>{Math.round(balance)}</div>
                </div>
              );
            })}
        </div>
      </>
    );
  };

  return (
    <div className="App">
      <label>Principle Amount</label>
      <input
        value={amount}
        onChange={(e) => setAmount(parseInt(e.currentTarget.value, 10))}
        type="number"
      ></input>
      <br />
      <br />
      <label>Rate of interest</label>
      <input
        value={interest}
        onChange={(e) => setInterest(parseInt(e.currentTarget.value, 10))}
        type="number"
      ></input>
      <br />
      <br />
      <label>duration</label>
      <input
        value={duration}
        onChange={(e) => setDuration(parseInt(e.currentTarget.value, 10))}
        type="number"
      ></input>

      <br />
      <br />
      <label>loan EMI: </label>
      <span>{Math.round(loanEMI)}</span>
      <br />
      <br />
      <label>total interest payable: </label>
      <span>{Math.round(totalInterest)}</span>
      <br />
      <br />
      <label>total payment (amount + interest ): </label>
      <span>{Math.round(totalPayment)}</span>
      <br />
      <br />
      <button type="button" onClick={() => setShow(!show)}>
        {" "}
        {show ? "Hide" : "show"} EMI Table{" "}
      </button>
      <br />
      <br />
      {show && showEmiTable()}
    </div>
  );
}
