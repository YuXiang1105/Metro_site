# Metro_site

## Recommendations

1- It is heavily recommended to use a virtual environment(venv) to use this project. To create a venv:

```shell
python3 -m venv venv
```

2- Activate the venv:

#### Windows

```CMD
venv\Scripts\activate
```

```powershell
.\venv\Scripts\Activate.ps1
```

#### Linux/Mac

```bash
source venv/bin/activate
```

## How to install dependencies
It is recommended to use the next command with the venv activated

```shell
pip install -r requirements.txt
```

## How to use
The command must be runned in the / of the project.
To run in debug mode:

```shell
flask --app src.app run --debug
```
Without debug mode:

```shell
flask --app src.app run
```