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

export interface CpcDetails {
  ano: number;
  concluintesInscritos: number;
  concluintesParticipantes: number;
  notaBrutaFG: number;
  notaPadronizadaFG: number;
  notaBrutaCE: number;
  notaPadronizadaCE: number;
  conceitoEnadeContinuo: number;
  concluintesParticipantesNotaEnem: number;
  proporcaoConcluintesNotaEnem: number;
  notaBrutaIDD: number;
  notaPadronizadaIDD: number;
  notaBrutaOrganizacao: number;
  notaPadronizadaOrganizacao: number;
  notaBrutaInfraestrutura: number;
  notaPadronizadaInfraestrutura: number;
  notaBrutaOportunidade: number;
  notaPadronizadaOportunidade: number;
  notaBrutaMestres: number;
  notaPadronizadaMestres: number;
  notaBrutaDoutores: number;
  notaPadronizadaDoutores: number;
  notaBrutaRegimeTrabalho: number;
  notaPadronizadaRegimeTrabalho: number;
  cpcContinuo: number;
  cpcFaixa: number;
}

export interface CourseData {
  id: CourseLevel;
  name: string;
  codigo: string;
  turno: string;
  duracao: string;
  vagas: Vagas;
  students: StudentStats;
  history: { year: number; students: StudentStats }[];
  enadeHistory: EnadeHistory[];
  enade: {
    enade: SinaesScore;
    idd: SinaesScore;
    cpc: SinaesScore;
  };
  cpcDetails?: CpcDetails;
}
