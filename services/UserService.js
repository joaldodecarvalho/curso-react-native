import allUsers from './users';

const MAX_TIMEOUT = 3000;
const MIN_TIMEOUT = 1000;

let currentUser = {
    displayName: "Joaldo de Carvalho2",
    email: "joaldocarvalho14@gmail.com",
    photoURL: "https://lh6.googleusercontent.com/-Fdvlxol1lks/AAAAAAAAAAI/AAAAAAAAAZ0/luyo1mQU_1k/photo.jpg",
    uid: "VRPSJtNED4RIvk4UwQinSrhCzEl2",
    userName: "joaldocarvalho14"
};

const getCurrentUser = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(currentUser);
        }, (MIN_TIMEOUT + (Math.random() * MAX_TIMEOUT)))
    });
};

const getUser = async (userId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(allUsers[userId]);
        }, (MIN_TIMEOUT + (Math.random() * MAX_TIMEOUT)))
    });
};

const getAllUsers = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Object.values(allUsers));
        }, (MIN_TIMEOUT + (Math.random() * MAX_TIMEOUT)))
    });
};

export {
    getCurrentUser,
    getUser,
    getAllUsers,
}