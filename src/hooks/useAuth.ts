import { useContext } from 'react';

import { AuthContext } from '@/providers/AuthProvider';
import { AuthUserContextType } from '@/types/AuthUserContextType';

export const useAuth = (): AuthUserContextType => {
  return useContext<AuthUserContextType>(AuthContext);
};
