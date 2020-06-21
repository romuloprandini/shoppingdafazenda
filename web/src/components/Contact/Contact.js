import React, { Component } from "react";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      subject: {
        value: "",
        isValid: false,
      },
      isLoading: false,
    };

    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.showError = this.showError.bind(this);
    this.allFieldsValid = this.allFieldsValid.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        <form className="w-full max-w-lg mb-30">
          <div className="flex flex-wrap sm:-mx-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Nome
            </label>
            <input
              disabled={this.state.isLoading}
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                this.showError(this.state.name)
                  ? "border-red-500"
                  : "border-gray-500"
              }`}
              id="name"
              type="text"
              placeholder="Informe seu nome"
              value={this.state.name.value}
              onChange={this.handleName}
            />
            {this.showError(this.state.name) ? (
              <p className="text-red-500 text-xs italic">Informe seu nome.</p>
            ) : null}
          </div>
          <div className="flex flex-wrap sm:-mx-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                this.showError(this.state.email)
                  ? "border-red-500"
                  : "border-gray-500"
              }`}
              id="email"
              type="email"
              placeholder="nome@email.com"
              disabled={this.state.isLoading}
              value={this.state.email.value}
              onChange={this.handleEmail}
            />
            {this.showError(this.state.email) ? (
              <p className="text-red-500 text-xs italic">
                Prencha com um email válido.
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap flex-col sm:-mx-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="subject"
            >
              Assunto
            </label>
            <textarea
              rows="4"
              disabled={this.state.isLoading}
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  ${
                this.showError(this.state.subject)
                  ? "border-red-500"
                  : "border-gray-500"
              }`}
              id="subject"
              placeholder="Assunto"
              value={this.state.subject.value}
              onChange={this.handleSubject}
            />
            <p className="text-gray-600 text-xs italic">
              Informe aqui suas dúvidas e sugestões
            </p>
            {this.showError(this.state.subject) ? (
              <p className="text-red-500 text-xs italic">
                O assunto deve ter no mínimo 30 letras.
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap mb-6 justify-end">
            {this.state.isLoading ? (
              <button
                type="button"
                className="flex flex-row text-white font-bold py-2 px-4 rounded bg-blue-200"
                disabled
              >
                <div className="mr-5">Enviando</div>
                <div>
                  <Icon
                    spin={true}
                    path={mdiLoading}
                    size={1}
                    className="text-white"
                  />
                </div>
              </button>
            ) : (
              <button
                type="button"
                className={`flex flex-row text-white font-bold py-2 px-4 rounded ${
                  this.allFieldsValid()
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-blue-200"
                }`}
                // disabled={!this.allFieldsValid()}
                onClick={this.submitForm}
              >
                Enviar
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  handleName(e) {
    this.setState({
      name: {
        value: e.target.value,
        isValid: e.target.value.length > 1,
      },
    });
  }

  handleEmail(e) {
    this.setState({
      email: {
        value: e.target.value,
        isValid:
          e.target.value.length > 1 &&
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value),
      },
    });
  }

  handleSubject(e) {
    this.setState({
      subject: {
        value: e.target.value,
        isValid: e.target.value.length > 30,
      },
    });
  }

  showError(field) {
    return field.value !== "" && !field.isValid;
  }

  allFieldsValid() {
    return (
      this.state.name.isValid &&
      this.state.email.isValid &&
      this.state.subject.isValid
    );
  }

  async submitForm(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    const data = {
      name: this.state.name.value,
      email: this.state.email.value,
      subject: this.state.subject.value,
    };

    try {
      const url = `${process.env.REACT_APP_API_URL}/contact`;
      let response = await fetch(url,{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        this.setState({
          name: {
            value: "",
            isValid: false,
          },
          email: {
            value: "",
            isValid: false,
          },
          subject: {
            value: "",
            isValid: false,
          },
        });
        this.props.notification.show(
          "Mensagem enviada",
          "Em breve retornaremos o contato",
          "success"
        );
      } else {
        this.props.notification.show(
          "Ocorreu um erro ao enviar sua mensagem",
          "",
          "error"
        );
      }
    } catch (e) {
      console.error(e);
      this.props.notification.show(
        "Ocorreu um erro ao enviar sua mensagem",
        "",
        "error"
      );
    } finally {
      this.setState({ isLoading: false });
    }
  }
}
