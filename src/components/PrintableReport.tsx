import React from 'react';
import { CourseData } from '../types';

interface Props {
  course: CourseData;
}

export function PrintableReport({ course }: Props) {
  const dataEmissao = new Date().toLocaleDateString('pt-BR');

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
    <div className="bg-white text-gray-800 p-8 max-w-[21cm] mx-auto min-h-[29.7cm] shadow-xl my-8 print:shadow-none print:my-0 print:p-[1cm] print:max-w-full font-sans border border-gray-200 print:border-none">
      
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <div className="mb-4 flex justify-center">
          <img src="https://www.uems.br/anexos/imagens/conteudo/uems_imagens_2025-06-13_13-31-53.png" alt="Logo UEMS" className="h-20 mx-auto" />
        </div>
        <h1 className="text-[#003366] text-xl font-bold uppercase tracking-tight">Divisão de Gestão do ENADE e Indicadores da Educação Superior</h1>
        <h2 className="text-lg font-semibold uppercase mt-1">Relatório de Monitoramento de Curso - SINAES</h2>
        <p className="text-sm text-gray-500 mt-2">Data de Emissão: {dataEmissao}</p>
      </div>

      {/* 1. Identificação */}
      <section className="mb-8">
        <h3 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide text-gray-800">1. Identificação do Curso</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p><strong>Curso:</strong> {course.name}</p>
          <p><strong>Unidade Acadêmica:</strong> Paranaíba</p>
          <p><strong>Código INEP:</strong> {course.codigo}</p>
          <p><strong>Turno:</strong> {course.turno}</p>
          <p><strong>Duração:</strong> {course.duracao}</p>
          <p><strong>Situação:</strong> Em Atividade</p>
        </div>
      </section>

      {/* 2. Resultados Consolidados SINAES */}
      <section className="mb-8">
        <h3 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide text-gray-800">2. Resultados SINAES (Último Ciclo)</h3>
        <div className="overflow-hidden rounded-lg border border-[#003366]">
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
      </section>

      {/* 3. Vagas e Ocupação */}
      <section className="mb-8">
        <h3 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide text-gray-800">3. Distribuição de Vagas</h3>
        <div className="overflow-hidden rounded-lg border border-gray-300">
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
      <section className="mb-8">
        <h3 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide text-gray-800">4. Situação Acadêmica (Núcleo Ciências Humanas)</h3>
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="border border-blue-100 p-4 rounded-lg text-center bg-[#f4f9ff]">
            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-1">Ingressantes</p>
            <p className="text-3xl font-bold text-blue-900">{course.students.ingressantes}</p>
          </div>
          <div className="border border-emerald-100 p-4 rounded-lg text-center bg-[#f4fdf8]">
            <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wider mb-1">Matriculados ativos</p>
            <p className="text-3xl font-bold text-emerald-900">{course.students.matriculados}</p>
          </div>
          <div className="border border-amber-100 p-4 rounded-lg text-center bg-[#fffaee]">
            <p className="text-sm text-amber-600 font-semibold uppercase tracking-wider mb-1">Concluintes</p>
            <p className="text-3xl font-bold text-amber-900">{course.students.concluintes}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-300">
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
      </section>

      {/* 5. Histórico ENADE */}
      <section className="mb-8 break-inside-avoid">
        <h3 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wide text-gray-800">5. Evolução do Conceito ENADE</h3>
        
        {course.enadeHistory.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-300 w-full max-w-md">
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

      {/* 6. Legenda e Metodologia */}
      <section className="mt-10 pt-6 border-t-2 border-gray-100 break-inside-avoid">
        <h3 className="text-xs font-bold mb-3 uppercase tracking-wide text-gray-500">Documentação de Apoio Metodológico</h3>
        <div className="grid grid-cols-2 gap-8 text-xs text-gray-600">
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
    </div>
  );
}
