import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import OTPLogin from '@/component/auth/otp_login';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();


  // return (
  //   <div>
  //     <h1>Login</h1>
  //     <form onSubmit={handleLogin}>
  //       <input 
  //         type="email" 
  //         placeholder="Email" 
  //         value={email} 
  //         onChange={(e) => setEmail(e.target.value)} 
  //       />
  //       <input 
  //         type="password" 
  //         placeholder="Password" 
  //         value={password} 
  //         onChange={(e) => setPassword(e.target.value)} 
  //       />
  //       <button type="submit">Login</button>
  //     </form>
  //   </div>
  // );

  return <OTPLogin />
};

export default LoginPage;
