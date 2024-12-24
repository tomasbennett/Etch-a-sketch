const defaultColour = document.querySelector('.grid.settings .colour-select div');
const penColour = document.querySelector('.colour.settings .colour-select div');
const innerEtch = document.querySelector('.inner-etch');

const randomColours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "black", "white", "gray", "silver", "maroon", "fuchsia", "purple", "lime", "aqua", "teal", "navy", "olive", "brown", "pink", "beige", "gold", "coral", "turquoise", "peachpuff", "chartreuse", "plum"];


const gridFormatText = document.querySelector('#slider-value');
const horizontalSlider = document.querySelector('#horizontal-slider');


gridFormatText.textContent = `Grid: ${horizontalSlider.value} x ${horizontalSlider.value}`;
modifyingGridSquares();

horizontalSlider.addEventListener('input', () => {
    modifyingGridSquares();

    gridFormatText.textContent = `Grid: ${horizontalSlider.value} x ${horizontalSlider.value}`;
});


function modifyingGridSquares() {

    let gridSquares = Array.from(innerEtch.children);
    let gridSquareCount = gridSquares.length;
    
    innerEtch.style.gridTemplateRows = `repeat(${horizontalSlider.value}, 1fr)`;
    innerEtch.style.gridTemplateColumns = `repeat(${horizontalSlider.value}, 1fr)`;

    if(gridSquareCount <= horizontalSlider.value ** 2) {

        for(let i = 0; i < horizontalSlider.value ** 2; i++){
            const newGridSquare = document.createElement('div');
            
            newGridSquare.classList.add('grid-square');
            innerEtch.appendChild(newGridSquare);
        }
            
    } else {

        for(let i = gridSquareCount; i > horizontalSlider.value ** 2; i--){
            innerEtch.removeChild(innerEtch.lastElementChild);
        }
        

    }

}