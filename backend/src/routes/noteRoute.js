const router = require("express").Router();
const notesController = require("../controllers/notesController");
const verifyJWT = require("../middleware/verify");

router.use(verifyJWT);
router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);
module.exports = router;
