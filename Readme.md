# Torrents

A React interface for downloading movies via torrent.

# Api's Used:

- OMDB - for movie data.
- Cutsom built PirateBay api - for magnets.

# Server:

## Setup:

```python
cd server
pip install -r requirements.txt
```

### Change settings in [`settings.py`](server/settings.py):

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
