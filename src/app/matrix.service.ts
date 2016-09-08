import { Injectable } from '@angular/core';

@Injectable()
export class MatrixService {
  private matrix = [];
  private count = 0;

  constructor() {}

  generateMatrix(size) {
    this.matrix = [];
    for(let i = 0; i < size; i++){
      let arr = [];
      for (let j = 0; j < size; j++) {
        arr.push(this.createElem());
      }
      this.matrix.push(arr);
    }
    return this.matrix;
  }

  createElem(){
    return ({value: ''});
  }

  nextStep(square){
    if (this.count % 2 === 0 && square.value === '') {
      square.value = 1;
      this.count++;
    } else if (this.count % 2 !== 0 && square.value === '') {
      square.value = 0;
      this.count++;
    }
  }


}
