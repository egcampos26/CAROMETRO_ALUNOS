
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Student, AuthUser } from '../types';
import { Camera, Image as ImageIcon, UserCircle2, X, ShieldAlert } from 'lucide-react';

interface StudentEditProps {
  students: Student[];
  onUpdate: (student: Student) => void;
  user: AuthUser;
}

const StudentEdit: React.FC<StudentEditProps> = ({ students, onUpdate, user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const student = students.find(s => s.id === id);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Student | null>(student ? { ...student } : null);
  const [showSourceModal, setShowSourceModal] = useState(false);

  useEffect(() => {
    if (user.role !== 'Admin') {
      const timer = setTimeout(() => {
        navigate(`/student/${id}`, { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user.role, navigate, id]);

  if (user.role !== 'Admin') {
    return (
      <Layout
        title="ACESSO NEGADO"
        user={user}
      >
        <div className="flex flex-col items-center justify-center h-[70vh] p-8 text-center space-y-4">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert size={48} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 uppercase">Restrito a Administradores</h2>
          <p className="text-gray-500 max-w-xs mx-auto font-medium">Você não tem permissão para editar perfis de alunos. Redirecionando...</p>
          <button
            onClick={() => navigate(`/student/${id}`)}
            className="mt-4 text-[#3b5998] font-black uppercase tracking-widest text-xs underline"
          >
            Voltar agora
          </button>
        </div>
      </Layout>
    );
  }

  if (!formData) return <div>Aluno não encontrado</div>;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    navigate(`/student/${formData.id}`, { replace: true });
  };

  const handleCancel = () => {
    navigate(`/student/${formData.id}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoUrl: reader.result as string });
        setShowSourceModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const headerTitle = (
    <div className="flex flex-col items-center leading-tight">
      <span className="text-xl sm:text-3xl font-black tracking-tighter uppercase">EDITOR DE PERFIL</span>
    </div>
  );

  return (
    <Layout
      title={headerTitle}
      user={user}
      showHome={false}
      showBack={false}
      rightAction={null}
    >
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 pb-24">
        <form onSubmit={handleSave} className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">

          <div className="flex flex-col items-center lg:w-1/3">
            <div
              onClick={() => setShowSourceModal(true)}
              className="relative w-56 aspect-[3/4] bg-gray-100 border-4 border-white rounded-3xl mx-auto flex flex-col items-center justify-center cursor-pointer overflow-hidden shadow-xl active:scale-95 transition-all"
            >
              {formData.photoUrl ? (
                <>
                  <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col items-center justify-end pb-6">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full mb-2">
                      <Camera className="text-white" size={24} />
                    </div>
                    <span className="text-white text-[10px] font-black uppercase tracking-widest shadow-sm">Tirar ou escolher foto</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-300">
                  <UserCircle2 size={64} className="mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Adicionar Foto</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-[#3b5998] text-[10px] font-black uppercase block tracking-widest ml-1">Nome Completo</label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#3b5998] text-[10px] font-black uppercase block tracking-widest ml-1">RA</label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#3b5998] text-[10px] font-black uppercase block tracking-widest ml-1">RGA</label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all"
                  value={formData.rga}
                  onChange={(e) => setFormData({ ...formData, rga: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#3b5998] text-[10px] font-black uppercase block tracking-widest ml-1">Turma</label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#3b5998] text-[10px] font-black uppercase block tracking-widest ml-1">Nascimento</label>
                <input
                  type="date"
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
              </div>

              {/* Seção Filiação na Edição */}
              <div className="col-span-1 md:col-span-2 space-y-4 pt-4">
                <div className="h-px bg-gray-100 w-full" />
                <span className="text-[#3b5998] text-[10px] font-black uppercase tracking-widest block">Filiação</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Filiação 1"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all"
                    value={formData.filiacao1}
                    onChange={(e) => setFormData({ ...formData, filiacao1: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Filiação 2"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all"
                    value={formData.filiacao2}
                    onChange={(e) => setFormData({ ...formData, filiacao2: e.target.value })}
                  />
                </div>
              </div>

              {/* Seção Telefone na Edição */}
              <div className="col-span-1 md:col-span-2 space-y-4 pt-4">
                <div className="h-px bg-gray-100 w-full" />
                <span className="text-[#3b5998] text-[10px] font-black uppercase tracking-widest block">Telefones</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Telefone 1"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all"
                    value={formData.telefone1}
                    onChange={(e) => setFormData({ ...formData, telefone1: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Telefone 2"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all"
                    value={formData.telefone2}
                    onChange={(e) => setFormData({ ...formData, telefone2: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Telefone 3"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all"
                    value={formData.telefone3}
                    onChange={(e) => setFormData({ ...formData, telefone3: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-[#3b5998] text-[10px] font-black uppercase block tracking-widest ml-1">Status Matrícula</label>
                <select
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#3b5998] rounded-2xl text-gray-800 font-bold outline-none transition-all appearance-none"
                  value={formData.studentStatus}
                  onChange={(e) => setFormData({ ...formData, studentStatus: e.target.value as any })}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                  <option value="Transferido">Transferido</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row gap-3 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase hover:bg-gray-200 active:scale-95 transition-all text-sm tracking-widest"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-[2] bg-[#3b5998] text-white py-4 rounded-2xl font-black uppercase shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-sm tracking-widest border-b-4 border-blue-900"
              >
                Salvar Perfil
              </button>
            </div>
          </div>
        </form>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg" className="hidden" />
      <input type="file" ref={cameraInputRef} onChange={handleFileChange} accept="image/*" capture="environment" className="hidden" />

      {showSourceModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm bg-white rounded-t-[40px] sm:rounded-[40px] p-8 space-y-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-[#3b5998] uppercase tracking-widest text-sm">Alterar Foto</h3>
              <button onClick={() => setShowSourceModal(false)} className="text-gray-300 hover:text-gray-500">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-8 bg-blue-50 rounded-[32px] border-2 border-blue-100 active:bg-blue-100 active:scale-95 transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-active:shadow-inner">
                  <Camera size={32} className="text-[#3b5998]" />
                </div>
                <span className="text-[10px] font-black text-[#3b5998] uppercase tracking-widest">Câmera</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-[32px] border-2 border-gray-100 active:bg-gray-100 active:scale-95 transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-active:shadow-inner">
                  <ImageIcon size={32} className="text-gray-400" />
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Galeria</span>
              </button>
            </div>

            <button onClick={() => setShowSourceModal(false)} className="w-full py-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-gray-600 transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StudentEdit;
