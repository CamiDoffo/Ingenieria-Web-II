const { EntitySchema } = require('typeorm');

class Task {
    constructor(id, description, done) {
        this.id = id;
        this.description = description;
        this.done = done;
    }
}

const TaskSchema = new EntitySchema({
    name: 'Task',
    target: Task,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        description: {
            type: 'text',
        },
        done: {
            type: 'boolean',
        },
    },
});

module.exports = {
    Task,
    TaskSchema,
};
