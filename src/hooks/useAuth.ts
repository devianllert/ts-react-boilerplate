import { useContext } from 'react';

import AuthContext, { AuthContextValue } from '../components/AuthProvider/AuthContext';

const useAuth = (): AuthContextValue => useContext(AuthContext);

export default useAuth;
