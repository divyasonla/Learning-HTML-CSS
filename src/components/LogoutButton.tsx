import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { auth } from '@/integrations/firebase';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <Button onClick={handleLogout} variant="outline" className="gap-2">
      Logout
    </Button>
  );
};

export default LogoutButton;
