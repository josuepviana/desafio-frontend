import React, { useEffect, useState } from "react";
import './Resultado.css';

export async function getSimulacoes() {
    const data = await fetch("http://localhost:3000/simulacoes/");
    return await data.json();
  }

  

function Resultado({simulacao}) {

    function parseMonetary(value) {
        // adiciona a formatação monetaria de Real
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      }
    
      // Se não houver simulação carregada mostrar uma div vazia
    if (!simulacao) {
        return <div></div>;
    }
  return (
    <div className="Resultado">
        <header>
            <h2>Resultado da Simulação</h2>
        </header>
        <div>
            <div className="Resultado-conteudo">
                <div className="Resultado-container">
                    <h3>Valor final bruto</h3>
                    <p>{parseMonetary(simulacao.valorFinalBruto)}</p>
                </div>

                <div className="Resultado-container">
                    <h3>Aliquota do IR</h3>
                    <p>{simulacao?.aliquotaIR || "0"}%</p>
                </div>

                <div className="Resultado-container ">
                    <h3>Valor pago em IR</h3>
                    <p>{parseMonetary(simulacao.valorPagoIR)}</p>
                </div>

                <div className="Resultado-container verde">
                    <h3>Valor Final Liquido</h3>
                    <p>{parseMonetary(simulacao.valorTotalInvestido)}</p>
                </div>

                <div className="Resultado-container">
                    <h3>Valor Total Investido</h3>
                    <p>{parseMonetary(simulacao.valorFinalLiquido)}</p>
                </div>

                <div className="Resultado-container verde">
                    <h3>Ganho Liquido</h3>
                    <p>{parseMonetary(simulacao.ganhoLiquido)}</p>
                </div>
            </div> 
        </div>
    </div>
  );
}

export default Resultado;