import React from "react";
import Swal from "sweetalert2";
import "../Css/Support.css";

function Support() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "ef871924-cc9c-4703-b080-73d0d2e9f91b");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
    }
  };

  return (
    <>
      <div className="Support">
        <div className="container">
          <div className="Support__container">
            <div className="Support__title">
              <h1>Поддержка | Решение вопросов и помощь</h1>
            </div>
            <form onSubmit={onSubmit} className="Support__form">
              <div className="Support__form-item">
                <label htmlFor="name">Имя</label>
                <input type="text" name="name" required placeholder="Robert" />
              </div>
              <div className="Support__form-item">
                <label htmlFor="email">Почта</label>
                <input
                  type="email"
                  name="email"
                  placeholder="test@gmail.com"
                  required
                />
              </div>
              <div className="Support__form-item">
                <label htmlFor="massage">Сообщение</label>
                <textarea name="message"></textarea>
              </div>
              <button type="submit" className="Support__form-button">
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Support;
