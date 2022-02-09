import React, { useEffect, useState } from "react";
import Resultado from "../resultado/Resultado";
import "./Simulador.css";

//Fetch para acessar os Indicadores
export async function getIndicadores() {
  const data = await fetch("http://localhost:3000/indicadores/");
  return await data.json();
}

//Fetch para acessar os resultados de Simulações
export async function getSimulacoes() {
  const data = await fetch("http://localhost:3000/simulacoes/");
  return await data.json();
}

//Função para adicionar '%' no fim do input e retirando tudo que não digito
function parseWithPercent(text) {
  const value = Number(text.replaceAll(/\D/g, '')) || 0;
  return value + "%";
}

//Função para formatação monetaria
function parseMonetary(text) {
  //limpa a formatção do input 
  const value = Number(text.replaceAll(/[a-zA-Z$\\.s]/g, '').replace(',', '.'));
  // adiciona a formatação monetaria de Real
  return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function Simulador() {

  //States para os valores de CDI e IPCA dos Indicadores
  const [cdi, setCDI] = useState(null);
  const [ipca, setIPCA] = useState(null);

  //State para carregar os resultados da simulação
  const [indicadorSelecionado, setIndicadorSelecionado] = useState(null);
  const [simulacao, setSimulacao] = useState(null);
  const [tipoRendimento, setTipoRendimento] = useState(null);

  //Settando os valores buscados de indicadores
  useEffect(() => {
    let mounted = true;
    getIndicadores().then((response) => {
      if (mounted) {
        setCDI(response.find((indice) => indice.nome === "cdi"));
        setIPCA(response.find((indice) => indice.nome === "ipca"));
      }
    });
    return () => (mounted = false);
  }, []);

  //Quando o form é submetido os parametros necessários para carregar os demais dados da simulação são verificados
  function handleSubmit(e) {
    e.preventDefault();

    getSimulacoes().then((response) => {
      setSimulacao(
        response.find(
          (simulacao) =>
            simulacao.tipoRendimento === tipoRendimento &&
            simulacao.tipoIndexacao === indicadorSelecionado
        )
      );
    });

    return false;
  }

  return (
    <div className="Simulador">
      <div className="Simulacao-geral">
        <form className="Simulador-conteudo" onSubmit={handleSubmit}>
          <header>
            <h2>Simulador</h2>
          </header>
          <div className="Simulador-formInner">

             {/* Eu dividi as colunas em duas para melhor separar os dados*/}

            <div className="Simulador-rendimento">
              <div className="Simulador-header">
                <h6>Rendimento</h6>
                <span className="circle" title="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.">i</span>
              </div>

              <div className="Simulador-radio">
                <input
                  required
                  className="input-esquerda"
                  label="Bruto"
                  type="radio"
                  id="bruto"
                  name="tipoRendimento"
                  value="Bruto"
                  onClick={() => setTipoRendimento("bruto")}
                />
                <input
                  required
                  className="input-direita"
                  label="Liquido"
                  type="radio"
                  id="liquido"
                  name="tipoRendimento"
                  value="Liquido"
                  onClick={() => setTipoRendimento("liquido")}
                />
              </div>

              <div className="Simulador-campos">
                <label for="aporteInicial">Aporte Inicial</label>
                <input
                  required
                  className="Simulador-camposInput"
                  type="text"
                  min="1"
                  step="any"
                  onBlur={e =>  e.target.value = parseMonetary(e.target.value)}
                  id="aporteInicial"
                  name="aporteInicial"
                />

                <label for="prazo">Prazo (em meses)</label>
                <input
                  required
                  className="Simulador-camposInput"
                  type="number"
                  min="1"
                  max="12"
                  id="prazo"
                  name="prazo"
                />

                <label for="ipca">IPCA (ao ano)</label>
                <input
                  className="Simulador-camposInput"
                  value={ipca?.valor +"%" || "---"}
                  id="ipca"
                  name="ipca"
                  readOnly
                />
              </div>
            </div>


            {/* Aqui começa a outra coluna do form */}

            <div className="Simulador-indexacao">
              <div className="Simulador-header">
                <h6>Tipos de indexação</h6>
                <span className="circle" title="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.">i</span>
              </div>

              <div className="Simulador-radio">
                <input
                  required
                  className="input-esquerda"
                  label="PRÉ"
                  type="radio"
                  id="pre"
                  name="tipoIndexacao"
                  value="Pre"
                  onClick={() => setIndicadorSelecionado("pre")}
                />
                <input
                  required
                  label="POS"
                  type="radio"
                  id="pos"
                  name="tipoIndexacao"
                  value="Pos"
                  onClick={() => setIndicadorSelecionado("pos")}
                />
                <input
                  required
                  className="input-direita"
                  label="FIXADO"
                  type="radio"
                  id="fixado"
                  name="tipoIndexacao"
                  value="ipca"
                  onClick={() => setIndicadorSelecionado("ipca")}
                />
              </div>

              <div className="Simulador-campos">
                <label for="aporteMensal">Aporte Mensal</label>
                <input
                  required
                  className="Simulador-camposInput"
                  onBlur={e =>  e.target.value = parseMonetary(e.target.value)}
                  id="aporteMensal"
                  name="aporteMensal"
                  required
                />

                <label for="rentabilidade">Rentabilidade</label>
                <input
                  required
                  className="Simulador-camposInput"
                  onBlur={e => e.target.value = parseWithPercent(e.target.value)}
                  pattern="\d+%"
                  id="rentabilidade"
                  name="rentabilidade"
                />

                <label for="cdi">CDI (ao ano)</label>
                <input
                  className="Simulador-camposInput"
                  value={cdi?.valor +"%" || "---"}
                  id="cdi"
                  name="cdi"
                  readOnly
                />
              </div>
            </div>

            <input
              className="Simulador-botoesFinais"
              label="Limpar campos"
              type="reset"
              onClick={() => setSimulacao(null)}
              value="Limpar campos"
            />
            <input
              className="Simulador-botoesFinais laranja"
              label="Simular"
              type="submit"
              value="Simular"
            />
          </div>
        </form>

        {/* Deixa a parte de resultados invisivel se nao for processada uma simulação,
         quando processada ela aparece com os resultados. */}
        <div className={simulacao?"resultadoVisivel":"resultadoInvisivel"}>
          <Resultado simulacao={simulacao}></Resultado>
        </div>
      </div>
    </div>
  );
}

export default Simulador;
