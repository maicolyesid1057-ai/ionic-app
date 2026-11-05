
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile} from 'firebase/auth';

import { auth } from '../../firebase';
import { Router } from '@angular/router';

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
  nombre = '';
  email = '';
  password = '';
  confirmarPassword = '';

  modoRegistro = false;
  mensaje = '';
  tipoMensaje: 'error' | 'success' = 'error';
  cargando = false;

  constructor(private router: Router) {}

  cambiarModo(): void {
    this.modoRegistro = !this.modoRegistro;
    this.mensaje = '';
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.confirmarPassword = '';
  }

  async enviarFormulario(): Promise<void> {
    this.mensaje = '';

    if (this.cargando) return;

    this.cargando = true;

    try {
      if (this.modoRegistro) {
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
          throw new Error(
            'La contraseña debe tener al menos 6 caracteres.'
          );
        }

        const credencial = await createUserWithEmailAndPassword(
          auth,
          this.email.trim(),
          this.password
        );

        await updateProfile(credencial.user, {
          displayName: this.nombre.trim()
        });

        this.mensaje = '¡Cuenta creada correctamente! Ahora inicia sesión.';
        this.tipoMensaje = 'success';

        // Regresar al formulario de inicio de sesión.
        this.modoRegistro = false;
        this.password = '';
        this.confirmarPassword = '';

        await this.router.navigate(['/login'], {
          state: {
            mensaje: this.mensaje,
            tipoMensaje: this.tipoMensaje
          }
        });

      } else {
        const credencial = await signInWithEmailAndPassword(
          auth,
          this.email.trim(),
          this.password
        );

        this.mensaje = `¡Bienvenido${credencial.user.displayName
          ? ', ' + credencial.user.displayName
          : ''}!`;
        this.tipoMensaje = 'success';

        // Ir a la pantalla principal de libros.
        await this.router.navigate(['/folder/libros']);
      }

    } catch (error: unknown) {
      const codigo = (error as { code?: string }).code;

      const errores: Record<string, string> = {
        'auth/invalid-credential':
          'Correo o contraseña incorrectos.',
        'auth/user-not-found':
          'No existe una cuenta con ese correo.',
        'auth/wrong-password':
          'La contraseña es incorrecta.',
        'auth/email-already-in-use':
          'Este correo ya está registrado.',
        'auth/invalid-email':
          'El correo electrónico no es válido.',
        'auth/weak-password':
          'La contraseña debe tener al menos 6 caracteres.',
        'auth/too-many-requests':
          'Demasiados intentos. Intenta más tarde.',
        'auth/network-request-failed':
          'Error de conexión. Comprueba tu internet.'
      };

      this.mensaje =
        codigo && errores[codigo]
          ? errores[codigo]
          : error instanceof Error
            ? error.message
            : 'Ocurrió un error de autenticación.';

      this.tipoMensaje = 'error';

    } finally {
      this.cargando = false;
    }
  }
}
