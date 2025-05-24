/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


function ProfileCard({ name, title, gender, image, id }) {
    const navigate = useNavigate();


    const handleViewClick = () => {
        navigate(`/user/service/admin-view/${id}`); // Navigate to the admin profile page
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    return (
        <div className='border p-6 shadow rounded'>
            <div className='flex items-center'>
                <img
                    src={image || "/assets/profile-icon.jpg"}
                    alt="profile picture"
                    className="w-32 h-32 mx-auto mb-4"
                />
                <div className='flex flex-col'>
                    <h3 className="text-center font-bold">{name}</h3>
                    <p className="text-center text-gray-500">{title}</p>
                    <p className="text-center text-gray-400">{gender}</p>

                    <button
                        onClick={handleViewClick}
                        className="mt-4 bg-green-950 text-white py-1 px-4 rounded hover:bg-green-900 block mx-auto"
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}

ProfileCard.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default ProfileCard;