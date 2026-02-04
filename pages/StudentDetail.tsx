
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Student, Occurrence, AuthUser } from '../types';
import { Edit2, Phone, User, ChevronRight, CreditCard, Plus, ShieldAlert } from 'lucide-react';

interface StudentDetailProps {
  students: Student[];
  occurrences: Occurrence[];
  user: AuthUser;
  onToggleRole: () => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ students, occurrences, user, onToggleRole }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const student = students.find(s => s.id === id);
  const studentOccurrences = occurrences
    .filter(o => o.studentId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!student) return <div>Aluno não encontrado</div>;

  const isAdmin = user.role === 'Admin';

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdmin) {
      navigate(`/edit-student/${student.id}`);
    }
  };

  const headerTitle = (
    <div className="flex flex-col items-center leading-tight">
      <span className="text-xl sm:text-3xl font-black tracking-tighter uppercase">PERFIL DO ALUNO</span>
    </div>
  );

  return (
    <Layout
      title={headerTitle}
      user={user}
      onToggleRole={onToggleRole}
      leftAction={null}
      rightAction={
        isAdmin ? (
          <button
            onClick={handleEdit}
            className="w-10 h-10 flex items-center justify-center bg-white text-[#3b5998] rounded-full hover:bg-gray-100 transition-colors shadow-sm active:scale-90"
            title="Editar Aluno"
          >
            <Edit2 size={18} />
          </button>
        ) : null
      }
    >
      <div className="max-w-6xl mx-auto p-4 sm:p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex flex-col items-center lg:w-1/3 space-y-8">
            <div className="w-full max-w-[320px] lg:max-w-none">
              <div className="aspect-[3/4] bg-gray-50 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Caixa de Registro Acadêmico com largura sincronizada com a foto */}
            <div className="w-full max-w-[320px] lg:max-w-none bg-blue-50/50 p-6 rounded-3xl border-2 border-blue-50 flex flex-col items-center justify-center text-center">
              <div className="flex flex-row items-center justify-center gap-2 mb-4">
                <CreditCard className="text-[#3b5998]" size={16} />
                <span className="text-[#3b5998] text-[9px] font-black uppercase tracking-widest">REGISTRO ACADÊMICO</span>
              </div>
              <div className="space-y-3">
                <p className="font-black text-xl text-[#3b5998] tracking-tight leading-none uppercase">RA: {student.registrationNumber}</p>
                <p className="font-black text-lg text-[#3b5998]/60 tracking-tight uppercase leading-none">RGA: {student.rga}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="border-b-4 border-gray-50 pb-8 flex flex-col items-center text-center">
              <div className="w-full">
                <span className="text-[#3b5998] text-xs font-black uppercase block mb-3 tracking-widest">NOME COMPLETO</span>
                <h3 className="text-gray-900 font-black text-3xl sm:text-4xl leading-tight uppercase tracking-tight">{student.name}</h3>
              </div>
              {!isAdmin && (
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-400 mt-4">
                  <ShieldAlert size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Apenas Admin</span>
                </div>
              )}
            </div>

            <div className="flex flex-row justify-center gap-3 sm:gap-4">
              <div className="flex-1 max-w-[160px] p-4 bg-white rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="text-[#3b5998] text-[10px] font-black uppercase block mb-1 tracking-widest">TURMA</span>
                <p className="font-black text-gray-800 text-lg sm:text-xl">{student.grade}</p>
              </div>
              <div className="flex-1 max-w-[160px] p-4 bg-white rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="text-[#3b5998] text-[10px] font-black uppercase block mb-1 tracking-widest">PERÍODO</span>
                <p className="font-black text-gray-800 text-lg sm:text-xl uppercase">{student.shift}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border-2 border-gray-50 p-8 space-y-8">
              {/* Seção Filiação */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#3b5998] shrink-0 mt-1">
                  <User size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">Filiação</p>
                  <div className="space-y-3">
                    <p className="text-lg font-bold text-gray-800 truncate">{student.filiacao1 || 'Não informada'}</p>
                    {student.filiacao2 && (
                      <p className="text-lg font-bold text-gray-800 truncate">{student.filiacao2}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Seção Telefone */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#3b5998] shrink-0 mt-1">
                  <Phone size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">Telefone</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                    <p className="text-base font-bold text-gray-800">{student.telefone1 || '-'}</p>
                    {student.telefone2 && (
                      <p className="text-base font-bold text-gray-800">{student.telefone2}</p>
                    )}
                    {student.telefone3 && (
                      <p className="text-base font-bold text-gray-800">{student.telefone3}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div className="flex flex-col items-center gap-4 mb-8 text-center">
                <h4 className="text-[#3b5998] font-black uppercase text-sm tracking-widest">Histórico de Ocorrências</h4>
                <button
                  onClick={() => navigate(`/add-occurrence/${student.id}`)}
                  className="w-full sm:w-auto bg-[#3b5998] text-white text-[11px] font-black px-12 py-3 rounded-full uppercase shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                >
                  + Novo Registro
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentOccurrences.length > 0 ? (
                  studentOccurrences.map(occ => (
                    <div
                      key={occ.id}
                      className="bg-white p-5 rounded-2xl border-2 border-gray-50 hover:border-blue-100 shadow-sm flex justify-between items-center group cursor-pointer transition-all"
                      onClick={() => navigate(`/occurrence/${occ.id}`)}
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-2 h-2 rounded-full ${occ.category === 'Comportamental' ? 'bg-red-500' : 'bg-blue-500'}`} />
                          <p className="font-black text-gray-800 text-sm uppercase tracking-tighter truncate">{occ.title}</p>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          {new Date(occ.date).toLocaleDateString()}
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-[#3b5998] transition-colors" />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                    <p className="text-gray-400 text-[10px] font-black uppercase">Nenhum registro encontrado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDetail;
