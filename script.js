if (localStorage.sound == undefined) {
    localStorage.sound = 1;
};
if (localStorage.sound == 0) {
    let spanSound = document.getElementById("spanSound").innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    let styleSoundButton = document.getElementById("soundButton").style.backgroundColor = "rgb(216, 34, 34)";
} else {
    let spanSound = document.getElementById("spanSound").innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    let styleSoundButton = document.getElementById("soundButton").style.backgroundColor = "rgb(34, 216, 125)";
};
const visor = document.getElementById("visor");
let valuesElements = [];
let valuesSigns = [];
let elevationElements = [];
let res = 0;
function ValueKeys(valueKey, element, classElement) {
    console.log(valueKey)
    if (visor.innerHTML == '<div style="font-size: 60px;">0</div>'){
        res = 0;
        clearArray();
        valuesElements.push(valueKey);
        visorElements(element, classElement);
    } else {
        let nameElementIndex1 = visor.innerHTML.lastIndexOf("<h1>") + 4;
        let nameElementIndex2 = visor.innerHTML.lastIndexOf("</h1>");
        if (valuesElements.length > valuesSigns.length && element[0] == visor.innerHTML.substring(nameElementIndex1, nameElementIndex2)) {
            valueElem = valuesElements[valuesElements.length - 1];
            valuesElements.pop();
            valuesElements.push(valueKey + valueElem);
            let elevationValue = elevationElements[elevationElements.length - 1];
            elevationElements.pop();
            elevationElements.push(elevationValue + 1);
            let deleteElement = visor.innerHTML.lastIndexOf("<button");
            let notDelete = visor.innerHTML.slice(0, deleteElement);
            visor.innerHTML = notDelete;
            visorElements(element, classElement, elevationElements[elevationElements.length - 1]);
        } 
        if (valuesElements.length == valuesSigns.length) {
            valuesElements.push(valueKey);
            elevationElements.push(1);
            visorElements(element, classElement, elevationElements[elevationElements.length - 1]);
        };    
    };
};
function visorElements(element, classElement, numberElevation) {
    console.log(numberElevation, elevationElements)
    if (numberElevation == 1) {
        visor.innerHTML += `<button class="${classElement}"><h1>${element[0]}</h1>${element[1]}<br>${element[2]}</button> `;
        visor.style.fontSize = "15px";
    } else {
        visor.innerHTML += `<button class="${classElement}"><div class="content-elevation"><h1>${element[0]}</h1>${element[1]}<br>${element[2]}<div class="number-elevation">${numberElevation}</div><div></button> `;
        visor.style.fontSize = "15px";
    };
};

function equalRes() {
    res = 0;
    for (let i = 0; i < valuesElements.length; i++) {
        if (i == 0 || valuesSigns[i - 1] == '+') {
            res += valuesElements[i];
        } else {
            res -= valuesElements[i];
        };
    };
    console.log(res)
    const audio = new Audio('click-21156.mp3');
    audio.volume = localStorage.sound;
    audio.play();
    let resStr = res.toString();
    let indexRes = resStr.indexOf('.');
    let resRemove = resStr.slice(indexRes + 1);
    if (resRemove.length > 4) {
        resRemove = resRemove.slice(0, 4);
        resStr = resStr.slice(0, indexRes + 1);
        resStr = resStr + resRemove;
    };
    resStr = resStr.replace('.', ',');
    res = parseFloat(resStr);
    visor.innerHTML = `<div style="font-size: 60px;">${resStr}</div>`;
};
function clearArray() {
    while (0 < valuesElements.length || 0 < valuesSigns.length) {
        valuesElements.pop();
        valuesSigns.pop();
        elevationElements.pop();
    };
    visor.innerHTML = "";
    const audio = new Audio('click-21156.mp3');
    audio.volume = localStorage.sound;
    audio.play();
};
function deleteLastElement() {    
    let lastIndex;
    if (visor.innerHTML.lastIndexOf('i>') > visor.innerHTML.lastIndexOf('n>')) {
        lastIndex = visor.innerHTML.lastIndexOf('<i class="fa-solid');
        valuesSigns.pop();
    } else {
        lastIndex = visor.innerHTML.lastIndexOf("<button");
        valuesElements.pop();
        elevationElements.pop();
    };
    if (visor.innerHTML.indexOf('i>') == -1 && visor.innerHTML.indexOf('n>') == -1) {
        clearArray();
    } else {
        let elementNotDeleted = visor.innerHTML.slice(0 ,lastIndex);
        visor.innerHTML = elementNotDeleted;
    };
    const audio = new Audio('click-21156.mp3');
    audio.volume = localStorage.sound;
    audio.play();
};
function addSignal(signal) {
    if (valuesElements.length > valuesSigns.length) {
        valuesSigns.push(signal);
        if (signal == "+") {
            visor.innerHTML += ' <i class="fa-solid fa-plus fa-xl" style="color: #000000; margin: 0 4px 0 4px;"></i> ';
        } else {
            visor.innerHTML += ' <i class="fa-solid fa-minus fa-xl" style="color: #000000; margin: 0 4px 0 4px;"></i> ';
        };
    };
};
const clearAll = document.getElementById("clearAll").addEventListener("click", clearArray);
const backspace = document.getElementById("backspace").addEventListener("click", deleteLastElement);
const plus = document.getElementById("plus").addEventListener("click", () => {
    addSignal("+");
});
const minus = document.getElementById("minus").addEventListener("click", () => {
    addSignal("-");
});
const equal = document.getElementById("equal").addEventListener("click", equalRes);
let btnKeys = document.querySelectorAll(".btnKeys").forEach(keys => keys.addEventListener("click", e => {
    const audio = new Audio('click-21156.mp3');
    audio.volume = localStorage.sound;
    audio.play();
    ValueKeys(ValueElementFunction(keys.value, keys.textContent.split(" ")), keys.textContent.split(" "), keys.className.split(" ")[1])                                                                                                     
}));
let openFilter = false;
const filtersButton = document.getElementById("filtersButton").addEventListener("click", () => {
    if (openFilter == false) {
        let filtersContent = document.getElementById("filtersContent").style.display = "block";
        openFilter = true;
    } else {
        let filtersContent = document.getElementById("filtersContent").style.display = "none";
        openFilter = false;
    };
});
const searchButton = document.getElementById("searchButton").addEventListener("click", () => {
    let filtersContent = document.getElementById("filtersContent").style.display = "none";
    openFilter = false;
    let btnsContainer = document.getElementById("btnsContainer").style.filter = "blur(4px)";
    let search = document.getElementById("search").style.display = "flex";
});
let searchView = document.getElementById("searchView");
const searchConfirm = document.getElementById("searchConfirm").addEventListener("click", () => {
    let searchInput = document.querySelector("#searchInput").value;
    searchView.innerHTML = "<h1>Não encontrei nenhum elemento 😿</h1>";
    if (searchInput && searchInput != " ") {
        searchView.innerHTML = "";
        let elements = document.querySelectorAll(".btnKeys").forEach(elem => {
            let eleValue = elem.value;
            let indexName = elem.textContent;
            indexName = indexName.toLowerCase();
            let searchText = searchInput.toLowerCase();
            if (indexName.indexOf(searchText) > -1) {
                let classEle = elem.className.split(" ")[1];
                let ele = elem.textContent.split(" ");
                searchView.innerHTML += `<button value="${eleValue}" class="${classEle} searchResult"><h1>${ele[0]} </h1>${ele[1]}<br> ${ele[2]}</button> `;
            };
        });
        let searchResult = document.querySelectorAll(".searchResult").forEach(res => {res.addEventListener("click", () => {
            const audio = new Audio('click-21156.mp3');
            audio.volume = localStorage.sound;
            audio.play();
            console.log(ValueElementFunction(res.value, res.textContent.split(" ")))
            ValueKeys(ValueElementFunction(res.value, res.textContent.split(" ")), res.textContent.split(" "), res.className.split(" ")[0])                                                                                                                  
        })});
        if (searchView.innerHTML == "") {
            searchView.innerHTML = "<h1>Não encontrei nenhum elemento 😿</h1>";
        };
    };
});
function clearSearch() {
    let btnsContainer = document.getElementById("btnsContainer").style.filter = "blur(0px)";
    let search = document.getElementById("search").style.display = "none";
    let searchInput = document.querySelector("#searchInput").value = "";
    searchView.innerHTML = "<h1>Faça uma pesquisa 🔍</h1>";
};
const searchExit = document.getElementById("searchExit").addEventListener("click", clearSearch);
const searchExitEsc = document.addEventListener("keydown", e => {
    if (e.key == "Escape") {
        clearSearch();
    };
});
let valuePrecisionMode = false;
const precisionModeButton = document.getElementById("precisionModeButton").addEventListener("click", () => {
    if (valuePrecisionMode == false) {
        document.getElementById("precisionModeButton").style.backgroundColor = "rgb(34, 216, 125)";
        document.getElementById("precisionModeButton").innerHTML = "Mode precisão: On"
        valuePrecisionMode = true;
    } else {
        document.getElementById("precisionModeButton").style.backgroundColor = "rgb(216, 34, 34)";
        document.getElementById("precisionModeButton").innerHTML = "Mode precisão: Off"
        valuePrecisionMode = false;
    };
});
function ValueElementFunction(ValueInt, ValueFloat) {
    if (valuePrecisionMode == false) {
        console.log(ValueInt)
        return parseInt(ValueInt);
    } else {
        ValueFloat = ValueFloat[2].replace(",", ".");
        console.log(ValueFloat)
        return parseFloat(ValueFloat);
    };
};
const soundButton = document.getElementById("soundButton").addEventListener("click", () => {
    if (localStorage.sound == 1) {
        let spanSound = document.getElementById("spanSound").innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        localStorage.sound = 0;
        let styleSoundButton = document.getElementById("soundButton").style.backgroundColor = "rgb(216, 34, 34)";
    } else {
        let spanSound = document.getElementById("spanSound").innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        localStorage.sound = 1;
        let styleSoundButton = document.getElementById("soundButton").style.backgroundColor = "rgb(34, 216, 125)";
    };
});
//By: Misael Bonifácio Morgado 
