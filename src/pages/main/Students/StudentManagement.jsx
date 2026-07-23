import { Component } from "react";

import {
    getStudents,
    searchStudents,
    deleteStudent
} from "@/services/studentService";

import StudentFormModal from "@/components/students/StudentFormModal";
import DeleteStudentModal from "@/components/students/DeleteStudentModal";

import "./StudentManagement.css";

class StudentManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            filteredStudents: [],
            loading: true,
            search: "",
            selectedStudent: null,
            showForm: false,
            showDelete: false,
            currentPage: 1,
            pageSize: 10
        };
    }

    async componentDidMount() {
        await this.loadStudents();
    }

    loadStudents = async () => {
        this.setState({ loading: true });

        try {
            const students = await getStudents();

            this.setState({
                students,
                filteredStudents: students,
                loading: false
            });
        } catch (error) {
            console.error(error);

            this.setState({
                loading: false
            });
        }
    };

    handleSearch = async (event) => {
        const value = event.target.value;

        this.setState({
            search: value
        });

        if (value.trim() === "") {
            this.setState({
                filteredStudents: this.state.students,
                currentPage: 1
            });

            return;
        }

        try {
            const result = await searchStudents(
                value,
                value,
                value
            );

            this.setState({
                filteredStudents: result,
                currentPage: 1
            });
        } catch (error) {
            console.error(error);
        }
    };

    openCreate = () => {
        this.setState({
            selectedStudent: null,
            showForm: true
        });
    };

    openEdit = (student) => {
        this.setState({
            selectedStudent: student,
            showForm: true
        });
    };

    openDelete = (student) => {
        this.setState({
            selectedStudent: student,
            showDelete: true
        });
    };

    closeForm = () => {
        this.setState({
            selectedStudent: null,
            showForm: false
        });
    };

    closeDelete = () => {
        this.setState({
            selectedStudent: null,
            showDelete: false
        });
    };

    confirmDelete = async () => {
        const { selectedStudent } = this.state;

        if (!selectedStudent) return;

        try {
            await deleteStudent(selectedStudent.studentId);

            this.closeDelete();
            await this.loadStudents();
        } catch (error) {
            console.error(error);
            alert("Unable to delete student.");
        }
    };

    viewTor = (student) => {
        window.location.href = `/marina-tor?id=${student.studentId}`;
    };

    changePage = (page) => {
        this.setState({
            currentPage: page
        });
    };

    render() {
        const {
            filteredStudents,
            loading,
            search,
            showForm,
            showDelete,
            selectedStudent,
            currentPage,
            pageSize
        } = this.state;

        const totalPages = Math.ceil(filteredStudents.length / pageSize);
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const students = filteredStudents.slice(start, end);
        return (
            <div className="student-page">

                <div className="student-header">

                    <div className="student-title">
                        <h2>Student Management</h2>
                        <p>Manage all University of Cebu Maritime students.</p>
                    </div>

                    <button
                        className="add-btn"
                        onClick={this.openCreate}
                    >
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Add Student
                    </button>

                </div>

                <div className="dashboard-cards">

                    <div className="info-card">
                        <div>
                            <span>Total Students</span>
                            <h3>{filteredStudents.length}</h3>
                        </div>

                        <i className="bi bi-people-fill"></i>
                    </div>

                    <div className="info-card">
                        <div>
                            <span>Graduates</span>
                            <h3>
                                {
                                    filteredStudents.filter(
                                        s => s.graduationDate
                                    ).length
                                }
                            </h3>
                        </div>

                        <i className="bi bi-mortarboard-fill"></i>
                    </div>

                    <div className="info-card">
                        <div>
                            <span>Programs</span>
                            <h3>
                                {
                                    new Set(
                                        filteredStudents.map(
                                            s => s.degree
                                        )
                                    ).size
                                }
                            </h3>
                        </div>

                        <i className="bi bi-journal-bookmark-fill"></i>
                    </div>

                    <div className="info-card">
                        <div>
                            <span>Records</span>
                            <h3>{filteredStudents.length}</h3>
                        </div>

                        <i className="bi bi-file-earmark-text-fill"></i>
                    </div>

                </div>

                <div className="student-table-card">

                    <div className="table-toolbar">

                        <div className="search-box">

                            <i className="bi bi-search"></i>

                            <input
                                type="text"
                                placeholder="Search by ID Number or Name..."
                                value={search}
                                onChange={this.handleSearch}
                            />

                        </div>

                    </div>

                    <table className="table student-table">

                        <thead>

                            <tr>

                                <th>Student</th>

                                <th>Program</th>

                                <th>Status</th>

                                <th width="180">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                loading ?

                                    <tr>

                                        <td colSpan="4">

                                            Loading...

                                        </td>

                                    </tr>

                                :

                                students.length === 0 ?

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center"
                                        >

                                            No students found.

                                        </td>

                                    </tr>

                                :

                                        students.map(student => (
                                            <tr key={student.studentId}>

                                                <td>

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "15px"
                                                        }}
                                                    >

                                                        <div className="avatar-circle">

                                                            {
                                                                `${student.firstName?.charAt(0) ?? ""}${student.lastName?.charAt(0) ?? ""}`
                                                            }

                                                        </div>

                                                        <div>

                                                            <strong>

                                                                {student.firstName} {student.middleName} {student.lastName}

                                                            </strong>

                                                            <br />

                                                            <small className="text-muted">

                                                                {student.idNumber}

                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td>

                                                    {student.degree}

                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            student.graduationDate
                                                                ? "badge bg-success"
                                                                : "badge bg-primary"
                                                        }
                                                    >

                                                        {
                                                            student.graduationDate
                                                                ? "Graduated"
                                                                : "Active"
                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="action-buttons">

                                                        <button
                                                            className="view-btn"
                                                            title="View TOR"
                                                            onClick={() => this.viewTor(student)}
                                                        >

                                                            <i className="bi bi-eye-fill"></i>

                                                        </button>

                                                        <button
                                                            className="edit-btn"
                                                            title="Edit Student"
                                                            onClick={() => this.openEdit(student)}
                                                        >

                                                            <i className="bi bi-pencil-fill"></i>

                                                        </button>

                                                        <button
                                                            className="delete-btn"
                                                            title="Delete Student"
                                                            onClick={() => this.openDelete(student)}
                                                        >

                                                            <i className="bi bi-trash-fill"></i>

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                            }

                        </tbody>

                    </table>
                    <div className="pagination-footer">

                        <div>

                            Showing{" "}
                            <strong>
                                {students.length === 0 ? 0 : start + 1}
                            </strong>
                            {" "}to{" "}
                            <strong>
                                {Math.min(end, filteredStudents.length)}
                            </strong>
                            {" "}of{" "}
                            <strong>
                                {filteredStudents.length}
                            </strong>
                            {" "}students

                        </div>

                        <div className="d-flex gap-2">

                            <button
                                className="btn btn-outline-primary"
                                disabled={currentPage === 1}
                                onClick={() => this.changePage(currentPage - 1)}
                            >
                                <i className="bi bi-chevron-left"></i>
                            </button>

                            <span
                                className="align-self-center fw-bold"
                            >
                                Page {currentPage} of {totalPages || 1}
                            </span>

                            <button
                                className="btn btn-outline-primary"
                                disabled={
                                    currentPage >= totalPages ||
                                    totalPages === 0
                                }
                                onClick={() => this.changePage(currentPage + 1)}
                            >
                                <i className="bi bi-chevron-right"></i>
                            </button>

                        </div>

                    </div>

                </div>

                {
                    showForm && (
                        <StudentFormModal
                            student={selectedStudent}
                            onClose={this.closeForm}
                            onSaved={async () => {
                                await this.loadStudents();
                                this.closeForm();
                            }}
                        />
                    )
                }

                {
                    showDelete && (
                        <DeleteStudentModal
                            student={selectedStudent}
                            onCancel={this.closeDelete}
                            onConfirm={this.confirmDelete}
                        />
                    )
                }

            </div>
        );
    }
}

export default StudentManagement;