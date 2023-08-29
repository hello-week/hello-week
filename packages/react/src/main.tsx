import React from 'react';
import ReactDOM from 'react-dom/client';
// Calendar
import { Calendar } from './Calendar';
// Styles
import '../../../docs/v2/demos/styles/demo.css';
import './styles.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Calendar />
    </React.StrictMode>
);
