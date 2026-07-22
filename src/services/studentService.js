import api from "../api/axios";

export const getStudents = () => {
  return api.get("/Student");
};

export const searchStudents = (idNumber, firstName, lastName) => {
  return api.get("/Student/search", {
    params: {
      idNumber,
      firstName,
      lastName,
    },
  });
};