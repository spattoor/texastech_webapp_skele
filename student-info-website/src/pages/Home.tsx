import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper to get today's classes for all students
interface Advisor {
  name: string;
  role: string;
  email: string;
  phone?: string;
}
interface Instructor {
  name: string;
  course: string;
  email: string;
  phone?: string;
}
interface Student {
  name: string;
  rNumber: string;
  term: string;
  classes: Array<{
    code: string;
    name: string;
    instructor: string;
    credits: number;
    lecture?: string;
    location: string;
    days: string;
    time: string;
    format?: string;
  }>;
  totalCredits: number;
  advisors: Advisor[];
  instructors: Instructor[];
  projects?: string;
  financialAidContact?: string;
}
interface TodaysClass {
  student: string;
  code: string;
  name: string;
  instructor: string;
  location: string;
  time: string;
}
function getTodaysClasses(students: Student[]): TodaysClass[] {
  const daysMap: { [key: number]: string } = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const today = new Date();
  const todayStr = daysMap[today.getDay()];
  const result: TodaysClass[] = [];
  students.forEach((student) => {
    student.classes.forEach((cls) => {
      if (cls.days && cls.days.includes(todayStr)) {
        result.push({
          student: student.name,
          code: cls.code,
          name: cls.name,
          instructor: cls.instructor,
          location: cls.location,
          time: cls.time,
        });
      }
    });
  });
  return result;
}

const ttuRed = '#CC0000';

const students = [
	{
		name: 'Sai Abhinav Pattoor',
		rNumber: 'R11905843',
		term: 'Fall 2025',
		classes: [
			{
				code: 'CS 2365',
				name: 'Object-Oriented Programming',
				instructor: 'Scott Franklin',
				credits: 3.0,
				lecture: '002 (CRN 47948)',
				location: 'Civil Engineering 205',
				days: 'Monday, Wednesday, Friday',
				time: '5:00 PM – 5:50 PM',
			},
			{
				code: 'SOC 1301',
				name: 'Introduction to Sociology',
				instructor: 'Haleigh Larkin',
				credits: 3.0,
				lecture: 'D01 (CRN 32784)',
				location: 'Online (TDE, asynchronous)',
				days: 'Online',
				time: 'No set meeting time',
			},
			{
				code: 'CS 3361',
				name: 'Concepts of Programming Languages',
				instructor: 'Ashlesha Malla, Maaz Amjad, Usha Raman Adapa',
				credits: 3.0,
				lecture: '002 (CRN 48820)',
				location: 'Livermore Center 101',
				days: 'Monday, Wednesday, Friday',
				time: '1:00 PM – 1:50 PM',
			},
			{
				code: 'HIST 2300',
				name: 'History of the United States to 1877',
				instructor: 'Barbara Hahn, Carissa O’Pry, Emmanuel Ojelabi, Katherine Henderson, Kyle Rable',
				credits: 3.0,
				lecture: 'D03 (CRN 34580)',
				location: 'Online (TDE, asynchronous)',
				days: 'Online',
				time: 'No set meeting time',
			},
			{
				code: 'CS 3364',
				name: 'Design and Analysis of Algorithms',
				instructor: 'Linpeng Sun, Uma Maheswari Chinta',
				credits: 3.0,
				lecture: '002 (CRN 49808)',
				location: 'Electrical Engineering 217',
				days: 'Monday, Wednesday, Friday',
				time: '4:00 PM – 4:50 PM',
			},
		],
		totalCredits: 15.0,
		advisors: [
			{ name: 'Dan Martin', role: 'Computer Science Advisor (K–Z), Major Advisor', email: 'daniel.martin@ttu.edu', phone: '(806) 834-7709' },
			{ name: 'Jennifer Kisby', role: 'Student Success Specialist', email: 'jenni.kisby@ttu.edu' },
			{ name: 'Gracie Quintana', role: 'Asst. Director Advising & Retention (Minor & Referral only)', email: 'gracie.z.quintana@ttu.edu', phone: '(806) 742-3451' },
			{ name: 'Katie Magana', role: 'Program Manager, Study Abroad (Asia, Oceania, the Americas, Ireland)', email: 'katie.magana@ttu.edu', phone: '(806) 834-8558' },
			{ name: 'Gabrielle Colon', role: 'International Counselor', email: 'gabcolon@ttu.edu' },
			{ name: 'Donna Guzman', role: 'Financial Aid Advisor', email: 'donna.guzman@ttu.edu', phone: '(806) 834-5473' },
			{ name: 'Erin Burns', role: 'Personal Librarian', email: 'erin.burns@ttu.edu', phone: '(806) 834-2142' },
		],
		instructors: [
			{ name: 'Barbara Hahn', course: 'HIST 2300', email: 'barbara.hahn@ttu.edu', phone: '(806) 834-6514' },
			{ name: 'Uma Maheswari Chinta', course: 'CS 3364', email: 'uchinta@ttu.edu' },
			{ name: 'Maaz Amjad', course: 'CS 3361', email: 'maaz.amjad@ttu.edu' },
			{ name: 'Haleigh Larkin', course: 'SOC 1301', email: 'haleigh.m.larkin@ttu.edu', phone: '(806) 742-2400' },
			{ name: 'Scott Franklin', course: 'CS 2365', email: 'scott.franklin@ttu.edu' },
		],
		projects: '',
		financialAidContact: 'Donna Guzman',
	},
	{
		name: 'Vishwakaran Belaganti',
		rNumber: '11910473',
		term: 'Fall 2025',
		classes: [
			{
				code: 'CS 3364',
				name: 'Design and Analysis of Algorithms',
				instructor: 'Uma Maheswari Chinta',
				credits: 3.0,
				lecture: '002 (CRN 49808)',
				location: 'Electrical Engineering 217',
				format: 'Face-to-Face',
				days: 'Monday, Wednesday, Friday',
				time: '4:00 PM – 4:50 PM',
			},
			{
				code: 'COMS 2358',
				name: 'Speaking for Business (Honors)',
				instructor: 'Catherine Langford',
				credits: 3.0,
				lecture: 'H01 (CRN 36088)',
				location: 'MCOM 80',
				format: 'Face-to-Face',
				days: 'Tuesday, Thursday',
				time: '[TBD – please confirm exact slot]',
			},
			{
				code: 'CS 2365',
				name: 'Object-Oriented Programming',
				instructor: 'Mustafa Alam',
				credits: 3.0,
				lecture: '002 (CRN 47948)',
				location: 'Civil Engineering 205',
				format: 'Face-to-Face',
				days: 'Monday, Wednesday, Friday',
				time: '5:00 PM – 5:50 PM',
			},
			{
				code: 'CS 3383',
				name: 'Theory of Automata',
				instructor: 'Lu Wei',
				credits: 3.0,
				lecture: '001 (CRN 17622)',
				location: 'Holden Hall 75',
				format: 'Face-to-Face',
				days: 'Monday, Wednesday, Friday',
				time: '[Looks like 8:00 AM or 9:00 AM – please confirm]',
			},
			{
				code: 'POLS 2306',
				name: 'Texas Politics and Topics',
				instructor: 'Section varies (D01–D09 range)',
				credits: 3.0,
				lecture: 'Online (TDE, CRN TBD)',
				location: 'Online',
				format: 'Online asynchronous',
				days: 'Online',
				time: 'No set meeting',
			},
			{
				code: 'MATH 3350',
				name: 'Higher Mathematics for Engineers and Scientists I',
				instructor: '[TBD]',
				credits: 3.0,
				lecture: 'Section D01 or D02 (CRN TBD)',
				location: 'Online (TDE) or hybrid',
				format: 'Online or hybrid',
				days: 'Online',
				time: 'No set meeting',
			},
		],
		totalCredits: 18.0,
		advisors: [
			{ name: 'Jessica Woodard', role: 'Academic Advisor (A–J), Major Advisor', email: 'jessica.woodard@ttu.edu', phone: '(806) 742-3527' },
			{ name: 'Melanie Lindsey', role: 'Student Success Specialist (A–G)', email: 'melanie.lindsey@ttu.edu', phone: '(806) 834-6188' },
			{ name: 'Patricia Rodriguez', role: 'UG Graduation Coordinator, Success Advisor', email: 'patty.rodriguez@ttu.edu', phone: '(806) 834-6134' },
			{ name: 'Gracie Quintana', role: 'Asst. Director Advising & Retention (Minor & Referral only)', email: 'gracie.z.quintana@ttu.edu', phone: '(806) 742-3451' },
			{ name: 'Stephanie Cook', role: 'Student Success Specialist, Supplemental Success Advisor', email: 'stephanie.cook@ttu.edu', phone: '(806) 834-4932' },
			{ name: 'Katie Magana', role: 'Program Manager for Asia, Oceania, the Americas, and Ireland (Study Abroad Advisor)', email: 'katie.magana@ttu.edu', phone: '(806) 834-8558' },
			{ name: 'Ruby Oku', role: 'International Counselor', email: 'ruby.oku@ttu.edu', phone: '(806) 834-8558' },
			{ name: 'Kristina Vinson', role: 'Financial Aid Advisor', email: 'kristina.vinson@ttu.edu' },
			{ name: 'Erin Burns', role: 'Personal Librarian', email: 'erin.burns@ttu.edu', phone: '(806) 834-2142' },
		],
		instructors: [
			{ name: 'Scott Franklin', course: 'CS courses', email: 'scott.franklin@ttu.edu' },
			{ name: 'Lu Wei', course: 'CS 3383', email: 'luwei@ttu.edu', phone: '(806) 834-1798' },
			{ name: 'Wenjing Zhang', course: '', email: 'wenjing.zhang@ttu.edu', phone: '(806) 834-1224' },
			{ name: 'Catherine Langford', course: 'COMS 2358', email: 'katie.langford@ttu.edu', phone: '(806) 834-1815' },
			{ name: 'Uma Maheswari Chinta', course: 'CS 3364', email: 'uchinta@ttu.edu' },
		],
		projects: '',
		financialAidContact: 'Donna Guzman',
	},
];

const usefulLocations = [
  { name: 'TTU Library', url: 'https://www.google.com/maps/place/University+Library/@33.5870515,-101.894951,10439m/data=!3m2!1e3!5s0x86fe12b2932eeaa1:0xba7cc9ebc29b19c5!4m10!1m2!2m1!1slibrary+ttu!3m6!1s0x86fe12b2d2fc6179:0xe415c69597097f7b!8m2!3d33.5814077!4d-101.8762862!15sCgtsaWJyYXJ5IHR0dVoNIgtsaWJyYXJ5IHR0dZIBEnVuaXZlcnNpdHlfbGlicmFyeaoBVQoJL20vMDFuX2c5CggvbS8wNGg4aBABKgsiB2xpYnJhcnkoADIeEAEiGu3WnOtTTFwwMOW-G0M_UoEHwYtsH-XbWsIUMg8QAiILbGlicmFyeSB0dHXgAQA!16s%2Fg%2F1trc5dr3?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D' },
  { name: 'SUB Student Union Building', url: 'https://www.google.com/maps/place/Student+Union+Building/@33.5815029,-101.8850396,5220m/data=!3m1!1e3!4m10!1m2!2m1!1sstudent+union+building!3m6!1s0x86fe12b30c0193cb:0x6ed69e123d3fd95!8m2!3d33.581381!4d-101.8747164!15sChZzdHVkZW50IHVuaW9uIGJ1aWxkaW5nWhgiFnN0dWRlbnQgdW5pb24gYnVpbGRpbmeSAQ1zdHVkZW50X3VuaW9umgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU5LYTAxNlZ6WlJSUkFCqgFaEAEqGiIWc3R1ZGVudCB1bmlvbiBidWlsZGluZygAMh4QASIa2b-oQioupzwuhI6pw_HCT2RP641EM_Q1ikYyGhACIhZzdHVkZW50IHVuaW9uIGJ1aWxkaW5n4AEA-gEECAAQQw!16s%2Fg%2F1v6p4r8y?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D' },
  { name: 'TTU REC', url: 'https://www.google.com/maps/place/Robert+H.+Ewalt+Student+Recreation+Center/@33.5830348,-101.8947793,5220m/data=!3m2!1e3!4b1!4m6!3m5!1s0x86fe12ab94edbfbf:0x25683baa82ff0d6e!8m2!3d33.5830173!4d-101.884501!16s%2Fg%2F12jm5kjs4?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D' },
  { name: 'Jones AT&T', url: 'https://www.google.com/maps/place/Jones+AT%26T+Stadium/@33.5910784,-101.8831682,5219m/data=!3m2!1e3!4b1!4m6!3m5!1s0x86fe12ba093e579f:0x91e9c7a695873daf!8m2!3d33.591061!4d-101.8728899!16zL20vMDYzNnpz?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D' },
];

const tabList = [
  { label: 'Raider Favorites' },
  { label: 'Dining Halls' },
  { label: 'Calendars' },
  { label: 'Campus Map' },
  { label: 'Study Spaces' },
  { label: 'Notifications' },
  { label: 'Academic Progress Tracker' },
  { label: 'Marketplace' },
  { label: 'Instructor Reviews' },
];

// Marketplace item type
interface MarketplaceItem {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  contact: string;
  image?: string;
}

// Sample initial marketplace data
const initialMarketplace: MarketplaceItem[] = [
  {
    id: 1,
    title: 'CS 2365 Textbook',
    description: 'Object-Oriented Programming textbook, lightly used.',
    category: 'Textbooks',
    price: '$40',
    contact: 'sai@ttu.edu',
    image: '',
  },
  {
    id: 2,
    title: 'Bike for Sale',
    description: 'Mountain bike, good condition, includes lock.',
    category: 'Bikes',
    price: '$120',
    contact: 'vishwa@ttu.edu',
    image: '',
  },
];

const Home: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [rNumber, setRNumber] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>(initialMarketplace);
  const [newItem, setNewItem] = useState<MarketplaceItem>({
    id: 0,
    title: '',
    description: '',
    category: '',
    price: '',
    contact: '',
    image: '',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const navigate = useNavigate();
  const todaysClasses = selectedStudent ? getTodaysClasses([selectedStudent]) : [];

  if (!selectedStudent) {
    return (
      <div style={{
        minHeight: '100vh',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        background: `linear-gradient(rgba(40,0,0,0.45), rgba(40,0,0,0.45)), url(https://www.depts.ttu.edu/admissions/visit-events/traveling-to-campus/BostonEntrance_10rs.png) center/cover no-repeat`,
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ background: 'rgba(255,255,255,0.85)', padding: 40, borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
          <h2 style={{ color: '#CC0000', textAlign: 'center', marginBottom: 24 }}>Enter your Red Raider ID</h2>
          <input
            type="text"
            value={rNumber}
            onChange={e => setRNumber(e.target.value)}
            placeholder="e.g. R12345678"
            style={{ padding: '10px 16px', fontSize: 18, borderRadius: 6, border: '1px solid #CC0000', width: 220, marginBottom: 16 }}
          />
          <br />
          <button
            style={{ background: '#CC0000', color: 'white', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 18, fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => {
              const input = rNumber.trim().toUpperCase();
              const found = students.find(s =>
                input === s.rNumber ||
                input === 'R' + s.rNumber ||
                input.replace(/^R/, '') === s.rNumber
              );
              if (found) setSelectedStudent(found);
              else alert('Student not found. Please check your Red Raider ID.');
            }}
          >
            View Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      background: `linear-gradient(rgba(40,0,0,0.45), rgba(40,0,0,0.45)), url(https://www.depts.ttu.edu/admissions/visit-events/traveling-to-campus/BostonEntrance_10rs.png) center/cover no-repeat`,
      backgroundAttachment: 'fixed',
    }}>
      <div style={{ display: 'flex', maxWidth: 1200, margin: '0 auto', padding: '2rem', background: 'rgba(255,255,255,0.65)', borderRadius: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
        {/* Sidebar navigation and content */}
        <div style={{ minWidth: 260, marginRight: 32, display: 'flex', flexDirection: 'column', gap: 12, background: 'rgba(255,255,255,0.95)', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '24px 12px' }}>
          {tabList.map((tabItem, idx) => (
            <button
              key={tabItem.label}
              onClick={() => setTab(idx)}
              style={{
                padding: '12px 18px',
                background: tab === idx ? '#CC0000' : 'white',
                color: tab === idx ? 'white' : '#CC0000',
                border: '1px solid #CC0000',
                borderRadius: 6,
                fontWeight: 'bold',
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: tab === idx ? '0 2px 8px rgba(0,0,0,0.10)' : 'none',
                transition: 'background 0.2s',
                marginBottom: 8,
              }}
            >
              {tabItem.label}
            </button>
          ))}
          {/* Tab content inside sidebar */}
          <div style={{ marginTop: 24 }}>
            {tab === 0 && (
              <div>
                <h2 style={{ color: ttuRed, textAlign: 'center', marginBottom: 16 }}>Raider Favorites</h2>
                {/* TTU Library section (no study spaces info) */}
                <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: 24, minWidth: 250 }}>
                  <h3 style={{ color: ttuRed, fontWeight: 'bold', marginBottom: 8 }}>TTU Library</h3>
                  <p style={{ color: '#555', marginBottom: 8 }}>
                    TTU Library main location and resources.
                  </p>
                  <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <a href="https://www.depts.ttu.edu/library/" target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, fontWeight: 'bold', textDecoration: 'underline', fontSize: 16 }}>Go to TTU Library</a>
                  </div>
                </div>
                {/* TTU Rec Center: Google Maps link and live counts link only */}
                <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: 24, minWidth: 250 }}>
                  <h3 style={{ color: ttuRed, fontWeight: 'bold', marginBottom: 8 }}>TTU Rec Center</h3>
                  <div style={{ marginBottom: 12 }}>
                    <a href="https://www.google.com/maps/place/Robert+H.+Ewalt+Student+Recreation+Center/@33.5830173,-101.884501,17z" target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, textDecoration: 'underline', fontWeight: 'bold' }}>Open in Google Maps</a>
                  </div>
                  <div>
                    <a href="https://www.depts.ttu.edu/recreation/facilities/hours.php" target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, textDecoration: 'underline', fontWeight: 'bold' }}>View Live Facility Counts & Hours</a>
                  </div>
                </div>
              </div>
            )}
            {tab === 1 && (
              <div>
                <h2 style={{ color: ttuRed, textAlign: 'center', marginBottom: 16 }}>Dining Halls</h2>
                {[
                  { name: '23 at Sneed', location: 'Sneed Hall', url: 'https://www.google.com/maps/place/Sneed+Hall,+Texas+Tech+University/@33.5845,-101.8767,17z' },
                  { name: "Boar's Head Deli", location: 'Student Union Building', url: 'https://www.google.com/maps/place/Student+Union+Building/@33.581381,-101.8747164,17z' },
                  { name: 'The Break', location: 'Student Union Building', url: 'https://www.google.com/maps/place/Student+Union+Building/@33.581381,-101.8747164,17z' },
                  { name: 'Burkhart Cafe', location: 'Burkhart Center', url: 'https://www.google.com/maps/place/Burkhart+Center/@33.5837,-101.8742,17z' },
                  { name: 'Chick-fil-A (SUB)', location: 'Student Union Building', url: 'https://www.google.com/maps/place/Student+Union+Building/@33.581381,-101.8747164,17z' },
                  { name: 'Chick-fil-A (Wiggins)', location: 'Wiggins Complex', url: 'https://www.google.com/maps/place/Wiggins+Complex/@33.5848,-101.8782,17z' },
                  { name: 'Chick-fil-A (Rawls)', location: 'Rawls College of Business', url: 'https://www.google.com/maps/place/Rawls+College+of+Business/@33.5842,-101.8722,17z' },
                  { name: 'The Commons', location: 'Talkington Hall', url: 'https://www.google.com/maps/place/Talkington+Hall/@33.5832,-101.8756,17z' },
                  { name: 'Einstein Bros Bagels', location: 'Rawls College of Business', url: 'https://www.google.com/maps/place/Rawls+College+of+Business/@33.5842,-101.8722,17z' },
                  { name: 'Starbucks', location: 'Student Union Building', url: 'https://www.google.com/maps/place/Student+Union+Building/@33.581381,-101.8747164,17z' },
                ].map((dining, idx) => (
                  <div key={idx} style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: 24, minWidth: 250 }}>
                    <h3 style={{ color: '#CC0000', fontWeight: 'bold' }}>{dining.name}</h3>
                    <p style={{ margin: '8px 0', color: '#555' }}>{dining.location}</p>
                    <a href={dining.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 12, color: '#CC0000', textDecoration: 'underline' }}>Open in Google Maps</a>
                  </div>
                ))}
              </div>
            )}
            {tab === 2 && (
              <div>
                <h2 style={{ color: ttuRed, textAlign: 'center', marginBottom: 16 }}>TTU Sports & Events Calendar</h2>
                {/* Export Gameday Calendar Button */}
                <div style={{ marginBottom: 24, textAlign: 'center' }}>
                  <button
                    style={{ background: ttuRed, color: 'white', border: 'none', borderRadius: 6, padding: '8px 20px', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', marginBottom: 12 }}
                    onClick={() => {
                      // Sample football games
                      const footballGames = [
                        { summary: 'TTU vs Oregon State', date: '20250913', time: '143000', location: 'Jones AT&T Stadium', description: 'TTU Football Gameday' },
                        // Add more games here as needed
                      ];
                      let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TTU Gameday//EN\n';
                      footballGames.forEach(game => {
                        ics += `BEGIN:VEVENT\nSUMMARY:${game.summary}\nDESCRIPTION:${game.description}\nLOCATION:${game.location}\nDTSTART:${game.date}T${game.time}\nDTEND:${game.date}T${(parseInt(game.time)+20000).toString().padStart(6,'0')}\nEND:VEVENT\n`;
                      });
                      ics += 'END:VCALENDAR';
                      const blob = new Blob([ics.replace(/\n/g, '\r\n')], { type: 'text/calendar' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'TTU_Football_Gameday.ics';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                  >
                    Export Gameday Calendar
                  </button>
                </div>
                {/* Hardcoded upcoming events list */}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ color: ttuRed, marginBottom: 8 }}>Upcoming Featured Events</h3>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    <li><strong>Football:</strong> No. 24 Texas Tech vs Oregon State — September 13, 2025 <a href="https://texastech.evenue.net/list/F" target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, textDecoration: 'underline' }}>Buy Tickets</a></li>
                    <li><strong>Women's Golf:</strong> Sam Golden Invitational — September 8, 2025</li>
                    <li><strong>Cross Country:</strong> Texas Tech Open — September 12, 2025, 8:15 AM</li>
                    <li><strong>Women's Tennis:</strong> Furman Fall Classic — September 12, 2025</li>
                    <li><strong>Men's Tennis:</strong> Waco Fall Kickoff Classic — September 12, 2025</li>
                    <li><strong>Women's Volleyball:</strong> vs Southern Utah — September 12, 2025, 12:00 PM</li>
                  </ul>
                </div>
                {/* Embedded live calendar */}
                <iframe
                  src="https://texastech.com/calendar"
                  title="TTU Athletics Calendar"
                  width="100%"
                  height="600"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen
                />
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <a href="https://texastech.com/calendar" target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, fontWeight: 'bold', textDecoration: 'underline', fontSize: 18 }}>View Full TTU Athletics Calendar</a>
                </div>
              </div>
            )}
            {tab === 3 && (
              <div>
                <h2 style={{ color: ttuRed, textAlign: 'center', marginBottom: 16 }}>TTU Campus Map & Building Finder</h2>
                <div style={{ marginBottom: 16 }}>
                  <input type="text" placeholder="Search for a building..." style={{ padding: '8px 16px', fontSize: 16, borderRadius: 6, border: '1px solid #CC0000', width: 300 }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginBottom: 24 }}>
                  <div style={{ flex: 1, minWidth: 350 }}>
                    <h3 style={{ color: ttuRed, textAlign: 'center', marginBottom: 8 }}>TTU Official Campus Map</h3>
                    <iframe
                      src="https://www.ttu.edu/map/"
                      title="TTU Campus Map"
                      width="100%"
                      height="400"
                      style={{ border: 0, borderRadius: 12 }}
                      allowFullScreen
                    />
                    <div style={{ textAlign: 'center', marginTop: 8 }}>
                      <a href="https://www.ttu.edu/map/" target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, textDecoration: 'underline', fontWeight: 'bold' }}>Open Full TTU Campus Map</a>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 350 }}>
                    <h3 style={{ color: ttuRed, textAlign: 'center', marginBottom: 8 }}>Google Maps View</h3>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.217964836839!2d-101.8781!3d33.5846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86fe12b3fdda2229%3A0xf2dd62b3c3e4e35a!2sTexas%20Tech%20University!5e0!3m2!1sen!2sus!4v1660000000000!5m2!1sen!2sus"
                      title="Google Maps TTU"
                      width="100%"
                      height="400"
                      style={{ border: 0, borderRadius: 12 }}
                      allowFullScreen
                    />
                    <div style={{ textAlign: 'center', marginTop: 8 }}>
                      <a href="https://www.google.com/maps/place/Texas+Tech+University/@33.5846,-101.8781,15z" target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, textDecoration: 'underline', fontWeight: 'bold' }}>Open in Google Maps</a>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 20, textAlign: 'center', color: '#555' }}>
                  <p>Use the search box above to find campus buildings. Click on either map for more info.</p>
                </div>
              </div>
            )}
            {tab === 4 && (
              <div>
                <h2 style={{ color: ttuRed, textAlign: 'center', marginBottom: 16 }}>TTU Library Study Spaces</h2>
                <p style={{ color: '#555', marginBottom: 16 }}>
                  Find and reserve study rooms, quiet spaces, and group areas at the TTU Library. Check availability and book online.
                </p>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <a href="https://www.depts.ttu.edu/library/studySpaces/" target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, fontWeight: 'bold', textDecoration: 'underline', fontSize: 18 }}>Go to TTU Study Spaces</a>
                </div>
                <iframe
                  src="https://www.depts.ttu.edu/library/studySpaces/"
                  title="TTU Study Spaces"
                  width="100%"
                  height="600"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen
                />
              </div>
            )}
            {tab === 5 && (
              <div>
                <h2 style={{ color: ttuRed, textAlign: 'center', marginBottom: 16 }}>Notifications</h2>
                <p style={{ color: '#555', textAlign: 'center' }}>View reminders for classes, deadlines, and campus events here. (Feature coming soon!)</p>
              </div>
            )}
            {tab === 6 && selectedStudent && (
              <div>
                <h2 style={{ color: ttuRed, textAlign: 'center', marginBottom: 16 }}>Academic Progress Tracker</h2>
                <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', padding: 24, maxWidth: 600, margin: '0 auto' }}>
                  <h3 style={{ color: ttuRed, marginBottom: 12 }}>GPA by Semester</h3>
                  <svg width="100%" height="220" viewBox="0 0 600 220" style={{ background: '#f9f9f9', borderRadius: 8, marginBottom: 16 }}>
                    {/* Axes */}
                    <line x1="60" y1="30" x2="60" y2="180" stroke="#CC0000" strokeWidth="2" />
                    <line x1="60" y1="180" x2="560" y2="180" stroke="#CC0000" strokeWidth="2" />
                    {/* GPA scale labels */}
                    {[4, 3.5, 3, 2.5, 2].map((g: number, i: number) => (
                      <text key={i} x="30" y={180 - (g - 2) * 50} fontSize="14" fill="#CC0000">{g.toFixed(2)}</text>
                    ))}
                    {/* Semester points and lines */}
                    {(() => {
                      const data: AcademicProgressEntry[] = academicProgressData[selectedStudent.name] || [];
                      const points = data.map((d: AcademicProgressEntry, i: number) => {
                        const x = 60 + i * 100;
                        const y = d.gpa !== null ? 180 - (d.gpa - 2) * 50 : 180;
                        return { x, y, label: d.sem, gpa: d.gpa };
                      });
                      // Draw lines
                      return (
                        <g>
                          {points.map((pt: {x: number, y: number, label: string, gpa: number | null}, i: number) => i > 0 && pt.gpa !== null && points[i-1].gpa !== null ? (
                            <line key={i} x1={points[i-1].x} y1={points[i-1].y} x2={pt.x} y2={pt.y} stroke="#CC0000" strokeWidth="3" />
                          ) : null)}
                          {points.map((pt: {x: number, y: number, label: string, gpa: number | null}, i: number) => pt.gpa !== null ? (
                            <circle key={i} cx={pt.x} cy={pt.y} r="8" fill="#CC0000" />
                          ) : (
                            <circle key={i} cx={pt.x} cy={pt.y} r="8" fill="#888" />
                          ))}
                          {points.map((pt: {x: number, y: number, label: string, gpa: number | null}, i: number) => (
                            <text key={i} x={pt.x} y={200} fontSize="14" fill="#CC0000" textAnchor="middle">{pt.label}</text>
                          ))}
                          {points.map((pt: {x: number, y: number, label: string, gpa: number | null}, i: number) => pt.gpa !== null ? (
                            <text key={i} x={pt.x} y={pt.y - 14} fontSize="13" fill="#CC0000" textAnchor="middle">{pt.gpa.toFixed(2)}</text>
                          ) : (
                            <text key={i} x={pt.x} y={pt.y - 14} fontSize="13" fill="#888" textAnchor="middle">Current</text>
                          ))}
                        </g>
                      );
                    })()}
                  </svg>
                  <div style={{ color: '#555', fontSize: 16 }}>
                    <strong>Year:</strong> {academicProgressData[selectedStudent.name]?.map((d: AcademicProgressEntry) => d.year).join(', ')}
                  </div>
                  <div style={{ color: '#555', fontSize: 16, marginTop: 8 }}>
                    <strong>Current Semester:</strong> Fall 2025 (GPA pending)
                  </div>
                </div>
              </div>
            )}
            {tab === 7 && (
              <div>
                <h2 style={{ color: ttuRed, textAlign: 'center', marginBottom: 16 }}>Marketplace</h2>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
      <a href="https://www.facebook.com/marketplace" target="_blank" rel="noopener noreferrer" style={{ background: '#4267B2', color: 'white', borderRadius: 6, padding: '10px 24px', fontWeight: 'bold', textDecoration: 'none', fontSize: 16, display: 'inline-block', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
        Post on Facebook Marketplace
      </a>
      <div style={{ color: '#555', fontSize: 14, marginTop: 8 }}>
        (For wider reach, you can cross-post your listing on Facebook Marketplace.)
      </div>
    </div>
                <div style={{ marginBottom: 24, textAlign: 'center' }}>
                  <h3 style={{ color: ttuRed }}>Add New Listing</h3>
                  <input placeholder="Title" value={newItem.title} onChange={e => setNewItem({ ...newItem, title: e.target.value })} style={{ margin: 4, padding: 8, borderRadius: 6, border: '1px solid #CC0000', width: 180 }} />
                  <input placeholder="Category" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} style={{ margin: 4, padding: 8, borderRadius: 6, border: '1px solid #CC0000', width: 120 }} />
                  <input placeholder="Price" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} style={{ margin: 4, padding: 8, borderRadius: 6, border: '1px solid #CC0000', width: 80 }} />
                  <input placeholder="Contact Email" value={newItem.contact} onChange={e => setNewItem({ ...newItem, contact: e.target.value })} style={{ margin: 4, padding: 8, borderRadius: 6, border: '1px solid #CC0000', width: 180 }} />
                  <input placeholder="Image URL (optional)" value={newItem.image} onChange={e => setNewItem({ ...newItem, image: e.target.value })} style={{ margin: 4, padding: 8, borderRadius: 6, border: '1px solid #CC0000', width: 220 }} />
                  <br />
                  <textarea placeholder="Description" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} style={{ margin: 4, padding: 8, borderRadius: 6, border: '1px solid #CC0000', width: 400, height: 60 }} />
                  <br />
                  <button style={{ background: ttuRed, color: 'white', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 'bold', margin: 8 }} onClick={() => {
                    if (!newItem.title || !newItem.category || !newItem.price || !newItem.contact) return alert('Please fill all required fields.');
                    if (editId) {
                      setMarketplace(marketplace.map(item => item.id === editId ? { ...newItem, id: editId } : item));
                      setEditId(null);
                    } else {
                      setMarketplace([...marketplace, { ...newItem, id: Date.now() }]);
                    }
                    setNewItem({ id: 0, title: '', description: '', category: '', price: '', contact: '', image: '' });
                  }}>{editId ? 'Update Listing' : 'Add Listing'}</button>
                  {editId && <button style={{ marginLeft: 8, background: '#888', color: 'white', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 'bold' }} onClick={() => { setEditId(null); setNewItem({ id: 0, title: '', description: '', category: '', price: '', contact: '', image: '' }); }}>Cancel</button>}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                  {marketplace.length === 0 ? <p style={{ color: '#555' }}>No listings yet.</p> : marketplace.map(item => (
                    <div key={item.id} style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', padding: 20, minWidth: 260, maxWidth: 320, position: 'relative' }}>
                      {item.image && <img src={item.image} alt={item.title} style={{ width: '100%', maxHeight: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />}
                      <h3 style={{ color: ttuRed, marginBottom: 4 }}>{item.title}</h3>
                      <div style={{ color: '#555', fontWeight: 'bold', marginBottom: 4 }}>{item.category}</div>
                      <div style={{ color: '#555', marginBottom: 4 }}>{item.description}</div>
                      <div style={{ color: ttuRed, fontWeight: 'bold', marginBottom: 4 }}>{item.price}</div>
                      <div style={{ color: '#555', marginBottom: 4 }}>Contact: <a href={`mailto:${item.contact}`} style={{ color: ttuRed, textDecoration: 'underline' }}>{item.contact}</a></div>
                      <button style={{ position: 'absolute', top: 8, right: 8, background: ttuRed, color: 'white', border: 'none', borderRadius: 6, padding: '4px 10px', fontWeight: 'bold', fontSize: 12 }} onClick={() => { setEditId(item.id); setNewItem(item); }}>Edit</button>
                      <button style={{ position: 'absolute', top: 8, right: 60, background: '#888', color: 'white', border: 'none', borderRadius: 6, padding: '4px 10px', fontWeight: 'bold', fontSize: 12 }} onClick={() => setMarketplace(marketplace.filter(i => i.id !== item.id))}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === 8 && (
              <div>
                <h2 style={{ color: ttuRed, textAlign: 'center', marginBottom: 16 }}>Instructor Reviews</h2>
                <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', padding: 24, maxWidth: 600, margin: '0 auto' }}>
                  <h3 style={{ color: ttuRed, marginBottom: 12 }}>TTU Professors on RateMyProfessors</h3>
                  {instructorRatings.map((prof, idx) => (
                    <div key={idx} style={{ marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 16 }}>
                      <div style={{ fontWeight: 'bold', fontSize: 18, color: ttuRed }}>{prof.name} <span style={{ color: '#555', fontSize: 15 }}>({prof.department})</span></div>
                      <div style={{ color: '#555', marginTop: 4 }}>Quality: <span style={{ color: ttuRed, fontWeight: 'bold' }}>{prof.quality}</span> / 5</div>
                      <div style={{ color: '#555' }}>Ratings: {prof.ratings}</div>
                      <div style={{ color: '#555' }}>Would Take Again: {prof.wouldTakeAgain}</div>
                      <div style={{ color: '#555' }}>Difficulty: {prof.difficulty}</div>
                      <div style={{ marginTop: 8 }}>
                        <a href={prof.url} target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, textDecoration: 'underline', fontWeight: 'bold' }}>View on RateMyProfessors</a>
                      </div>
                    </div>
                  ))}
                  <div style={{ color: '#888', fontSize: 15, marginTop: 16 }}>
                    Other instructors are not listed or do not have TTU-specific ratings available.
                  </div>
                </div>
              </div>
            )}
            {tab === 8 && selectedStudent?.name === 'Vishwakaran Belaganti' && (
              <div>
                <h2 style={{ color: ttuRed, textAlign: 'center', marginBottom: 16 }}>Instructor Reviews</h2>
                <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', padding: 24, maxWidth: 600, margin: '0 auto' }}>
                  <h3 style={{ color: ttuRed, marginBottom: 12 }}>TTU Professors on RateMyProfessors</h3>
                  {vishwaInstructorRatings.map((prof, idx) => (
                    <div key={idx} style={{ marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 16 }}>
                      <div style={{ fontWeight: 'bold', fontSize: 18, color: ttuRed }}>{prof.name} <span style={{ color: '#555', fontSize: 15 }}>({prof.department})</span></div>
                      {prof.quality && <div style={{ color: '#555', marginTop: 4 }}>Quality: <span style={{ color: ttuRed, fontWeight: 'bold' }}>{prof.quality}</span> / 5</div>}
                      {prof.ratings && <div style={{ color: '#555' }}>Ratings: {prof.ratings}</div>}
                      {prof.wouldTakeAgain && <div style={{ color: '#555' }}>Would Take Again: {prof.wouldTakeAgain}</div>}
                      {prof.difficulty && <div style={{ color: '#555' }}>Difficulty: {prof.difficulty}</div>}
                      <div style={{ marginTop: 8 }}>
                        <a href={prof.url} target="_blank" rel="noopener noreferrer" style={{ color: ttuRed, textDecoration: 'underline', fontWeight: 'bold' }}>View on RateMyProfessors</a>
                      </div>
                    </div>
                  ))}
                  <div style={{ color: '#888', fontSize: 15, marginTop: 16 }}>
                    Other instructors are not listed or do not have TTU-specific ratings available.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Main content area: only dashboard header and student info */}
        <div style={{ flex: 1 }}>
          <h1 style={{ color: '#CC0000', textAlign: 'center', fontWeight: 'bold', marginBottom: 24, textShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
            Texas Tech Student Info Portal
          </h1>
          {/* R number input always at top if not selected */}
          {!selectedStudent && (
            <div style={{ background: 'rgba(255,255,255,0.85)', padding: 40, borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', marginBottom: 24 }}>
              <h2 style={{ color: '#CC0000', textAlign: 'center', marginBottom: 24 }}>Enter your Red Raider ID</h2>
              <input
                type="text"
                value={rNumber}
                onChange={e => setRNumber(e.target.value)}
                placeholder="e.g. R12345678"
                style={{ padding: '10px 16px', fontSize: 18, borderRadius: 6, border: '1px solid #CC0000', width: 220, marginBottom: 16 }}
              />
              <br />
              <button
                style={{ background: '#CC0000', color: 'white', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 18, fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => {
                  const input = rNumber.trim().toUpperCase();
                  const found = students.find(s =>
                    input === s.rNumber ||
                    input === 'R' + s.rNumber ||
                    input.replace(/^R/, '') === s.rNumber
                  );
                  if (found) setSelectedStudent(found);
                  else alert('Student not found. Please check your Red Raider ID.');
                }}
              >
                View Dashboard
              </button>
            </div>
          )}
          {/* Student-specific info only if selectedStudent exists */}
          {selectedStudent && (
            <>
              {/* Reminders banner */}
              {todaysClasses.length > 0 && (
                <div style={{ background: '#CC0000', color: 'white', borderRadius: 8, padding: '12px 20px', marginBottom: 20, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
                  Reminder: You have classes today!
                </div>
              )}
              {/* Today's Classes Section with calendar */}
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ color: '#CC0000', textAlign: 'center', marginBottom: 8 }}>Today's Classes</h2>
                {/* Mini calendar for today's date */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                  <div style={{ background: '#CC0000', color: 'white', borderRadius: 8, padding: '12px 24px', fontWeight: 'bold', fontSize: 22, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                {todaysClasses.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#555' }}>No classes scheduled for today.</p>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                    {/* Sort classes by start time and hyperlink locations */}
                    {(() => {
                      function getStartTime(time: string): number {
                        const match = time.match(/(\d{1,2}):(\d{2})/);
                        if (match) {
                          return parseInt(match[1]) * 60 + parseInt(match[2]);
                        }
                        const range = time.split('–')[0].trim();
                        const parts = range.match(/(\d{1,2}):(\d{2})/);
                        if (parts) {
                          return parseInt(parts[1]) * 60 + parseInt(parts[2]);
                        }
                        return 0;
                      }
                      const buildingLinks: { [key: string]: string } = {
                        'Civil Engineering 205': 'https://www.google.com/maps/place/Civil+Engineering+Building,+Texas+Tech+University/@33.5871,-101.8747,17z',
                        'Livermore Center 101': 'https://www.google.com/maps/place/Livermore+Center,+Texas+Tech+University/@33.5876,-101.8752,17z',
                        'Electrical Engineering 217': 'https://www.google.com/maps/place/Electrical+Engineering+Building,+Texas+Tech+University/@33.5873,-101.8749,17z',
                        'Holden Hall 75': 'https://www.google.com/maps/place/Holden+Hall,+Texas+Tech+University/@33.5847,-101.8752,17z',
                        'MCOM 80': 'https://www.google.com/maps/place/College+of+Media+%26+Communication,+Texas+Tech+University/@33.5842,-101.8742,17z',
                        'Stangel Murdough Hall': 'https://www.google.com/maps/place/Stangel+Murdough+Hall/@33.5841,-101.8792,17z',
                        'Rawls College of Business': 'https://www.google.com/maps/place/Rawls+College+of+Business/@33.5842,-101.8722,17z',
                        'Online (TDE, asynchronous)': '',
                        'Online': '',
                      };
                      return todaysClasses
                        .slice()
                        .sort((a, b) => getStartTime(a.time) - getStartTime(b.time))
                        .map((cls, idx) => {
                          let url = '';
                          Object.keys(buildingLinks).forEach(bldg => {
                            if (cls.location.includes(bldg)) url = buildingLinks[bldg];
                          });
                          return (
                            <div key={idx} style={{ background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 16, minWidth: 220 }}>
                              <h3 style={{ color: '#CC0000', marginBottom: 4 }}>{cls.student}</h3>
                              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{cls.code}: {cls.name}</div>
                              <div style={{ color: '#555', marginBottom: 2 }}>
                                Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </div>
                              <div style={{ color: '#555', marginBottom: 2 }}>Time: {cls.time}</div>
                              <div style={{ color: '#555', marginBottom: 2 }}>
                                Location: {url ? (
                                  <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#CC0000', textDecoration: 'underline' }}>{cls.location}</a>
                                ) : cls.location}
                              </div>
                              <div style={{ color: '#555', marginBottom: 2 }}>Instructor: {cls.instructor}</div>
                            </div>
                          );
                        });
                    })()}
                  </div>
                )}
              </div>
              {/* Student details section */}
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ color: '#CC0000', textAlign: 'center', marginBottom: 8 }}>Student Details</h2>
                <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: 24, minWidth: 250, margin: '0 auto', maxWidth: 500 }}>
                  <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>{selectedStudent.name}</div>
                  <div style={{ marginBottom: 4 }}>R Number: {selectedStudent.rNumber}</div>
                  <div style={{ marginBottom: 4 }}>Term: {selectedStudent.term}</div>
                  <div style={{ marginBottom: 4 }}>Total Credits: {selectedStudent.totalCredits}</div>
                  {/* Export Schedule Button */}
                  <div style={{ marginBottom: 16 }}>
                    <button
                      style={{ background: '#CC0000', color: 'white', border: 'none', borderRadius: 6, padding: '8px 20px', fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        // Generate .ics calendar file for all classes
                        function makeICS(classes: any[], studentName: string) {
                          let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TTU Student Info//EN\n';
                          classes.forEach(cls => {
                            // Parse start/end time
                            const timeMatch = cls.time.match(/(\d{1,2}):(\d{2})\s*([AP]M)/);
                            if (!timeMatch) return;
                            let hour = parseInt(timeMatch[1]);
                            const minute = parseInt(timeMatch[2]);
                            const ampm = timeMatch[3];
                            if (ampm === 'PM' && hour < 12) hour += 12;
                            // Use today's date for demo
                            const now = new Date();
                            const year = now.getFullYear();
                            const month = String(now.getMonth() + 1).padStart(2, '0');
                            const day = String(now.getDate()).padStart(2, '0');
                            const dtStart = `${year}${month}${day}T${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}00`;
                            // End time: try to parse from time range
                            let dtEnd = dtStart;
                            const rangeMatch = cls.time.match(/–\s*(\d{1,2}):(\d{2})\s*([AP]M)/);
                            if (rangeMatch) {
                              let endHour = parseInt(rangeMatch[1]);
                              const endMinute = parseInt(rangeMatch[2]);
                              const endAMPM = rangeMatch[3];
                              if (endAMPM === 'PM' && endHour < 12) endHour += 12;
                              dtEnd = `${year}${month}${day}T${String(endHour).padStart(2, '0')}${String(endMinute).padStart(2, '0')}00`;
                            }
                            ics += `BEGIN:VEVENT\nSUMMARY:${cls.code} - ${cls.name}\nDESCRIPTION:Instructor: ${cls.instructor}\nLOCATION:${cls.location}\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nEND:VEVENT\n`;
                          });
                          ics += 'END:VCALENDAR';
                          return ics;
                        }
                        const icsContent = makeICS(selectedStudent.classes, selectedStudent.name);
                        const blob = new Blob([icsContent.replace(/\n/g, '\r\n')], { type: 'text/calendar' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${selectedStudent.name.replace(/\s+/g, '_')}_Class_Schedule.ics`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                    >
                      Export Class Schedule
                    </button>
                  </div>
                  {/* Full course list with building and classroom info, location as Google Maps link */}
                  <div style={{ marginBottom: 12 }}>
                    <span style={{ fontWeight: 'bold' }}>Courses:</span>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {selectedStudent.classes.map((cls, i) => {
                        // Map building names to Google Maps URLs
                        const buildingLinks: { [key: string]: string } = {
                          'Civil Engineering 205': 'https://www.google.com/maps/place/Civil+Engineering+Building,+Texas+Tech+University/@33.5871,-101.8747,17z',
                          'Livermore Center 101': 'https://www.google.com/maps/place/Livermore+Center,+Texas+Tech+University/@33.5876,-101.8752,17z',
                          'Electrical Engineering 217': 'https://www.google.com/maps/place/Electrical+Engineering+Building,+Texas+Tech+University/@33.5873,-101.8749,17z',
                          'Holden Hall 75': 'https://www.google.com/maps/place/Holden+Hall,+Texas+Tech+University/@33.5847,-101.8752,17z',
                          'MCOM 80': 'https://www.google.com/maps/place/College+of+Media+%26+Communication,+Texas+Tech+University/@33.5842,-101.8742,17z',
                          'Stangel Murdough Hall': 'https://www.google.com/maps/place/Stangel+Murdough+Hall/@33.5841,-101.8792,17z',
                          'Rawls College of Business': 'https://www.google.com/maps/place/Rawls+College+of+Business/@33.5842,-101.8722,17z',
                          'Online (TDE, asynchronous)': '',
                          'Online': '',
                        };
                        // Find the building name in the location string
                        const loc = cls.location;
                        let url = '';
                        Object.keys(buildingLinks).forEach(bldg => {
                          if (loc.includes(bldg)) url = buildingLinks[bldg];
                        });
                        return (
                          <li key={i} style={{ marginBottom: 8 }}>
                            <span style={{ color: '#CC0000', fontWeight: 'bold' }}>{cls.code}</span>: {cls.name}<br />
                            <span style={{ color: '#555' }}>
                              Location: {url ? (
                                <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#CC0000', textDecoration: 'underline' }}>{cls.location}</a>
                              ) : cls.location}
                            </span><br />
                            <span style={{ color: '#555' }}>Time: {cls.time}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontWeight: 'bold' }}>Advisors:</span>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {selectedStudent.advisors.map((a, i) => (
                        <li key={i}>{a.name} ({a.role})</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontWeight: 'bold' }}>Instructors:</span>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {selectedStudent.instructors.map((ins, i) => (
                        <li key={i}>{ins.name} ({ins.course})</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Academic progress data for graph
interface AcademicProgressEntry {
  sem: string;
  year: string;
  gpa: number | null;
}
interface AcademicProgressData {
  [studentName: string]: AcademicProgressEntry[];
}
const academicProgressData: AcademicProgressData = {
  'Sai Abhinav Pattoor': [
    { sem: 'Fall 2023', year: '1st Year', gpa: 3.8 },
    { sem: 'Spring 2024', year: '1st Year', gpa: 4.0 },
    { sem: 'Fall 2024', year: '2nd Year', gpa: 4.0 },
    { sem: 'Spring 2025', year: '2nd Year', gpa: 3.8 },
    { sem: 'Fall 2025', year: '3rd Year', gpa: null },
  ],
  'Vishwakaran Belaganti': [
    { sem: 'Fall 2023', year: '1st Year', gpa: 3.7 },
    { sem: 'Spring 2024', year: '1st Year', gpa: 3.9 },
    { sem: 'Fall 2024', year: '2nd Year', gpa: 3.95 },
    { sem: 'Spring 2025', year: '2nd Year', gpa: 3.85 },
    { sem: 'Fall 2025', year: '3rd Year', gpa: null },
  ],
};

const instructorRatings = [
  {
    name: 'Uma Maheswari Chinta',
    department: 'Computer Science',
    quality: 4.0,
    ratings: 23,
    wouldTakeAgain: '79%',
    difficulty: 3.6,
    url: 'https://www.ratemyprofessors.com/professor/2977355',
  },
  {
    name: 'Maaz Amjad',
    department: 'Computer Science',
    quality: 4.5,
    ratings: 13,
    wouldTakeAgain: '85%',
    difficulty: 2.3,
    url: 'https://www.ratemyprofessors.com/professor/3049953',
  },
  {
    name: 'Mustafa Alam',
    department: 'Computer Science',
    quality: 1.7,
    ratings: 52,
    wouldTakeAgain: '14%',
    difficulty: 3.3,
    url: 'https://www.ratemyprofessors.com/professor/2825621',
  },
  {
    name: 'Haleigh Larkin',
    department: 'Sociology',
    quality: 4.9,
    ratings: 28,
    wouldTakeAgain: '97%',
    difficulty: 1.6,
    url: 'https://www.ratemyprofessors.com/professor/2609507',
  },
];

const vishwaInstructorRatings = [
  {
    name: 'Uma Maheswari Chinta',
    department: 'Computer Science',
    quality: 4.0,
    ratings: 23,
    wouldTakeAgain: '79%',
    difficulty: 3.6,
    url: 'https://www.ratemyprofessors.com/professor/2977355',
  },
  {
    name: 'Catherine Langford',
    department: 'Communication Studies',
    quality: null,
    ratings: null,
    wouldTakeAgain: null,
    difficulty: null,
    url: 'https://www.ratemyprofessors.com/professor/1276314',
  },
];

export default Home;