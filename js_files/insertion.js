async function insertion() {
    resetCounters();
    resetStop();
    const ele = document.querySelectorAll(".cell");
    const n = ele.length;
    ele[0].style.background = "#28a745"; // sorted: green
    for (let i = 1; i < n; i++) {
        if (stopRequested) return;
        let j = i - 1;
        let key = parseInt(ele[i].textContent);
        ele[i].style.background = "#007bff"; // unsorted: blue
        await waitforme(delay);
        while (j >= 0 && parseInt(ele[j].textContent) > key) {
            if (stopRequested) return;
            comparisonCount++;
            updateCounters();
            ele[j].style.background = "#ffc107"; // comparing: yellow
            ele[j + 1].textContent = ele[j].textContent;
            swapCount++;
            updateCounters();
            j--;
            await waitforme(delay);
        }
        ele[j + 1].textContent = key;
        for (let k = 0; k <= i; k++) ele[k].style.background = "#28a745"; // sorted: green
    }
}

const inSortbtn = document.querySelector(".insertionSort");
inSortbtn.addEventListener("click", async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    document.getElementById("stopSort").style.display = "";
    await insertion();
    document.getElementById("stopSort").style.display = "none";
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
