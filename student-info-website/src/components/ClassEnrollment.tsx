import React from 'react';

interface ClassEnrollmentProps {
    classList: string[];
}

const ClassEnrollment: React.FC<ClassEnrollmentProps> = ({ classList }) => {
    return (
        <div>
            <h2>Class Enrollment</h2>
            {classList.length > 0 ? (
                <ul>
                    {classList.map((className, index) => (
                        <li key={index}>{className}</li>
                    ))}
                </ul>
            ) : (
                <p>No classes enrolled.</p>
            )}
        </div>
    );
};

export default ClassEnrollment;