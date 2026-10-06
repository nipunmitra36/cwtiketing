"use client";

import { Turnstile } from "@marsidev/react-turnstile";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

export default function TurnstileWidget({ onVerify, onExpire, onError }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) return null;

  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onVerify}
      onExpire={onExpire}
      onError={onError}
      options={{ appearance: "always" }}
    />
  );
}
