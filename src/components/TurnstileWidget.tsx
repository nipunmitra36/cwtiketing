"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE_SITE_KEY } from "@/lib/contact";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

export default function TurnstileWidget({ onVerify, onExpire, onError }: TurnstileWidgetProps) {
  return (
    <Turnstile
      siteKey={TURNSTILE_SITE_KEY}
      onSuccess={onVerify}
      onExpire={onExpire}
      onError={onError}
      // Always shown so visitors can see the form is protected; "flexible"
      // stretches it to the form width. Expired tokens refresh on their own.
      options={{ appearance: "always", size: "flexible", refreshExpired: "auto", theme: "light" }}
    />
  );
}
