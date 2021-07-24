function HistogramArea(arr) {
    let maxRes = 0, len = arr.length;
    for (let i = 1; i <= len; i++) {
    for (let j = 0; j <= len - i; j++) {
    let arrSlice = arr.slice(j, j + i);
    let area = i * Math.min(...arrSlice);
    maxRes = Math.max(area, maxRes);
    }
    }
    return maxRes;
    }
    
    // keep this function call here
    HistogramArea(readline());