import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { CommonModule, DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SGestionusuarios } from '../../../Services/usuarios-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario: any = null;

  // Formulario
  public loginForm: FormGroup;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public router: Router,
    private userService: SGestionusuarios,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      contra: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.login();
  }

  //*********************************Ingreso al sistema*********************************
  login() {
    const userNomber = this.loginForm.value.nombre;
    const userContra = this.loginForm.value.contra;

    const user = this.userService.verificarUsuario(userNomber, userContra);

    if (user != null) {
      this.loginForm.setErrors(null);
      this.usuario = user;
      this.loginForm.reset();
      // Redirigir al home después de 1.5s para que se vea el toast
        this.router.navigate(['/home']);
    } else {
      this.loginForm.setErrors({
        errorMessage: 'Usuario o contraseña incorrectos. Intente de nuevo.'
      });
    }
  }
}