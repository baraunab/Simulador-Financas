function atualizar_tabela(resultado) {
    const valor_liquido_investido = document.getElementById("td0"); // valor liquido
    const rentabilidade_bruta = document.getElementById("rentabilidadeBruta");
    const taxa_iof = document.getElementById("taxaIOF");
    const aliquota_irpf = document.getElementById("aliquotaIRPF");
    const rentabilidade_liquida = document.getElementById("rentabilidadeLiq");
    
    valor_liquido_investido.innerText = resultado.valor_final_liquido.toString();
    rentabilidade_bruta.innerText = resultado.rentabilidade_bruta.toString();
    taxa_iof.innerText = resultado.iof.toString();
    aliquota_irpf.innerText = resultado.irpf.toString();
    rentabilidade_liquida.innerText = resultado.rentabilidade_liquida.toString();
}

async function simular() {
    const valorInvestimento = document.getElementById("valorInvestimento");
    const opcoesInvestimento = document.getElementById("opcoesInvestimento");
    const dataVencimento = document.getElementById("dataVencimento");
    const aporteMensal = document.getElementById("aporteMensal");
    
    const URL = "http://localhost:8000/simular";

    const infos = {
        produto: opcoesInvestimento.options[opcoesInvestimento.selectedIndex].label,
        valor_inicial: valorInvestimento.valueAsNumber,
        aporte_mensal: aporteMensal.valueAsNumber,
        data_inicio: "2025-12-12",
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
