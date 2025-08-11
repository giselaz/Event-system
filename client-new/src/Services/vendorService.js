
export const getVendorList = async () => {
    try {
        const response = await axiosInstance.get("/vendors", {
        });
        return response.data;
    } catch (err) {
        console.log("Error fetching vendor list:", err);
    }
    };

