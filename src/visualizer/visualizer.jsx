import React from 'react';
import MergeSorter from '../sorting_algorithms/sorting_algorithms.js'
import './visualizer.css';

export default class Visualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      WindowSize: [window.innerWidth, window.innerHeight],
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.resetArray();
  }

  mergeSort() {
    // testSortingAlgorithms();
    let tracker = new MergeSorter(this.state.array)
    tracker.mergeSort();
    let animations = tracker.animations;

    for (let i = 0; i < animations.length; i++) {
      let arrayBars = document.getElementsByClassName('array-bar');
      let isColorChange = i % 3 !== 2;
      if (isColorChange) {
        let [barOneIdx, barTwoIdx] = animations[i];
        let barOneStyle = arrayBars[barOneIdx].style;
        let barTwoStyle = arrayBars[barTwoIdx].style;
        let color = i % 3 === 0 ? 'red' : 'deepskyblue';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 3);
      }
      else {
        setTimeout(() => {
          let [barOneIdx, newHeight] = animations[i];
          let barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 3);

      }
    }
  }

  quickSort() {}
  heapSort() {}
  bubbleSort() {}

  resetArray() {
    let array = [];
    for (let i = 0; i < window.innerWidth / 5; i++) {
      array.push(randomInt(5, window.innerHeight / 1.2));
    }
    this.setState({array});
  }

  render() {
    const {array} = this.state;

    return (
      <div className="main-container">
        <div className="array-container">
          {array.map((value, idx) => (
            <div 
              className="array-bar"
              key={idx}
              style={{height: `${value}px`}}>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => testSortingAlgorithms()}>Test Sorting Algorithms</button>
        </div>
      </div>
    );
  }
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


function arraysAreEqual(first, second) {
  if (first.length !== second.length) return false;
  for (let i = 0; i < first.length; i++)
    if (first[i] !== second[i]) return false;
  return true;
}


function testSortingAlgorithms() {
  for (let i = 0; i < 100; i++) {
    let array = [];
    let len = randomInt(1, 1000);
    for (let j = 0; j < len; j++) {
      array.push(randomInt(-1000, 1000));
    }
    let jsSortedArray = array.slice().sort((a,b) => a - b);
    let tracker = new MergeSorter(array);
    tracker.mergeSort();
    let mergeSortedArray = tracker.sortedArray;
    console.log(arraysAreEqual(jsSortedArray, mergeSortedArray));
  }
}

