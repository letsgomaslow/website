"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils/shared";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  projectType: z.enum(["consultation", "implementation", "support", "other"], {
    required_error: "Please select a project type",
  }),
  budget: z.enum(["<50k", "50k-200k", "200k-500k", ">500k"], {
    required_error: "Please select a budget range",
  }),
});

type FormData = z.infer<typeof formSchema>;

const projectTypes = [
  { value: "consultation", label: "AI Consultation" },
  { value: "implementation", label: "AI Implementation" },
  { value: "support", label: "Support & Maintenance" },
  { value: "other", label: "Other" },
];

const budgetRanges = [
  { value: "<50k", label: "Less than $50,000" },
  { value: "50k-200k", label: "$50,000 - $200,000" },
  { value: "200k-500k", label: "$200,000 - $500,000" },
  { value: ">500k", label: "More than $500,000" },
];

export function ContactFormNew() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {submitSuccess ? (
        <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-6 text-center">
          <h3 className="text-xl font-bold text-green-500">Message Sent!</h3>
          <p className="mt-2 text-muted-foreground">
            Thank you for reaching out. We'll get back to you shortly.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setSubmitSuccess(false);
              reset();
            }}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name and Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Input
                type="text"
                {...register("name")}
                placeholder="Your Name *"
                variant={errors.name ? "error" : "default"}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="email"
                {...register("email")}
                placeholder="Email Address *"
                variant={errors.email ? "error" : "default"}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Company and Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Input
                type="text"
                {...register("company")}
                placeholder="Company Name *"
                variant={errors.company ? "error" : "default"}
              />
              {errors.company && (
                <p className="text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="tel"
                {...register("phone")}
                placeholder="Phone Number (Optional)"
                variant="default"
              />
            </div>
          </div>

          {/* Project Type and Budget */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <select
                {...register("projectType")}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.projectType && "border-red-500"
                )}
                defaultValue=""
              >
                <option value="" disabled>Select Project Type *</option>
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="text-sm text-red-500">{errors.projectType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <select
                {...register("budget")}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.budget && "border-red-500"
                )}
                defaultValue=""
              >
                <option value="" disabled>Select Budget Range *</option>
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="text-sm text-red-500">{errors.budget.message}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Textarea
              {...register("message")}
              placeholder="Tell us about your project *"
              variant={errors.message ? "error" : "default"}
              className="min-h-[120px]"
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
              {submitError}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      )}
    </motion.div>
  );
} 