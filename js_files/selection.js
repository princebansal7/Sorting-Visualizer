async function selection() {
    resetCounters();
    resetStop();
    const ele = document.querySelectorAll(".cell");
    const n = ele.length;
    for (let i = 0; i < n; i++) {
        if (stopRequested) return;
        let min_index = i;
        ele[i].style.background = "#007bff"; // unsorted: blue
        for (let j = i + 1; j < n; j++) {
            if (stopRequested) return;
            comparisonCount++;
            updateCounters();
            ele[j].style.background = "#ffc107"; // comparing: yellow
            await waitforme(delay);
            if (
                parseInt(ele[j].textContent) <
                parseInt(ele[min_index].textContent)
            ) {
                if (min_index !== i)
                    ele[min_index].style.background = "#e0eafc";
                min_index = j;
            } else {
                ele[j].style.background = "#e0eafc";
            }
        }
        await waitforme(delay);
        // swap values
        if (min_index !== i) {
            let temp = ele[min_index].textContent;
            ele[min_index].textContent = ele[i].textContent;
            ele[i].textContent = temp;
            swapCount++;
            updateCounters();
        }
        ele[min_index].style.background = "#e0eafc";
        ele[i].style.background = "#28a745"; // sorted: green
    }
}

const selectionSortbtn = document.querySelector(".selectionSort");
selectionSortbtn.addEventListener("click", async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    document.getElementById("stopSort").style.display = "";
    await selection();
    document.getElementById("stopSort").style.display = "none";
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
