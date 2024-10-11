import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { browserSessionPersistence } from 'firebase/auth';

interface AuthContextType {
  user: any; 
  nome: string;
  avatar: string;
  cargo: string;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [nome, setNome] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [cargo, setCargo] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setAuthPersistence = async () => {
      try {
        await auth.setPersistence(browserSessionPersistence);
      } catch (error) {
        console.error("Erro ao definir a persistência:", error);
      }
    };

    setAuthPersistence();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const email = user.email || '';
        const nome = email.split('@')[0];
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const avatarUrl = docSnap.data()?.avatar || '';
          console.log("Avatar carregado:", avatarUrl);
          setNome(nome);
          setAvatar(avatarUrl);
        } else {
          await setDoc(docRef, {
            nome: nome,
            email: email,
            avatar: '',
            cargo: ''
          });
          setNome(nome);
          setAvatar('');
        }
      } else {
        setUser(null);
        setNome('');
        setAvatar('');
        setCargo('');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setNome('');
      setAvatar('');
      setCargo('');
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, nome, avatar, cargo, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
