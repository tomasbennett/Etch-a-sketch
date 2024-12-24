const defaultColour = document.querySelector('.grid.settings .colour-select > div input');
const penColour = document.querySelector('.colour.settings .colour-select > div input');
const innerEtch = document.querySelector('.inner-etch');

defaultColour.addEventListener('input', () => document.documentElement.style.setProperty('--default-colour', defaultColour.value));
penColour.addEventListener('input', () => document.documentElement.style.setProperty('--pen-colour', penColour.value));




const eraser = document.querySelector('#eraser');
const toggleGridLines = document.querySelector('#toggle-grid');
const gridFormatText = document.querySelector('#slider-value');
const horizontalSlider = document.querySelector('#horizontal-slider');
const clear = document.querySelector('.clear.settings .inputs');
const rainbowElem = document.querySelector('#rainbow-element');

let gridSquares = Array.from(innerEtch.children);

horizontalSlider.addEventListener('input', gridSizeChange);
document.addEventListener('DOMContentLoaded', gridSizeChange);
eraser.addEventListener('click', () => {

    if (rainbowElem.classList.contains('rainbow-active')) {
        rainbowElem.classList.remove('rainbow-active');

    }
    eraser.classList.toggle('eraser-active');

});
rainbowElem.addEventListener('click', () => {
    if (eraser.classList.contains('eraser-active')) {
        eraser.classList.remove('eraser-active');
        
    }
    rainbowElem.classList.toggle('rainbow-active');

});
toggleGridLines.addEventListener('click', () => {
    toggleGridLines.classList.toggle('toggle-grid');

    if (toggleGridLines.classList.contains('toggle-grid')) {
        document.documentElement.style.setProperty('--toggle-border', '.1rem');

    } else {
        document.documentElement.style.setProperty('--toggle-border', '0rem');
    
    }
});
clear.addEventListener('click', clearGrid)


let mouseDown = 0;
document.body.onmousedown = function () {
    ++mouseDown;
};
document.body.onmouseup = function () {
    --mouseDown;
};

document.body.addEventListener('dragstart', (event) => {
    event.preventDefault();
});


const randomColours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "black", "gray", "silver", "maroon", "fuchsia", "purple", "lime", "aqua", "teal", "navy", "olive", "brown", "pink", "beige", "gold", "coral", "turquoise", "peachpuff", "chartreuse", "plum"];

function paint(e) {
    if (eraser.classList.contains('eraser-active')) {
        e.target.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--default-colour');
        return;
    } else if (rainbowElem.classList.contains('rainbow-active')) {
        e.target.style.backgroundColor = randomColours[Math.floor(Math.random() * randomColours.length)];
        return;
    }
    
    e.target.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--pen-colour');
}


function clearGrid() {
    gridSquares.forEach((elem) => {
        elem.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--default-colour');
    })
}

function gridSizeChange() {
    gridFormatText.textContent = `Grid: ${horizontalSlider.value} x ${horizontalSlider.value}`;
    modifyingGridSquares();
}

function modifyingGridSquares() {
    
    let gridSize = horizontalSlider.value ** 2;

    innerEtch.style.gridTemplateRows = `repeat(${horizontalSlider.value}, 1fr)`;
    innerEtch.style.gridTemplateColumns = `repeat(${horizontalSlider.value}, 1fr)`;

    while (gridSquares.length < gridSize) {
        const newGridSquare = document.createElement('div');
        newGridSquare.classList.add('grid-square');
        
        newGridSquare.addEventListener('mousedown', paint);
        newGridSquare.addEventListener('mousemove', (e) => {
            if (mouseDown) {
                paint(e);
            }
        });
        innerEtch.appendChild(newGridSquare);
        
        gridSquares.push(newGridSquare);

    }

    while (gridSquares.length > gridSize) {
        innerEtch.removeChild(innerEtch.lastElementChild);

        gridSquares.pop()

    }

}

