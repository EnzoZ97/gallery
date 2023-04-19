import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './App/Store';
import { useAppSelector } from './App/Hook';
import App from './App';


test('render gallery buttom and form', () => {
  const { getByRole, getByLabelText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const btn_gallery = getByRole('button', { name: /see your gallery/i });
  const inputEl = getByLabelText(/word-input/i);
  const btn_form = getByRole('button', { name : /show dog/i });
  const btn_show_more = getByRole('button', { name : /show more/i });

  expect(btn_gallery).toBeInTheDocument();
  expect(inputEl).toBeInTheDocument();
  expect(btn_form).toBeInTheDocument();
  expect(btn_show_more).toBeInTheDocument();
});


test('test form', async () => {
  const { getByRole, getByLabelText, findAllByRole } = render (
    <Provider store={store}>
      <App />
    </Provider>
  )

  const inputEl = getByLabelText(/word-input/i);
  const btn_form = getByRole('button', { name : /show dog/i });
  
  fireEvent.change(inputEl, { target: { value: 'hound' } } )
  expect(inputEl).toHaveValue('hound');

  fireEvent.click(btn_form);
  const find_images = await findAllByRole('img');
  const image = document.querySelector('img') as HTMLImageElement;
  expect(image).toBeInTheDocument();

  const amount_of_pictures = document.querySelectorAll('.picture');
  expect(amount_of_pictures.length).toEqual(5);
})



