import { CourseData } from './types';

export const coursesData: Record<'bacharelado' | 'licenciatura', CourseData> = {
  bacharelado: {
    id: 'bacharelado',
    name: 'Ciências Sociais (Bacharelado)',
    codigo: '1265863',
    turno: 'Noturno',
    duracao: '4 anos',
    vagas: {
      vestibular: { ampla: 5, negros: 2, indigenas: 1, res_ms: 1, pcd: 1, total: 10 },
      sisu: { ampla: 6, negros: 2, indigenas: 1, res_ms: 0, pcd: 1, total: 10 },
      totalGeral: 20
    },
    students: {
      ingressantes: 17,
      matriculados: 35,
      concluintes: 1,
      series: [20, 3, 6, 0, 6, 0],
      ingresso: { vestibular: 0, sisu: 11, pss: 9, outros: 0 }
    },
    enadeHistory: [
      { year: 2021, conceito: 1 }
    ],
    enade: {
      enade: { nota: 0.788, conceito: 1, mediaNacional: 2.680 },
      idd: { nota: 2.978, conceito: 4, mediaNacional: 2.970 },
      cpc: { nota: 2.604, conceito: 3, mediaNacional: 3.520 }
    }
  },
  licenciatura: {
    id: 'licenciatura',
    name: 'Ciências Sociais (Licenciatura)',
    codigo: '123588',
    turno: 'Noturno',
    duracao: '4 anos',
    vagas: {
      vestibular: { ampla: 8, negros: 3, indigenas: 2, res_ms: 2, pcd: 1, total: 16 },
      sisu: { ampla: 9, negros: 3, indigenas: 1, res_ms: 0, pcd: 1, total: 14 },
      totalGeral: 30
    },
    students: {
      ingressantes: 26,
      matriculados: 85,
      concluintes: 8,
      series: [29, 17, 20, 19, 0, 0],
      ingresso: { vestibular: 0, sisu: 21, pss: 8, outros: 0 }
    },
    enadeHistory: [
      { year: 2014, conceito: 3 },
      { year: 2017, conceito: 5 },
      { year: 2021, conceito: 3 },
      { year: 2025, conceito: 4 }
    ],
    enade: {
      enade: { nota: 2.598, conceito: 3, mediaNacional: 2.680 },
      idd: { nota: 3.101, conceito: 4, mediaNacional: 2.970 },
      cpc: { nota: 2.991, conceito: 4, mediaNacional: 3.520 }
    }
  }
};
