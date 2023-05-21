import { Component } from 'react'; // для класового компонента
import { createPortal } from 'react-dom'; // для рендеринга в іншому місці
import css from './Modal.module.css'; // стилізація

// Пошук модалки щоб динамічно додати до DOM-дерева сторінки
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

  // реєструє обробник події keydown на вікні браузера
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown); // при натисканні клавіші Escape викликає функцію keyDown
  }

  keyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal(); 
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown); 
  }

  handleClose = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  }

  render() {
    return createPortal(<div onClick={this.handleClose} className={css.Overlay}>
      <div className={css.Modal}>{this.props.children}</div>
    </div>, modalRoot)
  }
}
