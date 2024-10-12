import { SignUpForm } from "@/app/(user)/register/_components/signUpForm";


const RegisterPage : React.FC = () => {
  return (
    <div className="bg-muted/40 min-h-[calc(100vh-300px)] py-5">
      <SignUpForm />
    </div>
  );
};


export default RegisterPage;