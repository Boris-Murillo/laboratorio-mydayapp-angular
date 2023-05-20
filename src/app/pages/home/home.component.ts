import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor() { }

  userInput: string = '';
  items: any[] = [];
  totalItems: number = 0;

  ngOnInit(): void {
    const items = localStorage.getItem('mydayapp-angular');
    if (items) {
      this.items = JSON.parse(items);
      this.totalItems = this.items.length;
    }
  }

  

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

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.items));
  }

}
