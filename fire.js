const firePixelArray = []
// A estrutura de dados utilizada para calcular o fogo será um Array.
// Assim, todas as cores do fogo estarão uma do lado da outra.
// Como o fogo será representado num retângulo, para exibir isso da maneira correta,
// o segredo está na largura do fogo (fireWidth).
// Assim, quando a posição do array chegar na largura,
// o gráfico "pula" pra linha de baixo.
const fireWidth = 50
const fireHeight = 50
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]


function start(){
    createFireDataStructure()
    createFireSource()
    renderFire()
    setInterval(calculateFirePropagation, 50)
}

function createFireDataStructure(){
    const numberOfPixels = fireWidth * fireHeight
    for ( let i = 0; i < numberOfPixels; i++ ){
        firePixelArray[i] = 0
            // Aqui, estamos atribuindo intensidade para cada valor do array. Nesse caso, cada posição do array tem intensidade = 0.
    }
}

function calculateFirePropagation(){
    // Essa função vai varrer o retângulo, coluna a coluna e dentro de cada coluna, ele varre a altura, linha por linha.
    for ( let column = 0; column < fireWidth; column++ ){
        for( let row = 0; row < fireHeight; row++ ){
            const pixelIndex = column + ( fireWidth * row )
            updateFireIntensityPerPixel( pixelIndex )
        }
    }
    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth
    const decay = Math.floor(Math.random() * 3) 
        // Essa constante é o declínio (diminuição) da intensidade do fogo.
        // Foi colocado um valor aleatório para que o fogo apresentasse uma sensação de movimento.
    const belowPixelFireIntensity = firePixelArray[belowPixelIndex]
    const newFireIntensity = 
            belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0 

    if ( belowPixelIndex >= fireHeight * fireWidth ){
        // Para que a função não utilize uma linha que não exista, 
        // essa condição garante que se o pixel de baixo for maior que o tamanho
        // do canvas, a função não faça mais nada.
        return
    }
    
    firePixelArray[currentPixelIndex - decay] = newFireIntensity
}

function renderFire(){
    const debug = false
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < fireHeight; row++){
        // Para cada altura do fogo, será criada uma linha na table.
        // uma TableRow, uma tr.
        html += '<tr>'

        for (let column = 0; column < fireWidth; column++){
            // Para cada largura do fogo, será criada uma coluna na table.

            const pixelIndex = column + ( fireWidth * row)
                // isso vai demonstrar qual a posição do array no retangulo.
            const firelIntensity = firePixelArray[pixelIndex]

            if ( debug == true){
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += firelIntensity
                html += '</td>'
            } else {
                const color = fireColorsPalette[firelIntensity]
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }

        }
        html += '</tr>'
    }
    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource(){
    for ( let column = 0; column <= fireWidth; column++ ){
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelArray[pixelIndex] = 36
    }
}

start();