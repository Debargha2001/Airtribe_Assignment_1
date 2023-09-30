
---

# Task Management API

This API allows you to manage tasks with various functionalities like creating, updating, fetching, and deleting tasks. Below are the details for downloading, setting up the project, and using the API.

## Download and Setup

1. **Download the Project:** You can download the project from the repository.
2. **Navigate to the Project Directory:** Use the command line to change your directory to the project folder.
3. **Install Dependencies:** Run the following command to install the project dependencies:

   ```bash
   npm install
   ```

4. **Start the Server:** To start the server, use the following command:

   ```bash
   npm run start
   ```

## API Documentation

### 1. Fetch All Tasks

- **URL:** `localhost:5000/tasks`
- **Method:** GET
- **Query Parameters:**

    | Parameter Name | Values                                 | Description                               |
    |----------------|----------------------------------------|-------------------------------------------|
    | `status`       | `"pending"` / `"in progress"` / `"completed"` | Filter tasks based on their status      |
    | `priority`     | `"high"` / `"low"` / `"medium"`        | Filter tasks based on their priority    |
    | `sort`         | `"asc"` / `"desc"`                     | Sort tasks based on their creation date. If specified as `"asc"`, tasks will be sorted in ascending order; if specified as `"desc"`, tasks will be sorted in descending order. |

### 2. Fetch Task by ID

- **URL:** `localhost:5000/tasks/:id`
- **Method:** GET
- **Path Parameter:**

    - `id` – the value of the task ID

### 3. Create Task

- **URL:** `localhost:5000/tasks/:id`
- **Method:** POST
- **Path Parameter:**

    - `id` – the value of the task ID
- **Request Body:**

    | Name         | Type    | Required           |
    |--------------|---------|--------------------|
    | `title`      | string  | true               |
    | `description`| string  | true               |
    | `status`     | string  | Possible values: ["pending", "in progress", "completed"] | true |
    | `priority`   | string  | Possible values: ["high", "medium", "low"]              | true |

    **Example Request Body:**

    ```json
    {
        "title": "Test 6",
        "description": "This is for testing",
        "status": "pending",
        "priority": "high"
    }
    ```

### 4. Update Task

- **URL:** `localhost:5000/tasks/:id`
- **Method:** PUT
- **Path Parameter:**

    - `id` – the value of the task ID
- **Request Body:**

    | Name         | Type    |
    |--------------|---------|
    | `title`      | string  |
    | `description`| string  |
    | `status`     | string  | Possible values: ["pending", "in progress", "completed"] |
    | `priority`   | string  | Possible values: ["high", "medium", "low"]              |

    **Example Request Body:**

    ```json
    {
        "priority": "high"
    }
    ```

### 5. Delete Task

- **URL:** `localhost:5000/tasks/:id`
- **Method:** DELETE
- **Path Parameter:**

    - `id` – value of the task ID

### 6. Fetch Tasks Based on Priority Level

- **URL:** `localhost:5000/tasks/priority/:level`
- **Path Parameter:**

    - `level` – the value of task priority level. Possible values: ["high", "medium", "low"].

### Response Body:

    - `message`: Contains a message about the response.
    - `success`: True if there is no error and false if there is an error.
    - `data`: Contains the actual data related to tasks (for a success response only).

   **Example Response Body:**

    ```json
    {
    "success": true,
    "data": {
        "id": "4",
        "title": "Test 4",
        "description": "This is for testing",
        "status": "pending",
        "priority": "low",
        "createdOn": "2023-09-29T20:40:02.425Z"
    },
    "message": "ok"
   }
   ```

## Download Postman Collection

You can download the Postman collection for this API [here](https://drive.google.com/file/d/1bWfe-Qvw7QGvmoFO_una6hpEVhee29ck/view?usp=sharing).

---
