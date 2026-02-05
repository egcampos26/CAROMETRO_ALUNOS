
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShiftSelection from './pages/ShiftSelection';
import ClassSelection from './pages/ClassSelection';
import CarometroGallery from './pages/CarometroGallery';
import StudentDetail from './pages/StudentDetail';
import StudentEdit from './pages/StudentEdit';
import OccurrencesList from './pages/OccurrencesList';
import OccurrenceAdd from './pages/OccurrenceAdd';
import OccurrenceAddMulti from './pages/OccurrenceAddMulti';
import OccurrenceDetail from './pages/OccurrenceDetail';
import { Student, Occurrence, AuthUser } from './types';
import { MOCK_STUDENTS } from './constants';

const TEST_USERS: AuthUser[] = [
  { id: 'admin-1', name: 'Diretora Silvia', role: 'Admin', email: 'silvia@escola.com' },
  { id: 'teacher-1', name: 'Prof. Eduardo', role: 'Teacher', email: 'eduardo@escola.com' },
  { id: 'teacher-2', name: 'Profa. Márcia', role: 'Teacher', email: 'marcia@escola.com' },
];

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('carometro_students');
    return saved ? JSON.parse(saved) : MOCK_STUDENTS;
  });

  const [occurrences, setOccurrences] = useState<Occurrence[]>(() => {
    const saved = localStorage.getItem('carometro_occurrences');
    return saved ? JSON.parse(saved) : [];
  });

  // Mantendo o estado apenas para o usuário atual padrão (Admin para visualização total)
  const [currentUserIndex] = useState(0);
  const user = TEST_USERS[currentUserIndex];

  useEffect(() => {
    localStorage.setItem('carometro_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('carometro_occurrences', JSON.stringify(occurrences));
  }, [occurrences]);

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const addOccurrence = (occurrence: Occurrence) => {
    setOccurrences(prev => [...prev, occurrence]);
  };

  const deleteOccurrence = (id: string) => {
    setOccurrences(prev => prev.filter(occ => occ.id !== id));
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col w-full overflow-x-hidden">
        <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto bg-white shadow-sm md:my-4 md:rounded-xl overflow-hidden relative">
          <Routes>
            <Route path="/" element={<ShiftSelection user={user} />} />
            <Route path="/classes/:shift" element={<ClassSelection user={user} />} />
            <Route path="/carometro/:shift/:grade" element={<CarometroGallery students={students} user={user} />} />
            <Route path="/student/:id" element={<StudentDetail students={students} occurrences={occurrences} user={user} />} />
            <Route path="/edit-student/:id" element={<StudentEdit students={students} onUpdate={updateStudent} user={user} />} />
            <Route path="/occurrences" element={<OccurrencesList students={students} occurrences={occurrences} user={user} />} />
            <Route path="/occurrence/:id" element={<OccurrenceDetail students={students} occurrences={occurrences} user={user} onDelete={deleteOccurrence} />} />
            <Route path="/add-occurrence/:studentId" element={<OccurrenceAdd students={students} onAdd={addOccurrence} user={user} />} />
            <Route path="/add-multi-occurrence" element={<OccurrenceAddMulti students={students} onAdd={addOccurrence} user={user} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
