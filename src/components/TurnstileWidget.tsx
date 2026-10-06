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
      // Invisible for most visitors; a checkbox appears only if Cloudflare
      // needs an interaction. Expired tokens refresh without user action.
      options={{ appearance: "interaction-only", refreshExpired: "auto", theme: "light" }}
    />
  );
}
