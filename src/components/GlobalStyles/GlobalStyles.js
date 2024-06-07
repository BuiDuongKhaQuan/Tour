import PropTypes from 'prop-types';
import './GlobalStyles.scss';
import 'react-quill/dist/quill.snow.css';
function GlobalStyles({ children }) {
    return children;
}

GlobalStyles.prototype = {
    children: PropTypes.node.isRequired,
};
export default GlobalStyles;
