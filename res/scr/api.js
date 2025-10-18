function atualizar_tabela(resultado) {
    const valor_liquido_investido = document.getElementById("valorLiquido"); // valor liquido
    const rentabilidade_bruta = document.getElementById("rentabilidadeBruta");
    const taxa_iof = document.getElementById("taxaIOF");
    const aliquota_irpf = document.getElementById("aliquotaIRPF");
    const rentabilidade_liquida = document.getElementById("rentabilidadeLiq");
    
    valor_liquido_investido.innerText = resultado.valor_final_liquido.toString();
    rentabilidade_bruta.innerText = resultado.rentabilidade_bruta.toString();
    taxa_iof.innerText = resultado.dias.toString() + " dias";
    aliquota_irpf.innerText = (resultado.irpf).toString();
    rentabilidade_liquida.innerText = resultado.rentabilidade_liquida.toString();

    formatarValores(valor_liquido_investido, rentabilidade_bruta, taxa_iof, aliquota_irpf, rentabilidade_liquida);
}

async function simular() {
    const valorInvestimento = document.getElementById("valorInvestimento");
    const opcoesInvestimento = document.getElementById("opcoesInvestimento");
    const aporteMensal = document.getElementById("aporteMensal");
    
    const URL = "http://localhost:8000/simular";

    const infos = {
        produto: opcoesInvestimento.options[opcoesInvestimento.selectedIndex].value,
        valor_inicial: valorInvestimento.valueAsNumber,
        aporte_mensal: aporteMensal.valueAsNumber,
        data_inicio: definirDataInicial(),
    }

    const res = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(infos)
    });

    const resultado = await res.json();
    console.log(resultado)
    atualizar_tabela(resultado);
}


function formatarValores(a, b, c, d, e) {
    var valorLiquido = a;
    var rentabilidadeBruta = b;
    var taxaIOF = c;
    var aliquotaIRPF = d;
    var rentabilidadeLiq = e;
    
    valorLiquido.innerText = `R$ ${valorLiquido.innerText}`;
    rentabilidadeBruta.innerText = `R$ ${rentabilidadeBruta.innerText}`;
    taxaIOF.innerText = `${taxaIOF.innerText}`;
    aliquotaIRPF.innerText = `R$ ${aliquotaIRPF.innerText}`;
    rentabilidadeLiq.innerText = `R$ ${rentabilidadeLiq.innerText}`;
}

function definirDataInicial() {
  //Pega data local e adiciona 180 dias
  const dataAtual = new Date();
  dataAtual.setDate(dataAtual.getDate()); 
  
  //Formatação da data em dd/mm/yyyy
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear();

  return `${ano}-${mes}-${dia}`;
}


function inputMask(e) {
  var input = e;
  var calc;

  if (input.value.length > 2  && input.value.length < 4) {
    calc = input.value / 100;
    input.value = calc.toFixed(2);
  }
  if (input.value.length > 4) {
    calc = input.value * 10;
    input.value = calc.toFixed(2);
  }
  document.addEventListener("keydown", function(event) {
    if (event.code === "Backspace") {
        input.value = "";
    }
});
}

