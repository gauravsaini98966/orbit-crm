import { useState } from "react";
import { motion } from "framer-motion";
import { submitInquiry } from "../utils/api.js";

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Retail & E-commerce",
  "Manufacturing",
  "Education",
  "Real Estate",
  "Hospitality",
  "Logistics & Supply Chain",
  "Other",
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const INITIAL_STATE = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  industry: "",
  companySize: "",
  message: "",
};

function validateField(name, value) {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Full name is required";
      if (value.trim().length < 2) return "Full name must be at least 2 characters";
      return "";
    case "companyName":
      if (!value.trim()) return "Company name is required";
      return "";
    case "email":
      if (!value.trim()) return "Email address is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
      return "";
    case "phone":
      if (!value.trim()) return "Phone number is required";
      if (!/^[+]?[\d\s\-().]{7,20}$/.test(value)) return "Enter a valid phone number";
      return "";
    case "country":
      if (!value.trim()) return "Country is required";
      return "";
    case "industry":
      if (!value) return "Select an industry";
      return "";
    case "companySize":
      if (!value) return "Select a company size";
      return "";
    case "message":
      if (!value.trim()) return "Tell us a little about what you need";
      if (value.trim().length < 10) return "Message must be at least 10 characters";
      return "";
    default:
      return "";
  }
}

export default function InquiryForm() {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function validateAll() {
    const newErrors = {};
    Object.keys(values).forEach((key) => {
      const err = validateField(key, values[key]);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateAll();
    setErrors(newErrors);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));

    if (Object.keys(newErrors).length > 0) return;

    setStatus("submitting");
    setServerError("");
    try {
      await submitInquiry(values);
      setStatus("success");
      setValues(INITIAL_STATE);
      setTouched({});
      setErrors({});
    } catch (err) {
      setStatus("error");
      setServerError(err.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orbit/15 text-2xl">
          ✓
        </div>
        <h3 className="mt-5 text-xl font-semibold">Your inquiry is in orbit</h3>
        <p className="mt-2 text-sm text-inkLight-mid dark:text-ink-mid">
          A member of our sales team will reach out within one business day.
        </p>
        <button className="mt-6 btn-ghost" onClick={() => setStatus("idle")}>
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8 space-y-5">
      {status === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-signal/40 bg-signal/10 px-4 py-3 text-sm text-signal"
        >
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fullName && errors.fullName}
          placeholder="Jordan Ellis"
          autoComplete="name"
        />
        <Field
          label="Company Name"
          name="companyName"
          value={values.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.companyName && errors.companyName}
          placeholder="Acme Inc."
          autoComplete="organization"
        />
        <Field
          label="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
          placeholder="jordan@acme.com"
          autoComplete="email"
        />
        <Field
          label="Phone Number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && errors.phone}
          placeholder="+1 (555) 123-4567"
          autoComplete="tel"
        />
        <Field
          label="Country"
          name="country"
          value={values.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.country && errors.country}
          placeholder="United States"
          autoComplete="country-name"
        />
        <SelectField
          label="Industry"
          name="industry"
          value={values.industry}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.industry && errors.industry}
          options={INDUSTRIES}
          placeholder="Select industry"
        />
        <SelectField
          label="Company Size"
          name="companySize"
          value={values.companySize}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.companySize && errors.companySize}
          options={COMPANY_SIZES}
          placeholder="Select size"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-inkLight-mid dark:text-ink-mid">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell us about your team and what you're looking to solve..."
          className={`input-field resize-none ${touched.message && errors.message ? "input-error" : ""}`}
          aria-invalid={Boolean(touched.message && errors.message)}
        />
        {touched.message && errors.message && (
          <p className="mt-1.5 text-xs text-signal">{errors.message}</p>
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-deep/40 border-t-deep animate-spin" />
            Sending...
          </>
        ) : (
          "Submit Inquiry"
        )}
      </motion.button>
    </form>
  );
}

function Field({ label, name, error, ...rest }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-inkLight-mid dark:text-ink-mid">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`input-field ${error ? "input-error" : ""}`}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-signal">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, error, options, placeholder, ...rest }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-inkLight-mid dark:text-ink-mid">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={`input-field ${error ? "input-error" : ""}`}
        aria-invalid={Boolean(error)}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-signal">{error}</p>}
    </div>
  );
}
