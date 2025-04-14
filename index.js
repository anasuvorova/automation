const user = [
  {
    photo: "img.jpg",
    name: "Иван",
    surname: "Иванов",
    nik: "Ivan",
    birthday: "12.12.1980",
    town: "Москва",
  },
];

fetch(`https://randomuser.me/api/ `)
  .then((response) => response.json())
  .then((userObj) => {
    console.log(userObj);
  })
  .catch((error) => {
    console.log("ошибка", error);
  });

/* 

Стадии жизни любого компонента
- старт жизни (init или mount)
- жизнь (убавляй клики, прибавяй, показывай скрывай и тд) (update или rerender)
- смерть (destroy или onmount)

*/

class UserCard {
  //объект потому что состояний в ходе работы над проектом / написания кода может добавиться много разных
  // как только появляетсяя состояние, в данном случае info, сразу появляется метод для работы с этим состоянием (мне надо его изменять)
  // как называть состояния? _setState[название состояния] _setStateInfo
  _state = {
    info: false,
  };

  constructor({ photo, name, surname, nik, birthday, town, button }) {
    this._photo = photo;
    this._name = name;
    this._surname = surname;
    this._nik = nik;
    this._birthday = birthday;
    this._town = town;
    this._button = "Показать контактную информацию";
    this._init();
  }

  //_init() метод который вызывается при создании карточки пользователя. я при помощи него  вывожу start!!!!!!!!!!!! в консоль
  //чтобы убедиться что все начало работать
  _init() {
    console.log("start!!!!!!!!!!!!");
  }

  //методы добавлю после конструктора (чтобы избежать хаотичности)
  // новое состояние, будет приходить из  параметров(из круглых скобочек)
  /*этим методом я меняю состояние карточки . если я хочу показыть или скрыть контактную информацию 
  то я вызываю этот метод чтобы изменить состояние на true или false
  */
  _setStateInfo(newState) {
    this._state.info = newState;
  }

  //отрисовка нтмл - разметки
  getTemplate() {
    return `
     <div class="user-card">
      <img class="user-card__photo" src="${this._photo}" alt="photo"/ >
      <span class="user-card__name">${this._name}</span>
      <span class="user-card__surname">${this._surname}</span>
      <span class="user-card__nik">${this._nik}</span>
      <span class="user-card__birthday">${this._birthday}</span>
      <span class="user-card__town">${this._town}</span>
      <button class="user-card__button">${this._button}</button>

      <ul class="user-card__connection" style="display: none;">
        <li>Email: ivanov@yandex.ru</li>
         <li>Контактный телефон: +7-888-888-88-88</li>
      </ul>
    </div>`;
  }

  contactInfo() {
    //изменю состояние (вызываю  this._setStateInfo()
    this._setStateInfo(!this._state.info);

    //но чтобы значение изменить мне нужно присвоить новое значение)
    //изменяю текст кнопки в зависимости от ее состояния
    const button = document.querySelector(".user-card__button");
    const contactInfo = document.querySelector(".user-card__connection");

    if (this._state.info === true) {
      button.textContent = "Скрыть контактную информацию";
      contactInfo.style.display = "block";
    } else {
      button.textContent = "Показать контактную информацию";
      contactInfo.style.display = "none";
    }
  }
}
//все что касается работы и поведения конкретной карточки пользователя ( состояние методы шаблон) я пишу внутри класса
//то что касается рабоыт с внешними элементами и интеракциями с DOM я пишу вне класса
const root = document.querySelector(".root");

user.forEach((user) => {
  //просто закидываю user внутрь new UserCard (потому что метод позволяет это сделать автоматически )
  const userCard = new UserCard(user);
  // render отрисовка в страницу
  root.insertAdjacentHTML("beforeend", userCard.getTemplate());

  const button = root.querySelector(".user-card__button");
  button.addEventListener("click", () => {
    userCard.contactInfo();
  });
});
