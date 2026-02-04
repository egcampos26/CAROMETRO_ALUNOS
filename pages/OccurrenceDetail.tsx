
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Student, Occurrence, AuthUser } from '../types';
import { User, Clock, ChevronRight, Users, Trash2, AlertCircle } from 'lucide-react';

interface OccurrenceDetailProps {
  students: Student[];
  occurrences: Occurrence[];
  user: AuthUser;
  onDelete: (id: string) => void;
}

const OccurrenceDetail: React.FC<OccurrenceDetailProps> = ({ students, occurrences, user, onDelete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const occurrence = occurrences.find(o => o.id === id);
  const student = occurrence ? students.find(s => s.id === occurrence.studentId) : null;

  // Encontra outros alunos se for uma ocorrência coletiva
  const involvedStudents = occurrence?.groupId
    ? occurrences
      .filter(o => o.groupId === occurrence.groupId)
      .map(o => students.find(s => s.id === o.studentId))
      .filter((s): s is Student => !!s)
    : [];

  involvedStudents.sort((a, b) => a.name.localeCompare(b.name));

  if (!occurrence || !student) {
    return (
      <Layout title="ERRO">
        <div className="p-8 text-center">
          <p className="text-gray-500">Ocorrência não encontrada.</p>
        </div>
      </Layout>
    );
  }

  // Permissão: Admin ou o próprio autor do registro
  const canDelete = user.role === 'Admin' || occurrence.registeredBy === user.name;

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este registro permanentemente?')) {
      onDelete(occurrence.id);
      navigate(-1);
    }
  };

  const headerTitle = (
    <div className="flex flex-col items-center leading-none">
      <span className="text-lg sm:text-xl font-black tracking-tighter uppercase mb-0.5">DETALHE</span>
      <span className="text-[9px] sm:text-[10px] font-bold opacity-70 tracking-widest uppercase">OCORRÊNCIA</span>
    </div>
  );

  return (
    <Layout title={headerTitle}>
      <div className="p-6 space-y-6 max-w-4xl mx-auto pb-20">
        <div
          onClick={() => navigate(`/student/${student.id}`)}
          className="flex items-center gap-4 p-4 bg-[#3b5998]/5 rounded-xl border border-[#3b5998]/10 active:bg-[#3b5998]/10 transition-colors cursor-pointer"
        >
          <div className="w-16 h-16 shrink-0 bg-white rounded-lg overflow-hidden border-2 border-white shadow-sm">
            <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#3b5998] truncate uppercase text-sm leading-tight">{student.name}</h3>
            <p className="text-xs text-gray-500 font-bold uppercase">{student.grade} • {student.shift}</p>
          </div>
          <ChevronRight className="text-[#3b5998]" size={20} />
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className={`h-3 w-full ${occurrence.category === 'Comportamental' ? 'bg-red-500' :
            occurrence.category === 'Acadêmica' ? 'bg-blue-500' : 'bg-orange-500'
            }`} />

          <div className="p-6 sm:p-8 space-y-8">
            <div className="flex justify-between items-center border-b border-gray-50 pb-6">
              <span className={`text-[10px] font-black text-white px-4 py-1.5 rounded-full uppercase shadow-sm ${occurrence.category === 'Comportamental' ? 'bg-red-500' :
                occurrence.category === 'Acadêmica' ? 'bg-blue-500' : 'bg-orange-500'
                }`}>
                {occurrence.category}
              </span>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                <Clock size={14} className="text-[#3b5998]" />
                {new Date(occurrence.date).toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight uppercase tracking-tight">
                {occurrence.title}
              </h2>

              <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 min-h-[120px]">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {occurrence.description}
                </p>
              </div>
            </div>

            {involvedStudents.length > 1 && (
              <div className="pt-6 border-t border-gray-50">
                <h4 className="text-[#3b5998] text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Users size={14} /> Alunos Envolvidos ({involvedStudents.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {involvedStudents.map(s => (
                    <button
                      key={s.id}
                      onClick={() => navigate(`/student/${s.id}`)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all active:scale-95 ${s.id === student.id
                        ? 'bg-[#3b5998] border-[#3b5998] text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#3b5998] hover:text-[#3b5998]'
                        }`}
                    >
                      <img src={s.photoUrl} className="w-6 h-6 rounded-full object-cover" alt="" />
                      <span className="text-[10px] font-black uppercase whitespace-nowrap">{s.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-50 gap-6">
              <div className="flex items-center gap-4 self-start sm:self-auto">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#3b5998] border border-blue-100 shadow-sm">
                  <User size={22} />
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-black uppercase leading-none mb-1 tracking-widest">Registrado por</p>
                  <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{occurrence.registeredBy}</p>
                </div>
              </div>

              {canDelete && (
                <button
                  onClick={handleDelete}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-red-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg hover:bg-red-600 active:scale-95 transition-all border-b-4 border-red-700"
                >
                  <Trash2 size={16} />
                  Excluir Registro
                </button>
              )}
            </div>

            {!canDelete && (
              <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-400">
                <AlertCircle size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Apenas Administradores ou Autor podem excluir</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OccurrenceDetail;
