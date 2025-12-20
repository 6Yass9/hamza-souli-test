import { useState } from 'react';
import { Welcome } from './components/Welcome';
import { AdminDashboard } from './components/AdminDashboard';
import { ClientDashboard } from './components/ClientDashboard';
import { StaffDashboard } from './components/StaffDashboard';
import { Login } from './components/Login';
import { User } from './types';

function App() {
  const [view, setView] = useState<'welcome' | 'login' | 'admin' | 'client' | 'staff'>('welcome');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);

    if (loggedInUser.role === 'admin') {
      setView('admin');
      return;
    }
    if (loggedInUser.role === 'staff') {
      setView('staff');
      return;
    }
    setView('client');
  };

  const handleLogout = () => {
    setUser(null);
    setView('welcome');
  };

  return (
    <>
      {view === 'welcome' && <Welcome onLoginClick={() => setView('login')} />}

      {view === 'login' && <Login onLogin={handleLogin} onBack={() => setView('welcome')} />}

      {view === 'admin' && user?.role === 'admin' && <AdminDashboard onLogout={handleLogout} />}

      {view === 'staff' && user?.role === 'staff' && <StaffDashboard user={user} onLogout={handleLogout} />}

      {view === 'client' && user?.role === 'client' && <ClientDashboard user={user} onLogout={handleLogout} />}
    </>
  );
}

export default App;
