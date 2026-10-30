# MERN Stack Project

## Workspaces:

- `frontend`
- `backend`
 
## Development
- Create .env file
- Copy from .env.sample
- Fill is custom datat
- Paste MongoDB URI to
- Start both frontend and backend servers

```bash
npm run dev
```

Start each application separately:

```bash
npm run dev -w frontend
npm run dev -w backend
```

## Production

Build the frontend:

```bash
npm run build
```

Start the production backend server:

```bash
npm start
```

## Installing Dependencies 

**Backend:**
```bash
npm install express cors dotenv -w backend
```

**Frontend:**
```bash
npm install axios react-icons -w frontend
```

