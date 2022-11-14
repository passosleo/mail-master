const config = {
  db: {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT) ?? 3306,
    user: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "root",
    database: process.env.DB_DATABASE ?? "database",
  },
  email: {
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    port: process.env.EMAIL_PORT ?? 465,
    secure: process.env.EMAIL_SECURE ?? true,
    auth: {
      user: process.env.EMAIL_USERNAME ?? "teste@mail.com",
      pass: process.env.EMAIL_PASSWORD ?? "123456",
    },
  },
};

export default config;
