import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  email: string = '';
  feedbackMessage: string = '';
  feedbackColor: string = '';
  inputStyle: any = {};
  isSubscribed: boolean = false;
  isBtnDisabled: boolean = false;

  private emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

  onEmailInput() {
    const valor = this.email.trim();

    if (valor.length === 0) {
      this.feedbackMessage = '';
      this.feedbackColor = '';
      this.inputStyle = {};
      this.isBtnDisabled = false;
      return;
    }

    if (this.emailRegex.test(valor)) {
      this.feedbackMessage = '✔ Correo electrónico válido';
      this.feedbackColor = '#4cdf7a';
      this.inputStyle = {
        'border-color': '#4cdf7a',
        'box-shadow': '0 0 0 2px rgba(76, 223, 122, 0.25)'
      };
      this.isBtnDisabled = false;
    } else {
      this.feedbackMessage = '✘ Ingresa un correo válido (ej: nombre@dominio.com)';
      this.feedbackColor = '#ff9f43';
      this.inputStyle = {
        'border-color': '#ff9f43',
        'box-shadow': '0 0 0 2px rgba(255, 159, 67, 0.25)'
      };
      this.isBtnDisabled = true;
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.emailRegex.test(this.email.trim())) {
      return;
    }

    // Mostrar mensaje de éxito
    this.isSubscribed = true;
    this.email = '';
    this.feedbackMessage = '';
    this.inputStyle = {};

    // Ocultar el mensaje después de 4 segundos
    setTimeout(() => {
      this.isSubscribed = false;
    }, 4000);
  }
}
