const fs = require('fs');
const path = require('path');

const filePath = path.join('e:', 'Davidacdamey', 'Davids_academy_backend', 'controller', 'admin', 'examControllers.js');
let code = fs.readFileSync(filePath, 'utf-8');

// Replace req.body destructuring for question types to include topic_id
const types = [
    { name: 'MCQ', regex: /(courseId,[\s\S]*?explanationHeading,)/, replacement: 'courseId,\n            topic_id,\n            explanationHeading,' },
    { name: 'Dropdown', regex: /(marks,\s*instructions\s*\} = req\.body;)/, replacement: 'marks,\n                instructions,\n                topic_id\n            } = req.body;' },
    { name: 'Sorting', regex: /(marks,\s*instructions\s*\} = req\.body;)/, replacement: 'marks,\n                instructions,\n                topic_id\n            } = req.body;' },
    { name: 'Sentence Highlight', regex: /(marks,\s*instructions\s*\} = req\.body;)/, replacement: 'marks,\n                instructions,\n                topic_id\n            } = req.body;' },
    { name: 'Fill in the blanks', regex: /(courseId,\s*instructions\s*\} = req\.body;)/, replacement: 'courseId,\n                instructions,\n                topic_id\n            } = req.body;' },
    { name: 'Drag drop', regex: /(courseId,\s*marks,\s*instructions\s*\} = req\.body;)/, replacement: 'courseId,\n                marks,\n                instructions,\n                topic_id\n            } = req.body;' },
    { name: 'Multiple Radio', regex: /(instructions,\s*multiradioHeading\s*\} = req\.body;)/, replacement: 'instructions,\n                multiradioHeading,\n                topic_id\n            } = req.body;' },
    { name: 'Table Dropdown', regex: /(exam_type,\s*difficulty,\s*\} = req\.body;)/, replacement: 'exam_type,\n                difficulty,\n                topic_id\n            } = req.body;' },
    { name: 'Table Highlight', regex: /(exam_type,\s*difficulty,\s*\} = req\.body;)/, replacement: 'exam_type,\n                difficulty,\n                topic_id\n            } = req.body;' },
    { name: 'MultiDropdown', regex: /(exam_type,\s*difficulty,\s*\} = req\.body;)/, replacement: 'exam_type,\n                difficulty,\n                topic_id\n            } = req.body;' }
];

types.forEach(type => {
    code = code.replace(type.regex, type.replacement);
});

// Update function calls to model
code = code.replace(/insertMcqQuestion\(\{([\s\S]*?)instructions\n\s*\}\);/g, 'insertMcqQuestion({\n$1instructions,\n                topic_id\n            });');
code = code.replace(/model\.insertDropdownQuestion\((question,\s*question_type_id,\s*exam_type,\s*difficulty,\s*courseId,\s*marks,\s*instructions)\);/g, 'model.insertDropdownQuestion($1, topic_id);');
code = code.replace(/model\.insertSentenceQuestion\((question,\s*question_type_id,\s*exam_type,\s*difficulty,\s*courseId,\s*marks,\s*passage,\s*instructions)\);/g, 'model.insertSentenceQuestion($1, topic_id);');
code = code.replace(/model\.insertFillTheBlanksQuestion\(([\s\S]*?)instructions\n\s*\);/g, 'model.insertFillTheBlanksQuestion($1instructions,\n                topic_id\n            );');
code = code.replace(/model\.insertDragDropQuestion\(([\s\S]*?)instructions\n\s*\);/g, 'model.insertDragDropQuestion($1instructions,\n                topic_id\n            );');
code = code.replace(/model\.insertMultipleRadioQuestion\(([\s\S]*?)multiradioHeading\n\s*\);/g, 'model.insertMultipleRadioQuestion($1multiradioHeading,\n                topic_id\n            );');
code = code.replace(/model\.insertTableDropdownQuestion\(([\s\S]*?)instructions\n\s*\);/g, 'model.insertTableDropdownQuestion($1instructions,\n                topic_id\n            );');

fs.writeFileSync(filePath, code);
console.log("Updated examControllers.js successfully.");
