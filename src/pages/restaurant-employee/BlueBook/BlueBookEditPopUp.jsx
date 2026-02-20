import React from "react";
import BlueBookForm from "./BlueBookForm";
import toast from "react-hot-toast";
import { updateBlueBook } from "../../../services/modules/blueBookService";

const BlueBookEditPopUp = ({ onClose, data, companyId, allRestaurants }) => {
    console.log("Data:", data);
    const handleSubmit = async (formData, notesData) => {
        // Construct payload for update
        // similar format to create, but we might just need to send what changed or everything
        // assuming update endpoint accepts full payload

        // We already have restaurant_id in data usually, or from formData if allowed to change (locked in form)
        // The Update endpoint typically takes ID in URL and body

        const payload = {
            restaurant_id: data.restaurant_id,
            date: formData.date,
            email: formData.email,
            weather: formData.weather,
            breakfastSales: parseFloat(formData.breakfastSales) || 0,
            breakfastGuests: parseInt(formData.breakfastGuests) || 0,
            lunchSales: parseFloat(formData.lunchSales) || 0,
            lunchGuests: parseInt(formData.lunchGuests) || 0,
            dinnerSales: parseFloat(formData.dinnerSales) || 0,
            dinnerGuests: parseInt(formData.dinnerGuests) || 0,
            totalSales: parseFloat(formData.totalSales) || 0,
            totalSalesLastYear: parseFloat(formData.totalSalesLastYear) || 0,
            foodSales: parseFloat(formData.foodSales) || 0,
            lbwSales: parseFloat(formData.lbwSales) || 0,
            hourlyLabor: parseFloat(formData.hourlyLabor) || 0,
            hourlyLaborPercent: parseFloat(formData.hourlyLaborPercent) || 0,
            hoursWorked: parseFloat(formData.hoursWorked) || 0,
            splh: parseFloat(formData.splh) || 0,
            // Map dynamic fields to API keys
            item86s: notesData["86’d Items"].filter(n => n.trim()).map(comment => ({ comment })),
            miscNotes: notesData["Misc Notes"].filter(n => n.trim()).map(comment => ({ comment })),
            staffNotes: notesData["Staff Notes"].filter(n => n.trim()).map(comment => ({ comment })),
            callOuts: notesData["Include salaried and managers with explanation"].filter(n => n.trim()).map(comment => ({ comment })),
            maintenanceIssues: notesData["Maintenance Issues"].filter(n => n.trim()).map(comment => ({ comment })),
            misses: notesData["Misses"].filter(n => n.trim()).map(comment => ({ comment })),
            wins: notesData["WINS!"].filter(n => n.trim()).map(comment => ({ comment })),
        };

        try {
            await updateBlueBook(data.id || data.blue_book_id, payload);
            toast.success("Blue Book updated successfully!");
            onClose(true); // Signal refresh
        } catch (error) {
            console.error("Failed to update blue book:", error);
            toast.error("Failed to update blue book.");
        }
    };

    return (
        <div className="fixed inset-0 h-[calc(100vh-60px)] bg-[#00000033] backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white w-[60%] h-[90%] p-8 overflow-y-auto rounded-2xl shadow-xl border border-[var(--border)]">
                <h2 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Edit Blue Book Log</h2>
                <BlueBookForm
                    initialData={{
                        ...data,
                        email: data.user.email,
                        breakfastSales: data.breakfast_sales,
                        breakfastGuests: data.breakfast_guests,
                        lunchSales: data.lunch_sales,
                        lunchGuests: data.lunch_guests,
                        dinnerSales: data.dinner_sales,
                        dinnerGuests: data.dinner_guests,
                        totalSales: data.total_sales,
                        totalSalesLastYear: data.total_sales_last_year,
                        foodSales: data.food_sales,
                        lbwSales: data.lbw_sales,
                        hourlyLabor: data.hourly_labor,
                        hourlyLaborPercent: data.hourly_labor_percent,
                        hoursWorked: data.hours_worked,
                        splh: data.splh,
                        item86s: data.item86s?.map((item) => ({ comment: item.item86_comment })),
                        miscNotes: data.miscNotes?.map((item) => ({ comment: item.misc_notes_comment })),
                        staffNotes: data.staffNotes?.map((item) => ({ comment: item.staff_notes_comment })),
                        callOuts: data.callOuts?.map((item) => ({ comment: item.call_out_comment })),
                        maintenanceIssues: data.maintenanceIssues?.map((item) => ({ comment: item.maintenance_issue_comment })),
                        misses: data.misses?.map((item) => ({ comment: item.misses_comment })),
                        wins: data.wins?.map((item) => ({ comment: item.wins_comment })),
                    }}
                    onSubmit={handleSubmit}
                    onCancel={() => onClose(false)}
                    companyId={companyId}
                    isEditMode={true}
                    allRestaurants={allRestaurants} // Pass for read-only display if needed logic inside form requires it
                />
            </div>
        </div>
    );
};

export default BlueBookEditPopUp;
