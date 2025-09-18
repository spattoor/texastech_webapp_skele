export interface Student {
    name: string;
    rNumber: string;
    classEnrollment: ClassEnrollment[];
    projectInfo: ProjectInfo[];
    financialAidContact: FinancialAidContact;
}

export interface ClassEnrollment {
    courseName: string;
    courseCode: string;
    semester: string;
}

export interface ProjectInfo {
    projectTitle: string;
    projectDescription: string;
    projectDeadline: Date;
}

export interface FinancialAidContact {
    name: string;
    email: string;
    phone: string;
}