import { Project } from "@/lib/types";

export function sortProjectsByFeatured(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
}
