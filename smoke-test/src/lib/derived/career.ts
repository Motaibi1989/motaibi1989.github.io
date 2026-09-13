import { siteConfig } from '../../config/site.config';

export function getYearsOfExperience(referenceDate = new Date()): number {
  const { careerStartDate, careerStartYear, careerStartPrecision } = siteConfig.identity;

  if (careerStartPrecision === 'exact' && careerStartDate) {
    const start = new Date(`${careerStartDate}T00:00:00Z`);
    let years = referenceDate.getUTCFullYear() - start.getUTCFullYear();
    const anniversaryPassed =
      referenceDate.getUTCMonth() > start.getUTCMonth() ||
      (referenceDate.getUTCMonth() === start.getUTCMonth() && referenceDate.getUTCDate() >= start.getUTCDate());
    if (!anniversaryPassed) years -= 1;
    return years;
  }

  // Year-only source data cannot support anniversary precision.
  // This returns a conservative completed-year approximation.
  return Math.max(0, referenceDate.getUTCFullYear() - careerStartYear);
}

export function getAge(referenceDate = new Date()): number | null {
  const birthDate = siteConfig.identity.birthDate;
  if (!birthDate) return null;
  const start = new Date(`${birthDate}T00:00:00Z`);
  let years = referenceDate.getUTCFullYear() - start.getUTCFullYear();
  const anniversaryPassed =
    referenceDate.getUTCMonth() > start.getUTCMonth() ||
    (referenceDate.getUTCMonth() === start.getUTCMonth() && referenceDate.getUTCDate() >= start.getUTCDate());
  if (!anniversaryPassed) years -= 1;
  return years;
}
