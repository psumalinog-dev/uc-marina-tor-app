import "./MarinaTOR.css";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function SemesterBlock({ title }) {
    const [academicYear, setAcademicYear] = useState("");

    const academicYears = [];

    for (let year = 2000; year < 2050; year++) {
        academicYears.push(`${year}-${year + 1}`);
    }

    return (
        <>
            <tr>
                <td rowSpan="10" className="semester-cell">
                    <strong>{title}</strong>
                    <br />

                    <select
                        className="year-select"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                    >
                        <option value="">Academic Year</option>

                        {academicYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
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
    const years = [];

    for (let year = 2000; year <= 2050; year++) {
        years.push(year);
    }

    return (
        <>
            <tr>
                <td rowSpan="3" className="semester-cell">
                    <strong>SUMMER</strong>
                    <br />

                    <select className="year-select">
                        <option value="">Academic Year</option>

                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
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

    const [citizenship, setCitizenship] = useState("");
    const [otherCitizenship, setOtherCitizenship] = useState("");
    const [degree, setDegree] = useState("");
    const [showSummer1, setShowSummer1] = useState(false);
    const [showSummer2, setShowSummer2] = useState(false);
    const [showSummer3, setShowSummer3] = useState(false);
    const [showSummer4, setShowSummer4] = useState(false);
    const [unitsPresented, setUnitsPresented] = useState("");
    const [unitsRequired, setUnitsRequired] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [studentName, setStudentName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [graduationDate, setGraduationDate] = useState("");
    const [address, setAddress] = useState("");
    const [elementarySchool, setElementarySchool] = useState("");
    const [secondarySchool, setSecondarySchool] = useState("");
    const torRef = useRef();
    const exportPDF = () => {
        const buttons = document.querySelectorAll(".summer-button-row");

        buttons.forEach(button => {
            button.style.display = "none";
        });

        const input = torRef.current;

        html2canvas(input, {
            scale: 2,
            useCORS: true,
        }).then((canvas) => {

            buttons.forEach(button => {
                button.style.display = "";
            });

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "legal");

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const margin = 12.7;

            const imgWidth = pdfWidth - (margin * 2);

            const imgHeight =
                (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = margin;

            pdf.addImage(
                imgData,
                "PNG",
                margin,
                position,
                imgWidth,
                imgHeight
            );

            heightLeft -= (pageHeight - (margin * 2));

            while (heightLeft > 0) {

                position = heightLeft - imgHeight + margin;

                pdf.addPage("legal", "p");

                pdf.addImage(
                    imgData,
                    "PNG",
                    margin,
                    position,
                    imgWidth,
                    imgHeight
                );

                heightLeft -= (pageHeight - (margin * 2));
            }

            const fileName = studentName.trim()
                ? `${studentName.replace(/\s+/g, "_")}_TOR.pdf`
                : "OfficialTranscriptOfRecords.pdf";

            pdf.save(fileName);
        });

    };

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

                    <button
                        className="export-btn"
                        onClick={exportPDF}
                    >
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="page-counter">
                Page 1 of 1
            </div>

            <div className="tor-paper" ref={torRef}>

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
                            {" "}
                            Email: <u>uclmregistrar@gmail.com</u>
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
                                <strong>Student Name:</strong>
                                <br />
                                <span className="sub-label">
                                    (Last, First, Middle)
                                </span>
                            </td>

                            <td className="large-value-cell" colSpan="3">
                                <input
                                    type="text"
                                    className="tor-input full-input"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    placeholder="Last Name, First Name, Middle Name"
                                />
                            </td>

                            <td className="right-label-cell">
                                Sex:
                            </td>

                            <td className="small-value-cell">
                                <select className="tor-select">
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="label-cell">
                                Date of Birth:
                            </td>

                            <td className="large-value-cell" colSpan="3">
                                <input
                                    type="date"
                                    className="tor-input full-input"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </td>

                            <td className="right-label-cell">
                                Place of Birth:
                            </td>

                            <td className="small-value-cell">
                                <input
                                    type="text"
                                    className="tor-input full-input"
                                    value={placeOfBirth}
                                    onChange={(e) => setPlaceOfBirth(e.target.value)}
                                    placeholder="Place of Birth"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Student Number:
                            </td>

                            <td className="large-value-cell" colSpan="3">
                                <input
                                    type="text"
                                    className="tor-input full-input"
                                    value={studentNumber}
                                    onChange={(e) => setStudentNumber(e.target.value)}
                                    placeholder="Student Number"
                                />
                            </td>

                            <td className="right-label-cell">
                                Citizenship:
                            </td>

                            <td className="small-value-cell">
                                <select
                                    className="tor-select"
                                    value={citizenship}
                                    onChange={(e) => setCitizenship(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Filipino">Filipino</option>
                                    <option value="American">American</option>
                                    <option value="Canadian">Canadian</option>
                                    <option value="Korean">Korean</option>
                                    <option value="Others">Others</option>

                                    {otherCitizenship && (
                                        <option value={otherCitizenship}>
                                            {otherCitizenship}
                                        </option>
                                    )}
                                </select>

                                {citizenship === "Others" && (
                                    <input
                                        type="text"
                                        className="tor-input other-input"
                                        placeholder="Please specify"
                                        value={otherCitizenship}
                                        onChange={(e) => setOtherCitizenship(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();

                                                if (otherCitizenship.trim() !== "") {
                                                    setCitizenship(otherCitizenship);
                                                }
                                            }
                                        }}
                                    />
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Address:
                            </td>

                            <td className="large-value-cell" colSpan="5">
                                <input
                                    type="text"
                                    className="tor-input full-input"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Complete Address"
                                />
                            </td>
                        </tr>

                        <tr>
                            <th colSpan="6">EDUCATIONAL DATA</th>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Degree:
                            </td>

                            <td className="large-value-cell" colSpan="3">
                                <select
                                    className="tor-select"
                                    value={degree}
                                    onChange={(e) => setDegree(e.target.value)}
                                >
                                    <option value="">Select Degree</option>

                                    <option value="Bachelor of Science in Accountancy (B.S.A.)">
                                        Bachelor of Science in Accountancy (B.S.A.)
                                    </option>

                                    <option value="Bachelor of Science in Business Administration (B.S.B.A.)">
                                        Bachelor of Science in Business Administration (B.S.B.A.)
                                    </option>

                                    <option value="Bachelor of Science in Customs Administration (B.S.C.A.)">
                                        Bachelor of Science in Customs Administration (B.S.C.A.)
                                    </option>

                                    <option value="Bachelor of Science in Computer Science (B.S.C.S.)">
                                        Bachelor of Science in Computer Science (B.S.C.S.)
                                    </option>

                                    <option value="Bachelor of Science in Information Technology (B.S.I.T.)">
                                        Bachelor of Science in Information Technology (B.S.I.T.)
                                    </option>

                                    <option value="Bachelor of Science in Computer Engineering (B.S.Cp.E.)">
                                        Bachelor of Science in Computer Engineering (B.S.Cp.E.)
                                    </option>

                                    <option value="Bachelor of Science in Electronics Engineering (B.S.E.C.E.)">
                                        Bachelor of Science in Electronics Engineering (B.S.E.C.E.)
                                    </option>

                                    <option value="Bachelor of Science in Electrical Engineering (B.S.E.E.)">
                                        Bachelor of Science in Electrical Engineering (B.S.E.E.)
                                    </option>

                                    <option value="Bachelor of Science in Industrial Engineering (B.S.I.E.)">
                                        Bachelor of Science in Industrial Engineering (B.S.I.E.)
                                    </option>

                                    <option value="Bachelor of Science in Mechanical Engineering (B.S.M.E.)">
                                        Bachelor of Science in Mechanical Engineering (B.S.M.E.)
                                    </option>

                                    <option value="Bachelor of Science in Nursing (B.S.N.)">
                                        Bachelor of Science in Nursing (B.S.N.)
                                    </option>

                                    <option value="Bachelor of Science in Criminology (B.S.Crim.)">
                                        Bachelor of Science in Criminology (B.S.Crim.)
                                    </option>

                                    <option value="Bachelor of Elementary Education (B.E.Ed.)">
                                        Bachelor of Elementary Education (B.E.Ed.)
                                    </option>

                                    <option value="Bachelor of Secondary Education (B.S.Ed.)">
                                        Bachelor of Secondary Education (B.S.Ed.)
                                    </option>

                                    <option value="Bachelor of Science in Marine Transportation (B.S.M.T.)">
                                        Bachelor of Science in Marine Transportation (B.S.M.T.)
                                    </option>

                                    <option value="Bachelor of Science in Marine Engineering (B.S.Mar.E.)">
                                        Bachelor of Science in Marine Engineering (B.S.Mar.E.)
                                    </option>

                                    <option value="Bachelor of Science in Hospitality Management (B.S.H.M.)">
                                        Bachelor of Science in Hospitality Management (B.S.H.M.)
                                    </option>

                                    <option value="Bachelor of Science in Tourism Management (B.S.T.M.)">
                                        Bachelor of Science in Tourism Management (B.S.T.M.)
                                    </option>
                                </select>
                            </td>

                            <td className="right-label-cell">
                                Date of Graduation:
                            </td>

                            <td className="small-value-cell">
                                <input
                                    type="date"
                                    className="tor-input full-input"
                                    value={graduationDate}
                                    onChange={(e) => setGraduationDate(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th colSpan="6">PREVIOUS SCHOOL ATTENDED</th>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Elementary:
                            </td>

                            <td className="large-value-cell" colSpan="5">
                                <input
                                    type="text"
                                    className="tor-input full-input"
                                    value={elementarySchool}
                                    onChange={(e) => setElementarySchool(e.target.value)}
                                    placeholder="Elementary School"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="label-cell">
                                Secondary:
                            </td>

                            <td className="large-value-cell" colSpan="5">
                                <input
                                    type="text"
                                    className="tor-input full-input"
                                    value={secondarySchool}
                                    onChange={(e) => setSecondarySchool(e.target.value)}
                                    placeholder="Secondary School"
                                />
                            </td>
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
                        {showSummer1 && <SummerBlock />}

                        <tr>
                            <td colSpan="5" className="summer-button-row">
                                <button
                                    className="summer-btn"
                                    onClick={() => setShowSummer1(!showSummer1)}
                                >
                                    {showSummer1 ? "Remove Summer" : "+ Add Summer"}
                                </button>
                            </td>
                        </tr>

                        {/* SECOND YEAR */}
                        <SemesterBlock title="1ST SEMESTER" />
                        <SemesterBlock title="2ND SEMESTER" />
                        {showSummer2 && <SummerBlock />}

                        <tr>
                            <td colSpan="5" className="summer-button-row">
                                <button
                                    className="summer-btn"
                                    onClick={() => setShowSummer2(!showSummer2)}
                                >
                                    {showSummer2 ? "Remove Summer" : "+ Add Summer"}
                                </button>
                            </td>
                        </tr>

                        {/* THIRD YEAR */}
                        <SemesterBlock title="1ST SEMESTER" />
                        <SemesterBlock title="2ND SEMESTER" />
                        {showSummer3 && <SummerBlock />}

                        <tr>
                            <td colSpan="5" className="summer-button-row">
                                <button
                                    className="summer-btn"
                                    onClick={() => setShowSummer3(!showSummer3)}
                                >
                                    {showSummer3 ? "Remove Summer" : "+ Add Summer"}
                                </button>
                            </td>
                        </tr>

                        {/* FOURTH YEAR */}
                        <SemesterBlock title="1ST SEMESTER" />
                        <SemesterBlock title="2ND SEMESTER" />
                        {showSummer4 && <SummerBlock />}

                        <tr>
                            <td colSpan="5" className="summer-button-row">
                                <button
                                    className="summer-btn"
                                    onClick={() => setShowSummer4(!showSummer4)}
                                >
                                    {showSummer4 ? "Remove Summer" : "+ Add Summer"}
                                </button>
                            </td>
                        </tr>

                    </tbody>

                </table>

                {/* TOTALS */}
                <table className="total-table">
                    <tbody>

                        <tr>
                            <td>
                                Total Units Presented for Graduation
                            </td>

                            <td>
                                <input
                                    type="number"
                                    className="total-units-input"
                                    value={unitsPresented}
                                    onChange={(e) => setUnitsPresented(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Total Units Required for Graduation
                            </td>

                            <td>
                                <input
                                    type="number"
                                    className="total-units-input"
                                    value={unitsRequired}
                                    onChange={(e) => setUnitsRequired(e.target.value)}
                                />
                            </td>
                        </tr>

                    </tbody>
                </table>

                {/* REMARKS */}
                <div className="remarks">

                    {Number(unitsPresented) >= Number(unitsRequired) &&
                        unitsRequired !== "" ? (
                        <p>
                            <strong>Remarks:</strong> RECOMMENDED FOR
                            GRADUATION FROM THE FOUR-YEAR COURSE LEADING
                            TO THE DEGREE OF{" "}
                            <strong>
                                {degree
                                    ? degree.toUpperCase()
                                    : "________________________________"}
                            </strong>
                        </p>
                    ) : (
                        <p>
                            <strong>Remarks:</strong> NOT RECOMMENDED FOR
                            GRADUATION. STUDENT HAS NOT COMPLETED THE
                            REQUIRED NUMBER OF UNITS.
                        </p>
                    )}

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
                        JUDITH M. ALMONTE, M.B.A.
                    </h4>

                    <p>
                        UCLM Campus Registrar
                    </p>

                </div>

            </div>

        </div>
    );
}