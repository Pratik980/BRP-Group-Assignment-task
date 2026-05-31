import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      organization: data.organization || null,
      message: data.message,
    });
    if (error) {
      console.error("[contact] insert failed", error);
      throw new Error("Could not save your message. Please try again.");
    }
    return { success: true as const };
  });
