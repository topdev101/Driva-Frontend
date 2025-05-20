import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanSchema } from "../schema";

export type LoanDetails = {
  loanPurpose: string;
  amount: number;
  deposit: number;
  term: number;
};

type Props = { onSubmit: (data: LoanDetails) => void; onBack: () => void };

const LoanDetailsForm: React.FC<Props> = ({ onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoanDetails>({
    resolver: zodResolver(loanSchema),
    defaultValues: { deposit: 0 },
  });
  const purpose = watch("loanPurpose");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Loan Purpose</label>
        <select
          {...register("loanPurpose")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select…</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Home Improvement">Home Improvement</option>
        </select>
        {errors.loanPurpose && (
          <p className="mt-1 text-red-500 text-xs">
            {errors.loanPurpose.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Amount</label>
        <input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.amount && (
          <p className="mt-1 text-red-500 text-xs">{errors.amount.message}</p>
        )}
      </div>

      {purpose === "Vehicle" && (
        <div>
          <label className="block text-sm font-semibold mb-1">Deposit</label>
          <input
            type="number"
            {...register("deposit", { valueAsNumber: true })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.deposit && (
            <p className="mt-1 text-red-500 text-xs">
              {errors.deposit.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-1">Term (years)</label>
        <input
          type="number"
          {...register("term", { valueAsNumber: true })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.term && (
          <p className="mt-1 text-red-500 text-xs">{errors.term.message}</p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoanDetailsForm;
