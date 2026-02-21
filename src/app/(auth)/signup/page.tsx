"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import color from "@/packages/design-system/src/color";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth";

const SignupPage = () => {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const _hasHydrated = useAuthStore((s) => s._hasHydrated);
  const accessToken = useAuthStore((s) => s.accessToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const primaryColor = `#${color.primary}`;

  useEffect(() => {
    if (_hasHydrated && accessToken) {
      router.push("/");
    }
  }, [_hasHydrated, accessToken, router]);

  const { mutate: register, isPending } = useMutation({
    mutationFn: () => authApi.register(email, password),
    onSuccess: async (data) => {
      const profile = await authApi.getProfile(data.accessToken);
      setAuth(profile, data.accessToken, data.refreshToken);
      router.push("/");
    },
    onError: (error: Error) => {
      const msg = error.message;
      if (msg.includes("409") || msg.toLowerCase().includes("email")) {
        setEmailError("이미 사용 중인 이메일입니다");
      } else if (msg.includes("400") || msg.toLowerCase().includes("password")) {
        setPasswordError("8자 이상 영문, 숫자, 기호를 포함해주세요");
      } else {
        setEmailError("회원가입 중 오류가 발생했습니다");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email.includes("@")) {
      setEmailError("올바른 형식의 이메일을 입력해주세요");
      return;
    }
    if (password.length < 8) {
      setPasswordError("8자 이상 영문, 숫자, 기호를 포함해주세요");
      return;
    }

    register();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] p-4 text-white font-['Pretendard',sans-serif]">
      <Card className="w-full max-w-[400px] border-[#e2e8f0] bg-white p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] rounded-[8px]">
        <CardHeader className="space-y-1 p-0 pb-6">
          <CardTitle className="text-[20px] font-bold text-[#020617] leading-6">
            회원가입
          </CardTitle>
          <CardDescription className="text-[14px] text-[#64748b] leading-[21px] tracking-[0.07px]">
            회원가입할 이메일 정보를 입력해주세요
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-7 p-0">
            <div className="space-y-1.5 flex flex-col">
              <Label
                htmlFor="email"
                className="text-[14px] font-medium text-[#020617] leading-[21px] tracking-[0.07px]"
              >
                이메일
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-9 bg-white px-3 py-[7.5px] rounded-[8px] text-[14px] text-[#020617] placeholder:text-[#64748b] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus-visible:ring-1 ${
                  emailError
                    ? "border-[#8a01d9] focus-visible:ring-[#8a01d9]"
                    : "border-[#e2e8f0] focus-visible:ring-[#8a01d9]"
                }`}
                style={emailError ? { borderColor: primaryColor } : {}}
              />
              {emailError && (
                <p className="text-[14px] font-medium leading-[21px] tracking-[0.07px]" style={{ color: primaryColor }}>
                  {emailError}
                </p>
              )}
            </div>
            <div className="space-y-1.5 flex flex-col">
              <Label
                htmlFor="password"
                className="text-[14px] font-medium text-[#020617] leading-[21px] tracking-[0.07px]"
              >
                비밀번호
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-9 bg-white px-3 py-[7.5px] rounded-[8px] text-[14px] text-[#020617] placeholder:text-[#64748b] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus-visible:ring-1 pr-10 ${
                    passwordError
                      ? "border-[#8a01d9] focus-visible:ring-[#8a01d9]"
                      : "border-[#e2e8f0] focus-visible:ring-[#8a01d9]"
                  }`}
                  style={passwordError ? { borderColor: primaryColor } : {}}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <Eye className="size-5 text-[#64748b]" />
                  ) : (
                    <EyeOff className="size-5 text-[#64748b]" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-[14px] font-medium leading-[21px] tracking-[0.07px]" style={{ color: primaryColor }}>
                  {passwordError}
                </p>
              )}
            </div>
            <div className="space-y-3 pt-0">
              <Button
                type="submit"
                disabled={isPending}
                className="h-9 w-full text-[14px] font-semibold text-[#f8fafc] rounded-[8px] transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                {isPending ? "가입 중..." : "다음"}
              </Button>
              <Separator className="bg-[#e2e8f0]" />
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center p-0 pt-6">
          <p className="text-center text-[14px] text-[#020617] tracking-[0.07px] leading-none">
            {`이미 계정이 있나요? `}
            <Link
              href="/login"
              className="font-medium underline decoration-solid underline-offset-4"
            >
              로그인
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
