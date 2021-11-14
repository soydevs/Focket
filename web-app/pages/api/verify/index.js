const password = process.env.PASSWORD;

export default async function handler(req, res) {
  const { pass } = req.query;
  if (pass === password) {
    console.log("match");
    res.status(200).json({ success: true });
  } else {
    console.log("wrong pass");
    res.status(400).json({ success: false, msg: "Wrong Password" });
  }
}
