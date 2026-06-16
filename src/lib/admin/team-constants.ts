export const TEAM_DEPARTMENT_EXECUTIVE = "Executive" as const;
export const TEAM_DEPARTMENT_OUR_TEAM = "Our Team" as const;
export const EXECUTIVE_TEAM_MAX = 3;

export const TEAM_DEPARTMENTS = [TEAM_DEPARTMENT_EXECUTIVE, TEAM_DEPARTMENT_OUR_TEAM] as const;
export type TeamDepartment = (typeof TEAM_DEPARTMENTS)[number];
