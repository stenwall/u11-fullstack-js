import auth from './auth.middleware';
import verifyRegister from './verifyRegister.middleware';
import verifyToken from './verifyToken.middleware';

export default {
  auth,
  verifyRegister,
  verifyToken
}
  