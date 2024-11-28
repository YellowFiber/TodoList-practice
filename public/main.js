const listForm = document.querySelector("#list-form");
const listInput = document.querySelector("#list-input");
const listWrap = document.querySelector("#list-wrap");

const LIST_URL = "/api/items";

async function fetchTasks() {
  try {
    const response = await fetch(LIST_URL);
    const lists = await response.json();
    renderTasks(lists);
  } catch (err) {
    console.log("오류 발생 : ", err);
  }
}

function renderTasks(tasks) {
  listWrap.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => deleteList(task._id));

    li.appendChild(deleteButton);
    listWrap.appendChild(li);
  });
}

listForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const listName = listInput.value;

  try {
    const response = await fetch(LIST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: listName }),
    });

    if (response.ok) {
      listInput.value = "";
      fetchTasks();
    }
  } catch (err) {
    console.log("에러 발생 : ", err);
  }
});

async function deleteList(id) {
  try {
    const response = await fetch(`${LIST_URL}/${id}`, {
      method: 'DELETE'
    });

    if(response.ok){
      fetchTasks();
    }
  }catch(err) {
    console.log('에러 발생 : ', err)
  }
}

fetchTasks();