import { SignUpForm } from "@/app/(user)/register/_components/signUpForm";


const RegisterPage : React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-300px)] py-12 px-4 mt-[73px] flex items-center">
      <SignUpForm />
    </div>
  );
};


export default RegisterPage;