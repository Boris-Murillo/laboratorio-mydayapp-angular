import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  userInput: string = '';
  items: any[] = [];
  totalItems: number = 0;

  // escuhar el evento del boton enter
  onEnterKey() {
    this.userInput = this.userInput.trim();

    if (this.userInput === '') {
      return;
    }

    this.totalItems++;

    this.items.push({
      id: this.totalItems,
      title: this.userInput,
      completed: false
    });

    localStorage.setItem('mydayapp-angular', JSON.stringify(this.items));

    this.userInput = '';
  }

}
