const express = require('express');
const router = express.Router();
const CommentController = require("../controllers/CommentController");

// Créer un commentaire
router.post('/createComment', CommentController.createComment);

// Obtenir tous les commentaires
router.get('/getAllComments', CommentController.getAllComments);

// Obtenir un commentaire par ID
router.get('/getCommentById/:id', CommentController.getCommentById);

// Modifier un commentaire par ID
router.put('/updateComment/:id', CommentController.updateComment);

// Supprimer un commentaire par ID
router.delete('/deleteComment/:id', CommentController.deleteComment);

module.exports = router;
