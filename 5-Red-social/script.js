const cardsContainer = document.querySelector('.cards');
const userFilter = document.getElementById("userFilter");

// Función para crear tarjeta de usuario
function Contenedor(datosAPI) {
  const {id, name, username, email, address, phone, website , company} = datosAPI;

  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
      <p><strong>ID:</strong> ${id}</p>
      <h2>${name}</h2>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address.street}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Website:</strong> ${website}</p>
      <p><strong>Company:</strong> ${company.name}</p>
  `;  

  cardsContainer.appendChild(card);
}

// Función para obtener posts de un usuario
async function obtenerposts(userId) {
  const ApiURL = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  try {
    const response = await fetch(ApiURL);
    const posts = await response.json();

    // Limpiar antes de mostrar posts
    cardsContainer.innerHTML = "";

    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
      `;

      // Evento click para mostrar modal con comentarios
      postDiv.addEventListener("click", () => {
        mostrarModal(post);
        obtenerComentarios(post.id);
      });

      cardsContainer.appendChild(postDiv);
    });

  } catch (error) {
    console.error(error);
  }
}

// Función para obtener comentarios
async function obtenerComentarios(postId) {
  const ApiURL = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
  try {
    const response = await fetch(ApiURL);
    const comments = await response.json();
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = ""; // Limpiar comentarios anteriores

    comments.forEach(comment => {
      const commentItem = document.createElement("li");
      commentItem.innerHTML = `<strong>${comment.name}:</strong> ${comment.body}`;
      commentsList.appendChild(commentItem);
    });
  } catch (error) {
    console.error(error);
  }
}

// Función para mostrar modalllll
function mostrarModal(post) {
  const modal = document.getElementById("modal");
  const postTitle = document.getElementById("postTitle");
  const postBody = document.getElementById("postBody");

  postTitle.textContent = post.title;
  postBody.textContent = post.body;

  modal.style.display = "block";

  // Cerrar modal
  const closeModal = document.getElementById("closeModal");
  closeModal.onclick = () => {
    modal.style.display = "none";
  };

  // Cerrar modal si se hace clic fuera del contenido
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Función principal para cargar usuarios y llenar el filtroooo
async function DatosApi() {
  try {
    const ApiURL = `https://jsonplaceholder.typicode.com/users/`;
    const response = await fetch(ApiURL);
    const datosAPI = await response.json();

    // Llenar el select con nombres de usuarios
    datosAPI.forEach(user => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      userFilter.appendChild(option);
    });

    // Mostrar tarjetas de usuarios inicialmente
    datosAPI.forEach(user => Contenedor(user));

    // Mostrar posts al seleccionar usuario
    userFilter.addEventListener("change", (e) => {
      const userId = e.target.value;
      if (userId=="") {
        cardsContainer.innerHTML = ""; // Limpiar el contenedor
        datosAPI.forEach(user => Contenedor(user)); // Volver a cargar los usuarios
      } else {
        obtenerposts(userId);
      }
    });

  } catch (error) {
    console.error(error);
  }
}

DatosApi();