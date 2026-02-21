"use client"

import { useState } from "react";
import Link from "next/link";
import { EyeOff } from "lucide-react";
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

const SignupPage = () => {
  const [emailError, setEmailError] = useState("올바른 형식의 이메일을 입력해주세요");
  const [passwordError, setPasswordError] = useState("8자 이상 영문, 숫자, 기호를 포함");

  const primaryColor = `#${color.primary}`;

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
              placeholder="Example@gmail.com"
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
                type="password"
                placeholder="********"
                className={`h-9 bg-white px-3 py-[7.5px] rounded-[8px] text-[14px] text-[#020617] placeholder:text-[#64748b] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus-visible:ring-1 pr-10 ${
                  passwordError
                    ? "border-[#8a01d9] focus-visible:ring-[#8a01d9]"
                    : "border-[#e2e8f0] focus-visible:ring-[#8a01d9]"
                }`}
                style={passwordError ? { borderColor: primaryColor } : {}}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <EyeOff className="size-5 text-[#64748b]" />
              </div>
            </div>
            {passwordError && (
              <p className="text-[14px] font-medium leading-[21px] tracking-[0.07px]" style={{ color: primaryColor }}>
                {passwordError}
              </p>
            )}
          </div>
          <div className="space-y-3 pt-0">
            <Button 
              className="h-9 w-full text-[14px] font-semibold text-[#f8fafc] rounded-[8px] transition-colors"
              style={{ backgroundColor: primaryColor }}
            >
              다음
            </Button>
            <Separator className="bg-[#e2e8f0]" />
          </div>
        </CardContent>
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