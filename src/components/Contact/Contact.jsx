import { FaPhoneAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import css from './Contact.module.css';

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <div className={css.contactBlock}>
      <ul className={css.list}>
        <li className={css.item}>
          <span className={css.icon}>
            <FaUser />
          </span>
          {name}
        </li>
        <li className={css.item}>
          <span className={css.icon}>
            <FaPhoneAlt />
          </span>
          {number}
        </li>
      </ul>
      <button type="button" className={css.btn} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
