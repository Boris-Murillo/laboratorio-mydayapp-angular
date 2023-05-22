import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  userInput: string = '';
  items: any[] = [];
  totalItems: number = 0;
  editing: boolean = false;

  ngOnInit(): void {
    const items = localStorage.getItem('mydayapp-angular');
    if (items) {
      this.items = JSON.parse(items);
      this.totalItems = this.items.length;
    }

    if(this.router.url === '/pending'){
      this.items = this.items.filter((item => !item.completed));
    }else if(this.router.url === '/completed'){
      this.items = this.items.filter((item => item.completed));
    }
   
  }

  ngAfterViewInit(): void {
    if(this.router.url === '/pending'){
      document.querySelector('.pending')?.classList.add('selected');
    }else if(this.router.url === '/completed'){
      document.querySelector('.completed')?.classList.add('selected');
    }else{
      document.querySelector('.all')?.classList.add('selected');
    }
  }

  saveTask() {
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

  onCheckChange(id: number) {
    this.items = this.items.map(item => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.items));
  }

  clearCompleted() {
    this.items = this.items.filter(item => !item.completed);
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.items));
  }

  editingTask(id: number, event: any) {
    if (this.editing) {
      return;
    }
    const parent = event.target.parentElement.parentElement;
    parent.classList.add('editing');
    this.editing = true;
  }

  editTask(id: number, event: any) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.title = event.target.value;
    }
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.items));
    const parent = event.target.parentElement;
    parent.classList.remove('editing');
    this.editing = false;
  }
  
}
