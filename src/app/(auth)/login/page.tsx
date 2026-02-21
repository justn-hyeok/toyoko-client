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

const LoginPage = () => {
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

  const { mutate: login, isPending } = useMutation({
    mutationFn: () => authApi.login(email, password),
    onSuccess: async (data) => {
      const profile = await authApi.getProfile(data.accessToken);
      setAuth(profile, data.accessToken, data.refreshToken);
      router.push("/");
    },
    onError: (error: Error) => {
      const msg = error.message;
      if (msg.includes("401") || msg.toLowerCase().includes("password")) {
        setPasswordError("비밀번호가 일치하지 않습니다");
      } else if (msg.includes("404") || msg.toLowerCase().includes("email")) {
        setEmailError("존재하지 않는 이메일입니다");
      } else {
        setPasswordError("로그인 중 오류가 발생했습니다");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    login();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] p-4 text-white font-['Pretendard',sans-serif]">
      <Card className="w-full max-w-[400px] border-[#e2e8f0] bg-white p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] rounded-[8px]">
        <CardHeader className="space-y-1 p-0 pb-6">
          <CardTitle className="text-[20px] font-bold text-[#020617] leading-6">
            로그인하기
          </CardTitle>
          <CardDescription className="text-[14px] text-[#64748b] leading-[21px] tracking-[0.07px]">
            이메일 주소를 입력해주세요
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
                placeholder="이메일 입력"
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
                  placeholder="비밀번호 입력"
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
                className="h-9 w-full text-[14px] font-medium text-[#f8fafc] rounded-[8px] transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                {isPending ? "로그인 중..." : "로그인"}
              </Button>
              <Separator className="bg-[#e2e8f0]" />
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center p-0 pt-6">
          <p className="text-center text-[14px] text-[#020617] tracking-[0.07px] leading-none">
            {`아직 계정이 없나요? `}
            <Link
              href="/signup"
              className="font-medium underline decoration-solid underline-offset-4"
            >
              회원가입
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
