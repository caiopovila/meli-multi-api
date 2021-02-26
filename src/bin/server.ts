import { ml } from '../../app';

require('dotenv').config();

const PORT = process.env.PORT || 3000;

ml.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});