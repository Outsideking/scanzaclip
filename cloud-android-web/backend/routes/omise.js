// after verifying and updating local Payment table
await fetch(`${process.env.SCANZACLIP_BACKEND_URL}/api/integrations/payments`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.SCANZACLIP_INTERNAL_TOKEN}` },
  body: JSON.stringify({ provider: "opn", providerRef: charge.id, userId: metadata.userId, status: "succeeded", amount: charge.amount/100 })
});
