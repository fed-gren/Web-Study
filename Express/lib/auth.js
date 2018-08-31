module.exports = {
    is_owner: (req, res) => {
        if (req.session.is_logined) {
            return true;
        } else {
            return false;
        }
    },
    status_ui: (req, res) => {
        let auth_status_ui = `<a href="/auth/login">login</a>`;
        if (this.is_owner) {
            auth_status_ui = `${req.session.username} | <a href="/auth/logout">logout</a>`;
        }
        return auth_status_ui;
    }
}