import firebase from 'firebase';

export function isFirebaseAuthError(er: any): er is firebase.auth.AuthError {
  return 'a' in er && 'code' in er && 'message' in er;
}
