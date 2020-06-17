# Torrents

A React interface for downloading movies via torrent.
<br>
With a self built [`dialog/modal`](client/src/css/modal.css).
<img src="Readme Files/Torrents.gif">

# Api's Used:

- OMDB - for movie data.
- Cutsom built PirateBay api - for magnets.

# Server:

## Setup:

```python
cd server
pip install -r requirements.txt
```

### Create: server/settings.py

```python
# apiKey for OMDB
apikey = "type apiKey here'
```

## Run:

```python
python run.py
```

# Client:

## Setup:

```python
cd client
npm install
```

## Run:

```python
python run.py
```
