import { required, min, email, max } from 'vee-validate/dist/rules';
import { extend, setInteractionMode } from 'vee-validate';

extend('email', email);
extend('required', required);
extend('min', min);
extend('max', max);

setInteractionMode('lazy');
