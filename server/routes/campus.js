const campus = require('express').Router()
const db = require('../../db');
const Campus = require('../../db/models').Campus;
const Student = require('../../db/models').Student;

campus.get('/', (req, res, next) => {
    Campus.findAll({})
    .then(campuses => res.json(campuses))
    .catch(next)
});

campus.post('/', (req, res, next) => {
    Campus.create(req.body)
    .then(campus => res.status(201).json(campus))
    .catch(next)
});

campus.put('/:campusId', (req, res, next) => {
  	Campus.update(req.body, { 
		  where: { id: req.params.campusId },
		  returning:true
		})
    .then(campus => res.status(200).json(campus))
    .catch(next);
});

campus.delete('/:campusId', (req, res, next) => {
	Campus.destroy({
		where: {
			id: req.params.campusId
		}
	})
	.then(() => res.status(204).end())
	.catch(next)
})

campus.get('/:campusId', (req, res, next) => {
    Campus.findById(req.params.campusId, {
        include: [{ all: true, nested: true }]
    })
    .then(campus => res.json(campus))
    .catch(next)
});

campus.get('/:campusId/students', (req, res, next) => {
    Student.findAll({
        where: {
            campusId: req.params.campusId
        }
    })
    .then(students => res.json(students))
    .catch(next)
});


module.exports = campus