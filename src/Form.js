import React, { useState } from 'react';

function useForm(initialState, validationFunction) {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  
  const validateForm = () => {
    const errors = validationFunction(formData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e, submitCallback) => {
    e.preventDefault();
    if (validateForm()) {
      submitCallback(formData);
      setFormData(initialState);
    }
  };

  return { formData, formErrors, handleChange, handleSubmit };
}

function Forms() {
  const initialStateForm1 = { nome: '', endereco: '', bairro: '', cidade: '' };
  const initialStateForm2 = { email: '', cpf: '', sobrevoce: '' };

  const validationFunctionForm1 = (data) => {
    const errors = {};

    if (!data.nome.trim()) {
      errors.nome = 'Nome é obrigatório';
    }

    if (data.endereco.length < 5) {
      errors.endereco = 'Endereço deve ter pelo menos 5 caracteres';
    }

    if (data.bairro.length < 3) {
      errors.bairro = 'Bairro deve ter pelo menos 3 caracteres';
    }

    if (!data.cidade.trim()) {
      errors.cidade = 'Cidade é obrigatória';
    }

    return errors;
  };

  const validationFunctionForm2 = (data) => {
    const errors = {};

    if (!data.email) {
      errors.email = 'Email é obrigatório';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = 'Email inválido';
    }

    if (data.cpf.length !== 11) {
      errors.cpf = 'CPF deve ter 11 caracteres';
    }

    return errors;
  };

  const form1 = useForm(initialStateForm1, validationFunctionForm1);
  const form2 = useForm(initialStateForm2, validationFunctionForm2);

  const [formList, setFormList] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');

  const handleForm1Submit = (formData) => {
    const newItem = { ...formData, formType: 'Formulário 1', dataRegistro: new Date() };
    setFormList([newItem, ...formList]);
  };

  const handleForm2Submit = (formData) => {
    const newItem = { ...formData, formType: 'Formulário 2', dataRegistro: new Date() };
    setFormList([newItem, ...formList]);
  };

  const handleDeleteItem = (index) => {
    const updatedList = [...formList];
    updatedList.splice(index, 1);
    setFormList(updatedList);
  };

  const handleSort = () => {
    const sortedList = [...formList];
    if (sortOrder === 'desc') {
      sortedList.sort((a, b) => a.dataRegistro - b.dataRegistro);
      setSortOrder('asc');
    } else {
      sortedList.sort((a, b) => b.dataRegistro - a.dataRegistro);
      setSortOrder('desc');
    }
    setFormList(sortedList);
  };

  return (
    <div>
      <div className='container_form1'>
        <h4>Formulário 1</h4>
        <form onSubmit={(e) => form1.handleSubmit(e, handleForm1Submit)}>
          <div>
            <label className='llabel' htmlFor="nome">Nome: </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={form1.formData.nome}
              onChange={form1.handleChange}
            />
            {form1.formErrors.nome && <div className="error-message">{form1.formErrors.nome}</div>}
          </div>
          <div>
            <label className='llabel' htmlFor="endereco">Endereço: </label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={form1.formData.endereco}
              onChange={form1.handleChange}
            />
            {form1.formErrors.endereco && <div className="error-message">{form1.formErrors.endereco}</div>}
          </div>
          <div>
            <label className='llabel' htmlFor="bairro">Bairro: </label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={form1.formData.bairro}
              onChange={form1.handleChange}
            />
            {form1.formErrors.bairro && <div className="error-message">{form1.formErrors.bairro}</div>}
          </div>
          <div>
            <label className='llabel' htmlFor="cidade">Cidade: </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={form1.formData.cidade}
              onChange={form1.handleChange}
            />
            {form1.formErrors.cidade && <div className="error-message">{form1.formErrors.cidade}</div>}
          </div>
          <button type="submit">Enviar Formulário 1</button>
        </form>
      </div>
      <div className='container_form2'>
        <h4>Formulário 2</h4>
        <form onSubmit={(e) => form2.handleSubmit(e, handleForm2Submit)}>
          <div>
            <label className='llabel' htmlFor="email">E-mail: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={form2.formData.email}
              onChange={form2.handleChange}
            />
            {form2.formErrors.email && <div className="error-message">{form2.formErrors.email}</div>}
          </div>
          <div>
            <label className='llabel' htmlFor="cpf">CPF: </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={form2.formData.cpf}
              onChange={form2.handleChange}
            />
            {form2.formErrors.cpf && <div className="error-message">{form2.formErrors.cpf}</div>}
          </div>
          <div>
            <label className='llabel' htmlFor="sobrevoce">Fale sobre você: </label>
            <input
              type="text"
              id="sobrevoce"
              name="sobrevoce"
              value={form2.formData.sobrevoce}
              onChange={form2.handleChange}
            />
          </div>
          <button type="submit">Enviar Formulário 2</button>
        </form>
      </div>
      
      <div className='lista'>
        <h3>Listagem</h3>
        <button onClick={handleSort}>
          Ordenar {sortOrder === 'asc' ? 'Mais Antigo' : 'Mais Novo'}
        </button>
        <ul>
          {formList.map((item, index) => (
            <li key={index}>
              {item.formType === 'Formulário 1' && (
                <>
                  <p>Formulário 1:</p>
                  <p>Nome: {item.nome}</p>
                  <p>Endereço: {item.endereco}</p>
                  <p>Bairro: {item.bairro}</p>
                  <p>Cidade: {item.cidade}</p>
                </>
              )}
              {item.formType === 'Formulário 2' && (
                <>
                  <p>Formulário 2:</p>
                  <p>E-mail: {item.email}</p>
                  <p>CPF: {item.cpf}</p>
                  <p>Fale sobre você: {item.sobrevoce}</p>
                </>
              )}
               <button onClick={() => handleDeleteItem(index)}>Excluir</button>
               <p>. . . . . . . . .</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Forms;
