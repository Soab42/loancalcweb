import { updateLoanRecoverable } from "../loan/loanSlice";
export const customMiddleware = (store) => (next) => (action) => {
  if (action.type === "loan/updateLoanRecoverable") {
    const loanRecoverable = store.getState()?.loan.loanRecoverable;
    const loan = store.getState()?.loan.loanData;
    if (loan.duration - 1 > action.payload.sl) {
      const recCurrent = loanRecoverable[action.payload.sl];
      const recNext =
        loanRecoverable[(action.payload.sl + 1) % loanRecoverable.length];

      const { date, outstanding } = recCurrent;
      const { date: nextDate, sl } = recNext;
      const day = (new Date(nextDate) - new Date(date)) / (24 * 60 * 60 * 1000);
      const service = Number(outstanding) * (loan.interestrate / 365);
      // console.log(day);
      const servicecharge = (service / 100) * day;
      const recoverable = loan.recoverable;
      const principle = recoverable - servicecharge;
      const outstandingNext = outstanding - principle;

      const nextLoanRecoverable = {
        date: nextDate,
        day: day,
        openingoutstanding: outstanding,
        outstanding: outstandingNext.toFixed(0),
        previousDate: date,
        principle: principle.toFixed(2),
        recoverable: recoverable,
        servicecharge: servicecharge.toFixed(2),
        sl: sl,
      };
      store.dispatch(updateLoanRecoverable(nextLoanRecoverable));
    }
    return next(action);
  }

  return next(action);
};

// {
//   type: 'loan/updateLoanRecoverable',
//   payload:
//     {
//       date: '2023-06-27',
//       day: 31,
//       openingoutstanding: 100000,
//       outstanding: 92538,
//       previousDate: '2023-05-27',
//       principle: 7461.64,
//       recoverable: 9500,
//       servicecharge: 2038.36,
//       sl: 0
//     },
// }
