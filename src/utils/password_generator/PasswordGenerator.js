export default function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const allChars = upper + lower + numbers;

  let password = "";

  // Ensure at least one character from each category
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  // Fill the remaining characters
  for (let i = password.length; i < 6; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle to avoid predictable ordering
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
}
