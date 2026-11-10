
import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth';

import { auth } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  async registrar(nombre: string, email: string, password: string) {
    const credencial = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(credencial.user, {
      displayName: nombre
    });
    await signOut(auth);
    return credencial.user;
  }
  async iniciarSesion(email: string, password: string) {
    const credencial = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credencial.user;
  }
}
