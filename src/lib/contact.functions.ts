import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

const NOTIFICATION_EMAIL = "raunak@ubventuresllc.com";

async function sendNotification(data: ContactInput): Promise<void> {
  try {
    const body = new URLSearchParams({
      name: data.name,
      email: data.email,
      phone: data.phone || "—",
      organization: data.organization || "—",
      message: data.message,
      _subject: `New enquiry from ${data.name}`,
      _captcha: "false",
    });

    const res = await fetch(`https://formsubmit.co/${NOTIFICATION_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) console.warn("[contact] email forwarding returned", res.status);
    else console.log("[contact] email forwarded to", NOTIFICATION_EMAIL);
  } catch (err) {
    console.warn("[contact] email forwarding failed", err);
  }
}

export async function submitContact(input: ContactInput): Promise<{ success: true }> {
  const data = contactSchema.parse(input);

  const { error } = await supabase.from("contact_submissions").insert({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    organization: data.organization || null,
    message: data.message,
  });
  if (error) {
    console.error("[contact] insert failed", error);
    throw new Error("Could not save your message. Please try again.");
  }

  sendNotification(data);

  return { success: true as const };
}
