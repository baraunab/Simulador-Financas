function validarNumero(input) {
  input.value = input.value.replace(/[^0-9]/g, '');
}

function definirDataVenc() {
  //Pega data local e adiciona 180 dias
  const dataAtual = new Date();
  dataAtual.setDate(dataAtual.getDate() + 180); 
  
  //Formatação da data em dd/mm/yyyy
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear();

  return `${ano}-${mes}-${dia}`;
}
    
//Define a data de vencimento no input
document.getElementById("opcoesInvestimento").addEventListener("change", function() {
  const dataVencimento = definirDataVenc();
  document.getElementById("dataV").value = dataVencimento;
});