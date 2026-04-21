export async function sendAdminSMS(message: string) {
  // If no SMS API key is set, silently skip SMS sending.
  if (!process.env.SMS_API_KEY) {
    console.log(`[SMS Skipped - No API Key] To: Admin | Message: ${message}`);
    return { success: false, error: "SMS_API_KEY not configured" };
  }

  const adminPhone = process.env.ADMIN_PHONE_NUMBER || "0536034346";

  try {
    // Using Arkesel v2 SMS API (Popular in Ghana, gives free trial credit)
    const response = await fetch("https://sms.arkesel.com/api/v2/sms/send", {
      method: "POST",
      headers: {
        "api-key": process.env.SMS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: process.env.SMS_SENDER_ID || "FERDS",
        message: message,
        recipients: [adminPhone],
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("SMS sending failed:", data);
      return { success: false, error: data };
    }

    console.log("Admin SMS sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("SMS network/fetch error:", error);
    return { success: false, error };
  }
}
