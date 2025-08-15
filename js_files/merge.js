//let delay = 30;
async function merge(ele, low, mid, high) {
    if (stopRequested) return;
    const n1 = mid - low + 1;
    const n2 = high - mid;
    let left = new Array(n1);
    let right = new Array(n2);
    for (let i = 0; i < n1; i++) {
        if (stopRequested) return;
        await waitforme(delay);
        ele[low + i].style.background = "#ffc107"; // left: yellow
        left[i] = ele[low + i].textContent;
    }
    for (let i = 0; i < n2; i++) {
        if (stopRequested) return;
        await waitforme(delay);
        ele[mid + 1 + i].style.background = "#007bff"; // right: blue
        right[i] = ele[mid + 1 + i].textContent;
    }
    await waitforme(delay);
    let i = 0,
        j = 0,
        k = low;
    while (i < n1 && j < n2) {
        if (stopRequested) return;
        comparisonCount++;
        updateCounters();
        await waitforme(delay);
        if (parseInt(left[i]) <= parseInt(right[j])) {
            ele[k].textContent = left[i];
            ele[k].style.background = "#28a745"; // sorted: green
            i++;
        } else {
            ele[k].textContent = right[j];
            ele[k].style.background = "#28a745";
            j++;
            swapCount++;
            updateCounters();
        }
        k++;
    }
    while (i < n1) {
        if (stopRequested) return;
        await waitforme(delay);
        ele[k].textContent = left[i];
        ele[k].style.background = "#28a745";
        i++;
        k++;
    }
    while (j < n2) {
        if (stopRequested) return;
        await waitforme(delay);
        ele[k].textContent = right[j];
        ele[k].style.background = "#28a745";
        j++;
        k++;
    }
}

async function mergeSort(ele, l, r) {
    resetCounters();
    resetStop();
    if (l >= r || stopRequested) {
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}

const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener("click", async function () {
    let ele = document.querySelectorAll(".cell");
    let l = 0;
    let r = ele.length - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    document.getElementById("stopSort").style.display = "";
    await mergeSort(ele, l, r);
    document.getElementById("stopSort").style.display = "none";
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
