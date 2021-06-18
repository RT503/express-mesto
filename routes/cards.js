const router = require('express').Router();
const { getCards, postCard, deleteCard, putLike, removeLike } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', postCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', removeLike);

module.exports = router;
