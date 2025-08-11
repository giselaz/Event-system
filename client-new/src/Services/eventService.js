import axiosInstance from "../helper/axiosInstance";

export const getAllEvents = async () => { 
  try {
    const response = await axiosInstance.get("/events");
    return response.data;
  } catch (err) {
    console.log("Error fetching events:", err);
  }
};
export const getEventImage = async (eventId) => {
  try {
    const res = await axiosInstance.get(`/events/${eventId}/image`, {
      responseType: "blob",
    });

    return await blobToDataURL(res.data);
  } catch (err) {
    console.log("error fetching image", err);
  }
};

const blobToDataURL = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // Data URL
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const getSingleEvent = async (eventId) => {
  try {
    const res = await axiosInstance.get(`/events/details/${eventId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
