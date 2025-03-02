function limparFormulario() {
    // Reseta todos os campos do formulário
    document.getElementById("formIMC").reset();

    // Limpa o campo de resultado
    document.getElementById("resultadoIMC").textContent = "";
}

function calcularIMCGeneroIdade() {
    // Obtém os valores inseridos
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);
    let genero = document.getElementById("genero").value;
    let idade = parseInt(document.getElementById("idade").value);

    // Valida os valores
    if (!peso || !altura || !idade || altura <= 0 || peso <= 0 || idade <= 0) {
        document.getElementById("resultadoIMC").textContent = "Por favor, insira valores válidos.";
        return;
    }

    // Calcula o IMC
    let imc = peso / (altura * altura);

    // Determina a categoria com base no gênero
    let categoria;
    if (genero === "homem") {
        if (imc < 20.7) {
            categoria = "Abaixo do peso";
        } else if (imc >= 20.7 && imc < 26.4) {
            categoria = "Peso normal";
        } else if (imc >= 26.4 && imc < 31.1) {
            categoria = "Sobrepeso";
        } else {
            categoria = "Obesidade";
        }
    } else if (genero === "mulher") {
        if (imc < 19.1) {
            categoria = "Abaixo do peso";
        } else if (imc >= 19.1 && imc < 25.8) {
            categoria = "Peso normal";
        } else if (imc >= 25.8 && imc < 32.3) {
            categoria = "Sobrepeso";
        } else {
            categoria = "Obesidade";
        }
    }

    // Adiciona mensagem personalizada com base na idade
    let mensagem = `Seu IMC é ${imc.toFixed(2)}. Categoria (${genero}): ${categoria}. `;
    if (idade < 18) {
        mensagem += "Consulte um médico para uma avaliação mais precisa, pois você está em uma faixa etária jovem.";
    } else if (idade > 60) {
        mensagem += "Na terceira idade, é importante manter acompanhamento médico para avaliação contínua.";
    }

    // Exibe o resultado
    document.getElementById("resultadoIMC").textContent = mensagem;
}

function calcularEstimativa() {
    // Obtém os valores inseridos
    let altura = parseFloat(document.getElementById("altura").value) || null;
    let peso = parseFloat(document.getElementById("peso").value) || null;
    let genero = document.getElementById("genero").value;

    // Valida se pelo menos um valor foi inserido
    if (altura === null && peso === null) {
        document.getElementById("resultadoEstimativa").textContent = "Por favor, insira altura ou peso para o cálculo.";
        return;
    }

    let resultado = "";

    // Estimativa de peso ideal com base na altura
    if (altura !== null) {
        if (genero === "homem") {
            let pesoIdealHomem = 50 + 2.3 * ((altura * 100 - 152.4) / 2.54); // Fórmula Devine (homens)
            resultado += `Com a altura de ${altura.toFixed(2)} m, o peso ideal estimado para homens é de aproximadamente ${pesoIdealHomem.toFixed(2)} kg.\n`;
        } else if (genero === "mulher") {
            let pesoIdealMulher = 45.5 + 2.3 * ((altura * 100 - 152.4) / 2.54); // Fórmula Devine (mulheres)
            resultado += `Com a altura de ${altura.toFixed(2)} m, o peso ideal estimado para mulheres é de aproximadamente ${pesoIdealMulher.toFixed(2)} kg.\n`;
        }
    }

    // Estimativa de altura ideal com base no peso
    if (peso !== null) {
        if (genero === "homem") {
            let alturaIdealHomem = (peso - 50) / 2.3 * 2.54 + 152.4; // Fórmula inversa para homens
            resultado += `Com o peso de ${peso.toFixed(2)} kg, a altura ideal estimada para homens é de aproximadamente ${(alturaIdealHomem / 100).toFixed(2)} m.\n`;
        } else if (genero === "mulher") {
            let alturaIdealMulher = (peso - 45.5) / 2.3 * 2.54 + 152.4; // Fórmula inversa para mulheres
            resultado += `Com o peso de ${peso.toFixed(2)} kg, a altura ideal estimada para mulheres é de aproximadamente ${(alturaIdealMulher / 100).toFixed(2)} m.\n`;
        }
    }

    document.getElementById("resultadoEstimativa").textContent = resultado.trim();
}

function limparEstimativa() {
    // Limpa o campo de resultado
    document.getElementById("resultadoEstimativa").textContent = "";
}

function calcularRCQ() {
    // Obtém os valores inseridos
    let cintura = parseFloat(document.getElementById("cintura").value);
    let quadril = parseFloat(document.getElementById("quadril").value);
    let genero = document.getElementById("genero").value;

    // Valida os valores
    if (!cintura || !quadril || cintura <= 0 || quadril <= 0) {
        document.getElementById("resultadoCQ").textContent = "Por favor, insira valores válidos para cintura e quadril.";
        return;
    }

    // Calcula a relação cintura-quadril (RCQ)
    let rcq = cintura / quadril;

    // Determina a categoria de risco com base no gênero
    let categoria = "";
    if (genero === "homem") {
        if (rcq < 0.90) {
            categoria = "Baixo risco";
        } else if (rcq >= 0.90 && rcq < 1.0) {
            categoria = "Risco moderado";
        } else {
            categoria = "Alto risco";
        }
    } else if (genero === "mulher") {
        if (rcq < 0.80) {
            categoria = "Baixo risco";
        } else if (rcq >= 0.80 && rcq < 0.85) {
            categoria = "Risco moderado";
        } else {
            categoria = "Alto risco";
        }
    }

    // Exibe o resultado
    document.getElementById("resultadoCQ").textContent =
        `A relação cintura-quadril é ${rcq.toFixed(2)}. Categoria (${genero}): ${categoria}.`;
}

function limparRCQ() {
    // Limpa o resultado
    document.getElementById("resultadoCQ").textContent = "";
}

function calcularGET() {
    // Obtém os valores inseridos
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);
    let idade = parseInt(document.getElementById("idade").value);
    let genero = document.getElementById("genero").value;
    let fatorAtividade = parseFloat(document.getElementById("fatorAtividade").value);

    // Valida os valores de entrada
    if (!peso || !altura || !idade || !fatorAtividade || peso <= 0 || altura <= 0 || idade <= 0) {
        document.getElementById("resultadoGET").textContent = "Por favor, insira valores válidos.";
        return;
    }

    // Calcula a TMB com base no gênero
    let tmb;
    if (genero === "homem") {
        tmb = 10 * peso + 6.25 * altura - 5 * idade + 5;
    } else if (genero === "mulher") {
        tmb = 10 * peso + 6.25 * altura - 5 * idade - 161;
    } else {
        document.getElementById("resultadoGET").textContent = "Por favor, selecione um gênero válido.";
        return;
    }

    // Calcula o GET
    let get = tmb * fatorAtividade;

    // Exibe o resultado
    document.getElementById("resultadoGET").textContent =
        `Seu Gasto Energético Total (GET) é de aproximadamente ${get.toFixed(2)} calorias por dia.`;
}

function limparGET() {
    // Limpa o resultado exibido
    document.getElementById("resultadoGET").textContent = "";
}

function calcularIRN() {
    // Obtém os valores inseridos
    let pesoAtual = parseFloat(document.getElementById("pesoAtual").value);
    let pesoIdeal = parseFloat(document.getElementById("pesoIdeal").value);

    // Valida os valores
    if (!pesoAtual || !pesoIdeal || pesoAtual <= 0 || pesoIdeal <= 0) {
        document.getElementById("resultadoIRN").textContent = "Por favor, insira valores válidos para peso atual e peso ideal.";
        return;
    }

    // Calcula o Índice de Risco Nutricional (IRN)
    let irn = (pesoAtual / pesoIdeal) * 100;

    // Determina a categoria de risco nutricional
    let categoria = "";
    if (irn < 70) {
        categoria = "Desnutrição grave";
    } else if (irn >= 70 && irn < 80) {
        categoria = "Desnutrição moderada";
    } else if (irn >= 80 && irn < 90) {
        categoria = "Desnutrição leve";
    } else if (irn >= 90 && irn <= 110) {
        categoria = "Estado nutricional adequado";
    } else {
        categoria = "Risco de sobrepeso ou obesidade";
    }

    // Exibe o resultado
    document.getElementById("resultadoIRN").textContent =
        `O Índice de Risco Nutricional (IRN) é ${irn.toFixed(2)}%. Categoria: ${categoria}.`;
}

function limparIRN() {
    // Limpa o resultado exibido
    document.getElementById("resultadoIRN").textContent = "";
}