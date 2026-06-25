import "./MarinaTOR.css";

function SemesterBlock({ title }) {
    return (
        <>
            <tr>
                <td rowSpan="10" className="semester-cell">
                    <strong>{title}</strong>
                    <br />
                    20____ - 20____
                </td>

                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>

            {[...Array(9)].map((_, index) => (
                <tr key={index}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            ))}
        </>
    );
}
function SummerBlock() {
    return (
        <>
            <tr>
                <td rowSpan="3" className="semester-cell">
                    <strong>SUMMER</strong>
                    <br />
                    20____
                </td>

                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>

            {[...Array(2)].map((_, index) => (
                <tr key={index}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            ))}
        </>
    );
}

export default function MarinaTOR() {
    return (
        <div className="tor-wrapper">

            <div className="breadcrumb">
                TOR Management &gt; Official Transcript of Records &gt; Generate
            </div>

            <div className="top-header">
                <h1>Official Transcript of Records</h1>

                <div className="action-buttons">
                    <button className="preview-btn">
                        Preview / Print
                    </button>

                    <button className="export-btn">
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="page-counter">
                Page 1 of 1
            </div>

            <div className="tor-paper">

                {/* HEADER */}
                <div className="school-header">

                    <img
                        src="/UCLogo.png"
                        alt="UC Logo"
                        className="school-logo"
                    />

                    <div className="school-details">

                        <h2>
                            UNIVERSITY OF CEBU-LAPU-LAPU AND MANDAUE
                        </h2>

                        <h4>
                            A.C. CORTES AVENUE, LOOC, MANDAUE CITY
                        </h4>

                        <p>
                            Telephone no: 345-6666 local 6233/6254/6255
                        </p>

                        <h3>
                            OFFICIAL TRANSCRIPT OF RECORDS
                        </h3>

                    </div>

                </div>

                {/* PERSONAL DATA */}
                <table className="info-table">
                    <tbody>

                        <tr>
                            <th colSpan="6">PERSONAL DATA</th>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Student Name:
                                <br />
                                (Last, First, Middle)
                            </td>

                            <td className="large-value-cell" colSpan="3"></td>

                            <td className="right-label-cell">
                                Sex:
                            </td>

                            <td className="small-value-cell"></td>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Date of Birth:
                            </td>

                            <td className="large-value-cell" colSpan="3"></td>

                            <td className="right-label-cell">
                                Place of Birth:
                            </td>

                            <td className="small-value-cell"></td>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Student Number:
                            </td>

                            <td className="large-value-cell" colSpan="3"></td>

                            <td className="right-label-cell">
                                Citizenship:
                            </td>

                            <td className="small-value-cell"></td>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Degree:
                            </td>

                            <td className="large-value-cell" colSpan="3"></td>

                            <td className="right-label-cell">
                                Date of Graduation:
                            </td>

                            <td className="small-value-cell"></td>
                        </tr>

                        <tr>
                            <th colSpan="6">PREVIOUS SCHOOL ATTENDED</th>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Elementary:
                            </td>

                            <td className="large-value-cell" colSpan="5"></td>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Secondary:
                            </td>

                            <td className="large-value-cell" colSpan="5"></td>
                        </tr>

                    </tbody>
                </table>

                {/* SUBJECTS */}
                <table className="subject-table">

                    <thead>
                        <tr>
                            <th width="18%">
                                SEMESTER & ACADEMIC YEAR
                            </th>

                            <th width="18%">
                                COURSE CODE
                            </th>

                            <th width="38%">
                                COURSE TITLE
                            </th>

                            <th width="10%">
                                GRADE
                            </th>

                            <th width="10%">
                                UNIT/S
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {/* FIRST YEAR */}
                        <SemesterBlock title="1ST SEMESTER" />
                        <SemesterBlock title="2ND SEMESTER" />
                        <SummerBlock />

                        {/* SECOND YEAR */}
                        <SemesterBlock title="1ST SEMESTER" />
                        <SemesterBlock title="2ND SEMESTER" />
                        <SummerBlock />

                        {/* THIRD YEAR */}
                        <SemesterBlock title="1ST SEMESTER" />
                        <SemesterBlock title="2ND SEMESTER" />
                        <SummerBlock />

                        {/* FOURTH YEAR */}
                        <SemesterBlock title="1ST SEMESTER" />
                        <SemesterBlock title="2ND SEMESTER" />
                        <SummerBlock />

                    </tbody>

                </table>

                {/* TOTALS */}
                <table className="total-table">
                    <tbody>

                        <tr>
                            <td>
                                Total Units Presented for Graduation
                            </td>

                            <td>191</td>
                        </tr>

                        <tr>
                            <td>
                                Total Units Required for Graduation
                            </td>

                            <td>191</td>
                        </tr>

                    </tbody>
                </table>

                {/* REMARKS */}
                <div className="remarks">

                    <p>
                        <strong>Remarks:</strong> RECOMMENDED FOR
                        GRADUATION FROM THE FOUR-YEAR COURSE IN
                        MARINE TRANSPORTATION LEADING TO THE DEGREE
                        OF BACHELOR OF SCIENCE IN MARINE
                        TRANSPORTATION (B.S.M.T.)
                    </p>

                    <br />

                    <p>
                        I hereby certify that the foregoing entries
                        are true and correct and that the official
                        records substantiating the same are kept in
                        the electronic and physical files of the school.
                    </p>

                </div>

                {/* SIGNATURE */}
                <div className="signature">

                    <div className="signature-line"></div>

                    <h4>
                        JUDITH M. ALMONTE, MBA
                    </h4>

                    <p>
                        UCLM Campus Registrar
                    </p>

                </div>

            </div>

        </div>
    );
}