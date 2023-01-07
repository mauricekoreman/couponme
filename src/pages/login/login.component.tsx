import { AuthHeading } from "../../components/auth-heading/auth-heading.component";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button.component";
import { Input } from "../../components/input/input.component";

export const Login = () => {
  const handleSubmit = () => {
    console.log("login");
  };

  return (
    <div className='flex flex-col items-center'>
      <AuthHeading title='CouponMe' subtitle='Login to' />
      <Input name='email' type='email' placeholder='Email' />
      <Input name='password' type='password' placeholder='Password' />
      <PrimaryButton title='Login' onClick={handleSubmit} />
      <p>No account? Register here!</p>
    </div>
  );
};
