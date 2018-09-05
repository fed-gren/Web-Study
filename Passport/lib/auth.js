
module.exports = {
    is_owner: function (req, res) {
        if (req.user) {
            return true;
        } else {
            return false;
        }
    },
    status_ui: function (req, res) {
        let auth_status_ui = `<a href='/auth/login'>login</a>`;
        if (this.is_owner(req, res)) {
            auth_status_ui = `${req.user.username} | <a href="/auth/logout">logout</a>`
        }
        return auth_status_ui;
    }
}