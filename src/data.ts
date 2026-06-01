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
      ingressantes: 10,
      matriculados: 31,
      concluintes: 2,
      series: [16, 10, 1, 4, 0, 0],
      ingresso: { vestibular: 0, sisu: 6, pss: 4, outros: 0 }
    },
    history: [
      { year: 2018, students: { ingressantes: 17, matriculados: 35, concluintes: 1, series: [20, 3, 6, 0, 6, 0], ingresso: { vestibular: 0, sisu: 11, pss: 9, outros: 0 } } },
      { year: 2019, students: { ingressantes: 18, matriculados: 32, concluintes: 2, series: [21, 5, 1, 4, 1, 0], ingresso: { vestibular: 0, sisu: 6, pss: 12, outros: 1 } } },
      { year: 2020, students: { ingressantes: 20, matriculados: 37, concluintes: 8, series: [20, 11, 2, 4, 0, 0], ingresso: { vestibular: 0, sisu: 16, pss: 3, outros: 1 } } },
      { year: 2021, students: { ingressantes: 8, matriculados: 32, concluintes: 2, series: [12, 13, 2, 5, 0, 0], ingresso: { vestibular: 0, sisu: 0, pss: 6, outros: 4 } } },
      { year: 2022, students: { ingressantes: 15, matriculados: 38, concluintes: 2, series: [14, 11, 6, 7, 0, 0], ingresso: { vestibular: 2, sisu: 2, pss: 10, outros: 2 } } },
      { year: 2023, students: { ingressantes: 17, matriculados: 34, concluintes: 3, series: [17, 6, 3, 8, 0, 0], ingresso: { vestibular: 0, sisu: 2, pss: 12, outros: 3 } } },
      { year: 2024, students: { ingressantes: 22, matriculados: 42, concluintes: 1, series: [25, 6, 3, 8, 0, 0], ingresso: { vestibular: 0, sisu: 4, pss: 18, outros: 0 } } },
      { year: 2025, students: { ingressantes: 10, matriculados: 31, concluintes: 2, series: [16, 10, 1, 4, 0, 0], ingresso: { vestibular: 0, sisu: 6, pss: 4, outros: 0 } } }
    ],
    enadeHistory: [
      { year: 2021, conceito: 1 }
    ],
    enade: {
      enade: { nota: 0.788, conceito: 1, mediaNacional: 2.680 },
      idd: { nota: 2.978, conceito: 4, mediaNacional: 2.970 },
      cpc: { nota: 2.604, conceito: 3, mediaNacional: 3.520 }
    },
    cpcDetails: {
      ano: 2021,
      concluintesInscritos: 5,
      concluintesParticipantes: 2,
      notaBrutaFG: 15.450,
      notaPadronizadaFG: 0.000,
      notaBrutaCE: 32.050,
      notaPadronizadaCE: 1.051,
      conceitoEnadeContinuo: 0.788,
      concluintesParticipantesNotaEnem: 2,
      proporcaoConcluintesNotaEnem: 1.000,
      notaBrutaIDD: 0.106,
      notaPadronizadaIDD: 2.978,
      notaBrutaOrganizacao: 5.189,
      notaPadronizadaOrganizacao: 2.637,
      notaBrutaInfraestrutura: 4.601,
      notaPadronizadaInfraestrutura: 2.113,
      notaBrutaOportunidade: 5.134,
      notaPadronizadaOportunidade: 3.835,
      notaBrutaMestres: 1.000,
      notaPadronizadaMestres: 5.000,
      notaBrutaDoutores: 0.937,
      notaPadronizadaDoutores: 4.200,
      notaBrutaRegimeTrabalho: 0.687,
      notaPadronizadaRegimeTrabalho: 0.000,
      cpcContinuo: 2.604,
      cpcFaixa: 3
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
      ingressantes: 24,
      matriculados: 54,
      concluintes: 6,
      series: [28, 8, 10, 8, 0, 0],
      ingresso: { vestibular: 0, sisu: 10, pss: 14, outros: 0 }
    },
    history: [
      { year: 2018, students: { ingressantes: 26, matriculados: 85, concluintes: 8, series: [29, 17, 20, 19, 0, 0], ingresso: { vestibular: 0, sisu: 21, pss: 8, outros: 0 } } },
      { year: 2019, students: { ingressantes: 28, matriculados: 78, concluintes: 13, series: [32, 10, 12, 24, 0, 0], ingresso: { vestibular: 0, sisu: 20, pss: 11, outros: 0 } } },
      { year: 2020, students: { ingressantes: 28, matriculados: 69, concluintes: 0, series: [30, 15, 6, 18, 0, 0], ingresso: { vestibular: 0, sisu: 17, pss: 11, outros: 0 } } },
      { year: 2021, students: { ingressantes: 17, matriculados: 64, concluintes: 10, series: [32, 11, 9, 12, 0, 0], ingresso: { vestibular: 3, sisu: 0, pss: 19, outros: 0 } } },
      { year: 2022, students: { ingressantes: 25, matriculados: 53, concluintes: 5, series: [30, 6, 8, 9, 0, 0], ingresso: { vestibular: 1, sisu: 6, pss: 17, outros: 1 } } },
      { year: 2023, students: { ingressantes: 29, matriculados: 59, concluintes: 3, series: [34, 11, 8, 6, 0, 0], ingresso: { vestibular: 0, sisu: 6, pss: 23, outros: 0 } } },
      { year: 2024, students: { ingressantes: 21, matriculados: 56, concluintes: 4, series: [25, 16, 7, 8, 0, 0], ingresso: { vestibular: 0, sisu: 5, pss: 16, outros: 0 } } },
      { year: 2025, students: { ingressantes: 24, matriculados: 54, concluintes: 6, series: [28, 8, 10, 8, 0, 0], ingresso: { vestibular: 0, sisu: 10, pss: 14, outros: 0 } } }
    ],
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
    },
    cpcDetails: {
      ano: 2021,
      concluintesInscritos: 8,
      concluintesParticipantes: 7,
      notaBrutaFG: 37.928,
      notaPadronizadaFG: 2.057,
      notaBrutaCE: 47.371,
      notaPadronizadaCE: 2.779,
      conceitoEnadeContinuo: 2.598,
      concluintesParticipantesNotaEnem: 7,
      proporcaoConcluintesNotaEnem: 1.000,
      notaBrutaIDD: 2.706,
      notaPadronizadaIDD: 3.101,
      notaBrutaOrganizacao: 5.264,
      notaPadronizadaOrganizacao: 2.762,
      notaBrutaInfraestrutura: 4.352,
      notaPadronizadaInfraestrutura: 2.019,
      notaBrutaOportunidade: 4.057,
      notaPadronizadaOportunidade: 1.707,
      notaBrutaMestres: 0.952,
      notaPadronizadaMestres: 4.047,
      notaBrutaDoutores: 0.904,
      notaPadronizadaDoutores: 4.404,
      notaBrutaRegimeTrabalho: 0.714,
      notaPadronizadaRegimeTrabalho: 0.952,
      cpcContinuo: 2.991,
      cpcFaixa: 4
    }
  }
};
