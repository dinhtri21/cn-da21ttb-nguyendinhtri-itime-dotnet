import { LoginForm } from "@/app/(user)/login/_components/loginForm";

const LoginPage: React.FC = () => {
  return (
    <div
      className="flex items-center min-h-[calc(100vh-300px)] py-12 px-4 mt-[73px]"
    >
      <LoginForm />
    </div>
  );
};
export default LoginPage;
