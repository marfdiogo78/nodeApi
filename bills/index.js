import express from 'express'

import create from './services/create'
import remove from './services/remove'
import listagem from './services/listagem'

const router = express.Router()

router.post('/', create);
router.delete('/:id', remove);
router.get('/', listagem);

export default router