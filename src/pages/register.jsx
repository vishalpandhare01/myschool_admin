import { useState } from 'react';
import { useRouter } from 'next/router';
import Register from '@/component/auth/register';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., make API call)

    // Redirect to login page after successful registration
    // router.push('/login');
  };

  // return (
  //   <div>
  //     <h1>Register</h1>
  //     <form onSubmit={handleRegister}>
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
  //       <button type="submit">Register</button>
  //     </form>
  //   </div>
  // );

  return <Register/>
};

export default RegisterPage;
