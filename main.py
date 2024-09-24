import eel
import sqlite3

# Creating connection object
sqliteConnection = sqlite3.connect('todo_app.db')

# Creating an instance of 'cursor' class
# which is used to execute the 'SQL'
# statements in 'Python'
cursor = sqliteConnection.cursor()

# Create table if not exists. In SQLite, INTEGER PRIMARY KEY column is auto-incremented
cursor.execute("CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY, task VARCHAR(255), status VARCHAR(255))")

eel.init('Gui')  # Specify the folder where your index.html file is located

@eel.expose
def App():  # Expose the App() function to JavaScript
    print("Application running...")

# Show all tasks
@eel.expose
def show_tasks():
    query = "SELECT * FROM task"
    cursor.execute(query)
    tasks = cursor.fetchall()
    return tasks

# Delete a task
@eel.expose
def delete_task(task_id):
    query = "DELETE FROM task WHERE id = ?"
    cursor.execute(query, (task_id,))
    sqliteConnection.commit()

# Add a task
@eel.expose
def create_task(task, task_status):
    query = "INSERT INTO task (task, status) VALUES (?, ?)"
    cursor.execute(query, (task, task_status))
    sqliteConnection.commit()

# Edit a task
@eel.expose
def edit_task(task, task_status, task_id):
    query = "UPDATE task SET task = ?, status = ? WHERE id = ?"
    cursor.execute(query, (task, task_status, task_id))
    sqliteConnection.commit()

# Get a task
@eel.expose
def get_task(task_id):
    query = "SELECT * FROM task WHERE id = ?"
    cursor.execute(query, (task_id,))
    task = cursor.fetchone()
    return task

App()
eel.start('index.html', size=(1000, 600))  # Run App window

# Closing the connection
cursor.close()
sqliteConnection.close()