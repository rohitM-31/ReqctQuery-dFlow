const API_URI = 'https://jsonplaceholder.typicode.com/posts';


export const fetchData = async () => {
  const res = await fetch(API_URI);
  const data = await res.json();
  return data.slice(0, 5); 
};

export const addToApi = async (title, body) => {
  const res = await fetch(API_URI, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await res.json();
};

export const updateApi = async (id, title, body) => {
  const res = await fetch(`${API_URI}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      title: title || "Updated title",
      body: body || "Updated body",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await res.json();
};


export const deleteApi = async (id) => {
  await fetch(`${API_URI}/${id}`, {
    method: "DELETE",
  });
  return id;
};
