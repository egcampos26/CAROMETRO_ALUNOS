
export enum Shift {
  MORNING = 'Manhã',
  AFTERNOON = 'Tarde',
  INTEGRAL = 'Integral',
  ALL = 'Todos'
}

export interface Occurrence {
  id: string;
  studentId: string;
  groupId?: string; // ID compartilhado por registros feitos via OccurrenceAddMulti
  date: string;
  title: string;
  description: string;
  category: 'Comportamental' | 'Acadêmica' | 'Médica' | 'Outros';
  registeredBy: string;
}

export interface Student {
  id: string;
  name: string;
  registrationNumber: string; // RA
  rga: string; // Novo campo RGA
  shift: Shift;
  grade: string; // Ex: 6º A
  photoUrl: string;
  filiacao1: string; // Anteriormente guardianName
  filiacao2: string; // Novo campo Filiação 2
  telefone1: string; // Anteriormente guardianPhone
  telefone2: string; // Novo campo Telefone 2
  telefone3: string; // Novo campo Telefone 3
  birthDate: string;
  studentStatus: 'Ativo' | 'Inativo' | 'Transferido';
  // Mantendo para compatibilidade caso existam referências
  guardianName?: string;
  guardianPhone?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  role: 'Admin' | 'Teacher';
  email: string;
}
