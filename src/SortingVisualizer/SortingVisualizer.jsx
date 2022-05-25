import React from 'react';
import {mergeSort} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';

const SPEED = 1;
const COLOR1 = 'cornflowerblue';
const COLOR2 = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i=0; i<310; i++) {
            array.push(randomIntFromInterval(5, 800));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = mergeSort(this.state.array);
        for(let i=0; i< animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? COLOR2 : COLOR1;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*SPEED);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i*SPEED);
            }
        }
    }

    

    sortTest() {
        for(let i = 0; i< 100; i++) {
            const array = [];
            for(let i = 0; i< randomIntFromInterval(1, 1000); i++) {
                array.push(randomIntFromInterval(-1000, 1000));
                }
            const javaSorted = array.slice().sort((a, b) => a-b);
            const mergeSorted = mergeSort(array.slice());
            console.log(areEqual(javaSorted, mergeSorted));
        }
    }
    
    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
            {array.map((value, idx) => (
                <div 
                className="array-bar" 
                key={idx}
                style={{height: `${value}px`}}></div>
            ))}
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Mergesort</button>
            </div>
           );
        }
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max-min + 1) + min);
    }

    function areEqual(a1, a2) {
        if(a1.length !== a2.length) return false;
        for(let i = 0; i < a1.length; i++) {
            if(a1[i] !== a2[i]) return false;
        }
        return true;
    }