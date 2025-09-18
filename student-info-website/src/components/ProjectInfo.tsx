import React from 'react';

const ProjectInfo: React.FC<{ projectDetails: string }> = ({ projectDetails }) => {
    return (
        <div>
            <h2>Project Information</h2>
            <p>{projectDetails}</p>
        </div>
    );
};

export default ProjectInfo;