export function transformSlugToTitle(slug: string): string {
  return slug.replace(/-/g, " ");
}
