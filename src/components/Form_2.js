import React, { useState } from "react";

const Forme = () => {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    email: "",
    estado: "",
    endereco: "",
    cpf: "",
    genero: "Masculino",
    temcurso: false,
    checkbox1: false,
    checkbox2: false,
  });

  
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [aceitaTermos, setAceitaTermos] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.nome) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.idade) {
      newErrors.idade = "Idade é obrigatória";
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.genero) {
      newErrors.genero = "Gênero é obrigatório";
    }

    if (!formData.aceitaTermos) { 
      newErrors.aceitaTermos = "Você deve aceitar os termos e condições";
    }

    if (Object.keys(newErrors).length === 0) {
      const newItem = { ...formData };
      setItemList([...itemList, newItem]);
      setSubmittedData(newItem);
      setFormData({
        nome: "",
        idade: "",
        email: "",
        estado: "",
        endereco: "",
        cpf: "",
        genero: "Masculino",
        temcurso: false,
        checkbox1: false,
        checkbox2: false,
      });
      setAceitaTermos(false);
    } else {
      setErrors(newErrors);
    }
  };

  const deleteItem = (index) => {
    const updatedList = [...itemList];
    updatedList.splice(index, 1);
    setItemList(updatedList);
  };

  
  const sortedList = [...itemList].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.nome.localeCompare(b.nome);
    } else {
      return b.nome.localeCompare(a.nome);
    }
  });

  return (
    <div className="container">
      <div className="container_form2">
        <h4>Formulário com Validação</h4>
        <form onSubmit={handleSubmit}>

          <div className='lista_p'>
            <label>Nome*........: </label>
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
            <label>Idade*.........: </label>
            <input
              type="text"
              name="idade"
              placeholder="Digite sua Idade"
              value={formData.idade}
              onChange={handleChange}
            />
            {errors.idade && <div className="error-message">{errors.idade}</div>}
          </div>

          <div className='lista_p'>
            <label>Email*..........: </label>
            <input
              type="text"
              name="email"
              placeholder="Digite seu Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className='lista_p'>
            <label>Estado civil: </label>
            <input
              type="text"
              name="estado"
              placeholder="Digite seu Estado civil"
              value={formData.estado}
              onChange={handleChange}
            />
          </div>

          <div className='lista_p'>
            <label>Endereço....: </label>
            <input
              type="text"
              name="endereco"
              placeholder="Digite seu Endereço"
              value={formData.endereco}
              onChange={handleChange}
            />
          </div>

          <div className='lista_p'>
            <label>CPF...............: </label>
            <input
              type="number"
              name="cpf"
              placeholder="Digite seu CPF"
              value={formData.cpf}
              onChange={handleChange}
            />
          </div>

          <div className='lista_p'>
            <label>Gênero: </label>
            <input
              type="radio"
              name="genero"
              value="Masculino"
              onChange={handleChange}
            />
            <span className="gen">Masc</span>
            {" "}
            <input
              type="radio"
              name="genero"
              value="Feminino"
              onChange={handleChange}
            />
            <span className="gen">Fem</span>
            {" "}
            <input
              type="radio"
              name="genero"
              value="Outros"
              onChange={handleChange}
            />
            <span className="gen">Outros</span>
            {errors.genero && <div className="error-message">{errors.genero}</div>}
          </div>

          <div className='lista_p'>
            <input
              type="checkbox"
              id="aceitaTermos"
              name="aceitaTermos"
              checked={formData.aceitaTermos}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="aceitaTermos"> *Eu aceito os termos e condições</label>
            {errors.aceitaTermos && <div className="error-message">{errors.aceitaTermos}</div>}
          </div>

          <div className='lista_p'>
            <input
              type="checkbox"
              id="checkbox1"
              name="checkbox1"
              checked={formData.checkbox1}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox1"> Tem renda acima de 3 mil reais</label>
          </div>

          <div className='lista_p'>
            <input
              type="checkbox"
              id="checkbox2"
              name="checkbox2"
              checked={formData.checkbox2}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox2"> Tem grau superior</label>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    
    
    {/* Renderize a lista na lateral */}
    <div className="container_list">
      <h4>Lista de Itens</h4>
      <ul>
        {sortedList.map((item, index) => (
          <li key={index}>
            <p className='lista_p'>Nome: {item.nome} - Idade: {item.idade}</p> 
            <p className='lista_p'>Email:{item.email}</p>
            <p className='lista_p'>Estado civil: {item.estado} - CPF: {item.cpf}</p>            
            <p className='lista_p'>Endereço: {item.endereco}</p>
            <p className='lista_p'>Gênero: {item.genero}</p>
            <p className='lista_p'>Tem renda acima de 3 mil reais: {item.checkbox1 ? "Sim" : "Não"}</p>
            <p className='lista_p'>Tem curso superior: {item.checkbox2 ? "Sim" : "Não"}</p>
            <p className='lista_p'>Aceita Termos: {item.aceitaTermos ? "Sim" : "Não"}{" _ "}
            
            <button onClick={() => deleteItem(index)}>Excluir</button>
            </p>
            
            <p>{"........."}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default Forme;
