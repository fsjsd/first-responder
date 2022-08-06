module.exports = function () {
  let operations = {
    GET,
    POST,
    PUT,
    DELETE,
  };

  let taskList = [
    { id: 0, message: "First todo" },
    { id: 1, message: "Second todo" },
    { id: 2, message: "Third todo" }
  ];

  function GET(req, res, next) {
    res.status(200).json(taskList);
  }

  function POST(req, res, next) {
    console.log(`About to create todo: ${JSON.stringify(req.body)}`);
    taskList.push(req.body);
    res.status(201).send();
  }

  function PUT(req, res, next) {
    console.log(`About to update todo id: ${req.query.id}`);

    taskList = taskList.map(task => {
      if(task.id == req.query.id) {
        return req.body;
      }
      return task;
    });
    res.status(200).send();
  }

  function DELETE(req, res, next) {
    console.log(`About to delete todo id: ${req.query.id}`);
    
    taskList = taskList.filter(task => task.id != req.query.id);

    res.status(200).send();
  }

  GET.apiDoc = {
    summary: "Fetch todos.",
    operationId: "getTodos",
    responses: {
      200: {
        description: "List of todos.",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/Todo",
          },
        },
      },
    },
  };

  POST.apiDoc = {
    summary: "Create todo.",
    operationId: "createTodo",
    consumes: ["application/json"],
    parameters: [
      {
        in: "body",
        name: "todo",
        schema: {
          $ref: "#/definitions/Todo",
        },
      },
    ],
    responses: {
      201: {
        description: "Created",
      },
    },
  };

  PUT.apiDoc = {
    summary: "Update todo.",
    operationId: "updateTodo",
    parameters: [
      {
        in: "query",
        name: "id",
        required: true,
        type: "string",
      },
      {
        in: "body",
        name: "todo",
        schema: {
          $ref: "#/definitions/Todo",
        },
      },
    ],
    responses: {
      200: {
        description: "Updated ok",
      },
    },
  };

  DELETE.apiDoc = {
    summary: "Delete todo.",
    operationId: "deleteTodo",
    consumes: ["application/json"],
    parameters: [
      {
        in: "query",
        name: "id",
        required: true,
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Delete",
      },
    },
  };

  return operations;
};