 const getEventEmailTemplate = (title, date) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
      <!-- Header Section -->
      <div style="text-align: center; padding: 15px; background: linear-gradient(90deg, #007bff, #0056b3); color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Event Created: ${title}</h1>
      </div>

      <!-- Body Section -->
      <div style="border: 1px solid #ddd; border-radius: 0 0 8px 8px; padding: 20px; background-color: white;">
        <p>Dear attendee,</p>
        <p>We are excited to inform you that the event <b>${title}</b> has been successfully scheduled for:</p>
        <p style="font-size: 16px; color: #007bff;"><b>${new Date(date).toLocaleString()}</b></p>
        <p>Please mark your calendar and stay tuned for more updates.</p>

        <p style="margin-top: 20px;">Thank you for your participation!</p>

        <!-- Footer Section -->
        <p style="color: #666;">Best regards,</p>
        <p><b>Pratik India Pvt Ltd</b></p>
      </div>
    </div>
  `;
};


export default getEventEmailTemplate