import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "./redux/actions";
import useLocalStorage from "./hooks/useLocalStorage";
import AddUserForm from "./components/AddUserForm";
import UserCard from "./components/UserCard";
import EditUserModal from "./components/EditUserModal";
import SearchAndFilter from "./components/SearchAndFilter";
import defaultUsers from "./data/user.json"; // <-- import default data

export default function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [storedUsers, setStoredUsers] = useLocalStorage("profiles", []);
  const [editingUser, setEditingUser] = useState(null);
  const [searchFilterData, setSearchFilterData] = useState(null);

  useEffect(() => {
    // Load from localStorage if available, else from default JSON
    if (storedUsers.length === 0) {
      dispatch(setUsers(defaultUsers));
      setStoredUsers(defaultUsers);
    } else {
      dispatch(setUsers(storedUsers));
    }
  }, []);

  useEffect(() => {
    setStoredUsers(users);
  }, [users]);

  const handleSearchAndFilter = (data) => {
    setSearchFilterData(data);
  };

  const filterProfiles = (profile) => {
    const { searchTerm, selectedLanguages, selectedEducation, selectedSpecialization } = searchFilterData || {};

    const searchMatch =
      !searchTerm ||
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    const languageMatch =
      !selectedLanguages?.length ||
      selectedLanguages.some((lang) =>
        profile.languages?.toLowerCase().includes(lang.toLowerCase())
      );

    const educationMatch =
      !selectedEducation?.length || selectedEducation.includes(profile.education);

    const specializationMatch =
      !selectedSpecialization?.length ||
      selectedSpecialization.some((spec) =>
        profile.specialization.toLowerCase().includes(spec.toLowerCase())
      );

    return searchMatch && languageMatch && educationMatch && specializationMatch;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Advanced Profile Manager</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <AddUserForm />
        <SearchAndFilter users={users} onSearchAndFilter={handleSearchAndFilter} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.isArray(users) &&
            users.filter(filterProfiles).map((user) => (
              <UserCard
                key={user.email}
                user={user}
                onEdit={() => setEditingUser(user)}
              />
            ))}
        </div>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}
