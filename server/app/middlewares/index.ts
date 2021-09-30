import auth from './auth.middleware';
import verifyRegister from './verifyRegister';
import verifyToken from './verifyToken.middleware';

export default {
  auth,
  verifyRegister,
  verifyToken
}
  