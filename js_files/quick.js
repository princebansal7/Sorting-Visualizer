async function partitionLomuto(ele, l, r) {
    let i = l - 1;
    ele[r].style.background = "#dc3545"; // pivot: red
    for (let j = l; j <= r - 1; j++) {
        if (stopRequested) return r;
        comparisonCount++;
        updateCounters();
        ele[j].style.background = "#ffc107"; // comparing: yellow
        await waitforme(delay);
        if (parseInt(ele[j].textContent) < parseInt(ele[r].textContent)) {
            i++;
            // swap values
            let temp = ele[i].textContent;
            ele[i].textContent = ele[j].textContent;
            ele[j].textContent = temp;
            swapCount++;
            updateCounters();
            ele[i].style.background = "#007bff"; // swapped: blue
            if (i != j) ele[j].style.background = "#007bff";
            await waitforme(delay);
        } else {
            ele[j].style.background = "#e0eafc"; // reset
        }
    }
    i++;
    await waitforme(delay);
    // swap pivot
    let temp = ele[i].textContent;
    ele[i].textContent = ele[r].textContent;
    ele[r].textContent = temp;
    ele[r].style.background = "#e0eafc";
    ele[i].style.background = "#28a745"; // sorted: green
    await waitforme(delay);
    for (let k = 0; k < ele.length; k++) {
        if (ele[k].style.background != "#28a745")
            ele[k].style.background = "#e0eafc";
    }
    return i;
}

async function quickSort(ele, l, r) {
    resetCounters();
    resetStop();
    if (stopRequested) return;
    if (l < r) {
        let pivot_index = await partitionLomuto(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    } else {
        if (l >= 0 && r >= 0 && l < ele.length && r < ele.length) {
            ele[r].style.background = "#28a745";
            ele[l].style.background = "#28a745";
        }
    }
}

const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener("click", async function () {
    let ele = document.querySelectorAll(".cell");
    let l = 0;
    let r = ele.length - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    document.getElementById("stopSort").style.display = "";
    await quickSort(ele, l, r);
    document.getElementById("stopSort").style.display = "none";
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
