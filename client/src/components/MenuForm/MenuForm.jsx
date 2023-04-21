import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { foodTypes } from '../../helpers/foodTypes';
import { postMenu } from '../../redux/actions/actions';
import DishForm from './DishForm/DishForm';
import './MenuForm.css';

const MenuForm = () => {
  const dispatch = useDispatch();
  const { success, error } = useSelector;
  const [showDish, setShowDish] = useState(false);

  success && setShowDish(true);
  const [menu, setMenu] = useState({
    type: ''
  });
  const handleSelect = (event) => {
    const { name, value } = event.target;
    setMenu({
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (menu.name !== '') {
      dispatch(postMenu(menu));
    }
  };

  return (
        <div className='Menu-Form-Container'>
            <form className='Menu-Form'>
              <label>Selecciona la sección del menú</label>
              <select
                  name='type'
                  className='type'
                  onChange={handleSelect}
                  value={menu.type}
                  required
              >
                  <option value='value2' defaultValue>
                      Selecciona
                  </option>
                  {foodTypes.map(type => (
                      <option key={type} value={type}>
                          {type}
                      </option>
                  ))}
              </select>
              <button type='submit' onClick={handleSubmit}></button>
              {
                showDish && <DishForm/>
              }
            </form>
        </div>
  );
};

export default MenuForm;
