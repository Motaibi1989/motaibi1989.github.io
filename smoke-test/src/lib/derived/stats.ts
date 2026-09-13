import { enabledExpertise } from '../../config/expertise.config';
import { projects, publishedProjects } from '../../config/projects.config';
import { certifications } from '../../config/certifications.config';
import { getYearsOfExperience, getAge } from './career';

export function getStats() {
  return {
    yearsOfExperience: getYearsOfExperience(),
    age: getAge(),
    projectCount: publishedProjects.length,
    totalProjectRegistryCount: projects.length,
    expertiseCount: enabledExpertise.length,
    certificationCount: certifications.filter((c) => c.status === 'verified').length,
    articleCount: 0,
  };
}
