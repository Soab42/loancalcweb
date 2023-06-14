const { createSlice } = require("@reduxjs/toolkit");

const loanSlice = createSlice({
  name: "loan",
  initialState: { loanData: "", loanRecoverable: [] },
  reducers: {
    addLoan: (state, action) => {
      state.loanData = action.payload;
    },
    addLoanRecoverable: (state, action) => {
      if (action.payload.sl <= state.loanData.duration - 1)
        state.loanRecoverable[action.payload.sl] = action.payload;
    },
    updateLoanRecoverable: (state, action) => {
      state.loanRecoverable[action.payload.sl] = action.payload;
    },
    addLoanRecoverableAll: (state, action) => {
      state.loanRecoverable = action.payload;
    },
    deleteLoanRecoverable: (state, action) => {
      state.loanRecoverable[action.payload] = "";
    },
  },
});
export default loanSlice.reducer;
export const {
  addLoan,
  addLoanRecoverable,
  deleteLoanRecoverable,
  addLoanRecoverableAll,
  updateLoanRecoverable,
} = loanSlice.actions;
