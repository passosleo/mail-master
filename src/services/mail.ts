import query from "../data";
import mailSender from "../mail";

class MailService {
  public async sendMail() {
    try {
      const info = await mailSender({
        from: "Mail Master <bj633k@gmail.com>",
        to: "leonardopassos98@gmail.com",
        subject: "Teste",
        text: "Teste",
      });

      console.log("info: ", info);

      const { rows } = await query("SELECT * FROM city");
      return rows;
    } catch (err) {
      throw new Error("Failed to send mail. Error: " + err);
    }
  }
}

export default new MailService();
