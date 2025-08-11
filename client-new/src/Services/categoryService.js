import axiosInstance from "../helper/axiosInstance";

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (err) {
    console.log("Error fetching categories:", err);
  }
};

// export const getCategoryImage = async (categoryId) => {
//   try {
//     const response = await axiosInstance.get(
//       `/categories/logo/${categoryId},
//         `,
//       {
//         responseType: "blob",
//       }
//     );
//     return URL.createObjectURL(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// };
