import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type JobVacancy = Database["public"]["Tables"]["job_vacancies"]["Row"];

const applicationSchema = z.object({
  vacancyId: z.string().uuid().nullable().optional(),
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(5, "Phone number is too short").max(20),
  address: z.string().trim().min(1, "Address is required").max(200),
  position: z.string().trim().min(1, "Position is required").max(100),
  experience: z.string().trim().min(10, "Please describe your experience in detail").max(2000),
  portfolioUrl: z
    .string()
    .trim()
    .url("Invalid URL (must start with http/https)")
    .or(z.literal(""))
    .optional()
    .nullable(),
  coverLetter: z.string().trim().max(5000).optional().nullable(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

function hasSupabaseConfig() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
}

/** Fetch active job vacancies (client-safe — no createServerFn). */
export async function fetchVacancies(): Promise<JobVacancy[]> {
  if (!hasSupabaseConfig()) {
    console.warn("[careers] Supabase env vars missing — returning no vacancies.");
    return [];
  }

  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("job_vacancies")
    .select("*")
    .eq("is_active", true)
    .gte("application_deadline", nowIso)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[careers] fetchVacancies failed:", error);
    throw new Error("Could not fetch vacancies from the database.");
  }

  return data ?? [];
}

/** Submit a job application with resume upload (client-safe). */
export async function submitApplication(
  input: ApplicationInput,
  resumeFile: File,
): Promise<{ success: true }> {
  const data = applicationSchema.parse(input);

  if (!hasSupabaseConfig()) {
    throw new Error("Careers database is not configured. Please try again later.");
  }

  const timestamp = Date.now();
  const cleanName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = `${timestamp}_${cleanName}`;

  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(filePath, resumeFile, {
      contentType: resumeFile.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("[careers] Resume upload failed:", uploadError);
    throw new Error("Failed to upload CV/resume. Please try again.");
  }

  const { error: dbError } = await supabase.from("job_applications").insert({
    vacancy_id: data.vacancyId || null,
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    position: data.position,
    experience: data.experience,
    portfolio_url: data.portfolioUrl || null,
    cover_letter: data.coverLetter || null,
    resume_path: filePath,
    status: "pending",
  });

  if (dbError) {
    console.error("[careers] Application insert failed:", dbError);
    await supabase.storage.from("resumes").remove([filePath]);
    throw new Error("Could not submit application. Please check details and try again.");
  }

  return { success: true };
}
