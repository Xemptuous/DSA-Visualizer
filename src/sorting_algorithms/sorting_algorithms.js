export default class Tracker {
  constructor(arr) {
    this.originalArray = arr;
    this.sortedArray = [];
    this.animations = [];
  }

  mergeSort() {
    let arr = this.originalArray;
    let sorted = this.mergeMain(arr, 0, arr.length - 1);
    this.sortedArray = sorted;
  }


   mergeMain(arr, left, right) {
    if (left >= right) return;
    let middle = left + Math.floor((right - left) / 2);
    this.mergeMain(arr, left, middle);
    this.mergeMain(arr, middle + 1, right);
    this.merge(arr, left, middle, right);
    return arr;
  }


   merge(arr, left, middle, right) {
    let n1 = middle - left + 1;
    let n2 = right - middle;

    let leftArray = new Array(n1);
    let rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) 
      leftArray[i] = arr[left + i];
    for (let j = 0; j < n2; j++)
      rightArray[j] = arr[middle + 1 + j];
   
    let i = 0;
    let j = 0;
    let k = left;
    while (i < n1 && j < n2) {
      this.animations.push([k - i, k]);
      this.animations.push([k - i, k]);
      if (leftArray[i] <= rightArray[j]) {
        this.animations.push([k, leftArray[i]])
        arr[k++] = leftArray[i++];
      }
      else {
        this.animations.push([k, rightArray[j]])
        arr[k++] = rightArray[j++];
      }
    }

    while (i < n1) {
      this.animations.push([k - i, k]);
      this.animations.push([k - i, k]);
      this.animations.push([k, leftArray[i]]);
      arr[k++] = leftArray[i++];
    }

    while (j < n2) {
      this.animations.push([k - j, k]);
      this.animations.push([k - j, k]);
      this.animations.push([k, rightArray[j]]);
      arr[k++] = rightArray[j++];
    }
  }
}
