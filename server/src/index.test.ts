// import { expect, test, describe } from 'bun:test';
// import { loginRoute } from './routes/deprecated/account/loginRoute';

// // testing test function
// describe('testing', () => {
//    test('should pass to verify CI working', () => {
//       expect(1 + 1).toBe(2);
//    });
// });

// describe('Login API endpoint', () => {
//    // test empty login
//    test('POST /login: empty body, return 400', async () => {
//       const res = await loginRoute.request('/login', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({}),
//       });

//       expect(res.status).toBe(400);
//    });

//    // test valid login
//    test('POST /login: valid login, return 200', async () => {
//       const res = await loginRoute.request('/login', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({
//             email: 'test@example.com',
//             password: 'password123',
//          }),
//       });

//       expect(res.status).toBe(200);
//    });
// });
