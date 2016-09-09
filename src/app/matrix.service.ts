import { Injectable } from '@angular/core';

@Injectable()

export class MatrixService {
  private matrix = [];
  private count = 0;
  private arrWin = [];
  private winLine = 3;
  public winSize = 3;
  private deadHeat = false;
  private startSquare = 0;
  private gameWinner = false;
  private canClick = true;
  private steps = {'1': [], '0': []};
  private xWin = false;
  private oWin = false;


  constructor() {}

  generateMatrix(size) {
    this.matrix = [];
    this.count = 0;
    this.winLine = (this.winSize >= this.winLine) ? this.winLine : this.winSize;
    this.steps = {'1': [], '0': []};
    this.startSquare = 0;
    this.gameWinner = false;
    this.canClick = true;
    this.deadHeat = false;
    this.xWin = false;
    this.oWin = false;

    let index = 0;


    for(let i = 0; i < size; i++){
      let arr = [];
      for (let j = 0; j < size; j++) {
        arr.push(this.createElem(index));
        index++;
      }
      this.matrix.push(arr);
    }
    return this.matrix;
  }

  createElem(j){
    return ({value: '', index: j});
  }

  nextStep(square){
    if (this.count % 2 === 0 && square.value === '') {
      square.value = '1';
      this.count++;
    } else if (this.count % 2 !== 0 && square.value === '') {
      square.value = '0';
      this.count++;
    }
    this.startSquare += 1;
    this.steps[square.value].push(square.index);
    if (this.startSquare >= ((this.winLine * 2) - 1)) {
      if (!this.arrWin.length) {
        this.generateWin();
      }
      if (this.checkWinner(square.value)) {
        this.gameWinner = true;
        this.canClick = !this.canClick;
        if(this.count % 2 === 0 && this.gameWinner && this.xWin === false){
          this.oWin = true;
        }else if(this.count % 2 !== 0 && this.gameWinner && this.oWin === false){
          this.xWin = true;
        }
      }
    }
    if (this.startSquare === (this.winSize * this.winSize)) {
      this.deadHeat = true;
      this.canClick = !this.canClick;
    }
  }

  horizontalWin(start) {
  let lineTemp = [];
  while (lineTemp.length !== this.winLine) {
    lineTemp.push(start);
    start++;
  }
  return lineTemp;
}
verticalWin(start) {
  let lineTemp = [];
  while (lineTemp.length !== this.winLine) {
    lineTemp.push(start);
    start += this.winSize;
  }
  return lineTemp;
}
 rightDiagonal(start) {
   let lineTemp = [];
   while (lineTemp.length !== this.winLine) {
     lineTemp.push(start);
     start += (this.winSize + 1);
   }
   return lineTemp;
 }
 leftDiagonal(start) {
   let lineTemp = [];
   while (lineTemp.length !== this.winLine) {
     lineTemp.push(start);
     start += (this.winSize - 1);
   }
   return lineTemp;
 }
 generateWin() {
   for (let j = 0; j < (this.winSize * this.winSize); j += this.winSize) {
     for (let i = 0; i <= (this.winSize - this.winLine); i++) {
       this.arrWin.push(this.horizontalWin(i + j));
     }
   }
   for (let j = 0; j < this.winSize * (this.winSize - this.winLine + 1); j++) {
     this.arrWin.push(this.verticalWin(j));
   }
   for (let j = 0; j < this.winSize * (this.winSize - this.winLine + 1); j += this.winSize) {
     for (let i = 0; i <= (this.winSize - this.winLine); i++) {
       this.arrWin.push(this.rightDiagonal(i + j));
     }
   }
   for (let j = 0; j < (this.winSize * (this.winSize - this.winLine + 1)); j += this.winSize) {
     for (let i = this.winLine - 1; i < this.winSize; i++) {
       this.arrWin.push(this.leftDiagonal(i + j));
     }
   }
 }
   checkWinner(value) {
     let winner= false;
     for (let i = 0; i < this.arrWin.length; i++) {
       if (this.arrWin[i].every((number) => {
           return this.steps[value].indexOf(number) !== -1;
         })) {
         winner= true;
         break;
       }
       console.log(winner);
     }
     return winner;
   }

}
