import { Component } from "react";
import {
    createStudent,
    updateStudent
} from "../../services/studentService";

import "./StudentFormModal.css";

class StudentFormModal extends Component {

    constructor(props) {
        super(props);

        const student = props.student;

        this.state = {

            studentId: student?.studentId || 0,

            idNumber: student?.idNumber || "",

            firstName: student?.firstName || "",

            middleName: student?.middleName || "",

            lastName: student?.lastName || "",

            sex: student?.sex || "",

            birthPlace: student?.birthPlace || "",

            citizenship: student?.citizenship || "Filipino",

            address: student?.address || "",

            degree: student?.degree || "",

            graduationDate: student?.graduationDate || "",

            primaryEsc: student?.primaryEsc || "",

            secondaryEsc: student?.secondaryEsc || "",

            saving: false

        };

    }

    handleChange = (event) => {

        const { name, value } = event.target;

        this.setState({

            [name]: value

        });

    };

    saveStudent = async () => {

        this.setState({

            saving: true

        });

        const student = {

            studentId: this.state.studentId,

            idNumber: this.state.idNumber,

            firstName: this.state.firstName,

            middleName: this.state.middleName,

            lastName: this.state.lastName,

            sex: this.state.sex,

            birthPlace: this.state.birthPlace,

            citizenship: this.state.citizenship,

            address: this.state.address,

            degree: this.state.degree,

            graduationDate: this.state.graduationDate,

            primaryEsc: this.state.primaryEsc,

            secondaryEsc: this.state.secondaryEsc

        };

        try {

            if (student.studentId === 0) {

                await createStudent(student);

            } else {

                await updateStudent(student);

            }

            this.props.onSaved();

            this.props.onClose();

        }
        catch (error) {

            alert(error.response?.data || "Unable to save student.");

        }

        this.setState({

            saving: false

        });

    };

    render() {

        return (

            <div className="student-modal-overlay">

                <div className="student-modal">

                    <div className="student-modal-header">

                        <div className="student-modal-title">

                            <i className="bi bi-mortarboard-fill"></i>

                            <div>

                                <h3>

                                    {
                                        this.state.studentId === 0
                                            ? "Add Student"
                                            : "Edit Student"
                                    }

                                </h3>

                                <small>

                                    University of Cebu Maritime Registrar

                                </small>

                            </div>

                        </div>

                        <button
                            className="close-btn"
                            onClick={this.props.onClose}
                        >

                            ×

                        </button>

                    </div>

                    <div className="student-modal-body">

                        <div className="student-grid">
                            <div className="form-group">

                                <label>Student ID Number</label>

                                <div className="input-group">

                                    <i className="bi bi-person-vcard"></i>

                                    <input
                                        type="text"
                                        name="idNumber"
                                        placeholder="Enter Student ID"
                                        value={this.state.idNumber}
                                        onChange={this.handleChange}
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>Degree Program</label>

                                <div className="input-group">

                                    <i className="bi bi-book"></i>

                                    <select
                                        name="degree"
                                        value={this.state.degree}
                                        onChange={this.handleChange}
                                    >

                                        <option value="">Select Degree</option>

                                        <option value="BS Computer Engineering">BS Computer Engineering</option>

                                        <option value="BS Marine Engineering">BS Marine Engineering</option>

                                        <option value="BS Marine Transportation">BS Marine Transportation</option>

                                    </select>

                                </div>

                            </div>

                            <div className="form-group">

                                <label>First Name</label>

                                <div className="input-group">

                                    <i className="bi bi-person"></i>

                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        onChange={this.handleChange}
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>Middle Name</label>

                                <div className="input-group">

                                    <i className="bi bi-person"></i>

                                    <input
                                        type="text"
                                        name="middleName"
                                        placeholder="Middle Name"
                                        value={this.state.middleName}
                                        onChange={this.handleChange}
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>Last Name</label>

                                <div className="input-group">

                                    <i className="bi bi-person"></i>

                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        onChange={this.handleChange}
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>Sex</label>

                                <div className="input-group">

                                    <i className="bi bi-gender-ambiguous"></i>

                                    <select
                                        name="sex"
                                        value={this.state.sex}
                                        onChange={this.handleChange}
                                    >

                                        <option value="">Select Sex</option>

                                        <option value="M">Male</option>

                                        <option value="F">Female</option>

                                    </select>

                                </div>

                            </div>

                            <div className="form-group">

                                <label>Birth Place</label>

                                <div className="input-group">

                                    <i className="bi bi-geo-alt"></i>

                                    <input
                                        type="text"
                                        name="birthPlace"
                                        placeholder="Birth Place"
                                        value={this.state.birthPlace}
                                        onChange={this.handleChange}
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>Citizenship</label>

                                <div className="input-group">

                                    <i className="bi bi-globe2"></i>

                                    <select
                                        name="citizenship"
                                        value={this.state.citizenship}
                                        onChange={this.handleChange}
                                    >

                                        <option value="Filipino">Filipino</option>

                                        <option value="American">American</option>

                                        <option value="Japanese">Japanese</option>

                                        <option value="Korean">Korean</option>

                                        <option value="Chinese">Chinese</option>

                                        <option value="Others">Others</option>

                                    </select>

                                </div>

                            </div>

                            <div className="form-group full">

                                <label>Address</label>

                                <div className="input-group">

                                    <i className="bi bi-house-door"></i>

                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Complete Address"
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>Graduation Date</label>

                                <div className="input-group">

                                    <i className="bi bi-calendar-event"></i>

                                    <input
                                        type="date"
                                        name="graduationDate"
                                        value={this.state.graduationDate}
                                        onChange={this.handleChange}
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>Primary School</label>

                                <div className="input-group">

                                    <i className="bi bi-building"></i>

                                    <input
                                        type="text"
                                        name="primaryEsc"
                                        placeholder="Elementary School"
                                        value={this.state.primaryEsc}
                                        onChange={this.handleChange}
                                    />

                                </div>

                            </div>

                            <div className="form-group full">

                                <label>Secondary School</label>

                                <div className="input-group">

                                    <i className="bi bi-building"></i>

                                    <input
                                        type="text"
                                        name="secondaryEsc"
                                        placeholder="Secondary School"
                                        value={this.state.secondaryEsc}
                                        onChange={this.handleChange}
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="student-modal-footer">

                                <div className="footer-brand">

                                    <img
                                        src="https://lmportal.uc.edu.ph/static/media/uc-logo-bg-160x83.c24343b851e5b064daf9.png"
                                        alt="University of Cebu"
                                    />

                                    <div>

                                        <span>
                                            University of Cebu
                                        </span>

                                        <br />

                                        <small>
                                            Maritime Education and Training Center
                                        </small>

                                    </div>

                                </div>

                                <div className="footer-buttons">

                                    <button
                                        className="btn-cancel"
                                        onClick={this.props.onClose}
                                        disabled={this.state.saving}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn-save"
                                        onClick={this.saveStudent}
                                        disabled={this.state.saving}
                                    >

                                        {
                                            this.state.saving
                                                ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                        ></span>

                                                        Saving...
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        <i className="bi bi-check-circle-fill me-2"></i>

                                                        Save Student
                                                    </>
                                                )
                                        }

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                );

    }

}

export default StudentFormModal;