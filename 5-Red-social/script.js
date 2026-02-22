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

  card.style.border = '1px solid #ccc';
  card.style.padding = '10px';
  card.style.margin = '10px';
  card.style.borderRadius = '5px';
  card.style.backgroundColor = '#ffc8dd';

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
      cardsContainer.appendChild(postDiv);
    });

  } catch (error) {
    console.error(error);
  }
}

// Función principal para cargar usuarios y llenar el filtro
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

    // Evento al cambiar el filtro
    userFilter.addEventListener("change", (e) => {
      const userId = e.target.value;
      if (userId) {
        obtenerposts(userId);
      }
    });

  } catch (error) {
    console.error(error);
  }
}

DatosApi();