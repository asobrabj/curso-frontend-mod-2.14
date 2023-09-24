import React, { useState } from 'react';

function Forms() {
  const [form1Data, setForm1Data] = useState({ nome: '', endereco: '', bairro: '', cidade: '' });
  const [form1Errors, setForm1Errors] = useState({});
  
  const [form2Data, setForm2Data] = useState({ email: '', cpf: '', sobrevoce: '' });
  const [form2Errors, setForm2Errors] = useState({});
  
  const [formList, setFormList] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');

  const validateForm1 = () => {
    const errors = {};
    
    if (!form1Data.nome.trim()) {
      errors.nome = 'Nome é obrigatório';
    }
    
    if (form1Data.endereco.length < 5) {
      errors.endereco = 'Endereço deve ter pelo menos 5 caracteres';
    }
    
    if (form1Data.bairro.length < 3) {
      errors.bairro = 'Bairro deve ter pelo menos 3 caracteres';
    }
    
    if (!form1Data.cidade.trim()) {
      errors.cidade = 'Cidade é obrigatória';
    }
    
    setForm1Errors(errors);

    return Object.keys(errors).length === 0;
  };

  const validateForm2 = () => {
    const errors = {};

    if (!form2Data.email) {
      errors.email = 'Email é obrigatório';
    } else if (!/^\S+@\S+\.\S+$/.test(form2Data.email)) {
      errors.email = 'Email inválido';
    }

    if (form2Data.cpf.length !== 11) {
      errors.cpf = 'CPF deve ter 11 caracteres';
    }

    setForm2Errors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleForm1Submit = (e) => {
    e.preventDefault();
    if (validateForm1()) {
      const newItem = { ...form1Data, formType: 'Formulário 1', dataRegistro: new Date() };
      setFormList([newItem, ...formList]);
      setForm1Data({ nome: '', endereco: '', bairro: '', cidade: '' });
    }
  };

  const handleForm2Submit = (e) => {
    e.preventDefault();
    if (validateForm2()) {
      const newItem = { ...form2Data, formType: 'Formulário 2', dataRegistro: new Date() };
      setFormList([newItem, ...formList]);
      setForm2Data({ email: '', cpf: '', sobrevoce: '' });
    }
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
        <form onSubmit={handleForm1Submit}>
          <div>
            <label className='llabel' htmlFor="nome">Nome: </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={form1Data.nome}
              onChange={(e) => setForm1Data({ ...form1Data, nome: e.target.value })}
            />
            {form1Errors.nome && <div className="error-message">{form1Errors.nome}</div>}
          </div>
          <div>
            <label className='llabel' htmlFor="endereco">Endereço: </label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={form1Data.endereco}
              onChange={(e) => setForm1Data({ ...form1Data, endereco: e.target.value })}
            />
            {form1Errors.endereco && <div className="error-message">{form1Errors.endereco}</div>}
          </div>
          <div>
            <label className='llabel' htmlFor="bairro">Bairro: </label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={form1Data.bairro}
              onChange={(e) => setForm1Data({ ...form1Data, bairro: e.target.value })}
            />
            {form1Errors.bairro && <div className="error-message">{form1Errors.bairro}</div>}
          </div>
          <div>
            <label className='llabel' htmlFor="cidade">Cidade: </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={form1Data.cidade}
              onChange={(e) => setForm1Data({ ...form1Data, cidade: e.target.value })}
            />
            {form1Errors.cidade && <div className="error-message">{form1Errors.cidade}</div>}
          </div>
          <button type="submit">Enviar Formulário 1</button>
        </form>
      </div>
      <div className='container_form2'>
        <h4>Formulário 2</h4>
        <form onSubmit={handleForm2Submit}>
          <div>
            <label className='llabel' htmlFor="email">E-mail: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={form2Data.email}
              onChange={(e) => setForm2Data({ ...form2Data, email: e.target.value })}
            />
            {form2Errors.email && <div className="error-message">{form2Errors.email}</div>}
          </div>
          <div>
            <label className='llabel' htmlFor="cpf">CPF: </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={form2Data.cpf}
              onChange={(e) => setForm2Data({ ...form2Data, cpf: e.target.value })}
            />
            {form2Errors.cpf && <div className="error-message">{form2Errors.cpf}</div>}
          </div>
          <div>
            <label className='llabel' htmlFor="sobrevoce">Fale sobre você: </label>
            <input
              type="text"
              id="sobrevoce"
              name="sobrevoce"
              value={form2Data.sobrevoce}
              onChange={(e) => setForm2Data({ ...form2Data, sobrevoce: e.target.value })}
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
