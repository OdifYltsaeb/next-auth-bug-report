import PropTypes from 'prop-types';

const userType = PropTypes.shape({
    id: PropTypes.number,
    last_login: PropTypes.string,
    is_superuser: PropTypes.bool,
    is_staff: PropTypes.bool,
    is_active: PropTypes.bool,
    name: PropTypes.string,
    email: PropTypes.string,
    date_joined: PropTypes.string,
});

export { userType };
