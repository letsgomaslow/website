"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-toastify";
import { db } from "../../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid business email"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  inquiryType: z.enum(["general", "sales", "support", "partnership"], {
    required_error: "Please select an inquiry type",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      inquiryType: "general",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      
      // Create the submission data
      const submissionData = {
        ...values,
        createdAt: serverTimestamp(),
        status: "new",
      };

      // Send email
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }

      // Add document to Firestore
      // const collectionRef = collection(db, "contact_submissions");
      // const docRef = await addDoc(collectionRef, submissionData);
      
      // toast.success("Thank you for your message. We'll get back to you soon!");
      form.reset();
      
    } catch (error: any) {
      console.error("❌ Error while submitting:", error);
      
      toast.error(
        error.code === 'permission-denied' 
          ? "You don't have permission to submit the form. Please try again later."
          : "There was an error submitting your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" 
                     className="placeholder:text-gray-400"
                     {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Business Email</FormLabel>
              <FormControl>
                <Input placeholder="john@company.com" 
                     className="placeholder:text-gray-400"
                type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Company Inc." 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}


<FormField
  control={form.control}
  name="company"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Company Name</FormLabel>
      <FormControl>
        <Input 
          placeholder="Company Inc."
          className="placeholder:text-gray-400"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


        <FormField
          control={form.control}
          name="inquiryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inquiry Type</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="general">General Inquiry</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                  <option value="partnership">Partnership</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project or inquiry..."
                  className="min-h-[120px] placeholder:text-gray-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting || form.formState.isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}