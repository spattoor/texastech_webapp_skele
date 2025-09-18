import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ttuRed = '#CC0000';
const ttuGray = '#F3F3F3';

const tabList = [
  { key: 'classes', label: 'Classes' },
  { key: 'advisors', label: 'Advisors & Support' },
  { key: 'instructors', label: 'Instructors' },
  { key: 'financialAid', label: 'Financial Aid' },
];

const StudentDetails: React.FC = () => {
    const location = useLocation();
    const studentData = location.state;
    const [activeTab, setActiveTab] = useState('classes');

    if (!studentData) {
        return (
            <div style={{ background: ttuGray, minHeight: '100vh', padding: 48 }}>
                <h1 style={{ color: ttuRed }}>No student data found.</h1>
                <p>Please go back and select a student.</p>
            </div>
        );
    }

    // Helper to create Google Maps link for a location
    const getMapsLink = (location: string) => {
      const base = 'https://www.google.com/maps/dir/?api=1';
      const destination = encodeURIComponent(location + ', Texas Tech University, Lubbock, TX');
      return `${base}&destination=${destination}`;
    };

    return (
        <div style={{ background: ttuGray, minHeight: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif', paddingBottom: 48 }}>
            <header style={{ background: ttuRed, color: 'white', padding: '24px 0', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h1 style={{ margin: 0, fontSize: '2.2rem' }}>Student Details</h1>
            </header>
            <main style={{ maxWidth: 900, margin: '32px auto', padding: 24 }}>
                <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32, marginBottom: 32 }}>
                    <h2 style={{ color: ttuRed }}>{studentData.name}</h2>
                    <p><strong>R Number:</strong> {studentData.rNumber}</p>
                    <p><strong>Term:</strong> {studentData.term}</p>
                    <p><strong>Total Credits:</strong> {studentData.totalCredits}</p>
                </section>
                <nav style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  {tabList.map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      style={{
                        background: activeTab === tab.key ? ttuRed : 'white',
                        color: activeTab === tab.key ? 'white' : ttuRed,
                        border: `2px solid ${ttuRed}`,
                        borderRadius: 8,
                        padding: '8px 20px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
                {activeTab === 'classes' && (
                  <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32, marginBottom: 32 }}>
                    <h3 style={{ color: ttuRed }}>Classes</h3>
                    <ul style={{ paddingLeft: 20 }}>
                      {studentData.classes.map((cls: any, idx: number) => (
                        <li key={idx} style={{ marginBottom: 16 }}>
                          <strong>{cls.code} – {cls.name}</strong><br />
                          Instructor: {cls.instructor}<br />
                          Credits: {cls.credits}<br />
                          Lecture: {cls.lecture}<br />
                          Location: <a href={getMapsLink(cls.location)} target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, textDecoration: 'underline' }}>{cls.location}</a><br />
                          {cls.format && <>Format: {cls.format}<br /></>}
                          Days: {cls.days}<br />
                          Time: {cls.time}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {activeTab === 'advisors' && studentData.advisors && studentData.advisors.length > 0 && (
                  <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32, marginBottom: 32 }}>
                    <h3 style={{ color: ttuRed }}>Advisors & Support Contacts</h3>
                    <ul>
                        {studentData.advisors.map((adv: any, idx: number) => (
                            <li key={idx}>
                                <strong>{adv.name}</strong> – {adv.role}<br />
                                Email: {adv.email}{adv.phone ? ` | Phone: ${adv.phone}` : ''}
                            </li>
                        ))}
                    </ul>
                  </section>
                )}
                {activeTab === 'instructors' && studentData.instructors && studentData.instructors.length > 0 && (
                  <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32, marginBottom: 32 }}>
                    <h3 style={{ color: ttuRed }}>Instructors (Fall 2025 Courses)</h3>
                    <ul>
                        {studentData.instructors.map((inst: any, idx: number) => (
                            <li key={idx}>
                                <strong>{inst.name}</strong> – {inst.course}<br />
                                Email: {inst.email}{inst.phone ? ` | Phone: ${inst.phone}` : ''}
                            </li>
                        ))}
                    </ul>
                  </section>
                )}
                {activeTab === 'financialAid' && studentData.financialAidContact && (
                  <section style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32, marginBottom: 32 }}>
                    <h3 style={{ color: ttuRed }}>Financial Aid Contact</h3>
                    <p>{studentData.financialAidContact}</p>
                    <p>
                      <a href="https://www.google.com/maps/place/Texas+Tech+Visitors+Center/@33.586274,-101.8727059,451m/data=!3m1!1e3!4m6!3m5!1s0x86fe12b3fdda2229:0xf2dd62b3c3e4e35a!8m2!3d33.5851357!4d-101.8724928!16s%2Fg%2F11clybv9yw?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, textDecoration: 'underline' }}>
                        View Financial Aid Building on Google Maps
                      </a>
                    </p>
                    <p style={{ color: '#555', fontStyle: 'italic' }}>
                      Location: West Hall, Room 301, 3rd Floor
                    </p>
                  </section>
                )}
            </main>
        </div>
    );
};

export default StudentDetails;