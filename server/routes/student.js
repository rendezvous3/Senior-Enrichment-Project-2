const student = require('express').Router()
const db = require('../../db');
const Student = require('../../db/models').Student;

student.get('/', (req, res, next) => {
  	Student.findAll({},{
        include: [{ all: true, nested: true }]
    })
    .then(students => res.json(students))
    .catch(next);
});


// Set up Postman -> Headers -> Content-Type -> application/json
// Body -> {"name":"Thor"}
student.post('/', (req, res, next) => {
  	Student.create(req.body)
    .then(student => res.status(201).json(student))
    .catch(next);
});

student.put('/:studentId', (req, res, next) => {
  	Student.update(req.body, { 
		  where: { id: req.params.studentId },
		  returning:true
		})
    .then(student => res.status(200).json(student))
    .catch(next);
});

student.delete('/:studentId', (req, res, next) => {
	Student.destroy({
		where: {
			id: req.params.studentId
		}
	})
	.then(() => res.status(204).end())
	.catch(next)
})

student.get('/:studentId', (req, res, next) => {
  	Student.findById(req.params.studentId, {
        include: [{ all: true, nested: true }]
    })
    .then(function(student) {
      res.json(student);
    })
    .catch(next);
});

module.exports = student