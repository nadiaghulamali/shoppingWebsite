import users from '../data/user.json';

export async function login(page) {
  const user = users.validUser;
  await page.fill('#email', user.email);
  await page.fill('#pass', user.password);
  await page.click('button[name="send"]');
}
