// Gráfico histórico do nível da água (index.html)
document.addEventListener("DOMContentLoaded", function () {
  const grafico = document.getElementById("grafico-nivel");
  if (grafico) {
    // Exemplo simples usando Chart.js (deve incluir Chart.js via CDN no index.html para funcionar)
    // Substitua os dados abaixo pelos dados reais do sistema
    new Chart(grafico, {
      type: 'line',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Nível do Rio (m)',
          data: [2.1, 2.3, 2.7, 2.4, 2.8, 3.1, 2.9],
          borderColor: '#005b96',
          backgroundColor: 'rgba(0,91,150,0.1)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
});

// Tema
document.querySelectorAll('.theme-switcher').forEach(btn => {
  btn.addEventListener('click', function() {
    document.body.classList.remove('theme-claro', 'theme-nublado', 'theme-chuva');
    document.body.classList.add('theme-' + btn.dataset.theme);
  });
});

// Definir tema padrão
if (!document.body.classList.contains('theme-claro') &&
    !document.body.classList.contains('theme-nublado') &&
    !document.body.classList.contains('theme-chuva')) {
  document.body.classList.add('theme-claro');
}

// Menu hamburguer
const btnMobile = document.getElementById('btn-mobile');

function toogleMenu(){
  const nav = document.getElementById('nav');
  nav.classList.toggle('active1');
}

btnMobile.addEventListener('click', toogleMenu);

// Slideshow
let slideIndex = 0;
showSlides();

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  if (!slides.length) return;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  if (dots[slideIndex-1]) dots[slideIndex-1].classList.add("active");
  setTimeout(showSlides, 5000); // Troca a cada 5 segundos
}

// Dots click
document.querySelectorAll('.dot').forEach((dot, idx) => {
  dot.addEventListener('click', function() {
    slideIndex = idx;
    showSlides();
  });
});

// Validação de CPF e envio do formulário colaborativo
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

const form = document.getElementById("colaborativoForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const cpf = document.getElementById("cpf").value;
    const mensagem = document.getElementById("mensagem-colaborativo");
    if (!validarCPF(cpf)) {
      mensagem.textContent = "CPF inválido. Por favor, verifique.";
      mensagem.style.color = "red";
      return;
    }
    mensagem.textContent = "Ponto registrado! Após validação de outros usuários, ele será publicado.";
    mensagem.style.color = "green";
    form.reset();
  });
}

// Quiz interativo
const quizForm = document.getElementById("quizForm");
if (quizForm) {
  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let acertos = 0;
    if (quizForm.q1.value === "b") acertos++;
    if (quizForm.q2.value === "a") acertos++;
    if (quizForm.q3.value === "a") acertos++;
    if (quizForm.q4.value === "b") acertos++;
    if (quizForm.q5.value === "a") acertos++;
    if (quizForm.q6.value === "b") acertos++;
    if (quizForm.q7.value === "c") acertos++;
    if (quizForm.q8.value === "a") acertos++;
    if (quizForm.q9.value === "c") acertos++;
    if (quizForm.q10.value === "c") acertos++;
    const resultado = document.getElementById("resultado-quiz");
    resultado.textContent = `Você acertou ${acertos} de 10 perguntas.`;
    resultado.style.fontWeight = "bold";
    resultado.style.marginTop = "20px";
  });
}