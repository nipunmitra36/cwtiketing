import PaymentGateway from "@/components/shared/PaymentGateway";

export default function MarketplacePaymentGateway() {
  return (
    <PaymentGateway
      description="Cards, wallets, and local rails — every operator on the marketplace accepts the payments their passengers already use."
      lockNote="Encrypted end-to-end payments across every operator and channel"
    />
  );
}