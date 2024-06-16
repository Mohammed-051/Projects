// Function to animate the welcome message and show the generate array button
async function animateWelcome() {
  const welcomeMessage = document.getElementById("welcomeMessage");
  welcomeMessage.style.opacity = 1; // Show the welcome message
  await sleep(2000); // Wait for 2 seconds
  const generateButton = document.createElement("button");
  generateButton.textContent = "Generate Array";
  generateButton.onclick = generateArray;
  generateButton.classList.add("generate-button");
  welcomeMessage.appendChild(generateButton); // Add the button after welcome message
}

let sortingSpeed = 120; // Initial sorting speed in milliseconds

function increaseSpeed() {
  sortingSpeed -= 30; // Decrease sorting speed by 10ms
  if (sortingSpeed < 0) sortingSpeed = 0; // Ensure sorting speed is not negative
}

function decreaseSpeed() {
  sortingSpeed += 60; // Increase sorting speed by 10ms
}

// Function to delay execution
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to generate a new array and display sorting options
async function generateArray() {
  // Remove the welcome animation
  const welcomeMessage = document.getElementById("welcomeMessage");
  welcomeMessage.style.opacity = 0;
  welcomeMessage.innerHTML = ""; // Clear the welcome message content

  // Show sorting options
  const sortingOptions = document.getElementById("sortingOptions");
  sortingOptions.style.display = "block";

  // Generate array bars
  const arrayContainer = document.getElementById("array-container");
  arrayContainer.innerHTML = ""; // Clear existing bars
  const arraySize = 50; // Change this value to adjust the array size
  const array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push(Math.floor(Math.random() * 500) + 1); // Generating random numbers between 1 and 500
  }
  array.forEach((value) => {
    const arrayBar = document.createElement("div");
    arrayBar.classList.add("array-bar");
    arrayBar.style.height = `${value}px`;
    arrayContainer.appendChild(arrayBar);
  });
}

// Function to visualize sorting
async function visualizeSort(sortFunction) {
  await sortFunction(0, document.querySelectorAll(".array-bar").length - 1); // ERROR EI KHANE CHILO
}

// Sorting algorithms (bubbleSort, selectionSort, insertionSort) implementations...
// Sorting algorithm: Bubble Sort
async function bubbleSort(low, high) {
  const arrayBars = document.querySelectorAll(".array-bar");
  const n = arrayBars.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const height1 = parseInt(arrayBars[j].style.height);
      const height2 = parseInt(arrayBars[j + 1].style.height);
      arrayBars[j].style.backgroundColor = "red"; // Highlight current comparison
      arrayBars[j + 1].style.backgroundColor = "red";
      await sleep(sortingSpeed); // Use sorting speed
      if (height1 > height2) {
        // Swap heights
        arrayBars[j].style.height = `${height2}px`;
        arrayBars[j + 1].style.height = `${height1}px`;
      }
      arrayBars[j].style.backgroundColor = "DodgerBlue"; // Revert color
      arrayBars[j + 1].style.backgroundColor = "DodgerBlue";
    }
  }
}
// Add more sorting algorithms here if needed

//selection sort
// Sorting algorithm: Selection Sort
async function selectionSort() {
  const arrayBars = document.querySelectorAll(".array-bar");
  const n = arrayBars.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i; // Start with the current index as the minimum
    for (let j = i + 1; j < n; j++) {
      const height1 = parseInt(arrayBars[minIndex].style.height);
      const height2 = parseInt(arrayBars[j].style.height);
      arrayBars[minIndex].style.backgroundColor = "red"; // Highlight current comparison
      arrayBars[j].style.backgroundColor = "red";
      await sleep(sortingSpeed); // Use sorting speed
      if (height2 < height1) {
        minIndex = j; // Update the minimum index if a smaller element is found
      }
      arrayBars[minIndex].style.backgroundColor = "DodgerBlue"; // Revert color
      arrayBars[j].style.backgroundColor = "DodgerBlue";
    }
    // Swap the found minimum element with the first element of the unsorted part
    if (minIndex !== i) {
      const tempHeight = arrayBars[i].style.height;
      arrayBars[i].style.height = arrayBars[minIndex].style.height;
      arrayBars[minIndex].style.height = tempHeight;
    }
  }
}
//insertion sort
// Sorting algorithm: Insertion Sort
async function insertionSort() {
  const arrayBars = document.querySelectorAll(".array-bar");
  const n = arrayBars.length;
  for (let i = 1; i < n; i++) {
    let key = arrayBars[i];
    let keyHeight = parseInt(key.style.height);
    let j = i - 1;

    // Move elements of arrayBars[0..i-1], that are greater than key,
    // to one position ahead of their current position
    while (j >= 0 && parseInt(arrayBars[j].style.height) > keyHeight) {
      // Highlight the bars being compared
      arrayBars[j].style.backgroundColor = "red";
      arrayBars[j + 1].style.backgroundColor = "red";
      await sleep(sortingSpeed); // Use sorting speed

      // Move the bar
      arrayBars[j + 1].style.height = arrayBars[j].style.height;
      j = j - 1;

      // Revert color after moving
      arrayBars[j + 1].style.backgroundColor = "DodgerBlue";
      if (j >= 0) {
        arrayBars[j].style.backgroundColor = "DodgerBlue";
      }
    }

    // Highlight the sorted part
    for (let k = 0; k <= i; k++) {
      arrayBars[k].style.backgroundColor = "DodgerBlue";
    }

    // Move the key into its correct position
    arrayBars[j + 1].style.height = `${keyHeight}px`;
    await sleep(sortingSpeed); // Use sorting speed
  }
}
//quick sort
// Sorting algorithm: Quick Sort
async function quickSort(start, end) {
  if (start < end) {
    let pivotIndex = await partition(start, end);
    await quickSort(start, pivotIndex - 1); // Recursive call with correct indices
    await quickSort(pivotIndex + 1, end); // Recursive call with correct indices
  }
}

async function partition(start, end) {
  const arrayBars = document.querySelectorAll(".array-bar");
  const pivot = parseInt(arrayBars[end].style.height); //error start, end
  let i = start - 1;

  for (let j = start; j < end; j++) {
    const currentHeight = parseInt(arrayBars[j].style.height);
    arrayBars[j].style.backgroundColor = "red";
    arrayBars[end].style.backgroundColor = "red";
    await sleep(sortingSpeed);

    if (currentHeight < pivot) {
      i++;
      const tempHeight = arrayBars[i].style.height;
      arrayBars[i].style.height = arrayBars[j].style.height;
      arrayBars[j].style.height = tempHeight;
    }

    arrayBars[j].style.backgroundColor = "DodgerBlue";
    arrayBars[end].style.backgroundColor = "DodgerBlue";
  }

  const tempHeight = arrayBars[i + 1].style.height;
  arrayBars[i + 1].style.height = arrayBars[end].style.height;
  arrayBars[end].style.height = tempHeight;

  return i + 1;
}
//merge sort
// Sorting algorithm: Merge Sort with highlights
async function mergeSort(start, end) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid); // Recursive call with correct indices
    await mergeSort(mid + 1, end); // Recursive call with correct indices
    await merge(start, mid, end);
  }
}

async function merge(start, mid, end) {
  let n1 = mid - start + 1;
  let n2 = end - mid;

  // Create temporary arrays
  let L = [];
  let R = [];

  // Copy data to temporary arrays
  for (let i = 0; i < n1; i++) {
    L[i] = parseInt(
      document.querySelectorAll(".array-bar")[start + i].style.height
    );
  }
  for (let j = 0; j < n2; j++) {
    R[j] = parseInt(
      document.querySelectorAll(".array-bar")[mid + 1 + j].style.height
    );
  }

  // Merge the temporary arrays back into the array with highlights
  let i = 0,
    j = 0,
    k = start;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      document.querySelectorAll(".array-bar")[k].style.height = `${L[i]}px`;
      document.querySelectorAll(".array-bar")[k].style.backgroundColor = "red"; // Highlight the bar being moved
      i++;
    } else {
      document.querySelectorAll(".array-bar")[k].style.height = `${R[j]}px`;
      document.querySelectorAll(".array-bar")[k].style.backgroundColor = "red"; // Highlight the bar being moved
      j++;
    }
    k++;
    await sleep(sortingSpeed); // Use sorting speed
    document.querySelectorAll(".array-bar")[k - 1].style.backgroundColor =
      "DodgerBlue"; // Revert color after moving
  }

  // Copy the remaining elements of L[], if there are any, with highlights
  while (i < n1) {
    document.querySelectorAll(".array-bar")[k].style.height = `${L[i]}px`;
    document.querySelectorAll(".array-bar")[k].style.backgroundColor = "red"; // Highlight the bar being moved
    i++;
    k++;
    await sleep(sortingSpeed); // Use sorting speed
    document.querySelectorAll(".array-bar")[k - 1].style.backgroundColor =
      "DodgerBlue"; // Revert color after moving
  }

  // Copy the remaining elements of R[], if there are any, with highlights
  while (j < n2) {
    document.querySelectorAll(".array-bar")[k].style.height = `${R[j]}px`;
    document.querySelectorAll(".array-bar")[k].style.backgroundColor = "red"; // Highlight the bar being moved
    j++;
    k++;
    await sleep(sortingSpeed); // Use sorting speed
    document.querySelectorAll(".array-bar")[k - 1].style.backgroundColor =
      "DodgerBlue"; // Revert color after moving
  }
}
