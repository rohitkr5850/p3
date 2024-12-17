const firebaseConfig = {
    apiKey: "<YOUR-FIREBASE-API-KEY>",
    authDomain: "<YOUR-FIREBASE-PROJECT-ID>.firebaseapp.com",
    projectId: "<YOUR-FIREBASE-PROJECT-ID>",
    storageBucket: "<YOUR-FIREBASE-PROJECT-ID>.appspot.com",
    messagingSenderId: "<YOUR-MESSAGING-SENDER-ID>",
    appId: "<YOUR-APP-ID>"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const userTable = document.getElementById('user-table');
  const editForm = document.getElementById('edit-form');
  const editName = document.getElementById('edit-name');
  const editEmail = document.getElementById('edit-email');
  const saveBtn = document.getElementById('save-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  let currentUserId = null;
  function fetchUsers() {
    db.collection("users").get().then(snapshot => {
      userTable.innerHTML = '';
      snapshot.forEach(doc => {
        const user = doc.data();
        const row = `
          <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
              <button onclick="editUser('${doc.id}', '${user.name}', '${user.email}')">Edit</button>
            </td>
          </tr>
        `;
        userTable.innerHTML += row;
      });
    });
  }
  function editUser(id, name, email) {
    currentUserId = id;
    editName.value = name;
    editEmail.value = email;
    editForm.style.display = 'block';
  }
  saveBtn.addEventListener('click', () => {
    if (currentUserId) {
      db.collection("users").doc(currentUserId).update({
        name: editName.value,
        email: editEmail.value
      }).then(() => {
        alert("User updated successfully!");
        editForm.style.display = 'none';
        fetchUsers(); 
      }).catch(err => console.error("Error updating user:", err));
    }
  });
  cancelBtn.addEventListener('click', () => {
    editForm.style.display = 'none';
  });
  fetchUsers();
  