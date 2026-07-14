import { Component } from "react";

class DeleteStudentModal extends Component {

    render() {

        const { student, onCancel, onConfirm } = this.props;

        return (

            <div className="modal fade show d-block">

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header bg-danger text-white">

                            <h5 className="modal-title">

                                Delete Student

                            </h5>

                        </div>

                        <div className="modal-body">

                            <p>

                                Are you sure you want to delete this student?

                            </p>

                            <hr />

                            <strong>ID Number:</strong>

                            <br />

                            {student?.idNumber}

                            <br /><br />

                            <strong>Name:</strong>

                            <br />

                            {student?.lastName},{" "}
                            {student?.firstName}{" "}
                            {student?.middleName}

                            <br /><br />

                            <strong>Degree:</strong>

                            <br />

                            {student?.degree}

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={onConfirm}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        );

    }

}

export default DeleteStudentModal;