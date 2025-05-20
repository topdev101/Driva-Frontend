import React from "react";

export type Offer = {
  lender: string;
  interestRate: number;
  monthlyRepayment: number;
  fees: string;
};

type Props = { offers: Offer[]; onBack: () => void };

const Results: React.FC<Props> = ({ offers, onBack }) => (
  <div>
    <h2 className="text-2xl font-bold text-center mb-4">Loan Offers</h2>
    <div className="space-y-4">
      {offers.map((o, i) => (
        <div key={i} className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">{o.lender}</h3>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <span className="font-medium">Rate:</span> {o.interestRate}% APR
            </p>
            <p>
              <span className="font-medium">Monthly:</span> $
              {o.monthlyRepayment}
            </p>
            <p className="col-span-2">
              <span className="font-medium">Fees:</span> {o.fees}
            </p>
          </div>
        </div>
      ))}
    </div>
    <button
      onClick={onBack}
      className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
    >
      Apply Again
    </button>
  </div>
);

export default Results;
