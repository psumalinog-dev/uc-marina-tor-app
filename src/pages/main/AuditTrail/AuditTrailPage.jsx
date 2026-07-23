import { useEffect, useState } from "react";
import { getAuditTrails } from "@/services/auditTrailService";
import "./AuditTrail.css";

const AuditTrailPage = () => {
    const [auditTrails, setAuditTrails] = useState([]);
    const [filteredAuditTrails, setFilteredAuditTrails] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    async function loadAuditTrails() {
        try {
            const data = await getAuditTrails();
            setAuditTrails(data);
            setFilteredAuditTrails(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function filterAuditTrails() {
        const keyword = search.toLowerCase();

        setFilteredAuditTrails(
            auditTrails.filter(
                (x) =>
                    x.username.toLowerCase().includes(keyword) ||
                    x.module.toLowerCase().includes(keyword) ||
                    x.action.toLowerCase().includes(keyword) ||
                    x.description.toLowerCase().includes(keyword)
            )
        );
    }

    useEffect(() => {
        loadAuditTrails();
    }, []);

    useEffect(() => {
        filterAuditTrails();
    }, [search, auditTrails]);

    const formatDate = (date) => new Date(date).toLocaleString();

    return (
        <div className="audit-page">
            <div className="audit-header">
                <div>
                    <h2>Audit Trail</h2>
                    <p>View all user activities within the system.</p>
                </div>

                <div className="audit-total">
                    <span>{filteredAuditTrails.length}</span>
                    <small>Records</small>
                </div>
            </div>

            <div className="audit-toolbar">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="audit-card">
                {loading ? (
                    <div className="text-center p-5">
                        <div className="spinner-border text-primary"></div>
                    </div>
                ) : (
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-primary">
                            <tr>
                                <th>Date</th>
                                <th>User</th>
                                <th>Module</th>
                                <th>Action</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAuditTrails.length > 0 ? (
                                filteredAuditTrails.map((item) => (
                                    <tr key={item.auditTrailId}>
                                        <td>{formatDate(item.createdDate)}</td>
                                        <td>{item.username}</td>
                                        <td>{item.module}</td>
                                        <td>
                                            <span
                                                className={`badge ${item.action === "Create"
                                                        ? "bg-success"
                                                        : item.action === "Update"
                                                            ? "bg-warning text-dark"
                                                            : item.action === "Delete"
                                                                ? "bg-danger"
                                                                : item.action === "Login"
                                                                    ? "bg-primary"
                                                                    : item.action === "Logout"
                                                                        ? "bg-secondary"
                                                                        : "bg-info"
                                                    }`}
                                            >
                                                {item.action}
                                            </span>
                                        </td>
                                        <td>{item.description}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-5">
                                        No audit trail records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AuditTrailPage;