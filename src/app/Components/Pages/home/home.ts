import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  // Variables 
  anoActual: any = new Date();

  // Constructor
  constructor() {
    this.anoActual = this.anoActual.getFullYear();
  }


  

}
