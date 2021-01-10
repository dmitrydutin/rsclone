import styles from './Header.module.css';
import { connect } from 'react-redux';

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div>Header</div>
        </header>
    );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Header);
