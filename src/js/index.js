let palavraCorreta = "BALA";
const arrayPalavras = [
    {
        palavra: "BOLA",
        imagem: "https://cambuci.vtexassets.com/arquivos/ids/1515236/bola-futvolei-521310-1110-1.png?v=638816315696900000",
        audio: "../../assets/audio/bola.mp3",
    },
    {
        palavra: "BALA",
        imagem: "https://docemalu.vtexassets.com/arquivos/ids/5340785/144462-2.jpg?v=638421741232830000",
        audio: "../../assets/audio/bala.mp3",
    },
    {
        palavra: "MAGIA",
        imagem: "https://img.freepik.com/vector-gratis/espectaculo-magia-fondo_1284-13012.jpg?semt=ais_hybrid&w=740",
        audio: "../../assets/audio/magia.mp3",
    },
    {
        palavra: "LEITE",
        imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/250px-Milk_glass.jpg",
        audio: "../../assets/audio/leite.mp3",
    },
    {
        palavra: "VACA",
        imagem: "https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/fc8c5cc1f52ab9ec962765d239d40548.jpg",
        audio: "../../assets/audio/vaca.mp3",
    },
    {
        palavra: "BANANA",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVthK1oBujgwUfpvlsYYXD7_V_Zcgr4_nMtg&s",
        audio: "../../assets/audio/banana.mp3",
    },
]
let currentSound = arrayPalavras[0].audio
let letras = [];
let contador = 0

const espacosContainer = document.getElementById("espacos");
const letrasContainer = document.getElementById("letras");
const mensagem = document.getElementById("mensagem");
const imagemPalavra = document.getElementById("imagemPalavra")
const soundEffect = document.getElementById("sound-effect")
const soundButton = document.getElementById("soundButton")

const makeSoundEffect = (source) => {
    soundEffect.setAttribute("src", source)
    soundEffect.play()
}

function embaralhar(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
soundButton.addEventListener("click", () => {
    makeSoundEffect(currentSound)
})
imagemPalavra.addEventListener("click", () => {
    makeSoundEffect(currentSound)
})
// Math.floor(Math.random() * arrayPalavras.length)
function criarJogo() {
  // palavraCorreta = arrayPalavras[Math.floor(Math.random() * arrayPalavras.length)]
  palavraCorreta = arrayPalavras[contador].palavra
  imagemPalavra.setAttribute('src', arrayPalavras[contador].imagem)
  currentSound = arrayPalavras[contador].audio
  espacosContainer.innerHTML = "";
  letrasContainer.innerHTML = "";
  mensagem.textContent = "";

  letras = palavraCorreta.split("");
  const embaralhadas = embaralhar(letras);

  // Criar espaços vazios
  for (let i = 0; i < letras.length; i++) {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slot.dataset.index = i;
    slot.addEventListener("dragover", e => e.preventDefault());
    slot.addEventListener("drop", onDrop);
    espacosContainer.appendChild(slot);
  }

  // Criar letras embaralhadas
  for (let letra of embaralhadas) {
    const div = document.createElement("div");
    div.classList.add("letra");
    div.textContent = letra;
    div.draggable = true;
    div.addEventListener("dragstart", onDragStart);
    div.addEventListener("dragend", onDragEnd);
    letrasContainer.appendChild(div);
  }
}

let dragged;

function onDragStart(e) {
  dragged = e.target;
  e.target.classList.add("dragging");
}

function onDragEnd(e) {
  e.target.classList.remove("dragging");
}

function onDrop(e) {
  if (e.target.classList.contains("slot") && e.target.children.length === 0) {
    e.target.appendChild(dragged.cloneNode(true));
    dragged.remove();

    verificarPalavra();
  }
}

function verificarPalavra() {
  const slots = document.querySelectorAll(".slot");
  let palavraMontada = "";

  for (let slot of slots) {
    palavraMontada += slot.textContent || "_";
  }

  if (!palavraMontada.includes("_")) {
    if (palavraMontada === palavraCorreta) {
      mensagem.textContent = "✅ Parabéns! Você acertou!";
      mensagem.style.color = "green";
      contador++
      setTimeout(() => {
        criarJogo();
      }, 1500);
    } else {
      mensagem.textContent = "❌ Ops! Palavra incorreta.";
      mensagem.style.color = "red";

      // Esperar um tempo antes de resetar
      setTimeout(() => {
        criarJogo();
      }, 1500);
    }
  }
}

  criarJogo();