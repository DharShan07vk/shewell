import * as SendGrid from "@sendgrid/mail";
export const sendEmail = async (mail: SendGrid.MailDataRequired) => {
  SendGrid.setApiKey(process.env.SENDGRID_API_KEY!);
  try {
    return await SendGrid.send(mail).catch(err => console.log(JSON.stringify(err)));
  } catch (error) {
    console.log("error is",error);
  }
};
