import http from '../httpService';
import endpoints from '../endpoints';

export const getDashboardStats = async (startDate, endDate) => {
    try {
        const params = {};
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;

        const response = await http.get(endpoints.getDashboardStats(), { params });
        return response;
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw error;
    }
};
