// Elementos do DOM
const imageInput = document.getElementById('imageInput');
const imageContainer = document.getElementById('imageContainer');
const imgBase = document.getElementById('imgBase');
const fileLabel = document.getElementById('fileLabel');
const fileName = document.getElementById('fileName');
const loadingSection = document.getElementById('loading');
const downloadAllSection = document.getElementById('downloadAllSection');

// Paletas de cores (RGB)
const paletas = {
    pastel: {
        red: [247, 181, 183],
        yellow: [252, 231, 182],
        green: [188, 224, 191],
        blue: [220, 227, 245]
    },
    sus: {
        red: [242, 169, 0],
        yellow: [242, 169, 0],
        green: [0, 90, 170],
        blue: [0, 90, 170]
    },
    pe: {
        red: [237, 28, 36],
        yellow: [255, 209, 0],
        green: [0, 150, 57],
        blue: [0, 48, 135]
    }
};

// Converte RGB para HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    
    return [h * 360, s, l];
}

// Aplica filtros básicos usando ctx.filter
function aplicarFiltroBasico(canvasId, filterString, alpha = 1.0) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    canvas.width = imgBase.naturalWidth;
    canvas.height = imgBase.naturalHeight;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = filterString;
    ctx.globalAlpha = alpha;
    ctx.drawImage(imgBase, 0, 0);
    
    ctx.filter = 'none';
    ctx.globalAlpha = 1.0;
}

// Aplica paletas de cores substituindo pixels
function aplicarPaletaCanvas(canvasId, paleta) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    canvas.width = imgBase.naturalWidth;
    canvas.height = imgBase.naturalHeight;
    ctx.drawImage(imgBase, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        if (a === 0) continue;
        
        const [h, s, l] = rgbToHsl(r, g, b);
        
        if (s > 0.1 && l < 0.95 && l > 0.05) {
            let corDestino = null;
            
            if (h < 25 || h > 330) {
                corDestino = paleta.red;
            } else if (h >= 25 && h < 75) {
                corDestino = paleta.yellow;
            } else if (h >= 75 && h < 170) {
                corDestino = paleta.green;
            } else if (h >= 170 && h <= 330) {
                corDestino = paleta.blue;
            }
            
            if (corDestino) {
                data[i] = corDestino[0];
                data[i + 1] = corDestino[1];
                data[i + 2] = corDestino[2];
            }
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
}

// Baixa uma imagem específica
function baixarImagem(canvasId, nomeArquivo) {
    const canvas = document.getElementById(canvasId);
    const link = document.createElement('a');
    link.download = nomeArquivo;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    showToast('Download iniciado!');
}

// Baixa todas as imagens
async function baixarTodas() {
    const downloads = [
        { canvas: 'canvasOriginal', nome: 'logo_original.png' },
        { canvas: 'canvasSus', nome: 'logo_sus.png' },
        { canvas: 'canvasPe', nome: 'logo_pe.png' },
        { canvas: 'canvasPastel', nome: 'logo_pastel.png' },
        { canvas: 'canvasGrayscale', nome: 'logo_cinza.png' },
        { canvas: 'canvasCinzaClaro', nome: 'logo_cinza_claro.png' },
        { canvas: 'canvasTomSobreTom', nome: 'logo_tom_sobre_tom.png' },
        { canvas: 'canvasSilhuetaBranca', nome: 'logo_silhueta_branca.png' },
        { canvas: 'canvasSilhuetaPreta', nome: 'logo_silhueta_preta.png' }
    ];
    
    for (const item of downloads) {
        const canvas = document.getElementById(item.canvas);
        const link = document.createElement('a');
        link.download = item.nome;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    showToast('Todos os downloads foram iniciados!');
}

// Mostra notificação toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show', 'success');
    
    setTimeout(() => {
        toast.classList.remove('show', 'success');
    }, 3000);
}

// Processa a imagem carregada
function processarImagem() {
    loadingSection.classList.add('active');
    imageContainer.style.display = 'none';
    downloadAllSection.style.display = 'none';
    
    setTimeout(() => {
        // 1. Original
        aplicarFiltroBasico('canvasOriginal', 'none');
        
        // 2, 3 e 4. Paletas customizadas
        aplicarPaletaCanvas('canvasSus', paletas.sus);
        aplicarPaletaCanvas('canvasPe', paletas.pe);
        aplicarPaletaCanvas('canvasPastel', paletas.pastel);
        
        // 5. Escala de Cinza
        aplicarFiltroBasico('canvasGrayscale', 'grayscale(100%)');
        
        // 6. Cinza Claro
        aplicarFiltroBasico('canvasCinzaClaro', 'grayscale(100%) brightness(150%) contrast(20%)', 0.7);
        
        // 7. Branco Tom sobre Tom
        aplicarFiltroBasico('canvasTomSobreTom', 'brightness(0) invert(0.95)');
        
        // 8 e 9. Silhuetas
        aplicarFiltroBasico('canvasSilhuetaBranca', 'brightness(0) invert(1)');
        aplicarFiltroBasico('canvasSilhuetaPreta', 'brightness(0)');
        
        loadingSection.classList.remove('active');
        imageContainer.style.display = 'grid';
        downloadAllSection.style.display = 'block';
        
        showToast('Imagem processada com sucesso!');
    }, 500);
}

// Event: Upload de arquivo
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        fileName.textContent = file.name;
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imgBase.src = e.target.result;
            imgBase.onload = processarImagem;
        };
        
        reader.readAsDataURL(file);
    }
});

// Event: Drag and Drop
fileLabel.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('dragover');
});

fileLabel.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
});

fileLabel.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
    
    const file = e.dataTransfer.files[0];
    
    if (file && file.type.startsWith('image/')) {
        imageInput.files = e.dataTransfer.files;
        fileName.textContent = file.name;
        
        const reader = new FileReader();
        reader.onload = function(ev) {
            imgBase.src = ev.target.result;
            imgBase.onload = processarImagem;
        };
        reader.readAsDataURL(file);
    }
});

// Expor funções globais para os botões
window.baixarImagem = baixarImagem;
window.baixarTodas = baixarTodas;
