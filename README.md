# PA2_ESGI

---

## TECHNO

![Docker](https://img.shields.io/badge/-Docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007acc?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-61dafb?style=for-the-badge&logo=react&logoColor=white)
![NestJS](https://img.shields.io/badge/-NestJS-ea2845?style=for-the-badge&logo=nestjs&logoColor=white)
![Python](https://img.shields.io/badge/-Python-3776ab?style=for-the-badge&logo=python&logoColor=white)
![Kotlin](https://img.shields.io/badge/-Kotlin-0095d5?style=for-the-badge&logo=kotlin&logoColor=white)

## Documentation

---

- Desktop app : https://doc.qt.io/qtforpython-6/examples/example_3d_simple3d.html
- Kotlin Android : https://developer.android.com/codelabs/build-your-first-android-app-kotlin#0
- Sass : https://sass-lang.com/guide/
- React : https://fr.reactjs.org/docs/getting-started.html
- Typescript : https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- NestJS : https://docs.nestjs.com/
- Nest swagger: https://docs.nestjs.com/openapi/introduction

## Launch the project

---

```bash
docker-compose up
```

## Train Chat bot

---

```bash
py train.py (nb_epoch)
```

## Launch data-insertion

---

```bash
cd data-insertion
docker compose up
```

## Launch desktop app

---

```bash
cd desktop-app
py -m pip install -r requirements.txt
cd src
py main.py
```

### Compile desktop app :

- linux

```bash
pip install pyinstaller
pyinstaller --onefile main.py
```

- windows

```bash
pip install auto-py-to-exe
auto-py-to-exe
```