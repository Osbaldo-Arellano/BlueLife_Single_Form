import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { formSchema, type FormData } from "../lib/schema";
import { useSubmit } from "../hooks/useSubmit";
import { FloatingInput } from "./fields/FloatingInput";
import { PhoneInput } from "./fields/PhoneInput";
import { SelectField } from "./fields/SelectField";
import { SubmitButton } from "./SubmitButton";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.45 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface InterestFormProps {
  onSuccess: (email: string) => void;
}

export function InterestForm({ onSuccess }: InterestFormProps) {
  const { submit, isLoading, error } = useSubmit();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", phone: "", role: "" },
  });

  const onSubmit = async (data: FormData) => {
    const success = await submit(data);
    if (success) onSuccess(data.email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full bg-white rounded-2xl border border-neutral-200 p-8 sm:p-10"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          {/* Full Name */}
          <motion.div variants={fieldVariants}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <FloatingInput
                  id="fullName"
                  label="Full Name"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.fullName?.message}
                  disabled={isLoading}
                />
              )}
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={fieldVariants}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FloatingInput
                  id="email"
                  label="Email Address"
                  type="email"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.email?.message}
                  disabled={isLoading}
                />
              )}
            />
          </motion.div>

          {/* Phone */}
          <motion.div variants={fieldVariants}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  id="phone"
                  label="Phone Number"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.phone?.message}
                  disabled={isLoading}
                />
              )}
            />
          </motion.div>

          {/* Role */}
          <motion.div variants={fieldVariants}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="role"
                  label="What best describes your operation?"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.role?.message}
                  disabled={isLoading}
                />
              )}
            />
          </motion.div>

          {/* API error banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 5v3.5M8 11h.01"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.div variants={fieldVariants} className="pt-1">
            <SubmitButton isLoading={isLoading} />
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );
}
