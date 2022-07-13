# react-document-visibility
react hook, который

* предоставляет информацию о том активна (видна) ли сейчас вкладка браузера
* говорит, сколько раз с момента инициализации компонента вкладка становилась неактивной (невидимой)
* предоставляет функцию, в которой можно подписаться на изменение активности (видимости) текущей вкладки

## Пример работы

```ts
import { useDocumentVisibility } from "@volkov190/react-document-visibility";

const App = () => {
  const { count, visible, onVisibilityChange } = useDocumentVisibility();

  useEffect(() => {
    onVisibilityChange((isVisible: boolean) => {
      console.log("first handler", isVisible);
    });
    onVisibilityChange((isVisible: boolean) => {
      console.log("second handler", isVisible);
    });
  }, []);

  useEffect(() => {
    document.title = "" + visible;
  });

  return (
    <div>
      <span>
        Вы покинули страницу: {count} раз Вкладка активна?{" "}
        {visible ? "да" : "нет"}
      </span>
    </div>
  );
};
```

## Установка 
    npm i @volkov190/react-document-visibility

[Ссылка на npm](https://www.npmjs.com/package/@volkov190/react-document-visibility)
