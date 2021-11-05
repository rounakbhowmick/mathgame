import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs/operators'
@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('', [Validators.required]),
  }, [
    MathValidators.addition('answer', 'a', 'b')
  ]);
  constructor() { }

  ngOnInit(): void {
    // const startTime=new Date();
    // let numberSolved=0;
    this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      delay(500),
      scan((acc) => {
        return {
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime
        }
      }, { numberSolved: 0, startTime: new Date() })

    ).subscribe(({ numberSolved, startTime }) => {
      console.log("starttime",startTime.getTime());
      console.log("numbersolved",numberSolved)
      this.secondsPerSolution = (
        new Date().getTime() - startTime.getTime()
      ) / numberSolved / 1000
      // if (value == 'INVALID') {
      //   return;
      // }
      this.mathForm.setValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: ''
      })
      // this.mathForm.controls.a.setValue(this.randomNumber());
      // this.mathForm.controls.b.setValue(this.randomNumber());
      // this.mathForm.controls.answer.setValue('');
    })
  }
  get a() {
    return this.mathForm.value.a;
  }
  get b() {
    return this.mathForm.value.b;
  }
  randomNumber() {
    return Math.floor(Math.random() * 10)
  }
}
