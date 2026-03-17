const express = require('express');
const route = express.Router();
const { verifyToken, verifyRole } = require('../middleware/verifyAuth');
const { CreateTopic, GetTopics, RemoveTopic, EditTopic } = require('../controller/admin/topicControllers');

route.post('/create', verifyToken, verifyRole(["admin"]), CreateTopic);
route.get('/list', verifyToken, verifyRole(["admin"]), GetTopics);
route.delete('/delete', verifyToken, verifyRole(["admin"]), RemoveTopic);
route.put('/update', verifyToken, verifyRole(["admin"]), EditTopic);

module.exports = route;
