
import { Student, Shift } from './types';

export const INSTITUTIONAL_BLUE = '#3b5998';

export const SHIFT_GRADES: Record<string, string[]> = {
  [Shift.MORNING]: ['5º A', '6º A', '6º B', '7º A', '7º B', '7º C', '8º A', '8º B', '8º C', '9º A', '9º B', '9º C'],
  [Shift.INTEGRAL]: ['1º A', '1º B', '1º C', '2º A', '2º B', '2º C', '3º A', '3º B'],
  [Shift.AFTERNOON]: ['4º A', '4º B', '5º B', '5º C']
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'ANA BEATRIZ SILVA COSTA',
    registrationNumber: 'RA001',
    rga: 'RGA987654',
    shift: Shift.MORNING,
    grade: '5º A',
    photoUrl: 'https://picsum.photos/seed/student1/300/400',
    filiacao1: 'ADRIANA MARIA REGIS DA SILVA',
    filiacao2: 'MANOEL DA COSTA',
    telefone1: '(11) 98888-7777',
    telefone2: '(11) 94444-5555',
    telefone3: '',
    birthDate: '2012-10-23',
    studentStatus: 'Ativo'
  },
  {
    id: '2',
    name: 'BERNARDO CASTRO DE SOUZA',
    registrationNumber: 'RA002',
    rga: 'RGA987655',
    shift: Shift.INTEGRAL,
    grade: '1º A',
    photoUrl: 'https://picsum.photos/seed/student2/300/400',
    filiacao1: 'JOÃO DE SOUZA',
    filiacao2: 'MARIA DE CASTRO',
    telefone1: '(11) 97777-6666',
    telefone2: '',
    telefone3: '',
    birthDate: '2012-05-12',
    studentStatus: 'Ativo'
  },
  {
    id: '3',
    name: 'BRYAN ADRIANO MESSIAS',
    registrationNumber: 'RA003',
    rga: 'RGA987656',
    shift: Shift.AFTERNOON,
    grade: '4º A',
    photoUrl: 'https://picsum.photos/seed/student3/300/400',
    filiacao1: 'MARIA MESSIAS',
    filiacao2: 'ROBERTO ADRIANO',
    telefone1: '(11) 96666-5555',
    telefone2: '(11) 91111-2222',
    telefone3: '(11) 93333-4444',
    birthDate: '2012-08-30',
    studentStatus: 'Ativo'
  }
];
