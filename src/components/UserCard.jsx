import React from 'react';

export default function UserCard({ user, onEdit }) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden p-4 flex flex-col items-center text-center">
      <img
        src={user.imageUrl}
        alt={user.name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h2 className="text-lg font-bold">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="mt-2 text-gray-700">{user.description}</p>

      <div className="mt-3">
        <p className="text-sm"><span className="font-semibold">Languages:</span> {user.languages}</p>
        <p className="text-sm"><span className="font-semibold">Education:</span> {user.education}</p>
        <p className="text-sm"><span className="font-semibold">Specialization:</span> {user.specialization}</p>
      </div>

      <div className="flex gap-4 mt-3">
        {user.twitter && (
          <a
            href={user.twitter}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            Twitter
          </a>
        )}
        {user.instagram && (
          <a
            href={user.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 hover:underline"
          >
            Instagram
          </a>
        )}
      </div>

      <button
        onClick={() => onEdit(user)}
        className="mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
      >
        Edit
      </button>
    </div>
  );
}
