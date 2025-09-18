import React, { useState } from 'react';

interface StudentFormProps {
  onSubmit: (studentName: string, rNumber: string) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const [studentName, setStudentName] = useState('');
  const [rNumber, setRNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(studentName, rNumber);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', marginTop: 40 }}>
      <h2>Enter Student Details</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Student Name:</label>
        <input
          type="text"
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>R Number:</label>
        <input
          type="text"
          value={rNumber}
          onChange={e => setRNumber(e.target.value)}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Submit</button>
    </form>
  );
};

export default StudentForm;