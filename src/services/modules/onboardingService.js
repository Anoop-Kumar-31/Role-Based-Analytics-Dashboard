import http from '../httpService';
import endpoints from '../endpoints';


// 🚀 Onboarding
export const onboarding = (data) => http.post(endpoints.onboarding(), data);
export const onboardCompany = (company_id) => http.patch(endpoints.onboardCompany(company_id));
    // app.patch(`${base}/reject/:company_id`, verifyToken, allowSuperAdminOnly, rest_onboardingController.markCompanyAsRejected);
export const rejectCompany = (company_id) => http.patch(endpoints.rejectCopmany(company_id));