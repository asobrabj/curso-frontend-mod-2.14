import React, { useState } from 'react';

const FormularioSimples = () => {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    celular: '',
    idade: 'Mais de 20',
    aceitaTermos: false,
  });

  const [listaItens, setListaItens] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'nome' && value.trim() !== '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nome: '',
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Dados enviados:', formData);
    setIsLoading(true);

    if (!formData.nome.trim()) {
      setErrors({ nome: 'Nome é obrigatório' });
      return;
    }

    setTimeout(() => {
      setListaItens([...listaItens, formData]);
      setFormData({
        nome: '',
        endereco: '',
        celular: '',
        idade: 'Mais de 20',
        aceitaTermos: false,
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="container_form">
        <h4>Formulário Simples</h4>
        <form onSubmit={handleSubmit}>
          <div className='lista_p'>
            <label>Nome..........: </label>
            <input
              type="text"
              name="nome"
              placeholder="Digite seu Nome"
              value={formData.nome}
              onChange={handleChange}
            />
            {errors.nome && <div className="error-message">{errors.nome}</div>}
          </div>

          <div className='lista_p'>
            <label>Endereço...: </label>
            <input
              type="text"
              name="endereco"
              placeholder="Digite seu Endereço"
              value={formData.endereco}
              onChange={handleChange}
            />
          </div>

          <div className='lista_p'>
            <label>Celular........: </label>
            <input
              type="text"
              name="celular"
              placeholder="Digite o Nº do Celular"
              value={formData.celular}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className='lista_p'>Idade...........: </label>
            <input
              type="radio"
              name="idade"
              value="Mais de 20"
              onChange={handleChange}
            />
            <span className="idade">+20</span>
            {" "}
            <input
              type="radio"
              name="idade"
              value="Mais de 40"
              onChange={handleChange}
            />
            <span className="idade">+40</span>
            {" "}
            <input
              type="radio"
              name="idade"
              value="Mais de 60"
              onChange={handleChange}
            />
            <span className="idade">+60</span>
          </div>

          <div>
            <input
              type="checkbox"
              id="aceitaTermos"
              name="aceitaTermos"
              checked={formData.aceitaTermos}
              onChange={handleChange}
            />
            <label className='lista_p' htmlFor="aceitaTermos">
              Eu aceito os termos e condições.
            </label>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>

      <div className='container_result'>
        <h5>Lista de Itens</h5>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {listaItens.map((item, index) => (
              <li key={index}>
                <p className='lista_pl'>Nome: {item.nome}</p>
                <p className='lista_pl'>Endereço: {item.endereco}</p>
                <p className='lista_pl'>Celular: {item.celular}</p>
                <p className='lista_pl'>Idade: {item.idade} anos</p>
                <p className='lista_pl'>Aceita Termos: {item.aceitaTermos ? 'Sim' : 'Não'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormularioSimples;
