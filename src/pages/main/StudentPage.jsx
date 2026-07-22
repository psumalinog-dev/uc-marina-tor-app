import { useMemo, useState } from 'react'
import { searchStudents } from '../../services/studentService'
import './StudentPage.css'

function StudentPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [program, setProgram] = useState('All Programs')
  const [status, setStatus] = useState('All Status')
  const [academicYear, setAcademicYear] = useState('All Years')
  const [pageSize, setPageSize] = useState('10')
  const [connectionNote, setConnectionNote] = useState('')

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesProgram = program === 'All Programs' || student.program === program
      const matchesStatus = status === 'All Status' || student.status === status
      const matchesYear = academicYear === 'All Years' || student.academicYear === academicYear

      return matchesProgram && matchesStatus && matchesYear
    })
  }, [academicYear, program, status, students])

  const visibleStudents = filteredStudents.slice(0, Number(pageSize))

  const handleSearch = async (event) => {
    event.preventDefault()
    const query = searchTerm.trim()

    if (!query) {
      setStudents([])
      setConnectionNote('')
      return
    }

    setLoading(true)
    setConnectionNote('')

    try {
      const responses = await Promise.all([
        searchStudents(query, '', ''),
        searchStudents('', query, ''),
        searchStudents('', '', query),
      ])

      const mergedStudents = []
      const seenStudentIds = new Set()

      responses.forEach((response) => {
        const responseItems = Array.isArray(response?.data) ? response.data : []
        responseItems.forEach((student) => {
          const fallbackKey = `${student.idNumber || ''}-${student.firstName || ''}-${student.lastName || ''}`
          const studentKey = student.studentId || fallbackKey
          if (!seenStudentIds.has(studentKey)) {
            seenStudentIds.add(studentKey)
            mergedStudents.push(student)
          }
        })
      })

      setStudents(mergedStudents)
    } catch (error) {
      setStudents([])
      setConnectionNote('No backend connection yet. Results will appear once student records API is available.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSearchTerm('')
    setProgram('All Programs')
    setStatus('All Status')
    setAcademicYear('All Years')
    setPageSize('10')
    setStudents([])
    setConnectionNote('')
  }

  return (
    <section className="tor-search-page" aria-label="Maritime TOR search page">
      <header className="tor-search-page-header">
        <h1 className="tor-search-page-title">Maritime TOR Search</h1>
        <span className="tor-search-title-accent" aria-hidden="true"></span>
        <p className="tor-search-page-subtitle">
          Search and retrieve students&apos; Transcript of Records quickly and conveniently.
        </p>
      </header>

      <article className="tor-search-card" aria-label="Search and filter section">
        <div className="tor-search-card-top">
          <div className="tor-search-card-heading-wrap">
            <span className="tor-search-icon-circle" aria-hidden="true">
              <i className="bi bi-search"></i>
            </span>
            <h2 className="tor-search-card-title">Search &amp; Filter</h2>
          </div>

          <p className="tor-search-info-badge">
            <i className="bi bi-info-circle"></i>
            Use Student ID or Student Name to search for TOR records.
          </p>
        </div>

        <form className="tor-search-form" onSubmit={handleSearch}>
          <div className="tor-search-main-field">
            <label htmlFor="torSearchInput" className="tor-field-label">
              Search by Student ID, Last Name, or First Name
            </label>
            <div className="tor-search-input-wrap">
              <i className="bi bi-search"></i>
              <input
                id="torSearchInput"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Enter Student ID, Last Name, or First Name..."
                className="tor-search-input"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="tor-filter-grid">
            <div className="tor-filter-field">
              <label htmlFor="programFilter" className="tor-field-label">
                Program
              </label>
              <div className="tor-select-wrap">
                <i className="bi bi-mortarboard"></i>
                <select
                  id="programFilter"
                  value={program}
                  onChange={(event) => setProgram(event.target.value)}
                  className="tor-filter-select"
                >
                  <option>All Programs</option>
                  <option>BSMT</option>
                  <option>BSME</option>
                </select>
              </div>
            </div>

            <div className="tor-filter-field">
              <label htmlFor="statusFilter" className="tor-field-label">
                Status
              </label>
              <div className="tor-select-wrap">
                <i className="bi bi-person"></i>
                <select
                  id="statusFilter"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="tor-filter-select"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Graduated</option>
                  <option>Alumni</option>
                </select>
              </div>
            </div>

            <div className="tor-filter-field">
              <label htmlFor="yearFilter" className="tor-field-label">
                Academic Year
              </label>
              <div className="tor-select-wrap">
                <i className="bi bi-calendar3"></i>
                <select
                  id="yearFilter"
                  value={academicYear}
                  onChange={(event) => setAcademicYear(event.target.value)}
                  className="tor-filter-select"
                >
                  <option>All Years</option>
                </select>
              </div>
            </div>

            <div className="tor-filter-actions">
              <button type="submit" className="tor-btn tor-btn-primary" disabled={loading}>
                <i className="bi bi-search"></i>
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button type="button" className="tor-btn tor-btn-secondary" onClick={handleReset}>
                <i className="bi bi-arrow-clockwise"></i>
                Reset
              </button>
            </div>
          </div>
        </form>
      </article>

      <article className="tor-results-card" aria-label="Search results section">
        <div className="tor-results-header">
          <div>
            <h2 className="tor-results-title">Search Results</h2>
            <p className="tor-results-count">{filteredStudents.length} records found</p>
          </div>

          <label className="tor-entries-control" htmlFor="entriesPerPage">
            Show
            <select
              id="entriesPerPage"
              value={pageSize}
              onChange={(event) => setPageSize(event.target.value)}
              className="tor-entries-select"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            entries
          </label>
        </div>

        <div className="tor-results-table-wrap">
          <table className="tor-results-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Program</th>
                <th>Status</th>
                <th>Academic Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleStudents.length > 0 ? (
                visibleStudents.map((student) => {
                  const rowKey = student.studentId || `${student.idNumber}-${student.firstName}-${student.lastName}`
                  const studentName = [student.lastName, student.firstName].filter(Boolean).join(', ')
                  return (
                    <tr key={rowKey}>
                      <td>{student.idNumber || '-'}</td>
                      <td>{studentName || '-'}</td>
                      <td>{student.program || '-'}</td>
                      <td>{student.status || '-'}</td>
                      <td>{student.academicYear || '-'}</td>
                      <td>
                        <button type="button" className="tor-row-action" disabled>
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="tor-empty-state">
                      <div className="tor-empty-illustration" aria-hidden="true">
                        <i className="bi bi-file-earmark-text"></i>
                        <i className="bi bi-search tor-empty-overlay-icon"></i>
                      </div>
                      <h3>No records to display</h3>
                      <p>
                        Student records will appear here once you search using Student ID or Student Name.
                      </p>
                      {connectionNote && <small>{connectionNote}</small>}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}

export default StudentPage
