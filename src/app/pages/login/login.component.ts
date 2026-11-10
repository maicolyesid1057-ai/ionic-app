
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

import { IonContent } from '@ionic/angular/ion-content';
import { IonCard } from '@ionic/angular/ion-card';
import { IonCardHeader } from '@ionic/angular/ion-card-header';
import { IonCardTitle } from '@ionic/angular/ion-card-title';
import { IonCardSubtitle } from '@ionic/angular/ion-card-subtitle';
import { IonCardContent } from '@ionic/angular/ion-card-content';
import { IonItem } from '@ionic/angular/ion-item';
import { IonInput } from '@ionic/angular/ion-input';
import { IonText } from '@ionic/angular/ion-text';
import { IonButton } from '@ionic/angular/ion-button';
import { IonIcon } from '@ionic/angular/ion-icon';
import { IonSpinner } from '@ionic/angular/ion-spinner';

import { addIcons } from 'ionicons';
import {
  lockClosedOutline,
  personCircleOutline,
  mailOutline,
  personOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonIcon,
    IonInput,
    IonText,
    IonButton,
    IonSpinner
  ]
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  nombre = '';
  email = '';
  password = '';
  confirmarPassword = '';

  modoRegistro = false;
  mensaje = '';
  tipoMensaje: 'error' | 'success' = 'error';
  cargando = false;

  constructor() {
    addIcons({
      'lock-closed-outline': lockClosedOutline,
      'person-circle-outline': personCircleOutline,
      'mail-outline': mailOutline,
      'person-outline': personOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline
    });
  }

  cambiarModo(): void {
    this.modoRegistro = !this.modoRegistro;

    this.mensaje = '';
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.confirmarPassword = '';
  }

  async enviarFormulario(): Promise<void> {

    if (this.cargando) return;

    this.mensaje = '';
    this.cargando = true;

    try {

      if (this.modoRegistro) {

        // VALIDACIONES
        if (!this.nombre.trim()) {
          throw new Error('Escribe tu nombre.');
        }

        if (!this.email.trim()) {
          throw new Error('Escribe tu correo electrónico.');
        }

        if (this.password !== this.confirmarPassword) {
          throw new Error('Las contraseñas no coinciden.');
        }

        if (this.password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }

        // REGISTRO
        await this.authService.registrar(
          this.nombre.trim(),
          this.email.trim(),
          this.password
        );

        // VOLVER AL LOGIN
        this.modoRegistro = false;
        this.nombre = '';
        this.password = '';
        this.confirmarPassword = '';

        this.mensaje = '¡Cuenta creada correctamente! Ahora inicia sesión.';
        this.tipoMensaje = 'success';

      } else {

        // VALIDACIONES
        if (!this.email.trim() || !this.password) {
          throw new Error('Ingresa tu correo y contraseña.');
        }

        // INICIAR SESIÓN
        const usuario = await this.authService.iniciarSesion(
          this.email.trim(),
          this.password
        );

        this.mensaje = `¡Bienvenido${
          usuario.displayName
            ? ', ' + usuario.displayName
            : ''
        }!`;

        this.tipoMensaje = 'success';

        await this.router.navigateByUrl('/libros');
      }

    } catch (error: unknown) {

      console.error('Error de autenticación:', error);

      const codigo = (error as { code?: string }).code;

      const errores: Record<string, string> = {
        'auth/email-already-in-use': 'Este correo ya está registrado.',
        'auth/invalid-email': 'El correo electrónico no es válido.',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
        'auth/invalid-credential': 'Correo o contraseña incorrectos.',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
        'auth/network-request-failed': 'Comprueba tu conexión a internet.'
      };

      this.mensaje =
        codigo && errores[codigo]
          ? errores[codigo]
          : error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado.';

      this.tipoMensaje = 'error';

    } finally {
      this.cargando = false;
    }
  }
}
