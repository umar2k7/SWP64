# SWP64 – Auto grade system
## Запуск проекта

Как ~~лохам~~ пользователям Windows запустить проект? Смотри ниже.

### Шаг 1. Настрой виртуальное окружение (делается один раз навсегда)

Открой консоль и перейди в папку ```backend/```:

```bash
cd backend
```
И создай виртуальное окружение

```bash
python -m venv venv
```

Теперь запусти:
```bash
.\venv\Scripts\activate.bat (если ты адекват на cmd)
.\venv\Scripts\Activate.ps1 (если ты мазохист на PowerShell)
```

Теперь установи зависимости:
```bash
pip install -r requirements.txt
```

Продублируй файл ```.env.example``` в файл ```.env```: 
```bash
cp .env.example .env
```


### Шаг 2. Запусти backend сервер (fastApi) (делается каждый раз, когда нужно запустить)
Перейди в папку ```backend/```:
```bash
cd backend
```

Запусти сервер:
```bash
uvicorn main:app --reload
```

Теперь он доступен по адресу http://localhost:8000 (http://127.0.0.1:8000). Запускать через браузер не понадобится. Запускается для фронта и корректной работы next.js.

### Шаг 3. Запусти frontend сервер (next.js) (делается каждый раз, когда нужно запустить)
Перейди в папку ```frontend/```:
```bash
cd frontend
```
(эту команду запускать из корневой директории)

Установи зависимости (если запускаешь в первый раз или если будут изменения (будет известно, скажут) в файле ```package.json```)
```bash
npm install
```

Продублируй файл ```.env.local.example``` в файл ```.env.local``` (делается один раз):
```
cp .env.local.example .env.local
```

Запусти next.js на фронтенде:
```bash
npm run dev
```

Он доступен по адресу http://localhost:3000 (http://127.0.0.1:3000). И все.

### Итого

Впредь параллельно запускать

fastApi из папки backend (http://localhost:8000)
```bash
uvicorn main:app --reload
```

next.js из папки frontend (http://localhost:3000)
```bash
npm run dev
```

### *Удачи*
