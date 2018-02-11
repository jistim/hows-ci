import HowsLib from 'app/lib/lib-common';

export default {
    // Login
    isLogin: () => {
        return HowsLib.getJSON('/credential');
    },
    login: (credential) => {
        return HowsLib.postJSON('/credential', credential);
    },
    logout: () => {
        return HowsLib.deleteJSON('/credential');
    },

    // Files
    findFiles: () => {
        return HowsLib.getJSON('/api/files');
    },
    uploadFile: (file) => {
        return HowsLib.postJSON('/api/files', file);
    },
    removeFile: (fileName) => {
        return HowsLib.deleteJSON(`/api/files?fileName=${fileName}`);
    },
    deployFile: (fileName) => {
        return HowsLib.putJSON(`/api/files?fileName=${fileName}`, null);
    },
}