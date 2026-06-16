import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type VacancyRow = Tables<"job_vacancies">;

export type VacancyFormValues = {
  title: string;
  department: string;
  location: string;
  employment_type: string;
  experience_required: string;
  description: string;
  requirements: string[];
  salary_range: string;
  is_active: boolean;
  application_deadline: string;
  apply_email: string;
  apply_url: string;
  status: string;
};

export function emptyVacancyForm(): VacancyFormValues {
  return {
    title: "",
    department: "",
    location: "",
    employment_type: "Full-time",
    experience_required: "",
    description: "",
    requirements: [""],
    salary_range: "",
    is_active: true,
    application_deadline: "",
    apply_email: "",
    apply_url: "",
    status: "open",
  };
}

export function vacancyToFormValues(row: VacancyRow): VacancyFormValues {
  return {
    title: row.title,
    department: row.department,
    location: row.location,
    employment_type: row.employment_type,
    experience_required: row.experience_required,
    description: row.description,
    requirements: row.requirements?.length ? row.requirements : [""],
    salary_range: row.salary_range ?? "",
    is_active: row.is_active,
    application_deadline: row.application_deadline ?? "",
    apply_email: row.apply_email ?? "",
    apply_url: row.apply_url ?? "",
    status: row.status,
  };
}

function toPayload(values: VacancyFormValues): TablesInsert<"job_vacancies"> {
  return {
    title: values.title.trim(),
    department: values.department.trim(),
    location: values.location.trim(),
    employment_type: values.employment_type,
    experience_required: values.experience_required.trim(),
    description: values.description.trim(),
    requirements: values.requirements.map((r) => r.trim()).filter(Boolean),
    salary_range: values.salary_range.trim() || undefined,
    is_active: values.is_active,
    application_deadline: values.application_deadline || undefined,
    apply_email: values.apply_email.trim() || null,
    apply_url: values.apply_url.trim() || null,
    status: values.status,
  };
}

export async function fetchVacancies() {
  const { data, error } = await supabase
    .from("job_vacancies")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchVacancyById(id: string) {
  const { data, error } = await supabase
    .from("job_vacancies")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Vacancy not found");
  return data;
}

export async function createVacancy(values: VacancyFormValues) {
  const { data, error } = await supabase
    .from("job_vacancies")
    .insert(toPayload(values))
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateVacancy(id: string, values: VacancyFormValues) {
  const payload: TablesUpdate<"job_vacancies"> = toPayload(values);
  const { data, error } = await supabase
    .from("job_vacancies")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteVacancy(id: string) {
  const { error } = await supabase.from("job_vacancies").delete().eq("id", id);
  if (error) throw error;
}

export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
] as const;

export const VACANCY_STATUSES = ["open", "closed", "draft"] as const;
