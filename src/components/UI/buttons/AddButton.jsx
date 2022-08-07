import React, { memo } from 'react';
import st from './MyButton.module.css';

const AddButton = memo(({styles = [], ...props}) => {
    return (
        <button {...props} className={`${st.addBtn} ${styles.join(' ')}`}></button>
    );
})

export default AddButton;