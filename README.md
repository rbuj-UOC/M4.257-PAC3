# Start

Boilerplate for parcel

# Nodejs

Establir les opcions predeterminades quan es crea un nou fitxer [package.json](./package.json):
```
npm config set init-author-email "rbuj@uoc.edu"
npm config set init-author-name "Robert Buj"
npm config set init-license "CC0-1.0"
```

Crea un nou fitxer [package.json](./package.json):

```
npm init --yes
```

## ESLint
```
npm init @eslint/config@latest
```

## Prettier
```
npm install --save-dev prettier
```

Afegir les opcions de formatació al fitxer [.prettierrc.json](.prettierrc.json)
```json
{
  "trailingComma": "none",
  "printWidth": 1000,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

### prettier-plugin-void-html

Evitar el tancament d'etiquetes void quam es dona format a documents html amb Prettier:

```
npm install --save-dev @awmottaz/prettier-plugin-void-html
```

[prettier-plugin-void-html](https://github.com/awmottaz/prettier-plugin-void-html)

Afegir el connector al fitxer [.prettierrc.json](.prettierrc.json)

```json
{
  "plugins": ["@awmottaz/prettier-plugin-void-html"]
}
```

### eslint-config-prettier

```
npm install --save-dev eslint-config-prettier
```

Editar el fitxer [eslint.config.mjs](./eslint.config.mjs)

```js
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  eslintConfigPrettier,
];
```

## Parcel

```
npm install --save-dev parcel rimraf npm-run-all
```

Modificar la secció `scripts` del fitxer [package.json](./package.json)

```json
  "scripts": {
    "start": "npm-run-all clean parcel:dev",
    "build": "npm-run-all clean parcel:build",
    "parcel:dev": "parcel",
    "parcel:build": "parcel build",
    "clean": "rimraf dist .parcel-cache"
  },
```

# VS Code

## Afegir les extensions recomanades a VS Code

1. Obrir la línia d'ordres a VS Code, en macOS: ⌘⇧P
2. Executar l'ordre `Extensions: Configure Recommended Extensions (Workspace Folder)`
3. Afegir els identificadors de les extensions al fitxer [extensions.json](.vscode/extensions.json)
   - [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
   - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
   - [Emmet](https://code.visualstudio.com/docs/editor/emmet) (ja està inclosa)
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - [HTMLHint](https://marketplace.visualstudio.com/items?itemName=HTMLHint.vscode-htmlhint)
   - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Configuració de Prettier

1. Obrir les preferències de l'espai de treball a VS Code, en macOS: ⌘,
2. Seleccionar `Workspace`
3. teclejar `default formatter`
4. Seleccionar l'opció `Prettier`

## Configuració d'Emmet

1. Obrir les preferències de l'espai de treball a VS Code, en macOS: ⌘,
2. Seleccionar `Workspace`
3. teclejar `emmet tab`
4. Habilitar l'opció `Trigger Expansion on Tab`

## Abreviatures d'Emmet

| Abreviatura | Operació                                                  |
| ----------- | --------------------------------------------------------- |
| !           | Crear un document html5                                   |
| .NOM        | Crear un div amb la classe NOM                            |
| ELEMENT.NOM | Crear un ELEMENT (div, h1, p, ...) amb la classe NOM      |
| ELEMENT#ID  | Crear un ELEMENT (div, h1, p, ...) amb l'identificador ID |

## Dreceres de VS Code

| Drecera | Acció                     |
| ------- | ------------------------- |
| ⌘ ,     | Obrir les preferències    |
| ⌘ ⇧ P   | Obrir la linia d'ordres   |
| ⌘ ⇧ 7   | (des)Comentar el codi     |
| ⌥ ⇧ F   | Donar format al codi      |
| F5      | Iniciar la depuració      |
| Fn F2   | Refactor: canviar el nom  |
| Fn F3   | Cercar: cercar el següent |
