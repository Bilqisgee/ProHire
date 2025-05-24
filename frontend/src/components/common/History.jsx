// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment'; // Import moment for date formatting
import { historyAdmin, historyUser  } from "@/config";

function History({ type }) {
  return (
    <div className="container p-4 max-w-full">
      {type === "user" ? (
        <table className="max-w-full bg-white border-gray-200 py-2 px-4 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">*</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {historyUser .map((profile, index) => (
              <tr key={profile._id} className="text-gray-700">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{profile.name}</td>
                <td className="py-2 px-4 border-b"> {moment(new Date(parseInt(profile.date))).format('ll')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="min-w-full bg-white border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">*</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b  max-md:text-center">Title</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {historyAdmin.map((profile, index) => (
              <tr key={profile._id} className="text-gray-700 max-sm:text-sm">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{profile.name}</td>
                <td className="py-2 px-4 border-b ">{profile.title}</td>
                <td className="py-2 px-4 border-b"> {moment(new Date(parseInt(profile.date))).format('ll')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

History.propTypes = {
  type: PropTypes.string.isRequired,
};

export default History;