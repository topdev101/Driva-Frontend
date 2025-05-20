import React, { useState } from "react";
import PersonalDetailsForm, {
  PersonalDetails,
} from "./components/PersonalDetailsForm";
import LoanDetailsForm, { LoanDetails } from "./components/LoanDetailsForm";
import Results from "./components/Results";
import { Offer } from "./components/Results";
import "./index.css";

const steps = ["Personal", "Loan", "Results"];

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState<PersonalDetails | null>(
    null
  );
  const [loanData, setLoanData] = useState<LoanDetails | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handlePersonal = (data: PersonalDetails) => {
    setPersonalData(data);
    next();
  };

  const handleLoan = async (data: LoanDetails) => {
    setLoanData(data);
    const res = await fetch("http://localhost:4000/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...personalData, ...data }),
    });
    const json = await res.json();
    setOffers(json.offers);
    next();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {steps.map((label, idx) => (
              <span
                key={idx}
                className={`text-sm font-medium ${
                  step - 1 >= idx ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && <PersonalDetailsForm onSubmit={handlePersonal} />}
        {step === 2 && <LoanDetailsForm onSubmit={handleLoan} onBack={back} />}
        {step === 3 && <Results offers={offers} onBack={back} />}
      </div>
    </div>
  );
};

export default App;
