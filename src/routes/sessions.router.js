import { Router } from "express";
import { usersManager } from '../dao/mongoDB/usersManager.js';
const router = Router()

router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body; // tienen que tener el mismo nombre que el handlebars y el model
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'all fields are required' })
  }
  try {
    const createdUser = await usersManager.createOne(req.body);
    res.status(200).json({ message: 'user created', user: createdUser });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'all fields are required' })
  }
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect('/api/views/signup')
    }
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'incorrect password' })
    }
    const sessionInfo =
      email === 'adminCoder@coder.com' && password === 'adminCod3r123'
        ? { email, first_name: user.first_name, Administrador: 'Eres Admin' }
        : { email, first_name: user.first_name, Administrador: 'No eres Admin' };
    req.session.user = sessionInfo; //para crear una session
    res.redirect('/api/views/products')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/signout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/api/views/login');
  });
});


export default router