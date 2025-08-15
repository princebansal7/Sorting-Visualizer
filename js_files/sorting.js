// --- Global counters and stop flag for all algos ---
let comparisonCount = 0;
let swapCount = 0;
let stopRequested = false;
function updateCounters() {
    document.getElementById("comparisonCounter").textContent = comparisonCount;
    document.getElementById("swapCounter").textContent = swapCount;
}
function resetCounters() {
    comparisonCount = 0;
    swapCount = 0;
    updateCounters();
}
function requestStop() {
    stopRequested = true;
}
function resetStop() {
    stopRequested = false;
}

// Add Stop button logic
document.addEventListener("DOMContentLoaded", function () {
    const stopBtn = document.getElementById("stopSort");
    stopBtn.onclick = function () {
        requestStop();
    };
});
// swap function util for sorting algorithms takes input of 2 DOM elements with .style.height feature
function swap(el1, el2) {
    console.log("In swap()");

    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
}

// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSortingBtn() {
    document.querySelector(".bubbleSort").disabled = true;
    document.querySelector(".insertionSort").disabled = true;
    document.querySelector(".mergeSort").disabled = true;
    document.querySelector(".quickSort").disabled = true;
    document.querySelector(".selectionSort").disabled = true;
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn() {
    document.querySelector(".bubbleSort").disabled = false;
    document.querySelector(".insertionSort").disabled = false;
    document.querySelector(".mergeSort").disabled = false;
    document.querySelector(".quickSort").disabled = false;
    document.querySelector(".selectionSort").disabled = false;
}

// Disables size slider used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSizeSlider() {
    document.querySelector("#arr_sz").disabled = true;
}

// Enables size slider used in conjunction with disable
function enableSizeSlider() {
    document.querySelector("#arr_sz").disabled = false;
}

// Disables newArray buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableNewArrayBtn() {
    document.querySelector(".newArray").disabled = true;
}

// Enables newArray buttons used in conjunction with disable
function enableNewArrayBtn() {
    document.querySelector(".newArray").disabled = false;
}

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("");
        }, milisec);
    });
}

// Selecting size slider from DOM
let arraySize = document.querySelector("#arr_sz");

// Event listener to update the bars on the UI
arraySize.addEventListener("input", function () {
    console.log(arraySize.value, typeof arraySize.value);
    createNewArray(parseInt(arraySize.value));
});

// Default input for waitforme function (600ms, slower)
let delay = 600;

// Selecting speed slider from DOM
let delayElement = document.querySelector("#speed_input");

// Event listener to update delay time
delayElement.addEventListener("input", function () {
    console.log(delayElement.value, typeof delayElement.value);
    delay = 320 - parseInt(delayElement.value);
});

// Creating array to store randomly generated numbers
let array = [];

// Call to display cells right when you visit the site, default size 7
document.addEventListener("DOMContentLoaded", function () {
    arraySize.value = 7;
    createNewArray(7);
});

// To create new array input size of array
function createNewArray(noOfCells = 7) {
    deleteChild();
    array = [];
    for (let i = 0; i < noOfCells; i++) {
        array.push(Math.floor(Math.random() * 99) + 1);
    }
    const bars = document.querySelector("#bars");
    bars.className = "cell-container";
    for (let i = 0; i < noOfCells; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = array[i];
        bars.appendChild(cell);
    }
}

// Helper function to delete all the previous bars so that new can be added
function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = "";
}

// Selecting newarray button from DOM and adding eventlistener
const newArray = document.querySelector(".newArray");
newArray.addEventListener("click", function () {
    arraySize.value = 7;
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(7);
});
