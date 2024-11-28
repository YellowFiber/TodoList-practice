const listForm = document.querySelector("#list-form");
const listInput = document.querySelector("#list-input");
const listWrap = document.querySelector("#list-wrap");

const LIST_URL = "/list";

async function fetchList() {
  try {
    const response = await fetch(LIST_URL);
    const lists = await response.json();
    renderList(lists);
  } catch (err) {
    console.log("오류 발생 : ", err);
  }
}

function renderList(lists) {
  listWrap.innerHTML = "";
  lists.forEach((list) => {
    const li = document.createElement("li");

    const listDate = document.createElement('strong');
    listDate.classList.add('list-date');
    listDate.textContent = new Date(list.date).toLocaleDateString();

    const listContent = document.createElement('div');
    const listText = document.createElement('p');
    listText.classList.add('list-text');
    listText.textContent = list.contents;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => deleteList(list._id));

    listContent.appendChild(listText);
    listContent.appendChild(deleteButton);

    li.appendChild(listDate);
    li.appendChild(listContent);
    listWrap.appendChild(li);
  });
}

listForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const listContents = listInput.value;

  try {
    const response = await fetch(LIST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: listContents }),
    });

    if (response.ok) {
      listInput.value = "";
      fetchList();
    }
  } catch (err) {
    console.log("에러 발생 : ", err);
  }
});

async function deleteList(id) {
  try {
    const response = await fetch(`${LIST_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchList();
    }
  } catch (err) {
    console.log("에러 발생 : ", err);
  }
}

fetchList();
