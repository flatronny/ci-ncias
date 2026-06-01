import React from 'react';
import { CourseData } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';

interface Props {
  course: CourseData;
}

export function PrintableReport({ course }: Props) {
  const dataEmissao = new Date().toLocaleDateString('pt-BR');

  const seriesData = course.students.series.map((val, idx) => ({
    name: `${idx + 1}ª Série`,
    Matriculados: val
  }));

  const historyChartData = course.history.map((item, index) => {
    let evasao = 0;
    let evasaoPctNum = 0;
    if (index > 0) {
      const prev = course.history[index - 1].students;
      evasao = Math.max(0, (prev.matriculados - prev.concluintes) + item.students.ingressantes - item.students.matriculados);
      evasaoPctNum = prev.matriculados > 0 ? Math.round((evasao / prev.matriculados) * 100) : 0;
    }
    return {
      year: item.year,
      Ingressantes: item.students.ingressantes,
      Matriculados: item.students.matriculados,
      Concluintes: item.students.concluintes,
      Evasão: index > 0 ? evasao : "-",
      EvasãoPct: index > 0 ? `${evasaoPctNum}%` : "",
    };
  });

  const getConceitoLabel = (conceito: number) => {
    switch(conceito) {
      case 1: return '1 - Não atende';
      case 2: return '2 - Insuficiente';
      case 3: return '3 - Suficiente';
      case 4: return '4 - Bom';
      case 5: return '5 - Muito bom';
      default: return '-';
    }
  };

  const getTextColor = (conceito: number) => {
    if (conceito >= 4) return 'text-green-700';
    if (conceito === 3) return 'text-yellow-600';
    if (conceito === 2) return 'text-orange-600';
    if (conceito === 1) return 'text-red-600';
    return '';
  };

  const renderSinaesRow = (label: string, data: any) => {
    const isAbove = data.nota > data.mediaNacional;
    const diff = Math.abs(data.nota - data.mediaNacional);
    return (
      <tr className="border-b border-gray-200 even:bg-gray-50">
        <td className="p-3 font-semibold text-gray-800">{label}</td>
        <td className="p-3 text-center font-mono text-gray-700">{data.nota.toFixed(3).replace('.', ',')}</td>
        <td className={`p-3 font-semibold ${getTextColor(data.conceito)}`}>
          {getConceitoLabel(data.conceito)}
        </td>
        <td className="p-3 text-center text-gray-700">{data.mediaNacional.toFixed(3).replace('.', ',')}</td>
        <td className="p-3 text-right">
          <span className={`font-medium ${isAbove ? 'text-blue-600' : 'text-red-600'}`}>
            {isAbove ? 'Acima da Média ' : 'Abaixo da Média '}
            ({isAbove ? '↑' : '↓'} {diff.toFixed(2).replace('.', ',')})
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white text-gray-800 max-w-[21cm] mx-auto min-h-[29.7cm] shadow-xl my-8 print:shadow-none print:my-0 print:max-w-full font-sans print:border-none border border-gray-200 print:block">
      
      {/* ======================================= */}
      {/*                PÁGINA 1                 */}
      {/* ======================================= */}
      <div className="pagina-relatorio p-8 print:p-[1cm] border-t-8 border-t-[#003366] print:border-t-[8px] print:border-[#003366] print:border-x-0 print:border-b-0 bg-white">
        
        {/* Cabeçalho */}
      <div className="text-center mb-8 border-b-2 border-[#003366] pb-6">
        <div className="mb-4 flex justify-center">
          <img src="https://www.uems.br/anexos/imagens/conteudo/uems_imagens_2025-06-13_13-31-53.png" alt="Logo UEMS" className="h-20 mx-auto" />
        </div>
        <h1 className="text-[#003366] text-xl font-bold uppercase tracking-tight">Divisão de Gestão do ENADE e Indicadores da Educação Superior</h1>
        <h2 className="text-lg font-semibold uppercase mt-1 text-gray-700">Relatório de Monitoramento de Curso - SINAES</h2>
        <p className="text-sm text-gray-500 mt-2 font-medium">Data de Emissão: {dataEmissao}</p>
      </div>

      {/* 1. Identificação */}
      <section className="mb-8 p-1">
        <h3 className="text-sm font-bold border-b-2 border-slate-300 text-[#003366] pb-1 mb-4 uppercase tracking-wide flex items-center gap-2">
          <span className="bg-[#003366] text-white w-5 h-5 flex items-center justify-center rounded-sm text-xs">1</span> 
          Identificação do Curso
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-sm bg-slate-50 p-5 rounded-lg border border-slate-200 shadow-sm print:shadow-none">
          <div className="border-b border-gray-200 pb-2"><p className="text-xs text-gray-500 uppercase font-semibold mb-0.5">Curso</p><strong className="text-gray-900 text-[15px]">{course.name}</strong></div>
          <div className="border-b border-gray-200 pb-2"><p className="text-xs text-gray-500 uppercase font-semibold mb-0.5">Unidade Acadêmica</p><strong className="text-gray-900 text-[15px]">Paranaíba</strong></div>
          <div className="border-b border-gray-200 pb-2"><p className="text-xs text-gray-500 uppercase font-semibold mb-0.5">Código INEP</p><strong className="text-gray-900">{course.codigo}</strong></div>
          <div><p className="text-xs text-gray-500 uppercase font-semibold mb-0.5">Turno</p><strong className="text-gray-900">{course.turno}</strong></div>
          <div><p className="text-xs text-gray-500 uppercase font-semibold mb-0.5">Duração</p><strong className="text-gray-900">{course.duracao}</strong></div>
          <div><p className="text-xs text-gray-500 uppercase font-semibold mb-0.5">Situação</p><strong className="text-green-700 bg-green-50 px-2 py-0.5 rounded-sm border border-green-200 shadow-sm">Em Atividade</strong></div>
        </div>
      </section>

      {/* 2. Resultados Consolidados SINAES */}
      <section className="mb-8 p-1">
        <h3 className="text-sm font-bold border-b-2 border-slate-300 text-[#003366] pb-1 mb-4 uppercase tracking-wide flex items-center gap-2">
          <span className="bg-[#003366] text-white w-5 h-5 flex items-center justify-center rounded-sm text-xs">2</span> 
          Resultados SINAES (Ciclo 2021-2023)
        </h3>
        <div className="overflow-hidden rounded-lg border border-[#003366] avoid-break">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#003366] text-white">
                <th className="p-3 border-b border-[#002244] font-semibold">Indicador</th>
                <th className="p-3 text-center border-b border-[#002244] font-semibold">Nota Contínua</th>
                <th className="p-3 border-b border-[#002244] font-semibold">Conceito Final</th>
                <th className="p-3 text-center border-b border-[#002244] font-semibold">Média Nacional</th>
                <th className="p-3 border-b border-[#002244] text-right font-semibold">Situação vs. Nacional</th>
              </tr>
            </thead>
            <tbody>
              {renderSinaesRow('ENADE', course.enade.enade)}
              {renderSinaesRow('IDD', course.enade.idd)}
              {renderSinaesRow('CPC', course.enade.cpc)}
            </tbody>
          </table>
        </div>
        {course.id === 'licenciatura' && (
          <p className="text-[10px] text-gray-600 mt-2 italic leading-relaxed">
            * Nota: Os conceitos das licenciaturas tiveram alterações, porém as notas demonstradas no Resultado SINAES e Detalhamento do CPC seguem as diretrizes do ciclo passado ainda. O curso já possui o Conceito ENADE relativo a 2025 divulgado (vide Histórico). As demais notas (IDD, CPC) deste ciclo ainda não estão publicadas. Os resultados acima refletem o ciclo consolidado mais recente (2021-2023).
          </p>
        )}
      </section>

      {/* 2.1 Detalhamento do CPC */}
      {course.cpcDetails && (
        <section className="mb-8 p-1">
          <h3 className="text-sm font-bold border-b-2 border-slate-300 text-[#003366] pb-1 mb-4 uppercase tracking-wide flex items-center gap-2">
            <span className="bg-[#003366] text-white p-1 px-2 flex items-center justify-center rounded-sm text-xs">2.1</span> 
            Detalhamento do CPC ({course.cpcDetails.ano})
          </h3>
          <div className="overflow-hidden rounded-lg border border-gray-300 avoid-break">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-gray-100 font-semibold text-gray-700">
                  <th className="p-2 border-b border-r border-gray-300">Indicador</th>
                  <th className="p-2 border-b border-r border-gray-300 text-center">Nota Bruta</th>
                  <th className="p-2 border-b border-gray-300 text-center">Nota Padronizada</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200">Formação Geral (FG)</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">{course.cpcDetails.notaBrutaFG.toFixed(3).replace('.', ',')}</td>
                  <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaFG.toFixed(3).replace('.', ',')}</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-2 border-r border-gray-200">Componente Específico (CE)</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">{course.cpcDetails.notaBrutaCE.toFixed(3).replace('.', ',')}</td>
                  <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaCE.toFixed(3).replace('.', ',')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200">Conceito ENADE (Contínuo)</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono bg-blue-50" colSpan={2}>{course.cpcDetails.conceitoEnadeContinuo.toFixed(3).replace('.', ',')}</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-2 border-r border-gray-200">IDD</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">{course.cpcDetails.notaBrutaIDD.toFixed(3).replace('.', ',')}</td>
                  <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaIDD.toFixed(3).replace('.', ',')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200">Mestres</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">{course.cpcDetails.notaBrutaMestres.toFixed(3).replace('.', ',')}</td>
                  <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaMestres.toFixed(3).replace('.', ',')}</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-2 border-r border-gray-200">Doutores</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">{course.cpcDetails.notaBrutaDoutores.toFixed(3).replace('.', ',')}</td>
                  <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaDoutores.toFixed(3).replace('.', ',')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200">Regime de Trabalho</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">{course.cpcDetails.notaBrutaRegimeTrabalho.toFixed(3).replace('.', ',')}</td>
                  <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaRegimeTrabalho.toFixed(3).replace('.', ',')}</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-2 border-r border-gray-200">Organização Didático-Pedagógica</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">{course.cpcDetails.notaBrutaOrganizacao.toFixed(3).replace('.', ',')}</td>
                  <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaOrganizacao.toFixed(3).replace('.', ',')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200">Infraestrutura e Instalações Físicas</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">{course.cpcDetails.notaBrutaInfraestrutura.toFixed(3).replace('.', ',')}</td>
                  <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaInfraestrutura.toFixed(3).replace('.', ',')}</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-2 border-r border-gray-200">Oportunidade de Ampliação da Formação</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">{course.cpcDetails.notaBrutaOportunidade.toFixed(3).replace('.', ',')}</td>
                  <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaOportunidade.toFixed(3).replace('.', ',')}</td>
                </tr>
                <tr className="border-b border-[#003366] bg-[#e6f0fa]">
                  <td className="p-2 border-r border-gray-300 font-bold text-[#003366]">CPC (Contínuo)</td>
                  <td className="p-2 text-center font-bold font-mono text-[#003366]" colSpan={2}>{course.cpcDetails.cpcContinuo.toFixed(3).replace('.', ',')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-2">
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-center">
               <p className="text-[10px] uppercase text-slate-500 font-semibold">Concluintes Inscritos</p>
               <p className="text-lg font-bold text-slate-800">{course.cpcDetails.concluintesInscritos}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-center">
               <p className="text-[10px] uppercase text-slate-500 font-semibold">Concluintes Participantes</p>
               <p className="text-lg font-bold text-slate-800">{course.cpcDetails.concluintesParticipantes}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-center">
               <p className="text-[10px] uppercase text-slate-500 font-semibold">Participantes c/ Nota ENEM</p>
               <p className="text-lg font-bold text-slate-800">{course.cpcDetails.concluintesParticipantesNotaEnem}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-center">
               <p className="text-[10px] uppercase text-slate-500 font-semibold">Proporção ENADE/ENEM</p>
               <p className="text-lg font-bold text-slate-800">{(course.cpcDetails.proporcaoConcluintesNotaEnem * 100).toFixed(0)}%</p>
            </div>
          </div>
        </section>
      )}
      </div> {/* FIM PÁGINA 1 */}

      {/* ======================================= */}
      {/*                PÁGINA 2                 */}
      {/* ======================================= */}
      <div className="pagina-relatorio p-8 print:p-[1cm] bg-white">
      {/* 3. Vagas e Ocupação */}
      <section className="mb-8 p-1">
        <h3 className="text-sm font-bold border-b-2 border-slate-300 text-[#003366] pb-1 mb-4 uppercase tracking-wide flex items-center gap-2">
          <span className="bg-[#003366] text-white w-5 h-5 flex items-center justify-center rounded-sm text-xs">3</span> 
          Distribuição de Vagas (Referência: 2025)
        </h3>
        <div className="overflow-hidden rounded-lg border border-gray-300 avoid-break">
          <table className="w-full text-center text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 font-semibold text-gray-700">
                <th className="p-2 border-b border-r border-gray-300 align-middle" rowSpan={2}>Processo Seletivo</th>
                <th className="p-2 border-b border-gray-300 text-center" colSpan={5}>Cotas / Ações Afirmativas</th>
                <th className="p-2 border-b border-l border-gray-300 align-middle" rowSpan={2}>Vagas Totais</th>
              </tr>
              <tr className="bg-gray-50 text-xs text-gray-600">
                <th className="p-1 border-b border-r border-gray-300 font-medium">Ampla Concorrência</th>
                <th className="p-1 border-b border-r border-gray-300 font-medium">Negros</th>
                <th className="p-1 border-b border-r border-gray-300 font-medium">Indígenas</th>
                <th className="p-1 border-b border-r border-gray-300 font-medium">Res. MS</th>
                <th className="p-1 border-b border-gray-300 font-medium">PCD</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-200">
                <td className="p-2 font-semibold border-r border-gray-300 bg-gray-50">Vestibular</td>
                <td className="p-2 border-r border-gray-200">{course.vagas.vestibular.ampla}</td>
                <td className="p-2 border-r border-gray-200">{course.vagas.vestibular.negros}</td>
                <td className="p-2 border-r border-gray-200">{course.vagas.vestibular.indigenas}</td>
                <td className="p-2 border-r border-gray-200">{course.vagas.vestibular.res_ms}</td>
                <td className="p-2 border-r border-gray-300">{course.vagas.vestibular.pcd}</td>
                <td className="p-2 font-bold text-gray-900 bg-gray-50 border-l border-gray-300">{course.vagas.vestibular.total}</td>
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-2 font-semibold border-r border-gray-300 bg-gray-100">SISU</td>
                <td className="p-2 border-r border-gray-200">{course.vagas.sisu.ampla}</td>
                <td className="p-2 border-r border-gray-200">{course.vagas.sisu.negros}</td>
                <td className="p-2 border-r border-gray-200">{course.vagas.sisu.indigenas}</td>
                <td className="p-2 border-r border-gray-200">{course.vagas.sisu.res_ms}</td>
                <td className="p-2 border-r border-gray-300">{course.vagas.sisu.pcd}</td>
                <td className="p-2 font-bold text-gray-900 bg-gray-100 border-l border-gray-300">{course.vagas.sisu.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Situação Acadêmica */}
      <section className="mb-8 p-1">
        <h3 className="text-sm font-bold border-b-2 border-slate-300 text-[#003366] pb-1 mb-4 uppercase tracking-wide flex items-center gap-2">
          <span className="bg-[#003366] text-white w-5 h-5 flex items-center justify-center rounded-sm text-xs">4</span> 
          Situação Acadêmica (Referência: 2025 - Núcleo Ciências Humanas)
        </h3>
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="border border-blue-200 rounded-lg overflow-hidden shadow-sm print:shadow-none">
            <div className="bg-[#003366] text-white text-center py-1.5 border-b border-blue-200">
              <p className="text-xs font-semibold uppercase tracking-wider">Ingressantes</p>
            </div>
            <div className="p-3 text-center bg-[#f0f5fa]">
              <p className="text-3xl font-bold text-[#003366]">{course.students.ingressantes}</p>
            </div>
          </div>
          <div className="border border-emerald-200 rounded-lg overflow-hidden shadow-sm print:shadow-none">
            <div className="bg-emerald-700 text-white text-center py-1.5 border-b border-emerald-200">
              <p className="text-xs font-semibold uppercase tracking-wider">Matriculados ativos</p>
            </div>
            <div className="p-3 text-center bg-[#f0fdf6]">
              <p className="text-3xl font-bold text-emerald-800">{course.students.matriculados}</p>
            </div>
          </div>
          <div className="border border-amber-200 rounded-lg overflow-hidden shadow-sm print:shadow-none">
            <div className="bg-amber-600 text-white text-center py-1.5 border-b border-amber-200">
               <p className="text-xs font-semibold uppercase tracking-wider">Concluintes</p>
            </div>
            <div className="p-3 text-center bg-[#fffbef]">
              <p className="text-3xl font-bold text-amber-800">{course.students.concluintes}</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-300 avoid-break">
          <table className="w-full text-center text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-800 font-semibold">
                <th className="p-2 border-b border-gray-300" colSpan={6}>Distribuição de Matriculados por Série</th>
              </tr>
              <tr className="bg-gray-50 text-xs text-gray-600">
                {[1, 2, 3, 4, 5, 6].map(s => (
                  <th key={s} className="p-2 border-b border-r last:border-r-0 border-gray-300 font-medium">{s}ª Série</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800">
                {[0, 1, 2, 3, 4, 5].map(idx => (
                  <td key={idx} className="p-3 border-r last:border-r-0 border-gray-200 font-semibold text-lg">
                    {course.students.series[idx] || 0}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="h-[250px] w-full mt-4 bg-white border border-gray-200 rounded-lg p-2 avoid-break">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={seriesData} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} />
              <Bar dataKey="Matriculados" fill="#a1a1aa" stroke="#18181b" strokeWidth={1} isAnimationActive={false} radius={[4, 4, 0, 0]} maxBarSize={40}>
                <LabelList dataKey="Matriculados" position="top" style={{ fontSize: '10px', fill: '#171717' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      </div> {/* FIM PÁGINA 2 */}

      {/* ======================================= */}
      {/*                PÁGINA 3                 */}
      {/* ======================================= */}
      <div className="pagina-relatorio p-8 print:p-[1cm] bg-white">
      {/* 5. Histórico do Curso */}
      <section className="mb-8 p-1">
        <h3 className="text-sm font-bold border-b-2 border-slate-300 text-[#003366] pb-1 mb-4 uppercase tracking-wide flex items-center gap-2">
          <span className="bg-[#003366] text-white w-5 h-5 flex items-center justify-center rounded-sm text-xs">5</span> 
          Histórico do Curso
        </h3>
        <div className="overflow-hidden rounded-lg border border-gray-300 avoid-break">
           <table className="w-full text-center text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-800 font-semibold">
                <th className="p-2 border-b border-r border-gray-300">Ano</th>
                <th className="p-2 border-b border-r border-gray-300">Ingressantes</th>
                <th className="p-2 border-b border-r border-gray-300">Matriculados</th>
                <th className="p-2 border-b border-r border-gray-300">Concluintes</th>
                <th className="p-2 border-b border-gray-300">Evasão</th>
              </tr>
            </thead>
            <tbody>
               {historyChartData.map(item => (
                 <tr key={item.year} className="border-b border-gray-200 text-gray-700 hover:bg-gray-50 last:border-0 hover:print:bg-transparent">
                   <td className="p-2 border-r border-gray-200 font-semibold bg-gray-50">{item.year}</td>
                   <td className="p-2 border-r border-gray-200">{item.Ingressantes}</td>
                   <td className="p-2 border-r border-gray-200">{item.Matriculados}</td>
                   <td className="p-2 border-r border-gray-200">{item.Concluintes}</td>
                   <td className="p-2">{item.Evasão} {item.EvasãoPct ? `(${item.EvasãoPct})` : ""}</td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
        
        <div className="h-[320px] w-full mt-4 bg-white border border-gray-200 rounded-lg p-2 avoid-break">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historyChartData} margin={{ top: 35, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} />
              <Legend wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
              <Bar dataKey="Ingressantes" fill="#e4e4e7" stroke="#18181b" strokeWidth={1} isAnimationActive={false} radius={[2, 2, 0, 0]} maxBarSize={40}>
                <LabelList dataKey="Ingressantes" position="top" style={{ fontSize: '9px', fill: '#171717' }} />
              </Bar>
              <Bar dataKey="Matriculados" fill="#a1a1aa" stroke="#18181b" strokeWidth={1} isAnimationActive={false} radius={[2, 2, 0, 0]} maxBarSize={40}>
                <LabelList dataKey="Matriculados" position="top" style={{ fontSize: '9px', fill: '#171717' }} />
              </Bar>
              <Bar dataKey="Concluintes" fill="#52525b" stroke="#18181b" strokeWidth={1} isAnimationActive={false} radius={[2, 2, 0, 0]} maxBarSize={40}>
                <LabelList dataKey="Concluintes" position="top" style={{ fontSize: '9px', fill: '#171717' }} />
              </Bar>
              <Bar dataKey="Evasão" fill="#09090b" stroke="#18181b" strokeWidth={1} isAnimationActive={false} radius={[2, 2, 0, 0]} maxBarSize={40}>
                <LabelList dataKey="EvasãoPct" position="top" style={{ fontSize: '9px', fill: '#171717' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 6. Histórico ENADE */}
      <section className="mb-8 p-1">
        <h3 className="text-sm font-bold border-b-2 border-slate-300 text-[#003366] pb-1 mb-4 uppercase tracking-wide flex items-center gap-2">
          <span className="bg-[#003366] text-white w-5 h-5 flex items-center justify-center rounded-sm text-xs">6</span> 
          Evolução do Conceito ENADE
        </h3>
        
        {course.enadeHistory.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-300 w-full max-w-md mx-auto avoid-break">
            <table className="w-full text-center text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-800 font-semibold">
                  {course.enadeHistory.map(h => (
                    <th key={h.year} className="p-2 border-b border-r last:border-r-0 border-gray-300 font-medium">{h.year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-800 bg-white">
                  {course.enadeHistory.map(h => (
                    <td key={h.year} className={`p-3 border-r last:border-r-0 border-gray-200 font-bold text-lg ${getTextColor(h.conceito)}`}>
                      {h.conceito}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 italic text-sm text-gray-500 border border-gray-200 rounded-md">
            Nenhum histórico de conceito ENADE disponível para o curso avaliado.
          </div>
        )}
      </section>

      {/* 7. Legenda e Metodologia */}
      <section className="mt-10 pt-6 border-t-[3px] border-[#003366] shadow-sm print:shadow-none bg-slate-50 p-5 rounded-b-lg border-x border-b border-gray-200 avoid-break">
        <h3 className="text-xs font-bold mb-3 uppercase tracking-wide text-[#003366] flex items-center gap-2">
          <span className="bg-[#003366] text-white w-4 h-4 flex items-center justify-center rounded-sm text-[10px]">ℹ</span> 
          Documentação de Apoio Metodológico
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs text-slate-700">
          <div>
            <ul className="space-y-3">
              <li><strong className="text-gray-800 text-[13px]">ENADE:</strong> Avalia o rendimento dos concluintes em relação aos conteúdos previstos nas diretrizes do curso.</li>
              <li><strong className="text-gray-800 text-[13px]">IDD:</strong> Indicador de Diferença entre Desempenhos. Mede o "valor agregado" acadêmico, cruzando a nota do ENEM (entrada) com o ENADE (saída).</li>
              <li><strong className="text-gray-800 text-[13px]">CPC:</strong> Conceito Preliminar de Curso. Composto por 35% IDD, 30% Corpo Docente, 20% ENADE e 15% Questionário do Estudante.</li>
            </ul>
          </div>
          <div>
             <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-gray-700">
                        <th className="p-1.5 border-b border-gray-200 text-left font-semibold">Conceito Oficial (INEP)</th>
                        <th className="p-1.5 border-b border-gray-200 text-right font-semibold">Faixa Contínua</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="p-1.5 border-b border-gray-200 text-red-600 font-medium">1 - Não atende</td><td className="p-1.5 border-b border-gray-200 text-right">0 a 0,944</td></tr>
                    <tr><td className="p-1.5 border-b border-gray-200 text-orange-500 font-medium">2 - Insuficiente</td><td className="p-1.5 border-b border-gray-200 text-right">0,945 a 1,944</td></tr>
                    <tr className="bg-green-50"><td className="p-1.5 border-b border-gray-200 text-green-700 font-semibold">3 - Suficiente</td><td className="p-1.5 border-b border-gray-200 text-right font-medium">1,945 a 2,944</td></tr>
                    <tr><td className="p-1.5 border-b border-gray-200 text-green-600 font-medium">4 - Bom</td><td className="p-1.5 border-b border-gray-200 text-right">2,945 a 3,944</td></tr>
                    <tr><td className="p-1.5 text-green-800 font-medium">5 - Muito bom</td><td className="p-1.5 text-right">3,945 a 5,000</td></tr>
                </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="mt-8 text-center text-[10px] text-gray-400 italic">
        Documento gerado automaticamente pelo sistema de Indicadores de Ensino (SINAES/UEMS) para fins institucionais e tomada de decisão.
      </footer>
      </div> {/* FIM PÁGINA 3 */}
    </div>
  );
}
