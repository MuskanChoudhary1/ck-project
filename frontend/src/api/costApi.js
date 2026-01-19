import api from "./axiosInstance";

export const getCost = async (groupBy, startDate, endDate) => {
  try {
    console.log("Calling API with:", { groupBy, startDate, endDate });

    const response = await api.get("/cost", {
      params: {
        groupBy,
        startDate,
        endDate,
      },
    });

    console.log("AXIOS FULL RESPONSE:", response);
    console.log("AXIOS DATA:", response.data);

    return response.data;
  } catch (error) {
    console.error("API ERROR:", error);
    if (error.response) {
      console.error("ERROR RESPONSE:", error.response.data);
    }
    throw error;
  }
};



// export const getCost = async (groupBy, startDate, endDate) => {
//   const params = { groupBy };

//   if (startDate) params.startDate = startDate;
//   if (endDate) params.endDate = endDate;

//   return api.get("/cost", { params });
// };

