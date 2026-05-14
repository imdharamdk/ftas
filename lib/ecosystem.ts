import { ecosystemDepartments } from "@/data/ecosystem";
import type { DepartmentId } from "@/types/ecosystem";

export function getDepartmentById(id: DepartmentId) {
  const department = ecosystemDepartments.find((item) => item.id === id);
  if (!department) {
    throw new Error(`Department not found: ${id}`);
  }
  return department;
}
