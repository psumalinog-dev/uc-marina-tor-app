import api from "./api";

export const getStudents = async () => {
    const { data } = await api.get("/Student");
    return data;
};

export const searchStudents = async (idNumber, firstName, lastName) => {
    const { data } = await api.get("/Student/search", {
        params: {
            idNumber,
            firstName,
            lastName
        }
    });

    return data;
};

export const getStudentByIdNumber = async (idNumber) => {
    const { data } = await api.get("/Student/search", {
        params: {
            idNumber
        }
    });

    return data.length > 0 ? data[0] : null;
};

export const createStudent = async (student) => {
    const { data } = await api.post("/Student", student);
    return data;
};

export const updateStudent = async (student) => {
    const { data } = await api.put("/Student", student);
    return data;
};

export const deleteStudent = async (studentId) => {
    const { data } = await api.delete(`/Student/${studentId}`);
    return data;
};