import { useEffect, useState } from "react";
import axios from "axios";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/contacts"
      );

      setContacts(res.data.contacts);
    } catch (error) {
      console.log(error);
    }
  };

  const markReplied = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/contacts/${id}`,
        { status: "Replied" }
      );

      fetchContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete message?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/contacts/${id}`
      );

      fetchContacts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-contacts">
      <h2>Contact Messages</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.subject}</td>
              <td>{contact.status}</td>

              <td>
                <button
                  onClick={() =>
                    markReplied(contact._id)
                  }
                >
                  Mark Replied
                </button>

                <button
                  onClick={() =>
                    deleteContact(contact._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminContacts;