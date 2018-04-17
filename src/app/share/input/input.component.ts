import { Component, OnInit,Input, ContentChild, AfterContentInit } from '@angular/core';
import { FormControlName } from '@angular/forms'

@Component({
  selector: 'bbl-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterContentInit {

  //Implementação do Content Projection
  @Input() label:string;
  @Input() mensagem:string;

  input:any


  @ContentChild(FormControlName) control : FormControlName
  constructor() { }

  ngOnInit() {

  }

  ngAfterContentInit(){
    this.input = this.control
  }

  hasSuccesso():boolean{
    return this.input.valid && (this.input.dirty || this.input.touched)
  }
  hasError():boolean{
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }
}
