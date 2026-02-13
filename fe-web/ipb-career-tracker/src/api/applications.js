/**
 * Applications API — apply, list own, list by opportunity, update status.
 */
import api from './client';

export const applicationsApi = {
  /** Student: submit an application */
  apply(opportunityId) {
    return api.post('/applications/', { opportunity_id: opportunityId });
  },

  /** Student: list my applications */
  mine(skip = 0, limit = 100) {
    return api.get(`/applications/me?skip=${skip}&limit=${limit}`);
  },

  /** HR: list applicants for a specific opportunity */
  listByOpportunity(opportunityId, skip = 0, limit = 100) {
    return api.get(
      `/applications/opportunity/${opportunityId}?skip=${skip}&limit=${limit}`
    );
  },

  /** HR: update application status */
  updateStatus(applicationId, status) {
    return api.patch(`/applications/${applicationId}/status`, { status });
  },
};

export default applicationsApi;
