export type CourseLevel = 'bacharelado' | 'licenciatura';

export interface VagasDetails {
  ampla: number;
  negros: number;
  indigenas: number;
  res_ms?: number;
  pcd: number;
  total: number;
}

export interface Vagas {
  vestibular: VagasDetails;
  sisu: VagasDetails;
  totalGeral: number;
}

export interface StudentStats {
  ingressantes: number;
  matriculados: number;
  concluintes: number;
  series: number[];
  ingresso: {
    vestibular: number;
    sisu: number;
    pss: number;
    outros: number;
  };
}

export interface SinaesScore {
  nota: number;
  conceito: number;
  mediaNacional: number;
}

export interface EnadeHistory {
  year: number;
  conceito: number;
}

export interface CourseData {
  id: CourseLevel;
  name: string;
  codigo: string;
  turno: string;
  duracao: string;
  vagas: Vagas;
  students: StudentStats;
  enadeHistory: EnadeHistory[];
  enade: {
    enade: SinaesScore;
    idd: SinaesScore;
    cpc: SinaesScore;
  };
}
