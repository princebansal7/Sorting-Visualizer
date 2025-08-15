async function bubble() {
    resetCounters();
    resetStop();
    const ele = document.querySelectorAll(".cell");
    const n = ele.length;
    for (let i = 0; i < n - 1; i++) {
        if (stopRequested) return;
        for (let j = 0; j < n - i - 1; j++) {
            if (stopRequested) return;
            comparisonCount++;
            updateCounters();
            ele[j].style.background = "#007bff"; // unsorted: blue
            ele[j + 1].style.background = "#007bff";
            await waitforme(delay);
            if (
                parseInt(ele[j].textContent) > parseInt(ele[j + 1].textContent)
            ) {
                // swap values
                let temp = ele[j].textContent;
                ele[j].textContent = ele[j + 1].textContent;
                ele[j + 1].textContent = temp;
                swapCount++;
                updateCounters();
                ele[j].style.background = "#ffc107"; // swap: yellow
                ele[j + 1].style.background = "#ffc107";
                await waitforme(delay);
            }
            ele[j].style.background = "#e0eafc"; // reset: light
            ele[j + 1].style.background = "#e0eafc";
        }
        ele[n - 1 - i].style.background = "#28a745"; // sorted: green
    }
    ele[0].style.background = "#28a745";
}

const bubSortbtn = document.querySelector(".bubbleSort");
bubSortbtn.addEventListener("click", async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    document.getElementById("stopSort").style.display = "";
    await bubble();
    document.getElementById("stopSort").style.display = "none";
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
