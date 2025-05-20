import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalSchema } from "../schema";

export type PersonalDetails = {
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus: "Employed" | "Self-Employed" | "Unemployed";
  employerName?: string;
};

type Props = { onSubmit: (data: PersonalDetails) => void };

const PersonalDetailsForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalDetails>({
    resolver: zodResolver(personalSchema),
  });

  const status = watch("employmentStatus");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">First Name</label>
        <input
          {...register("firstName")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.firstName && (
          <p className="mt-1 text-red-500 text-xs">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Last Name</label>
        <input
          {...register("lastName")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.lastName && (
          <p className="mt-1 text-red-500 text-xs">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Employment Status
        </label>
        <select
          {...register("employmentStatus")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select…</option>
          <option value="Employed">Employed</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Unemployed">Unemployed</option>
        </select>
        {errors.employmentStatus && (
          <p className="mt-1 text-red-500 text-xs">
            {errors.employmentStatus.message}
          </p>
        )}
      </div>

      {status === "Employed" && (
        <div>
          <label className="block text-sm font-semibold mb-1">
            Employer Name
          </label>
          <input
            {...register("employerName")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.employerName && (
            <p className="mt-1 text-red-500 text-xs">
              {errors.employerName.message}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Next
      </button>
    </form>
  );
};

export default PersonalDetailsForm;
